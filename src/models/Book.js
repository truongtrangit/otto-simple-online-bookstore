const mongoose = require('mongoose');

module.exports = {
  schema: {
    title: { type: String, required: true },
    isbn: { type: String, required: true },
    price: {
      type: Number,
      require: true,
    },
    author: {
      require: true,
      type: mongoose.Types.ObjectId,
      ref: 'author',
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'category',
      require: true,
    },
  },
  constructSchema: function (schemaDefinedAbove, mongooseInstance) {
    var newSchema = new mongooseInstance.Schema(schemaDefinedAbove, {
      autoIndex: true,
      collection: 'book',
      timestamps: true,
    });

    newSchema.index({ title: 'text' });
    newSchema.index({ isbn: 1 });
    newSchema.index({ price: 1 });
    newSchema.index({ author: 1 });
    newSchema.index({ category: 1 });
    return newSchema;
  },
};
