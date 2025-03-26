ALTER TABLE "links" DROP CONSTRAINT "links_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "user_id" SET DATA TYPE text;