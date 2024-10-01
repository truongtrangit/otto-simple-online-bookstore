module.exports = function badRequest(msg) {
  const res = this.res;

  const statusCode = 400;

  res.status(statusCode);

  return res.json({
    status: 'error',
    data: {
      code: statusCode,
      message: msg || 'Invalid Param',
    },
  });
};
