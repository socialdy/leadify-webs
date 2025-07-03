This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

# Leadify Webshop Database Schema

This document outlines the database schema for the Leadify webshop, managed via Supabase.

## Tables

### `users`
Stores user information, including details collected during Stripe checkout.

| Column Name    | Type          | Constraints / Notes                               |
|----------------|---------------|---------------------------------------------------|
| `id`           | `SERIAL`      | Primary Key                                       |
| `name`         | `VARCHAR(256)`| Not Null                                          |
| `email`        | `TEXT`        | Not Null, Unique                                  |
| `phone`        | `TEXT`        |                                                   |
| `street`       | `VARCHAR(256)`| Address information from checkout                 |
| `zip_code`     | `VARCHAR(20)` | Address information from checkout                 |
| `city`         | `VARCHAR(256)`| Address information from checkout                 |
| `company_name` | `VARCHAR(256)`| Company name from checkout                        |

### `leads`
Stores details about individual leads available for purchase.

| Column Name        | Type          | Constraints / Notes                     |
|--------------------|---------------|-----------------------------------------|
| `id`               | `SERIAL`      | Primary Key                             |
| `company_name`     | `VARCHAR(256)`|                                         |
| `industry`         | `VARCHAR(256)`|                                         |
| `sub_industry`     | `VARCHAR(256)`|                                         |
| `state`            | `VARCHAR(256)`|                                         |
| `street`           | `VARCHAR(256)`|                                         |
| `zip_code`         | `VARCHAR(20)` |                                         |
| `city`             | `VARCHAR(256)`|                                         |
| `legal_form`       | `VARCHAR(256)`|                                         |
| `email`            | `TEXT`        |                                         |
| `phone`            | `TEXT`        |                                         |
| `website`          | `TEXT`        |                                         |
| `managing_director`| `VARCHAR(256)`|                                         |
| `salutation`       | `VARCHAR(256)`|                                         |
| `title1`           | `VARCHAR(256)`|                                         |
| `first_name`       | `VARCHAR(256)`|                                         |
| `last_name`        | `VARCHAR(256)`|                                         |
| `title2`           | `VARCHAR(256)`|                                         |
| `created_at`       | `TIMESTAMP`   | Not Null, Default: `NOW()`              |

### `orders`
Records information about purchases made via Stripe.

| Column Name         | Type            | Constraints / Notes                          |
|---------------------|-----------------|----------------------------------------------|
| `id`                | `SERIAL`        | Primary Key                                  |
| `user_id`           | `INT`           | Not Null, Foreign Key to `users(id)`         |
| `stripe_payment_id` | `TEXT`          | Not Null, Unique Stripe Transaction ID       |
| `amount`            | `DECIMAL(10, 2)`| Not Null, Total amount of the order          |
| `currency`          | `VARCHAR(3)`    | Not Null, e.g., 'EUR', 'USD'                 |
| `status`            | `VARCHAR(50)`   | Not Null, e.g., 'completed', 'pending', 'failed' |
| `created_at`        | `TIMESTAMP`     | Not Null, Default: `NOW()`                   |

### `user_leads_purchases`
Links users to the lead files they have purchased.

| Column Name    | Type        | Constraints / Notes                          |
|----------------|-------------|----------------------------------------------|
| `id`           | `SERIAL`    | Primary Key                                  |
| `user_id`      | `INT`       | Not Null, Foreign Key to `users(id)`         |
| `order_id`     | `INT`       | Not Null, Foreign Key to `orders(id)`        |
| `file_url`     | `TEXT`      | Not Null, URL to the generated lead file (e.g., CSV in Supabase Storage) |
| `purchased_at` | `TIMESTAMP` | Not Null, Default: `NOW()`                   |

## Potential Improvements and Missing Pieces

1.  **Lead-zu-Kauf-Zuordnung:** Die `user_leads_purchases`-Tabelle verknüpft einen Kauf mit einer generierten Datei. Um detailliert nachvollziehen zu können, *welche spezifischen Leads* (aus der `leads`-Tabelle) in dieser Datei enthalten waren, könntest du eine zusätzliche Verknüpfungstabelle `purchase_contains_leads` in Betracht ziehen. Diese würde `user_leads_purchases.id` mit `leads.id` verknüpfen.

    Beispiel:
    ```sql
    CREATE TABLE purchase_contains_leads (
        purchase_id INT NOT NULL REFERENCES user_leads_purchases(id),
        lead_id INT NOT NULL REFERENCES leads(id),
        PRIMARY KEY (purchase_id, lead_id)
    );
    ```

2.  **Produkte/Lead-Pakete:** Wenn du verschiedene Pakete von Leads (z.B. nach Anzahl, Branche, Region) anbietest, wäre eine `products`-Tabelle sinnvoll. Die `orders`-Tabelle könnte dann auf diese `products`-Tabelle verweisen.

    Beispiel:
    ```sql
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(256) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        lead_count INT, -- e.g., how many leads are in this package
        -- Add other relevant product details (e.g., industry filter, region filter)
    );

    -- Then modify orders table to reference products:
    -- ALTER TABLE orders ADD COLUMN product_id INT REFERENCES products(id);
    ```

3.  **Lead-Status:** Möchtest du den Bearbeitungsstatus eines Leads verfolgen (z.B. 'neu', 'kontaktiert', 'qualifiziert', 'abgeschlossen')? Ein `status`-Feld in der `leads`-Tabelle könnte dies abbilden.

4.  **Benutzerrollen:** Falls es unterschiedliche Benutzerrechte gibt (z.B. Admin, normaler Kunde), könnte eine `role`-Spalte in der `users`-Tabelle oder eine separate `roles`-Tabelle mit einer `user_roles`-Verknüpfungstabelle implementiert werden.

5.  **`updated_at` Timestamps:** Für bessere Nachvollziehbarkeit von Datenänderungen könnten `updated_at` Felder in wichtigen Tabellen (`users`, `leads`, `orders`) hinzugefügt werden, die bei jeder Änderung aktualisiert werden.

    Beispiel:
    ```sql
    ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
    -- You'd typically use a trigger to update this column on each row update.
    ```

## Next Steps

*   **Review `user_leads_purchases` logic:** Überlege genau, wie du die gekauften Leads mit den Einträgen in der `leads`-Tabelle verknüpfen möchtest. Die `purchase_contains_leads`-Tabelle wäre der übliche Weg für eine many-to-many Beziehung.
*   **Implement fehlende Tabellen/Spalten:** Führe `mcp_supabase_apply_migration` mit den SQL-Anweisungen für die zusätzlichen Tabellen oder Spalten aus, die du hinzufügen möchtest.
*   **Security (RLS):** Denke daran, [Row Level Security (RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security) in Supabase zu konfigurieren, um sicherzustellen, dass Benutzer nur auf die Daten zugreifen können, für die sie berechtigt sind (z.B. ein Benutzer kann nur seine eigenen Bestellungen und gekauften Leads sehen).
