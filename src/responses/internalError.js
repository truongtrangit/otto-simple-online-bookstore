const _ = require('lodash');

module.exports = function internalError(error, message) {
  const res = this.res;

  const statusCode = 500;

  res.status(statusCode);

  const errorMsg = _.get(
    error,
    'message',
    'Something went wrong please try again later'
  );
  return res.json({
    status: 'error',
    data: {
      code: statusCode,
      message: message || errorMsg,
    },
  });
};
