const Joi = require('joi');

module.exports = {
  validateCreateAuthorRequest: function (data) {
    const paramSchema = Joi.object().keys({
      name: Joi.string().required(),
      birthDate: Joi.date().required(),
      nationality: Joi.string().required(),
    });

    const { error } = paramSchema.validate(data);

    return error;
  },
};
