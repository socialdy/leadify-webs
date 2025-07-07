import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Validate incoming data
    if (!name || !email || !subject || !message) {
      return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    // Create a Nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO_CONTACT_FORM, // Use a specific email for contact form submissions
      subject: `Kontaktformular Anfrage: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefonnummer:</strong> ${phone || 'Nicht angegeben'}</p>
        <p><strong>Betreff:</strong> ${subject}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new NextResponse(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error: (error as Error).message }), { status: 500 });
  }
} 