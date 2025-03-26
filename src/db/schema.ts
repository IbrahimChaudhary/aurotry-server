import { pgTable, serial, text, timestamp, integer, varchar, foreignKey } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  planId: integer('plan_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const links = pgTable('links', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  arLink: text('ar_link').notNull(),
  arLinkName: text('ar_link_name'),
  arLinkSku: text('ar_link_sku'),
  arLinkStatus: text('ar_link_status'),
  arLinkGenDate: timestamp('ar_link_gen_date'),
  arLinkExpDate: timestamp('ar_link_exp_date'),
  arLinkFile: text('ar_link_file'),
  arLinkFileSize: integer('ar_link_file_size'),
  arLinkCount: integer('ar_link_count'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});