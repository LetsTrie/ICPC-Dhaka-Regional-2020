const joi = require('@hapi/joi')

exports.validateRegCredentials = data => {
  const compareWith = joi.object({
    teamName: joi.string().required(),
    coachName: joi.string().required(),
    university: joi.string().required(), 
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
    conPassword: joi.string().required().min(6),
    membersInfo: joi.array().items(
      joi.object({
        memberName: joi.string().required(),
        memberYear: joi.string().required(),
        memberSemester: joi.string().required(),
        tshirtSize: joi.string().required(),
        image: joi.string().required()
      })
    )
  })

  return compareWith.validate(data)
}