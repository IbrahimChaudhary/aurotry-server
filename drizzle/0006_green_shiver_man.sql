ALTER TABLE "links" ADD CONSTRAINT "links_ar_link_unique" UNIQUE("ar_link");--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_ar_link_name_unique" UNIQUE("ar_link_name");--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_ar_link_sku_unique" UNIQUE("ar_link_sku");