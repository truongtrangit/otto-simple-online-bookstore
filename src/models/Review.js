const { max } = require('lodash');
const mongoose = require('mongoose');

module.exports = {
  schema: {
    reviewer: { type: String, required: true, max: 255 },
    comment: { type: String, required: true, max: 255 },
    bookId: {
      require: true,
      type: mongoose.Types.ObjectId,
      ref: 'book',
    },
  },
  constructSchema: function (schemaDefinedAbove, mongooseInstance) {
    var newSchema = new mongooseInstance.Schema(schemaDefinedAbove, {
      autoIndex: true,
      collection: 'review',
      timestamps: true,
    });
    return newSchema;
  },
};
