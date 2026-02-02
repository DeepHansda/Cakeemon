/**
 * Token Handler Service
 * Handles JWT token generation and cookie management for user authentication
 * @module services/tokenHandler
 */

/**
 * Generates JWT token and sets it as an HTTP-only cookie
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code to send
 * @param {Object} user - User document from database
 * @param {string} [message='Success'] - Optional success message
 * @returns {Promise<void>}
 */
const tokenHandler = async (res, statusCode, user, message = "Success") => {
  try {
    // Generate JWT token using user model method
    const token = await user.getToken();

    // Cookie expiration time (48 hours)
    const COOKIE_EXPIRE_DAYS = 2;
    const cookieExpirationTime = COOKIE_EXPIRE_DAYS * 24 * 60 * 60 * 1000;

    // Cookie options for security
    const options = {
      expires: new Date(Date.now() + cookieExpirationTime),
      httpOnly: true, // Prevents XSS attacks by making cookie inaccessible to JavaScript
      secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // CSRF protection
    };

    // Prepare user data (exclude sensitive information)
    const userData = {
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      mobile_number: user.mobile_number,
      genders: user.genders,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Set cookie and send response
    res.cookie("token", token, options).status(statusCode).json({
      success: true,
      message,
      user: userData,
      token, // Include token in response for clients that can't use cookies
    });
  } catch (error) {
    // Handle any errors during token generation
    res.status(500).json({
      success: false,
      message: "Failed to generate authentication token",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = tokenHandler;
