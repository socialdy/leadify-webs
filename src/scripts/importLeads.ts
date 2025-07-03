import 'dotenv/config';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { parse } from 'csv-parse';
import { db } from '../db';
import { leads } from '../db/schema';

interface LeadCsvRow {
  'Firmenname': string;
  'Branche': string;
  'Subbranche': string;
  'Bundesland': string;
  'Straße': string;
  'PLZ': string;
  'Ort': string;
  'Rechtsform': string;
  'E-Mail': string;
  'Telefon': string;
  'Website': string;
  'Geschäftsführer': string;
  'Anrede': string;
  'Titel 1': string;
  'Vorname': string;
  'Nachname': string;
  'Titel 2': string;
}

const CSV_FILE_PATH = path.resolve(__dirname, './leads_v1.csv'); // CSV-Datei im src/scripts Ordner

async function importLeads() {
  console.log('Starting lead import...');
  const leadsToInsert: typeof leads.$inferInsert[] = [];

  fs.createReadStream(CSV_FILE_PATH)
    .pipe(parse({
      delimiter: [',', ';'], // Versucht Komma und Semikolon als Trenner
      columns: true, // Erste Zeile als Spaltenüberschriften
      skip_empty_lines: true,
      trim: true,
    }))
    .on('data', (row: LeadCsvRow) => {
      // Mapping der CSV-Spalten zum Drizzle-Schema
      const leadData: typeof leads.$inferInsert = {
        companyName: row['Firmenname'] || null,
        industry: row['Branche'] || null,
        subIndustry: row['Subbranche'] || null,
        state: row['Bundesland'] || null,
        street: row['Straße'] || null,
        zipCode: row['PLZ'] || null,
        city: row['Ort'] || null,
        legalForm: row['Rechtsform'] || null,
        email: row['E-Mail'] || null,
        phone: row['Telefon'] || null,
        website: row['Website'] || null,
        managingDirector: row['Geschäftsführer'] || null,
        salutation: row['Anrede'] || null,
        title1: row['Titel 1'] || null,
        firstName: row['Vorname'] || null,
        lastName: row['Nachname'] || null,
        title2: row['Titel 2'] || null,
        // createdAt wird automatisch von der Datenbank gesetzt (defaultNow() im Schema)
      };
      leadsToInsert.push(leadData);
    })
    .on('end', async () => {
      console.log(`Finished parsing CSV. Found ${leadsToInsert.length} leads.`);
      if (leadsToInsert.length === 0) {
        console.log('No leads to insert. Exiting.');
        return;
      }

      try {
        // Bulk-Insert mit Drizzle
        await db.insert(leads).values(leadsToInsert);
        console.log('All leads imported successfully!');
      } catch (error) {
        console.error('Error importing leads:', error);
        // Hier könntest du spezifischere Fehlerbehandlung hinzufügen, z.B. bei doppelten E-Mails (unique constraint)
      }
    })
    .on('error', (err: Error) => {
      console.error('Error reading CSV:', err);
    });
}

importLeads(); 