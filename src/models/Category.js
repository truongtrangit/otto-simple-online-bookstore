const mongoose = require('mongoose');

module.exports = {
  schema: {
    name: { type: String, required: true },
  },
  constructSchema: function (schemaDefinedAbove, mongooseInstance) {
    var newSchema = new mongooseInstance.Schema(schemaDefinedAbove, {
      autoIndex: true,
      collection: 'category',
      timestamps: true,
      versionKey: false,
    });

    return newSchema;
  },
};
