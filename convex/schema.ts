import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Manifesto Database Schema
 * 
 * Data model relationships:
 * - Users can create posts, debates, polls, petitions, and upload media
 * - Debates, polls, and petitions can be linked to projects, leaders, or departments
 * - Projects can have multiple leaders/departments and media uploads
 * - Leaders can have multiple promises, projects, and associated departments
 * - Media uploads can be linked to projects, posts, or standalone
 * - Parliament items (bills, sessions) can link to debates and polls
 */

export default defineSchema({
  // Users table - core user identity and profile
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    passwordHash: v.optional(v.string()), // Hashed password
    phoneVerified: v.boolean(),
    emailVerified: v.boolean(),
    profilePhoto: v.optional(v.string()), // URL to profile photo
    bio: v.optional(v.string()),
    civicInterests: v.array(v.string()), // e.g., ["Education", "Infrastructure", "Healthcare"]
    badges: v.array(v.string()), // e.g., ["Debater", "Fact Checker", "Accountability Champion"]
    trustScore: v.number(), // 0-100, credibility rating
    createdAt: v.number(), // Unix timestamp
    lastActiveAt: v.number(),
    isActive: v.boolean(),
  })
    .index("by_email", ["email"])
    .index("by_phone", ["phone"]),

  // Posts - general feed items (debates, polls, petitions, media)
  posts: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("debate"), v.literal("poll"), v.literal("petition"), v.literal("media"), v.literal("update")),
    title: v.string(),
    content: v.string(),
    mediaUrls: v.optional(v.array(v.string())), // URLs to uploaded media
    tags: v.array(v.string()), // e.g., ["#Accountability", "#Education"]
    linkedProjectId: v.optional(v.id("projects")),
    linkedLeaderId: v.optional(v.id("leaders")),
    linkedDepartmentId: v.optional(v.id("departments")),
    createdAt: v.number(),
    updatedAt: v.number(),
    likes: v.number(),
    comments: v.number(),
    shares: v.number(),
    isVerified: v.boolean(), // AI/Admin verified
    verificationStatus: v.union(v.literal("pending"), v.literal("verified"), v.literal("rejected")),
  })
    .index("by_user", ["userId"])
    .index("by_type", ["type"])
    .index("by_created", ["createdAt"])
    .index("by_project", ["linkedProjectId"])
    .index("by_leader", ["linkedLeaderId"]),

  // Debates - structured debate rooms
  debates: defineTable({
    postId: v.id("posts"), // Links to posts table
    userId: v.id("users"), // Creator
    title: v.string(),
    description: v.string(),
    topic: v.string(), // Main topic category
    agreeCount: v.number(),
    disagreeCount: v.number(),
    neutralCount: v.number(),
    commentCount: v.number(),
    linkedProjectId: v.optional(v.id("projects")),
    linkedPolicyId: v.optional(v.string()), // Reference to policy document
    isArchived: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_topic", ["topic"])
    .index("by_created", ["createdAt"])
    .index("by_project", ["linkedProjectId"]),

  // Debate reactions - user reactions to debates
  debateReactions: defineTable({
    debateId: v.id("debates"),
    userId: v.id("users"),
    reaction: v.union(v.literal("agree"), v.literal("disagree"), v.literal("neutral")),
    createdAt: v.number(),
  })
    .index("by_debate", ["debateId"])
    .index("by_user", ["userId"])
    .index("by_debate_user", ["debateId", "userId"]), // Unique constraint

  // Polls & Surveys
  polls: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    options: v.array(v.object({
      id: v.string(),
      text: v.string(),
      voteCount: v.number(),
    })),
    totalVotes: v.number(),
    isMultipleChoice: v.boolean(),
    endDate: v.optional(v.number()), // Unix timestamp
    linkedProjectId: v.optional(v.id("projects")),
    linkedLeaderId: v.optional(v.id("leaders")),
    createdAt: v.number(),
    isActive: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_created", ["createdAt"])
    .index("by_project", ["linkedProjectId"]),

  // Poll votes - user votes on polls
  pollVotes: defineTable({
    pollId: v.id("polls"),
    userId: v.id("users"),
    optionIds: v.array(v.string()), // Can be multiple for multiple choice
    createdAt: v.number(),
  })
    .index("by_poll", ["pollId"])
    .index("by_user", ["userId"])
    .index("by_poll_user", ["pollId", "userId"]), // Unique constraint

  // Petitions
  petitions: defineTable({
    postId: v.id("posts"),
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    goal: v.number(), // Target number of signatures
    currentSignatures: v.number(),
    targetDeadline: v.number(), // Unix timestamp
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("expired"), v.literal("successful")),
    linkedProjectId: v.optional(v.id("projects")),
    linkedLeaderId: v.optional(v.id("leaders")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"])
    .index("by_project", ["linkedProjectId"]),

  // Petition signatures
  petitionSignatures: defineTable({
    petitionId: v.id("petitions"),
    userId: v.id("users"),
    signedAt: v.number(),
  })
    .index("by_petition", ["petitionId"])
    .index("by_user", ["userId"])
    .index("by_petition_user", ["petitionId", "userId"]), // Unique constraint

  // Projects & Tenders
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(), // e.g., "Infrastructure", "Education", "Healthcare"
    stage: v.union(
      v.literal("planning"),
      v.literal("tender"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("on_hold"),
      v.literal("cancelled")
    ),
    budgetAllocated: v.number(), // In ZAR
    budgetSpent: v.number(), // In ZAR
    responsibleDepartmentId: v.id("departments"),
    responsibleLeaderIds: v.array(v.id("leaders")),
    responsibleCompany: v.optional(v.string()),
    location: v.object({
      latitude: v.number(),
      longitude: v.number(),
      address: v.string(),
    }),
    startDate: v.number(), // Unix timestamp
    endDate: v.optional(v.number()), // Unix timestamp
    deadline: v.optional(v.number()), // Tender deadline
    jobsCreated: v.number(),
    milestones: v.array(v.object({
      id: v.string(),
      title: v.string(),
      completed: v.boolean(),
      completedAt: v.optional(v.number()),
    })),
    citizenMediaCount: v.number(), // Count of verified citizen uploads
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_department", ["responsibleDepartmentId"])
    .index("by_stage", ["stage"])
    .index("by_created", ["createdAt"]),

  // Leaders - politicians and government officials
  leaders: defineTable({
    name: v.string(),
    position: v.string(), // e.g., "President", "Minister of Education"
    party: v.string(),
    bio: v.string(),
    photo: v.optional(v.string()), // URL to photo
    departmentIds: v.array(v.id("departments")), // Departments they're associated with
    promises: v.array(v.object({
      id: v.string(),
      title: v.string(),
      description: v.string(),
      status: v.union(v.literal("pending"), v.literal("in_progress"), v.literal("fulfilled"), v.literal("broken")),
      createdAt: v.number(),
      fulfilledAt: v.optional(v.number()),
    })),
    approvalRating: v.number(), // 0-100, calculated from polls/feedback
    projectIds: v.array(v.id("projects")), // Projects they're responsible for
    scandals: v.array(v.object({
      id: v.string(),
      title: v.string(),
      description: v.string(),
      verified: v.boolean(),
      reportedAt: v.number(),
    })),
    achievements: v.array(v.object({
      id: v.string(),
      title: v.string(),
      description: v.string(),
      verified: v.boolean(),
      achievedAt: v.number(),
    })),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_party", ["party"])
    .index("by_position", ["position"]),

  // Departments - government departments
  departments: defineTable({
    name: v.string(),
    type: v.union(v.literal("national"), v.literal("provincial"), v.literal("municipal")),
    description: v.string(),
    budget: v.number(), // Annual budget in ZAR
    expenditure: v.number(), // Current expenditure in ZAR
    leaderIds: v.array(v.id("leaders")), // Department heads/officials
    projectIds: v.array(v.id("projects")), // Associated projects
    keyInitiatives: v.array(v.object({
      id: v.string(),
      title: v.string(),
      description: v.string(),
      status: v.string(),
    })),
    issues: v.array(v.object({
      id: v.string(),
      title: v.string(),
      description: v.string(),
      severity: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
      reportedAt: v.number(),
    })),
    performanceRating: v.number(), // 0-100, from citizen feedback
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_type", ["type"]),

  // Parliament - parliamentary activity
  parliament: defineTable({
    type: v.union(v.literal("bill"), v.literal("session"), v.literal("vote"), v.literal("debate")),
    title: v.string(),
    description: v.string(),
    status: v.union(v.literal("draft"), v.literal("tabled"), v.literal("debating"), v.literal("voting"), v.literal("passed"), v.literal("rejected")),
    billNumber: v.optional(v.string()),
    sessionDate: v.number(), // Unix timestamp
    attendance: v.optional(v.object({
      present: v.number(),
      absent: v.number(),
      total: v.number(),
    })),
    votingRecords: v.optional(v.array(v.object({
      leaderId: v.id("leaders"),
      vote: v.union(v.literal("for"), v.literal("against"), v.literal("abstain"), v.literal("absent")),
    }))),
    linkedDebateIds: v.array(v.id("debates")),
    linkedPollIds: v.array(v.id("polls")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_type", ["type"])
    .index("by_status", ["status"])
    .index("by_date", ["sessionDate"]),

  // Media uploads - citizen-uploaded photos/videos
  uploads: defineTable({
    uploaderId: v.id("users"),
    projectId: v.optional(v.id("projects")),
    postId: v.optional(v.id("posts")),
    url: v.string(), // Media URL (Cloudinary/S3)
    thumbnailUrl: v.optional(v.string()),
    type: v.union(v.literal("photo"), v.literal("video")),
    caption: v.optional(v.string()),
    location: v.optional(v.object({
      latitude: v.number(),
      longitude: v.number(),
      address: v.string(),
    })),
    timestamp: v.number(), // When media was captured
    uploadedAt: v.number(), // When uploaded to platform
    verificationStatus: v.union(v.literal("pending"), v.literal("verified"), v.literal("rejected")),
    aiAnalysis: v.optional(v.object({
      authenticity: v.number(), // 0-100 confidence
      matchesProjectLocation: v.boolean(),
      metadataValid: v.boolean(),
      notes: v.optional(v.string()),
    })),
    viewCount: v.number(),
    likeCount: v.number(),
  })
    .index("by_uploader", ["uploaderId"])
    .index("by_project", ["projectId"])
    .index("by_uploaded", ["uploadedAt"])
    .index("by_verification", ["verificationStatus"]),

  // Comments - comments on posts, debates, etc.
  comments: defineTable({
    userId: v.id("users"),
    postId: v.id("posts"),
    content: v.string(),
    parentCommentId: v.optional(v.id("comments")), // For nested comments
    likes: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
    isDeleted: v.boolean(),
  })
    .index("by_post", ["postId"])
    .index("by_user", ["userId"])
    .index("by_created", ["createdAt"]),

  // Notifications - user notifications
  notifications: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("debate_reply"),
      v.literal("poll_result"),
      v.literal("petition_update"),
      v.literal("project_update"),
      v.literal("comment_reply"),
      v.literal("badge_earned")
    ),
    title: v.string(),
    message: v.string(),
    linkedEntityId: v.string(), // ID of related entity (post, debate, etc.)
    isRead: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_read", ["isRead"])
    .index("by_created", ["createdAt"]),
});

