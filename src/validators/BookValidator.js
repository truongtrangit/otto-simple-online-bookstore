const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  validateCreateBookRequest: function (data) {
    const paramSchema = Joi.object().keys({
      title: Joi.string().required(),
      isbn: Joi.string().required(),
      price: Joi.number().required(),
      authorId: Joi.objectId().required(),
      categoryId: Joi.objectId().required(),
    });

    const { error } = paramSchema.validate(data);

    return error;
  },
  validateUpdateBookRequest: function (data) {
    const paramSchema = Joi.object().keys({
      title: Joi.string(),
      price: Joi.number(),
      authorId: Joi.objectId(),
      categoryId: Joi.objectId(),
    });

    const { error } = paramSchema.validate(data);

    return error;
  },
};
