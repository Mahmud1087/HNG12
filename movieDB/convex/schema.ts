import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  numbers: defineTable({
    value: v.number(),
  }),
  movies: defineTable({
    tmdbId: v.number(),
    title: v.string(),
    posterPath: v.string(),
    overview: v.string(),
    releaseDate: v.string(),
    isFavourite: v.boolean(),
    isBookMarked: v.boolean(),
  }).index("by_tmdbId", ["tmdbId"]),
});
