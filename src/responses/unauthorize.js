module.exports = function unauthorized(msg) {
  var res = this.res;

  var statusCode = 401;

  res.status(statusCode);

  return res.json({
    status: 'error',
    data: {
      code: statusCode,
      message: msg || 'Unauthorized',
    },
  });
};
