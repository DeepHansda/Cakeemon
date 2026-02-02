/**
 * Cloudinary Image Upload Service
 * Handles image upload and deletion operations with Cloudinary
 * @module services/imageUpload
 */

const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {string} path - Local file path of the image to upload
 * @param {string} folder - Cloudinary folder name to organize uploads
 * @param {Object} [options={}] - Additional Cloudinary upload options
 * @returns {Promise<Object>} Upload result with public_id and url
 * @throws {Error} If upload fails or validation fails
 */
const cloudUpload = async (path, folder, options = {}) => {
  // Input validation
  if (!path) {
    throw new Error("Image path is required");
  }

  if (!folder) {
    throw new Error("Folder name is required");
  }

  try {
    // Check if file exists
    try {
      await fs.access(path);
    } catch (error) {
      throw new Error(`File not found at path: ${path}`);
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(path, {
      folder: folder,
      resource_type: "auto", // Automatically detect file type
      ...options,
    });

    // Clean up local file after successful upload
    try {
      await fs.unlink(path);
    } catch (unlinkError) {
      console.warn(
        `Warning: Could not delete local file at ${path}:`,
        unlinkError.message,
      );
    }

    return {
      success: true,
      message: "Upload successful",
      public_id: result.public_id,
      url: result.secure_url, // Use secure_url (HTTPS) instead of url
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} public_id - Cloudinary public_id of the image to delete
 * @param {Object} [options={}] - Additional Cloudinary delete options
 * @returns {Promise<Object>} Deletion result
 * @throws {Error} If deletion fails or validation fails
 */
const cloudDelete = async (public_id, options = {}) => {
  // Input validation
  if (!public_id) {
    throw new Error("Public ID is required for deletion");
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id, {
      invalidate: true, // Invalidate CDN cache
      ...options,
    });

    // Check if deletion was successful
    if (result.result === "ok") {
      return {
        success: true,
        message: "Deletion successful",
        result: result.result,
      };
    } else if (result.result === "not found") {
      return {
        success: false,
        message: "Image not found",
        result: result.result,
      };
    } else {
      return {
        success: false,
        message: "Deletion failed",
        result: result.result,
      };
    }
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

/**
 * Delete multiple images from Cloudinary
 * @param {string[]} public_ids - Array of Cloudinary public_ids to delete
 * @returns {Promise<Object>} Deletion results
 */
const cloudDeleteMultiple = async (public_ids) => {
  if (!Array.isArray(public_ids) || public_ids.length === 0) {
    throw new Error("Public IDs array is required");
  }

  try {
    const deletePromises = public_ids.map((public_id) =>
      cloudDelete(public_id),
    );
    const results = await Promise.allSettled(deletePromises);

    const successful = results.filter(
      (r) => r.status === "fulfilled" && r.value.success,
    ).length;
    const failed = results.length - successful;

    return {
      success: failed === 0,
      message: `Deleted ${successful} of ${results.length} images`,
      successful,
      failed,
      details: results,
    };
  } catch (error) {
    console.error("Cloudinary bulk deletion error:", error);
    throw new Error(`Failed to delete multiple images: ${error.message}`);
  }
};

module.exports = {
  cloudUpload,
  cloudDelete,
  cloudDeleteMultiple,
};
