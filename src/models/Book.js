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
    discountPercent: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
    },
    schemaVersion: {
      type: Number,
      default: 1,
    },
  },
  constructSchema: function (schemaDefinedAbove, mongooseInstance) {
    const {
      configs: { runtime },
    } = global;
    var newSchema = new mongooseInstance.Schema(schemaDefinedAbove, {
      autoIndex: true,
      collection: 'book',
      timestamps: true,
      versionKey: false,
    });

    newSchema.index({ title: 'text' });
    newSchema.index({ isbn: 1 });
    newSchema.index({ price: 1 });
    newSchema.index({ author: 1 });
    newSchema.index({ category: 1 });

    // Pre-save hook to remove discountPercent
    newSchema.pre('save', function (next) {
      if (this.schemaVersion !== runtime?.bookConfig.versionApplyDiscount) {
        this.discountPercent = undefined; // Remove discountPercent
        this.discountPrice = undefined; // Remove discountPrice
      } else {
        this.discountedPrice =
          this.price - (this.price * this.discountPercent) / 100;
      }

      next();
    });
    return newSchema;
  },
};
