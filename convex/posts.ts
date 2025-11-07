import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Posts Functions
 * Handles creating, reading, and managing posts (debates, polls, petitions, media)
 */

// Get all posts (for home feed)
export const getPosts = query({
  args: {
    limit: v.optional(v.number()),
    type: v.optional(v.union(v.literal("debate"), v.literal("poll"), v.literal("petition"), v.literal("media"), v.literal("update"))),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    
    let posts;
    if (args.type) {
      posts = await ctx.db
        .query("posts")
        .withIndex("by_type", (q) => q.eq("type", args.type))
        .order("desc")
        .take(limit);
    } else {
      posts = await ctx.db
        .query("posts")
        .withIndex("by_created")
        .order("desc")
        .take(limit);
    }

    // Enrich with user data
    const enrichedPosts = await Promise.all(
      posts.map(async (post) => {
        const user = await ctx.db.get(post.userId);
        return {
          ...post,
          user: user ? {
            id: user._id,
            name: user.name,
            profilePhoto: user.profilePhoto,
            badges: user.badges,
          } : null,
        };
      })
    );

    return enrichedPosts;
  },
});

// Create a new post
export const createPost = mutation({
  args: {
    userId: v.id("users"),
    type: v.union(v.literal("debate"), v.literal("poll"), v.literal("petition"), v.literal("media"), v.literal("update")),
    title: v.string(),
    content: v.string(),
    mediaUrls: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    linkedProjectId: v.optional(v.id("projects")),
    linkedLeaderId: v.optional(v.id("leaders")),
    linkedDepartmentId: v.optional(v.id("departments")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    const postId = await ctx.db.insert("posts", {
      userId: args.userId,
      type: args.type,
      title: args.title,
      content: args.content,
      mediaUrls: args.mediaUrls ?? [],
      tags: args.tags ?? [],
      linkedProjectId: args.linkedProjectId,
      linkedLeaderId: args.linkedLeaderId,
      linkedDepartmentId: args.linkedDepartmentId,
      createdAt: now,
      updatedAt: now,
      likes: 0,
      comments: 0,
      shares: 0,
      isVerified: false,
      verificationStatus: "pending",
    });

    return { postId };
  },
});

// Get post by ID
export const getPost = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const user = await ctx.db.get(post.userId);
    return {
      ...post,
      user: user ? {
        id: user._id,
        name: user.name,
        profilePhoto: user.profilePhoto,
        badges: user.badges,
      } : null,
    };
  },
});

// Like a post
export const likePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }

    await ctx.db.patch(args.postId, {
      likes: post.likes + 1,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

