const mongoose = require('mongoose');

const { configs } = global;
async function start() {
  const db = mongoose.connection;
  db.on('connecting', () => {
    console.info('connecting to MongoDB...');
  });
  db.on('error', (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
  });
  db.on('connected', () => {
    console.info('MongoDB connected!');
  });
  db.once('open', async () => {
    console.info('MongoDB connection opened!');
    require('../models').createModels();
  });
  db.on('reconnected', () => {
    console.info('MongoDB reconnected!');
  });
  db.on('disconnected', () => {
    console.warn('MongoDB disconnected!');
    process.exit(0);
  });

  await mongoose.connect(configs.db.uri);
}

async function stop() {}

module.exports = { start, stop };
