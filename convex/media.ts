import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Media Upload Functions
 * 
 * TODO: Integrate with Cloudinary API
 * TODO: Integrate with AWS S3 as alternative
 * TODO: Implement AI verification for media authenticity
 * TODO: Add image processing and thumbnail generation
 */

// Get all media uploads
export const getUploads = query({
  args: {
    limit: v.optional(v.number()),
    projectId: v.optional(v.id("projects")),
    uploaderId: v.optional(v.id("users")),
    verificationStatus: v.optional(v.union(v.literal("pending"), v.literal("verified"), v.literal("rejected"))),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    
    let uploads;
    if (args.projectId) {
      uploads = await ctx.db
        .query("uploads")
        .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
        .order("desc")
        .take(limit);
    } else if (args.uploaderId) {
      uploads = await ctx.db
        .query("uploads")
        .withIndex("by_uploader", (q) => q.eq("uploaderId", args.uploaderId))
        .order("desc")
        .take(limit);
    } else if (args.verificationStatus) {
      uploads = await ctx.db
        .query("uploads")
        .withIndex("by_verification", (q) => q.eq("verificationStatus", args.verificationStatus))
        .order("desc")
        .take(limit);
    } else {
      uploads = await ctx.db
        .query("uploads")
        .withIndex("by_uploaded")
        .order("desc")
        .take(limit);
    }

    // Enrich with user data
    const enrichedUploads = await Promise.all(
      uploads.map(async (upload) => {
        const user = await ctx.db.get(upload.uploaderId);
        const project = upload.projectId ? await ctx.db.get(upload.projectId) : null;
        return {
          ...upload,
          uploader: user ? {
            id: user._id,
            name: user.name,
            profilePhoto: user.profilePhoto,
          } : null,
          project: project ? {
            id: project._id,
            title: project.title,
          } : null,
        };
      })
    );

    return enrichedUploads;
  },
});

// Upload media (creates record in database)
// TODO: Actual file upload should happen client-side to Cloudinary/S3
export const createUpload = mutation({
  args: {
    uploaderId: v.id("users"),
    projectId: v.optional(v.id("projects")),
    postId: v.optional(v.id("posts")),
    url: v.string(), // URL from Cloudinary/S3
    thumbnailUrl: v.optional(v.string()),
    type: v.union(v.literal("photo"), v.literal("video")),
    caption: v.optional(v.string()),
    location: v.optional(v.object({
      latitude: v.number(),
      longitude: v.number(),
      address: v.string(),
    })),
    timestamp: v.number(), // When media was captured
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // TODO: Run AI verification
    // - Check metadata validity
    // - Match location with project location if projectId provided
    // - Detect authenticity score
    
    const uploadId = await ctx.db.insert("uploads", {
      uploaderId: args.uploaderId,
      projectId: args.projectId,
      postId: args.postId,
      url: args.url,
      thumbnailUrl: args.thumbnailUrl,
      type: args.type,
      caption: args.caption,
      location: args.location,
      timestamp: args.timestamp,
      uploadedAt: now,
      verificationStatus: "pending", // Will be updated by AI verification
      viewCount: 0,
      likeCount: 0,
    });

    // Update project citizen media count if linked
    if (args.projectId) {
      const project = await ctx.db.get(args.projectId);
      if (project) {
        await ctx.db.patch(args.projectId, {
          citizenMediaCount: project.citizenMediaCount + 1,
          updatedAt: now,
        });
      }
    }

    return { uploadId };
  },
});

// Verify media (AI or admin verification)
export const verifyMedia = mutation({
  args: {
    uploadId: v.id("uploads"),
    verificationStatus: v.union(v.literal("verified"), v.literal("rejected")),
    aiAnalysis: v.optional(v.object({
      authenticity: v.number(),
      matchesProjectLocation: v.boolean(),
      metadataValid: v.boolean(),
      notes: v.optional(v.string()),
    })),
  },
  handler: async (ctx, args) => {
    const upload = await ctx.db.get(args.uploadId);
    if (!upload) {
      throw new Error("Upload not found");
    }

    await ctx.db.patch(args.uploadId, {
      verificationStatus: args.verificationStatus,
      aiAnalysis: args.aiAnalysis,
    });

    return { success: true };
  },
});

