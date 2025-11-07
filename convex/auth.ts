import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Authentication Functions
 * 
 * TODO: Integrate with Convex Auth or Firebase Auth
 * TODO: Add phone OTP verification (integrate with Twilio/AWS SNS)
 * TODO: Add email verification
 * TODO: Add password reset flow
 * TODO: Add JWT token generation/validation
 */

// Sign up - create new user
export const signUp = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    password: v.string(), // TODO: Hash password before storing
  },
  handler: async (ctx, args) => {
    // TODO: Validate email format
    // TODO: Validate phone format (South African format)
    // TODO: Check if email/phone already exists
    // TODO: Hash password with bcrypt or similar
    
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      passwordHash: args.password, // TODO: Replace with hashed password
      phoneVerified: false,
      emailVerified: false,
      civicInterests: [],
      badges: [],
      trustScore: 50, // Default starting score
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
      isActive: true,
    });

    // TODO: Send OTP to phone
    // TODO: Send verification email

    return { userId, message: "User created. Please verify your phone and email." };
  },
});

// Sign in - authenticate user
export const signIn = mutation({
  args: {
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Find user by email or phone
    // TODO: Verify password hash
    // TODO: Generate JWT token
    // TODO: Update lastActiveAt

    throw new Error("Sign in not yet implemented");
  },
});

// Send OTP to phone
export const sendOTP = mutation({
  args: {
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Generate 6-digit OTP
    // TODO: Store OTP with expiration (5 minutes)
    // TODO: Send OTP via Twilio/AWS SNS
    // TODO: In development, return OTP in response (remove in production)

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // TODO: Store OTP in database with expiration
    // TODO: Integrate with SMS service
    
    return { 
      success: true, 
      message: "OTP sent to phone",
      // TODO: Remove this in production
      otp: process.env.NODE_ENV === "development" ? otp : undefined,
    };
  },
});

// Verify OTP
export const verifyOTP = mutation({
  args: {
    phone: v.string(),
    otp: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Verify OTP from database
    // TODO: Check expiration
    // TODO: Mark phone as verified
    // TODO: Delete OTP after verification

    throw new Error("OTP verification not yet implemented");
  },
});

// Get current user
export const getCurrentUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Don't return password hash
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    profilePhoto: v.optional(v.string()),
    civicInterests: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    
    // TODO: Validate inputs
    // TODO: Upload profile photo if provided
    
    await ctx.db.patch(userId, updates);
    return { success: true };
  },
});

