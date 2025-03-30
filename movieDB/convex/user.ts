import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserDetails = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("User not authenticated");
    }

    const user = await ctx.db.query("users").withIndex("email").first();

    return user;
  },
});

export const updateUserDetails = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("User not authenticated");
    }

    await ctx.db.patch(userId, {
      name: args.name,
      email: args.email,
    });

    return "Profile updated successfully";
  },
});
