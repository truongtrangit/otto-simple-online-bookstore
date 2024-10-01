const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  validateCreateReviewRequest: function (data) {
    const paramSchema = Joi.object().keys({
      bookId: Joi.objectId().required(),
      reviewer: Joi.string().required(),
      comment: Joi.string().required(),
    });

    const { error } = paramSchema.validate(data);

    return error;
  },
};
