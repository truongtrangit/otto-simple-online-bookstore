const mongoose = require('mongoose');

module.exports = {
  schema: {
    title: { type: String, required: true, maxLength: 256 },
    isbn: { type: String, required: true, unique: true },
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
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review',
      },
    ],
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
    newSchema.index({ authorId: 1 });
    newSchema.index({ categoryId: 1 });
    return newSchema;
  },
};
