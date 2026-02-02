/**
 * Middleware to catch async errors in route handlers
 * Wraps async functions and forwards any errors to Express error handler
 * @param {Function} theFunc - Async route handler function
 * @returns {Function} Express middleware function
 */
module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
