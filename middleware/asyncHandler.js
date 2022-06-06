const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
//wraps the try-catch in async functions

module.exports = asyncHandler;
