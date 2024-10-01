const Joi = require('joi');

module.exports = {
  validateCreateCategoryRequest: function (data) {
    const paramSchema = Joi.object().keys({
      name: Joi.string().required(),
    });

    const { error } = paramSchema.validate(data);

    return error;
  },
};
