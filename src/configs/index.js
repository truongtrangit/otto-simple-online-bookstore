const finalConfigs = {
  runtime: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3003,
    apiKey: process.env.API_KEY,
  },
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/online-bookstore',
  },
};

module.exports = Object.freeze(finalConfigs);
