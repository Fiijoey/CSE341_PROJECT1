/**
 * Async handler to wrap controller functions
 * @param {Function} fn - The async function to wrap
 * @returns {Function} Middleware function that handles async errors
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;