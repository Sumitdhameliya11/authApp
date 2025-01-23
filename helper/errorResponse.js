const errorResponse = (res, statuscode = 500, message, error) => {
  res.status(statuscode).json({
    success: false,
    message: message,
    error: error,
  });
};

module.exports = {
  errorResponse,
};
