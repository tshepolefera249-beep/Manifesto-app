import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Polls Functions
 * Handles poll creation, voting, and results
 */

// Get all polls
export const getPolls = query({
  args: {
    limit: v.optional(v.number()),
    projectId: v.optional(v.id("projects")),
    activeOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    
    let polls;
    if (args.projectId) {
      polls = await ctx.db
        .query("polls")
        .withIndex("by_project", (q) => q.eq("linkedProjectId", args.projectId))
        .order("desc")
        .take(limit);
    } else {
      polls = await ctx.db
        .query("polls")
        .withIndex("by_created")
        .order("desc")
        .take(limit);
    }

    // Filter active polls if requested
    if (args.activeOnly) {
      polls = polls.filter(p => p.isActive && (!p.endDate || p.endDate > Date.now()));
    }

    // Enrich with post and user data
    const enrichedPolls = await Promise.all(
      polls.map(async (poll) => {
        const post = await ctx.db.get(poll.postId);
        const user = await ctx.db.get(poll.userId);
        return {
          ...poll,
          post,
          user: user ? {
            id: user._id,
            name: user.name,
            profilePhoto: user.profilePhoto,
          } : null,
        };
      })
    );

    return enrichedPolls;
  },
});

// Create a new poll
export const createPoll = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    options: v.array(v.string()), // Array of option texts
    isMultipleChoice: v.boolean(),
    endDate: v.optional(v.number()),
    linkedProjectId: v.optional(v.id("projects")),
    linkedLeaderId: v.optional(v.id("leaders")),
  },
  handler: async (ctx, args) => {
    // First create the post
    const now = Date.now();
    const postId = await ctx.db.insert("posts", {
      userId: args.userId,
      type: "poll",
      title: args.title,
      content: args.description,
      linkedProjectId: args.linkedProjectId,
      linkedLeaderId: args.linkedLeaderId,
      createdAt: now,
      updatedAt: now,
      likes: 0,
      comments: 0,
      shares: 0,
      isVerified: false,
      verificationStatus: "pending",
    });

    // Create poll options with IDs
    const pollOptions = args.options.map((text, index) => ({
      id: `option-${index}`,
      text,
      voteCount: 0,
    }));

    // Then create the poll
    const pollId = await ctx.db.insert("polls", {
      postId,
      userId: args.userId,
      title: args.title,
      description: args.description,
      options: pollOptions,
      totalVotes: 0,
      isMultipleChoice: args.isMultipleChoice,
      endDate: args.endDate,
      linkedProjectId: args.linkedProjectId,
      linkedLeaderId: args.linkedLeaderId,
      createdAt: now,
      isActive: true,
    });

    return { pollId, postId };
  },
});

// Vote on a poll
export const voteOnPoll = mutation({
  args: {
    pollId: v.id("polls"),
    userId: v.id("users"),
    optionIds: v.array(v.string()), // Can be single or multiple
  },
  handler: async (ctx, args) => {
    // Check if user already voted
    const existingVote = await ctx.db
      .query("pollVotes")
      .withIndex("by_poll_user", (q) => 
        q.eq("pollId", args.pollId).eq("userId", args.userId)
      )
      .first();

    if (existingVote) {
      throw new Error("User has already voted on this poll");
    }

    const poll = await ctx.db.get(args.pollId);
    if (!poll) {
      throw new Error("Poll not found");
    }

    if (!poll.isActive) {
      throw new Error("Poll is no longer active");
    }

    // Validate option IDs
    const validOptionIds = poll.options.map(opt => opt.id);
    const invalidOptions = args.optionIds.filter(id => !validOptionIds.includes(id));
    if (invalidOptions.length > 0) {
      throw new Error(`Invalid option IDs: ${invalidOptions.join(", ")}`);
    }

    // Update option vote counts
    const updatedOptions = poll.options.map(option => {
      if (args.optionIds.includes(option.id)) {
        return { ...option, voteCount: option.voteCount + 1 };
      }
      return option;
    });

    // Save vote
    await ctx.db.insert("pollVotes", {
      pollId: args.pollId,
      userId: args.userId,
      optionIds: args.optionIds,
      createdAt: Date.now(),
    });

    // Update poll
    await ctx.db.patch(args.pollId, {
      options: updatedOptions,
      totalVotes: poll.totalVotes + 1,
    });

    return { success: true };
  },
});

