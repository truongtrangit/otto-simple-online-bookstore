module.exports = {
  authenticate: function (req, res, next) {
    const { configs } = global;
    const apiKey = req.get('authorization');
    if (!apiKey || apiKey !== configs.runtime.apiKey) {
      return res.unauthorized();
    }
    next();
  },
};
