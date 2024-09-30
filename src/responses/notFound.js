module.exports = function notFound(msg) {
  var res = this.res;

  var statusCode = 404;

  res.status(statusCode);

  return res.json({
    status: 'error',
    data: {
      code: statusCode,
      message: msg || 'Data not found',
    },
  });
};
