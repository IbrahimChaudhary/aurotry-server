// src/types/schema-types.ts
import { users, links } from '../db/schema';

// Use the preferred approach instead of deprecated InferModel
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;