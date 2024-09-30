const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
module.exports = {
  createModels: function () {
    const fileList = fs.readdirSync(__dirname);
    const Models = {};
    for (const file of fileList) {
      if (file === 'index.js') {
        continue;
      }
      const modelName = file.replace('.js', '');

      const { schema, constructSchema } = require(path.join(__dirname, file));

      Models[modelName] = mongoose.model(
        modelName.toLowerCase(),
        constructSchema(schema, mongoose)
      );
      console.debug('Loaded Model ' + modelName);
    }
    global.Models = Models;
  },
};
