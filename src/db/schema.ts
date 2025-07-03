import { pgTable, serial, text, varchar, timestamp, integer, numeric } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: text("email").notNull().unique(),
  companyName: varchar("company_name", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  street: varchar("street", { length: 256 }),
  city: varchar("city", { length: 256 }),
  zipCode: varchar("zip_code", { length: 20 }),
  country: varchar("country", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 256 }),
  industry: varchar("industry", { length: 256 }),
  subIndustry: varchar("sub_industry", { length: 256 }),
  state: varchar("state", { length: 256 }),
  street: varchar("street", { length: 256 }),
  zipCode: varchar("zip_code", { length: 20 }),
  city: varchar("city", { length: 256 }),
  legalForm: varchar("legal_form", { length: 256 }),
  email: text("email"),
  phone: text("phone"),
  website: text("website"),
  managingDirector: varchar("managing_director", { length: 256 }),
  salutation: varchar("salutation", { length: 256 }),
  title1: varchar("title1", { length: 256 }),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  title2: varchar("title2", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const downloads = pgTable('downloads', {
  id: text('id').primaryKey().notNull(),
  checkoutSessionId: text('checkout_session_id').notNull().unique(),
  customerEmail: text('customer_email').notNull(),
  searchCriteria: text('search_criteria').notNull(), // Store the JSON string of search criteria
  csvUrl: text('csv_url'),
  excelUrl: text('excel_url'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  downloadId: text("download_id").references(() => downloads.id),
  amount: numeric("amount").notNull(),
  currency: varchar("currency", { length: 3 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// export const savedSearches = pgTable("saved_searches", {
//   id: serial("id").primaryKey(),
//   userId: integer("user_id").notNull().references(() => users.id),
//   name: varchar("name", { length: 256 }),
//   searchCriteria: text("search_criteria").notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// });