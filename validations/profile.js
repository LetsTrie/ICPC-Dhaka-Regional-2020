const Joi = require('joi');

exports.updatePasswordValidation = (data) => {
  const compareWith = Joi.object({
    previousPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required(),
  });

  return compareWith.validate(data);
};
