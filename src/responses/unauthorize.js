module.exports = function unauthorized(msg) {
  const res = this.res;

  const statusCode = 401;

  res.status(statusCode);

  return res.json({
    status: 'error',
    data: {
      code: statusCode,
      message: msg || 'Unauthorized',
    },
  });
};
