/**
 * Authentication Service
 * 
 * TODO: Integrate with Convex auth functions
 * TODO: Add token management
 * TODO: Add secure storage for tokens
 */

import { api } from "../convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "@convex-dev/react";

// Mock OTP service (for development)
export const sendOTP = async (phone: string): Promise<{ success: boolean; otp?: string }> => {
  // TODO: Replace with actual Convex mutation
  // In production, OTP should be sent via SMS service (Twilio/AWS SNS)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  console.log(`[DEV] OTP for ${phone}: ${otp}`);
  
  return {
    success: true,
    otp: __DEV__ ? otp : undefined, // Only return OTP in development
  };
};

// Sign up service
export const signUp = async (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ userId: string; message: string }> => {
  // TODO: Call Convex mutation
  // const result = await convex.mutation(api.auth.signUp, data);
  throw new Error("Sign up not yet implemented - integrate with Convex");
};

// Sign in service
export const signIn = async (data: {
  email?: string;
  phone?: string;
  password: string;
}): Promise<{ userId: string; token: string }> => {
  // TODO: Call Convex mutation
  // const result = await convex.mutation(api.auth.signIn, data);
  throw new Error("Sign in not yet implemented - integrate with Convex");
};

// Verify OTP
export const verifyOTP = async (phone: string, otp: string): Promise<{ success: boolean }> => {
  // TODO: Call Convex mutation
  // const result = await convex.mutation(api.auth.verifyOTP, { phone, otp });
  throw new Error("OTP verification not yet implemented - integrate with Convex");
};

