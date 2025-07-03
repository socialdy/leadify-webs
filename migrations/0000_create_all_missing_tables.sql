CREATE TABLE IF NOT EXISTS "downloads" (
	"id" text PRIMARY KEY NOT NULL,
	"checkout_session_id" text NOT NULL,
	"customer_email" text NOT NULL,
	"search_criteria" text NOT NULL,
	"csv_url" text,
	"excel_url" text,
	"saved_search_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "downloads_checkout_session_id_unique" UNIQUE("checkout_session_id")
);

CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"download_id" text,
	"amount" integer NOT NULL,
	"currency" varchar(3) NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "saved_searches" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(256),
	"search_criteria" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "downloads" ADD CONSTRAINT "downloads_saved_search_id_saved_searches_id_fk" FOREIGN KEY ("saved_search_id") REFERENCES "public"."saved_searches"("id") ON DELETE no action ON UPDATE no action;

ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;

ALTER TABLE "orders" ADD CONSTRAINT "orders_download_id_downloads_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."downloads"("id") ON DELETE no action ON UPDATE no action;

ALTER TABLE "saved_searches" ADD CONSTRAINT "saved_searches_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action; 