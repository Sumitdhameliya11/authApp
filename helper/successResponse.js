const successResponse = (res, statuscode = 200, data = {}, message) => {
  res.status(statuscode).json({
    success: true,
    data: data,
    message: message,
  });
};

module.exports = {
  successResponse,
};
