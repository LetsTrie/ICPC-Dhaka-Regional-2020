const Joi = require('joi');

exports.registerValidation = (data) => {
  const compareWith = Joi.object({
    team: Joi.string().min(6).max(30).required(),
    university: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().required(),
    coach: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      affiliation: Joi.string().required(),
      designation: Joi.string().required(),
      tshirtSize: Joi.string().required(),
    }),
    participants: Joi.array().items(
      Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        year: Joi.string().required(),
        semester: Joi.string().required(),
        tshirtSize: Joi.string().required(),
        affiliation: Joi.string().required(),
      })
    ).length(3),
  });

  return compareWith.validate(data);
};
