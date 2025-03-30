import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const toggleFavorites = mutation({
  args: {
    id: v.number(),
    title: v.string(),
    poster_path: v.string(),
  },

  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("User not authenticated");
    }

    // Check if the fav already exists for the user
    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user_id", (q) => q.eq("userId", userId).eq("id", args.id))
      .first();

    if (existing) {
      // delete the isFavourited value
      await ctx.db.delete(existing._id);
      return "Removed from favorites";
    } else {
      // Insert a new movie if it doesn't exist
      await ctx.db.insert("favorites", {
        userId,
        id: args.id,
        title: args.title,
        poster_path: args.poster_path,
      });

      return "Added to favorites";
    }
  },
});

export const toggleBookmarks = mutation({
  args: {
    id: v.number(),
    title: v.string(),
    poster_path: v.string(),
  },

  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("User not authenticated");
    }

    const existing = await ctx.db
      .query("bookmarks")
      .withIndex("by_user_id", (q) => q.eq("userId", userId).eq("id", args.id))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return "Removed from bookmark";
    } else {
      await ctx.db.insert("bookmarks", {
        userId,
        id: args.id,
        title: args.title,
        poster_path: args.poster_path,
      });

      return "Added to bookmark";
    }
  },
});

export const getFavorites = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("User not authenticated");
    }

    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);

    return favorites.reverse();
  },
});

export const getBookmarks = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("User not authenticated");
    }

    const bookmarks = await ctx.db
      .query("bookmarks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);

    return bookmarks.reverse();
  },
});

export const removeFromBookmarks = mutation({
  args: {
    id: v.number(),
  },

  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("User not authenticated");
    }

    const existing = await ctx.db
      .query("bookmarks")
      .withIndex("by_user_id", (q) => q.eq("userId", userId).eq("id", args.id))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return "Removed from bookmark";
    }
  },
});

export const removeFromFav = mutation({
  args: {
    id: v.number(),
  },

  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("User not authenticated");
    }

    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user_id", (q) => q.eq("userId", userId).eq("id", args.id))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return "Removed from bookmark";
    }
  },
});
