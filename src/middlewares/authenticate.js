module.exports = {
  authenticate: function (req, res, next) {
    const { configs } = global;
    const apiKey = req.get('authorization');
    console.log('🚀 ~ apiKey:', apiKey);
    console.log('aaa', req.headers);
    if (!apiKey || apiKey !== configs.runtime.apiKey) {
      return res.unauthorized();
    }
    next();
  },
};
