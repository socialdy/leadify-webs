import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { orders, downloads, users, leads } from '@/src/db/schema';
import { eq, ilike, and, sql, SQL } from 'drizzle-orm';
import { stringify } from 'csv-stringify';
import ExcelJS from 'exceljs';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
});

// Initialize Supabase Client with SERVICE_ROLE_KEY for server-side operations
// This key has full access and bypasses RLS, suitable for backend tasks like file uploads.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key here
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  const origin = req.headers.get('origin');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: unknown) {
    let errorMessage = "An unknown error occurred.";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    // console.error(`Webhook Error: ${errorMessage}`);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  if (!event) {
    // console.error('Webhook Error: An unknown error occurred.', err);
    return new NextResponse('Webhook Error: An unknown error occurred.', { status: 500 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;

      const customerEmail = session.customer_details?.email;
      const amountTotal = session.amount_total;
      const currency = session.currency;
      const searchCriteriaString = session.metadata?.search_criteria;

      if (!customerEmail || amountTotal === null || currency === null || !searchCriteriaString) {
        // console.error('Missing required data in checkout.session.completed event');
        return new NextResponse('Missing data', { status: 400 });
      }

      try {
        const user = await db.select().from(users).where(eq(users.email, customerEmail)).limit(1);
        let userId: number;

        if (user.length === 0) {
          // If user does not exist, create a new user
          const newUser = await db.insert(users).values({
            email: customerEmail,
            name: session.customer_details?.name || customerEmail, // Use customer name if available, otherwise email
            phone: session.customer_details?.phone || null,
            street: session.customer_details?.address?.line1 || null,
            city: session.customer_details?.address?.city || null,
            zipCode: session.customer_details?.address?.postal_code || null,
            country: session.customer_details?.address?.country || null,
          }).returning({ id: users.id });
          userId = newUser[0].id;
        } else {
          userId = user[0].id;
          // Also update existing user with potentially new address/phone/company details
          const companyNameField = session.custom_fields?.find(field => field.key === 'company_name');
          const companyName = companyNameField?.text?.value || null;

          await db.update(users)
            .set({
              name: session.customer_details?.name || user[0].name, // Update name if available
              phone: session.customer_details?.phone || user[0].phone,
              street: session.customer_details?.address?.line1 || user[0].street,
              city: session.customer_details?.address?.city || user[0].city,
              zipCode: session.customer_details?.address?.postal_code || user[0].zipCode,
              country: session.customer_details?.address?.country || user[0].country,
              companyName: companyName || user[0].companyName, // Update companyName
            })
            .where(eq(users.id, userId));
        }

        const newDownloadId = uuidv4();

        // Insert into downloads table
        await db.insert(downloads).values({
          id: newDownloadId,
          checkoutSessionId: session.id,
          customerEmail: customerEmail,
          searchCriteria: searchCriteriaString,
        });

        // Insert into orders table
        await db.insert(orders).values({
          userId: userId,
          downloadId: newDownloadId,
          amount: (amountTotal / 100).toString(), // Convert to string for numeric type in DB
          currency: currency,
          status: 'completed',
        });

        // --- Re-integrating Lead Generation, Storage, and Email Sending Logic ---

        const searchCriteria = JSON.parse(searchCriteriaString);

        const {
          branch,
          state,
          city,
          zipCode,
          legalForm,
          includePhone,
          includeWebsite,
          includeEmail,
          includeCEO,
        } = searchCriteria;

        let baseWherePredicate: SQL<unknown> | undefined = undefined;

        if (branch && branch !== 'Alle') {
          const condition = ilike(leads.subIndustry, `%${branch}%`);
          baseWherePredicate = baseWherePredicate ? and(baseWherePredicate, condition) : condition;
        }
        if (state && state !== 'Alle Bundesländer') {
          const condition = eq(leads.state, state);
          baseWherePredicate = baseWherePredicate ? and(baseWherePredicate, condition) : condition;
        }
        if (city && city !== 'Alle Städte') {
          const condition = ilike(leads.city, `%${city}%`);
          baseWherePredicate = baseWherePredicate ? and(baseWherePredicate, condition) : condition;
        }
        if (zipCode && zipCode !== 'Alle PLZ') {
          const condition = eq(leads.zipCode, zipCode);
          baseWherePredicate = baseWherePredicate ? and(baseWherePredicate, condition) : condition;
        }
        if (legalForm && legalForm !== 'Alle Rechtsformen') {
          const condition = eq(leads.legalForm, legalForm);
          baseWherePredicate = baseWherePredicate ? and(baseWherePredicate, condition) : condition;
        }

        const finalFilteredWherePredicate: SQL<unknown> | undefined = baseWherePredicate;

        // Conditions for optional fields: these conditions are removed to ensure leads are not filtered out
        // based on the presence of optional data. The selection of fields for display/download is handled
        // in the selectFields object, and the cost is calculated based on the *presence* of data in the fetched leads.

        // if (includePhone) {
        //   const condition = sql`${leads.phone} IS NOT NULL AND TRIM(${leads.phone}) <> '';
        //   finalFilteredWherePredicate = finalFilteredWherePredicate ? and(finalFilteredWherePredicate, condition) : condition;
        // }

        // if (includeWebsite) {
        //   const condition = sql`${leads.website} IS NOT NULL AND TRIM(${leads.website}) <> '';
        //   finalFilteredWherePredicate = finalFilteredWherePredicate ? and(finalFilteredWherePredicate, condition) : condition;
        // }

        // if (includeEmail) {
        //   const condition = sql`${leads.email} IS NOT NULL AND TRIM(${leads.email}) <> '';
        //   finalFilteredWherePredicate = finalFilteredWherePredicate ? and(finalFilteredWherePredicate, condition) : condition;
        // }

        // if (includeCEO) {
        //   const ceoConcatenatedString = sql`TRIM(CONCAT_WS(' ', ${leads.salutation}, ${leads.title1}, ${leads.firstName}, ${leads.lastName}, ${leads.title2}, ${leads.managingDirector}))`;
        //   const condition = and(
        //     or(
        //       sql`${leads.managingDirector} IS NOT NULL AND TRIM(${leads.managingDirector}) <> ''`,
        //       sql`${leads.salutation} IS NOT NULL AND TRIM(${leads.salutation}) <> ''`,
        //       sql`${leads.title1} IS NOT NULL AND TRIM(${leads.title1}) <> ''`,
        //       sql`${leads.firstName} IS NOT NULL AND TRIM(${leads.firstName}) <> ''`,
        //       sql`${leads.lastName} IS NOT NULL AND TRIM(${leads.lastName}) <> ''`,
        //       sql`${leads.title2} IS NOT NULL AND TRIM(${leads.title2}) <> ''`
        //     ),
        //     sql`${ceoConcatenatedString} <> ''`
        //   );
        //   finalFilteredWherePredicate = finalFilteredWherePredicate ? and(finalFilteredWherePredicate, condition) : condition;
        // }

        const selectFields = {
          companyName: leads.companyName,
          address: leads.street,
          zipCode: leads.zipCode,
          city: leads.city,
          state: leads.state,
          legalForm: leads.legalForm,
          industry: leads.industry,
          subIndustry: leads.subIndustry,
          ...(includeEmail && { email: leads.email }),
          ...(includePhone && { phone: leads.phone }),
          ...(includeWebsite && { website: leads.website }),
          ...(includeCEO && {
            ceo: sql<string>`CASE\n                      WHEN ${leads.managingDirector} IS NOT NULL AND TRIM(${leads.managingDirector}) <> ''\n                      THEN ${leads.managingDirector}\n                      ELSE TRIM(CONCAT_WS(' ', ${leads.salutation}, ${leads.title1}, ${leads.firstName}, ${leads.lastName}, ${leads.title2}))\n                    END`,
            salutation: leads.salutation,
            title1: leads.title1,
            firstName: leads.firstName,
            lastName: leads.lastName,
            title2: leads.title2,
          }),
        };

        // Fetch leads
        const leadsData = await db
          .select(selectFields)
          .from(leads)
          .where(finalFilteredWherePredicate);

        // Generate CSV
        const csvHeader = Object.keys(selectFields);
        const csvData = leadsData.map((lead: Record<string, unknown>) => csvHeader.map(key => lead[key] || ''));
        const csvString = await new Promise<string>((resolve, reject) => {
          stringify(csvData, { header: true, columns: csvHeader, delimiter: ';' }, (err, output) => {
            if (err) return reject(err);
            resolve(output || '');
          });
        });

        // Generate Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Leads');
        worksheet.columns = csvHeader.map(key => ({ header: key, key: key, width: 20 }));
        worksheet.addRows(leadsData.map((lead: Record<string, unknown>) => csvHeader.map(key => lead[key] || '')));
        const excelBuffer = await workbook.xlsx.writeBuffer();

        // Upload to Supabase Storage
        const bucketName = 'customer-leads';
        const csvFileName = `leads-${newDownloadId}.csv`;
        const excelFileName = `leads-${newDownloadId}.xlsx`;

        const { error: csvUploadError } = await supabase.storage
          .from(bucketName)
          .upload(csvFileName, Buffer.from(csvString), {
            contentType: 'text/csv',
            upsert: true,
          });

        if (csvUploadError) {
          throw new Error(`Failed to upload CSV: ${csvUploadError.message}`);
        }

        const { error: excelUploadError } = await supabase.storage
          .from(bucketName)
          .upload(excelFileName, Buffer.from(excelBuffer), {
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            upsert: true,
          });

        if (excelUploadError) {
          throw new Error(`Failed to upload Excel: ${excelUploadError.message}`);
        }

        // Get signed URLs
        const { data: csvSignedUrlData, error: csvSignedUrlError } = await supabase.storage
          .from(bucketName)
          .createSignedUrl(csvFileName, 10800); // URL valid for 3 hours

        if (csvSignedUrlError) {
          throw new Error(`Failed to generate CSV signed URL: ${csvSignedUrlError.message}`);
        }

        const { data: excelSignedUrlData, error: excelSignedUrlError } = await supabase.storage
          .from(bucketName)
          .createSignedUrl(excelFileName, 10800); // URL valid for 3 hours

        if (excelSignedUrlError) {
          throw new Error(`Failed to generate Excel signed URL: ${excelSignedUrlError.message}`);
        }

        const csvDownloadLink = csvSignedUrlData?.signedUrl;
        const excelDownloadLink = excelSignedUrlData?.signedUrl;

        if (!csvDownloadLink || !excelDownloadLink) {
          throw new Error('Failed to get signed URLs for leads.');
        }

        // Update downloads table with generated URLs
        await db.update(downloads)
          .set({ csvUrl: csvDownloadLink, excelUrl: excelDownloadLink })
          .where(eq(downloads.id, newDownloadId));

        // Send confirmation email
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT || '587'),
          secure: process.env.EMAIL_SECURE === 'true',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_FROM,
          to: customerEmail,
          subject: `Ihre Leads sind bereit!`,
          html: `
            <!DOCTYPE html>
            <html lang="de">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Ihre Leads sind bereit! (Bestellung ${newDownloadId})</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                        margin: 0;
                        padding: 0;
                        background-color: oklch(0.97 0 0); /* --muted from globals.css for body background */
                        color: oklch(0.145 0 0); /* --foreground from globals.css for main text */
                    }
                    .container {
                        max-width: 600px;
                        margin: 40px auto;
                        background-color: oklch(1 0 0); /* --background from globals.css for container */
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                        border: 1px solid oklch(0.922 0 0); /* --border from globals.css */
                    }
                    .header {
                        background-color: oklch(1 0 0); /* White background */
                        padding: 30px 20px;
                        text-align: center;
                        border-bottom: 1px solid oklch(0.922 0 0); /* --border from globals.css */
                    }
                    .header img {
                        max-width: 180px;
                        height: auto;
                        display: block;
                        margin: 0 auto 15px auto;
                    }
                    .header h1 {
                        color: oklch(0.145 0 0); /* --foreground for header text */
                        font-size: 24px;
                        margin: 0;
                        padding: 0;
                        line-height: 1.2;
                    }
                    .content {
                        padding: 30px;
                        line-height: 1.6;
                        color: oklch(0.145 0 0); /* --foreground */
                        font-size: 16px;
                    }
                    .content p {
                        margin-bottom: 15px;
                    }
                    .button-container {
                        text-align: center;
                        margin: 25px 0;
                    }
                    .button {
                        background-color: #034737; /* --color-primary */
                        color: #ffffff; /* Explicit white for text */
                        padding: 12px 16px;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 14px;
                        display: inline-block;
                        border: 1px solid #023028; /* Slightly darker primary for border */
                        box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.1);
                        transition: all 0.2s ease-in-out; /* Transitions might not work in all email clients */
                    }
                    .button:hover {
                        background-color: #045C47; /* Hover color from .button-21 */
                        border-color: #045C47; /* Hover border color from .button-21 */
                    }
                    .contact-info {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid oklch(0.922 0 0); /* --border */
                        text-align: left;
                    }
                    .contact-info p {
                        margin-bottom: 5px;
                        font-size: 14px;
                    }
                    .contact-info a {
                        color: #30E87A; /* --color-accent */
                        text-decoration: none;
                    }
                    .contact-info a:hover {
                        text-decoration: underline;
                    }
                    .footer {
                        background-color: #034737; /* --color-primary */
                        padding: 20px;
                        text-align: center;
                        font-size: 13px;
                        color: #ffffff; /* White text for contrast */
                        border-top: 1px solid oklch(0.922 0 0); /* --border */
                    }
                    .footer a {
                        color: #ffffff; /* White for footer links */
                        text-decoration: none;
                        font-weight: 500;
                    }
                    .footer a:hover {
                        color: #30E87A; /* --color-accent on hover */
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://www.leadify.at/img/logo.png" alt="Leadify Logo" style="max-width: 180px; height: auto; display: block; margin: 0 auto 15px auto;">
                        <h1>Ihre Leads sind bereit zum Download!</h1>
                    </div>
                    <div class="content">
                        <p>Hallo ${session.customer_details?.name || customerEmail}!</p>
                        <p>Vielen Dank für Ihre Bestellung bei Leadify. Ihre Leads (im Excel- und CSV-Format) stehen Ihnen jetzt direkt zum Download zur Verfügung. Die Rechnung erhalten Sie in einer separaten E-Mail.</p>
                        <div class="button-container">
                            <a href="${csvDownloadLink}" class="button">CSV-Datei herunterladen</a>
                        </div>
                        <div class="button-container">
                            <a href="${excelDownloadLink}" class="button">Excel-Datei herunterladen</a>
                        </div>
                        <p style="font-size: 14px; color: oklch(0.556 0 0);">Diese Download-Links sind für 3 Stunden gültig.</p>
                        <p>Bei Fragen oder Problemen stehen wir Ihnen gerne zur Verfügung.</p>
                        
                        <div class="contact-info">
                            <p><strong>Adresse</strong><br/>Leadify<br/>Scheierlweg 14<br/>5303 Thalgau</p>
                            <p><strong>Telefon</strong><br/><a href="tel:+436604252271">+43 660 425 2271</a></p>
                            <p><strong>E-Mail</strong><br/><a href="mailto:support@leadify.at">support@leadify.at</a></p>
                        </div>
                        
                        <p>Mit freundlichen Grüßen,</p>
                        <p>Ihr Leadify Team</p>
                    </div>
                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} Leadify. Alle Rechte vorbehalten.</p>
                        <p><a href="https://www.leadify.at/impressum" style="color: #ffffff;">Impressum</a> | <a href="https://www.leadify.at/datenschutz" style="color: #ffffff;">Datenschutz</a> | <a href="https://www.leadify.at/agb" style="color: #ffffff;">AGB</a></p>
                    </div>
                </div>
            </body>
            </html>
          `,
        };

        await transporter.sendMail(mailOptions);

      } catch (error: unknown) {
        let errorMessage = "An unknown error occurred.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        // console.error('Error processing checkout.session.completed event:', error);
        return new NextResponse(`Webhook handler failed: ${errorMessage}`, { status: 500 });
      }
      break;
    default:
      // console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse('OK', { status: 200 });
} 