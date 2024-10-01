module.exports = function notFound(msg) {
  const res = this.res;

  const statusCode = 404;

  res.status(statusCode);

  return res.json({
    status: 'error',
    data: {
      code: statusCode,
      message: msg || 'Data not found',
    },
  });
};
