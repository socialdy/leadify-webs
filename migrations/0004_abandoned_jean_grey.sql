ALTER TABLE "downloads" DROP CONSTRAINT "downloads_saved_search_id_saved_searches_id_fk";
--> statement-breakpoint
ALTER TABLE "downloads" DROP COLUMN "saved_search_id";