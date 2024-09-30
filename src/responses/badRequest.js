module.exports = function badRequest(msg) {
  var res = this.res;

  var statusCode = 400;

  res.status(statusCode);

  return res.json({
    status: 'error',
    data: {
      code: statusCode,
      message: msg || 'Invalid Param',
    },
  });
};
