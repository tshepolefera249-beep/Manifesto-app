/**
 * Media Upload Service
 * 
 * TODO: Integrate with Cloudinary API
 * TODO: Add AWS S3 support as alternative
 * TODO: Implement image compression before upload
 * TODO: Add progress tracking for uploads
 */

import { MediaUpload } from "@types/index";

// Mock Cloudinary configuration
const CLOUDINARY_CONFIG = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "demo",
  uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || "demo_preset",
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

/**
 * Upload media to Cloudinary
 * In development, returns a mock URL
 */
export const uploadToCloudinary = async (
  uri: string,
  type: "photo" | "video"
): Promise<{ url: string; thumbnailUrl?: string }> => {
  // TODO: Implement actual Cloudinary upload
  // For now, return mock URL in development
  
  if (__DEV__) {
    console.log(`[DEV] Mock upload: ${uri} (${type})`);
    return {
      url: `https://via.placeholder.com/800x600?text=${encodeURIComponent("Uploaded " + type)}`,
      thumbnailUrl: `https://via.placeholder.com/300x200?text=${encodeURIComponent("Thumbnail " + type)}`,
    };
  }

  // Production implementation would use Cloudinary SDK
  // const formData = new FormData();
  // formData.append('file', { uri, type: type === 'photo' ? 'image/jpeg' : 'video/mp4' });
  // formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  // 
  // const response = await fetch(
  //   `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${type === 'photo' ? 'image' : 'video'}/upload`,
  //   { method: 'POST', body: formData }
  // );
  // const data = await response.json();
  // return { url: data.secure_url, thumbnailUrl: data.thumbnail_url };

  throw new Error("Media upload not configured - set Cloudinary credentials");
};

/**
 * Upload media to local storage (fallback for development)
 * Stores metadata in Convex, actual files stored locally
 */
export const uploadToLocal = async (
  uri: string,
  type: "photo" | "video"
): Promise<{ url: string; thumbnailUrl?: string }> => {
  // In development, we'll use the local URI
  // In production, this should upload to a local server or S3
  return {
    url: uri,
    thumbnailUrl: type === "photo" ? uri : undefined,
  };
};

/**
 * Main upload function - tries Cloudinary first, falls back to local
 */
export const uploadMedia = async (
  uri: string,
  type: "photo" | "video",
  useCloudinary: boolean = true
): Promise<{ url: string; thumbnailUrl?: string }> => {
  try {
    if (useCloudinary && CLOUDINARY_CONFIG.cloudName && CLOUDINARY_CONFIG.cloudName !== "demo") {
      return await uploadToCloudinary(uri, type);
    } else {
      return await uploadToLocal(uri, type);
    }
  } catch (error) {
    console.error("Upload failed, falling back to local:", error);
    return await uploadToLocal(uri, type);
  }
};

