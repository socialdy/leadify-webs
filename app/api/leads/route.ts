import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { leads as leadsTable } from '@/src/db/schema';
import { eq, ilike, and, or, sql } from 'drizzle-orm';
import type { SQL } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const { searchCriteria, pagination } = await req.json();

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

    let baseWherePredicate: SQL<unknown> | undefined = undefined; // Initialize as undefined

    if (branch) {
      const condition = ilike(leadsTable.subIndustry, `%${branch}%`);
      baseWherePredicate = baseWherePredicate ? and(baseWherePredicate, condition) : condition;
    }
    if (state && state !== 'all') {
      const condition = eq(leadsTable.state, state);
      baseWherePredicate = baseWherePredicate ? and(baseWherePredicate, condition) : condition;
    }
    if (city) {
      const condition = ilike(leadsTable.city, `%${city}%`);
      baseWherePredicate = baseWherePredicate ? and(baseWherePredicate, condition) : condition;
    }
    if (zipCode) {
      const condition = eq(leadsTable.zipCode, zipCode);
      baseWherePredicate = baseWherePredicate ? and(baseWherePredicate, condition) : condition;
    }
    if (legalForm && legalForm !== 'Alle') {
      const condition = eq(leadsTable.legalForm, legalForm);
      baseWherePredicate = baseWherePredicate ? and(baseWherePredicate, condition) : condition;
    }

    const finalFilteredWherePredicate: SQL<unknown> | undefined = baseWherePredicate;

    // Conditions for optional fields: only filter if checkbox is true (i.e., IS NOT NULL AND NOT EMPTY)
    // These conditions are removed to ensure leads are not filtered out based on the presence of optional data.
    // The selection of fields for display/download is handled in the selectFields object.

    // if (includePhone) {
    //   const condition = sql`${leadsTable.phone} IS NOT NULL AND TRIM(${leadsTable.phone}) <> '';
    //   finalFilteredWherePredicate = finalFilteredWherePredicate ? and(finalFilteredWherePredicate, condition) : condition;
    // }

    // if (includeWebsite) {
    //   const condition = sql`${leadsTable.website} IS NOT NULL AND TRIM(${leadsTable.website}) <> '';
    //   finalFilteredWherePredicate = finalFilteredWherePredicate ? and(finalFilteredWherePredicate, condition) : condition;
    // }

    // if (includeEmail) {
    //   const condition = sql`${leadsTable.email} IS NOT NULL AND TRIM(${leadsTable.email}) <> '';
    //   finalFilteredWherePredicate = finalFilteredWherePredicate ? and(finalFilteredWherePredicate, condition) : condition;
    // }

    // if (includeCEO) {
    //   const ceoConcatenatedString = sql`TRIM(CONCAT_WS(' ', ${leadsTable.salutation}, ${leadsTable.title1}, ${leadsTable.firstName}, ${leadsTable.lastName}, ${leadsTable.title2}, ${leadsTable.managingDirector}))`;
    //   const condition = and(
    //     or(
    //       sql`${leadsTable.managingDirector} IS NOT NULL AND TRIM(${leadsTable.managingDirector}) <> ''`,
    //       sql`${leadsTable.salutation} IS NOT NULL AND TRIM(${leadsTable.salutation}) <> ''`,
    //       sql`${leadsTable.title1} IS NOT NULL AND TRIM(${leadsTable.title1}) <> ''`,
    //       sql`${leadsTable.firstName} IS NOT NULL AND TRIM(${leadsTable.firstName}) <> ''`,
    //       sql`${leadsTable.lastName} IS NOT NULL AND TRIM(${leadsTable.lastName}) <> ''`,
    //       sql`${leadsTable.title2} IS NOT NULL AND TRIM(${leadsTable.title2}) <> ''`
    //     ),
    //     sql`${ceoConcatenatedString} <> ''`
    //   );
    //   finalFilteredWherePredicate = finalFilteredWherePredicate ? and(finalFilteredWherePredicate, condition) : condition;
    // }

    // Always select these base fields
    const selectFields = {
      id: leadsTable.id,
      companyName: leadsTable.companyName,
      address: leadsTable.street, // Mapping street to address for the frontend
      zipCode: leadsTable.zipCode,
      city: leadsTable.city,
      state: leadsTable.state,
      legalForm: leadsTable.legalForm,
      industry: leadsTable.industry,
      subIndustry: leadsTable.subIndustry,
      createdAt: leadsTable.createdAt,
    };

    if (includeEmail) {
      Object.assign(selectFields, { email: leadsTable.email });
    }
    if (includePhone) {
      Object.assign(selectFields, { phone: leadsTable.phone });
    }
    if (includeWebsite) {
      Object.assign(selectFields, { website: leadsTable.website });
    }
    if (includeCEO) {
      Object.assign(selectFields, {
        ceo: sql<string>`CASE 
                WHEN ${leadsTable.managingDirector} IS NOT NULL AND TRIM(${leadsTable.managingDirector}) <> '' 
                THEN ${leadsTable.managingDirector}
                ELSE TRIM(CONCAT_WS(' ', ${leadsTable.salutation}, ${leadsTable.title1}, ${leadsTable.firstName}, ${leadsTable.lastName}, ${leadsTable.title2}))
              END`,
        salutation: leadsTable.salutation,
        title1: leadsTable.title1,
        firstName: leadsTable.firstName,
        lastName: leadsTable.lastName,
        title2: leadsTable.title2,
      });
    }

    const limit = pagination?.limit || 20; // Default limit if not provided
    const offset = pagination?.offset || 0; // Default offset if not provided

    // First, get the total count of leads matching the FINAL filtered criteria
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(leadsTable)
      .where(finalFilteredWherePredicate);

    const totalCount = countResult[0]?.count || 0;

    // Get counts for optional fields across the current filtered dataset
    const leadsWithPhoneCount = await db.select({ count: sql<number>`count(*)` }).from(leadsTable).where(finalFilteredWherePredicate ? and(finalFilteredWherePredicate, sql`${leadsTable.phone} IS NOT NULL AND TRIM(${leadsTable.phone}) <> ''`) : sql`${leadsTable.phone} IS NOT NULL AND TRIM(${leadsTable.phone}) <> ''`);
    const leadsWithEmailCount = await db.select({ count: sql<number>`count(*)` }).from(leadsTable).where(finalFilteredWherePredicate ? and(finalFilteredWherePredicate, sql`${leadsTable.email} IS NOT NULL AND TRIM(${leadsTable.email}) <> ''`) : sql`${leadsTable.email} IS NOT NULL AND TRIM(${leadsTable.email}) <> ''`);
    const leadsWithWebsiteCount = await db.select({ count: sql<number>`count(*)` }).from(leadsTable).where(finalFilteredWherePredicate ? and(finalFilteredWherePredicate, sql`${leadsTable.website} IS NOT NULL AND TRIM(${leadsTable.website}) <> ''`) : sql`${leadsTable.website} IS NOT NULL AND TRIM(${leadsTable.website}) <> ''`);
    const leadsWithCEOCount = await db.select({ count: sql<number>`count(*)` }).from(leadsTable).where(finalFilteredWherePredicate ? and(finalFilteredWherePredicate, and(
      or(
        sql`${leadsTable.managingDirector} IS NOT NULL AND TRIM(${leadsTable.managingDirector}) <> ''`,
        sql`${leadsTable.salutation} IS NOT NULL AND TRIM(${leadsTable.salutation}) <> ''`,
        sql`${leadsTable.title1} IS NOT NULL AND TRIM(${leadsTable.title1}) <> ''`,
        sql`${leadsTable.firstName} IS NOT NULL AND TRIM(${leadsTable.firstName}) <> ''`,
        sql`${leadsTable.lastName} IS NOT NULL AND TRIM(${leadsTable.lastName}) <> ''`,
        sql`${leadsTable.title2} IS NOT NULL AND TRIM(${leadsTable.title2}) <> ''`
      ),
      sql`TRIM(CONCAT_WS(' ', ${leadsTable.salutation}, ${leadsTable.title1}, ${leadsTable.firstName}, ${leadsTable.lastName}, ${leadsTable.title2}, ${leadsTable.managingDirector})) <> ''` // Same robust check for count
    )) : and(
      or(
        sql`${leadsTable.managingDirector} IS NOT NULL AND TRIM(${leadsTable.managingDirector}) <> ''`,
        sql`${leadsTable.salutation} IS NOT NULL AND TRIM(${leadsTable.salutation}) <> ''`,
        sql`${leadsTable.title1} IS NOT NULL AND TRIM(${leadsTable.title1}) <> ''`,
        sql`${leadsTable.firstName} IS NOT NULL AND TRIM(${leadsTable.firstName}) <> ''`,
        sql`${leadsTable.lastName} IS NOT NULL AND TRIM(${leadsTable.lastName}) <> ''`,
        sql`${leadsTable.title2} IS NOT NULL AND TRIM(${leadsTable.title2}) <> ''`
      ),
      sql`TRIM(CONCAT_WS(' ', ${leadsTable.salutation}, ${leadsTable.title1}, ${leadsTable.firstName}, ${leadsTable.lastName}, ${leadsTable.title2}, ${leadsTable.managingDirector})) <> ''` // Same robust check for count
    ));

    // Then, fetch the leads for the current page with limit and offset (using filtered conditions)
    const filteredLeads = await db
      .select(selectFields)
      .from(leadsTable)
      .where(finalFilteredWherePredicate)
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      leads: filteredLeads,
      totalCount,
      counts: {
        phone: leadsWithPhoneCount[0]?.count || 0,
        email: leadsWithEmailCount[0]?.count || 0,
        website: leadsWithWebsiteCount[0]?.count || 0,
        ceo: leadsWithCEOCount[0]?.count || 0,
      }
    });
  } catch (error) {
    console.error('Error in lead search API:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const subIndustries = await db.selectDistinct({ subIndustry: leadsTable.subIndustry }).from(leadsTable);
    const uniqueSubIndustries = subIndustries.map(item => item.subIndustry).filter(Boolean) as string[];
    return NextResponse.json({ subIndustries: uniqueSubIndustries });
  } catch {
    // console.error('Error fetching unique sub-industries:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
} 