const joi = require('@hapi/joi')

exports.validateContactUs = data => {
  const compareWith = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    message: joi.string().required(),
  })

  return compareWith.validate(data)
}