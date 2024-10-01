function parseNumber(value, defaultValue) {
  try {
    return parseInt(value, 10) || defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

const finalConfigs = {
  runtime: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3003,
    apiKey: process.env.API_KEY,
    bookConfig: {
      currentVersion: parseNumber(process.env.CURRENT_BOOK_VERSION, 1),
      versionApplyDiscount: parseNumber(process.env.VERSION_APPLY_DISCOUNT, 2),
    },
  },
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/online-bookstore',
  },
};

module.exports = Object.freeze(finalConfigs);
