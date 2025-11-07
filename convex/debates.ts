import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Debates Functions
 * Handles debate creation, reactions, and retrieval
 */

// Get all debates
export const getDebates = query({
  args: {
    limit: v.optional(v.number()),
    topic: v.optional(v.string()),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    
    let debates;
    if (args.topic) {
      debates = await ctx.db
        .query("debates")
        .withIndex("by_topic", (q) => q.eq("topic", args.topic))
        .order("desc")
        .take(limit);
    } else if (args.projectId) {
      debates = await ctx.db
        .query("debates")
        .withIndex("by_project", (q) => q.eq("linkedProjectId", args.projectId))
        .order("desc")
        .take(limit);
    } else {
      debates = await ctx.db
        .query("debates")
        .withIndex("by_created")
        .order("desc")
        .take(limit);
    }

    // Filter out archived debates
    const activeDebates = debates.filter(d => !d.isArchived);

    // Enrich with post and user data
    const enrichedDebates = await Promise.all(
      activeDebates.map(async (debate) => {
        const post = await ctx.db.get(debate.postId);
        const user = await ctx.db.get(debate.userId);
        return {
          ...debate,
          post,
          user: user ? {
            id: user._id,
            name: user.name,
            profilePhoto: user.profilePhoto,
          } : null,
        };
      })
    );

    return enrichedDebates;
  },
});

// Create a new debate
export const createDebate = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    topic: v.string(),
    linkedProjectId: v.optional(v.id("projects")),
    linkedPolicyId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // First create the post
    const now = Date.now();
    const postId = await ctx.db.insert("posts", {
      userId: args.userId,
      type: "debate",
      title: args.title,
      content: args.description,
      tags: [args.topic],
      linkedProjectId: args.linkedProjectId,
      createdAt: now,
      updatedAt: now,
      likes: 0,
      comments: 0,
      shares: 0,
      isVerified: false,
      verificationStatus: "pending",
    });

    // Then create the debate
    const debateId = await ctx.db.insert("debates", {
      postId,
      userId: args.userId,
      title: args.title,
      description: args.description,
      topic: args.topic,
      agreeCount: 0,
      disagreeCount: 0,
      neutralCount: 0,
      commentCount: 0,
      linkedProjectId: args.linkedProjectId,
      linkedPolicyId: args.linkedPolicyId,
      isArchived: false,
      createdAt: now,
      updatedAt: now,
    });

    return { debateId, postId };
  },
});

// React to a debate (agree/disagree/neutral)
export const reactToDebate = mutation({
  args: {
    debateId: v.id("debates"),
    userId: v.id("users"),
    reaction: v.union(v.literal("agree"), v.literal("disagree"), v.literal("neutral")),
  },
  handler: async (ctx, args) => {
    // Check if user already reacted
    const existingReaction = await ctx.db
      .query("debateReactions")
      .withIndex("by_debate_user", (q) => 
        q.eq("debateId", args.debateId).eq("userId", args.userId)
      )
      .first();

    const debate = await ctx.db.get(args.debateId);
    if (!debate) {
      throw new Error("Debate not found");
    }

    if (existingReaction) {
      // Update existing reaction
      if (existingReaction.reaction !== args.reaction) {
        // Remove old reaction count
        if (existingReaction.reaction === "agree") {
          await ctx.db.patch(args.debateId, { agreeCount: debate.agreeCount - 1 });
        } else if (existingReaction.reaction === "disagree") {
          await ctx.db.patch(args.debateId, { disagreeCount: debate.disagreeCount - 1 });
        } else {
          await ctx.db.patch(args.debateId, { neutralCount: debate.neutralCount - 1 });
        }

        // Add new reaction count
        if (args.reaction === "agree") {
          await ctx.db.patch(args.debateId, { agreeCount: debate.agreeCount + 1 });
        } else if (args.reaction === "disagree") {
          await ctx.db.patch(args.debateId, { disagreeCount: debate.disagreeCount + 1 });
        } else {
          await ctx.db.patch(args.debateId, { neutralCount: debate.neutralCount + 1 });
        }

        // Update reaction record
        await ctx.db.patch(existingReaction._id, {
          reaction: args.reaction,
        });
      }
    } else {
      // Create new reaction
      await ctx.db.insert("debateReactions", {
        debateId: args.debateId,
        userId: args.userId,
        reaction: args.reaction,
        createdAt: Date.now(),
      });

      // Update debate counts
      if (args.reaction === "agree") {
        await ctx.db.patch(args.debateId, { agreeCount: debate.agreeCount + 1 });
      } else if (args.reaction === "disagree") {
        await ctx.db.patch(args.debateId, { disagreeCount: debate.disagreeCount + 1 });
      } else {
        await ctx.db.patch(args.debateId, { neutralCount: debate.neutralCount + 1 });
      }
    }

    return { success: true };
  },
});

