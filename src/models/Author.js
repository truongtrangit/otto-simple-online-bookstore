const mongoose = require('mongoose');

module.exports = {
  schema: {
    name: { type: String, required: true },
    dateOfBirth: { type: Date },
    nationality: { type: String },
  },
  constructSchema: function (schemaDefinedAbove, mongooseInstance) {
    var newSchema = new mongooseInstance.Schema(schemaDefinedAbove, {
      autoIndex: true,
      collection: 'author',
      timestamps: true,
    });

    return newSchema;
  },
};
