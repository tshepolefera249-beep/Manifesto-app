import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Petitions Functions
 * Handles petition creation, signing, and tracking
 */

// Get all petitions
export const getPetitions = query({
  args: {
    limit: v.optional(v.number()),
    status: v.optional(v.union(v.literal("active"), v.literal("completed"), v.literal("expired"), v.literal("successful"))),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    
    let petitions;
    if (args.status) {
      petitions = await ctx.db
        .query("petitions")
        .withIndex("by_status", (q) => q.eq("status", args.status))
        .order("desc")
        .take(limit);
    } else if (args.projectId) {
      petitions = await ctx.db
        .query("petitions")
        .withIndex("by_project", (q) => q.eq("linkedProjectId", args.projectId))
        .order("desc")
        .take(limit);
    } else {
      petitions = await ctx.db
        .query("petitions")
        .withIndex("by_created")
        .order("desc")
        .take(limit);
    }

    // Enrich with post and user data
    const enrichedPetitions = await Promise.all(
      petitions.map(async (petition) => {
        const post = await ctx.db.get(petition.postId);
        const user = await ctx.db.get(petition.userId);
        return {
          ...petition,
          post,
          user: user ? {
            id: user._id,
            name: user.name,
            profilePhoto: user.profilePhoto,
          } : null,
        };
      })
    );

    return enrichedPetitions;
  },
});

// Create a new petition
export const createPetition = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    goal: v.number(),
    targetDeadline: v.number(),
    linkedProjectId: v.optional(v.id("projects")),
    linkedLeaderId: v.optional(v.id("leaders")),
  },
  handler: async (ctx, args) => {
    // First create the post
    const now = Date.now();
    const postId = await ctx.db.insert("posts", {
      userId: args.userId,
      type: "petition",
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

    // Then create the petition
    const petitionId = await ctx.db.insert("petitions", {
      postId,
      userId: args.userId,
      title: args.title,
      description: args.description,
      goal: args.goal,
      currentSignatures: 0,
      targetDeadline: args.targetDeadline,
      status: "active",
      linkedProjectId: args.linkedProjectId,
      linkedLeaderId: args.linkedLeaderId,
      createdAt: now,
      updatedAt: now,
    });

    return { petitionId, postId };
  },
});

// Sign a petition
export const signPetition = mutation({
  args: {
    petitionId: v.id("petitions"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Check if user already signed
    const existingSignature = await ctx.db
      .query("petitionSignatures")
      .withIndex("by_petition_user", (q) => 
        q.eq("petitionId", args.petitionId).eq("userId", args.userId)
      )
      .first();

    if (existingSignature) {
      throw new Error("User has already signed this petition");
    }

    const petition = await ctx.db.get(args.petitionId);
    if (!petition) {
      throw new Error("Petition not found");
    }

    if (petition.status !== "active") {
      throw new Error("Petition is no longer active");
    }

    // Check if deadline has passed
    if (petition.targetDeadline < Date.now()) {
      await ctx.db.patch(args.petitionId, {
        status: "expired",
        updatedAt: Date.now(),
      });
      throw new Error("Petition deadline has passed");
    }

    // Add signature
    await ctx.db.insert("petitionSignatures", {
      petitionId: args.petitionId,
      userId: args.userId,
      signedAt: Date.now(),
    });

    // Update petition
    const newSignatureCount = petition.currentSignatures + 1;
    let newStatus = petition.status;
    
    if (newSignatureCount >= petition.goal) {
      newStatus = "successful";
    }

    await ctx.db.patch(args.petitionId, {
      currentSignatures: newSignatureCount,
      status: newStatus,
      updatedAt: Date.now(),
    });

    return { success: true, currentSignatures: newSignatureCount };
  },
});

