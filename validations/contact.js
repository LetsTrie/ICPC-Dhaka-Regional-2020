const joi = require('@hapi/joi')

exports.contactValidation = data => {
  const compareWith = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    message: joi.string().min(10).required(),
  })

  return compareWith.validate(data)
}