module.exports = function success(data, code) {
  const res = this.res;

  const statusCode = code || 200;

  res.status(statusCode);

  // Response using the appropriate custom response
  return res.json({
    status: 'success',
    data: data || {},
  });
};
