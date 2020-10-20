const mongoose = require('mongoose')
const { string } = require('@hapi/joi')

const User = mongoose.Schema({
  teamName: String,
  coachName: String,
  university: String,
  email: String,
  password: String,
  membersInfo: [{
      memberName: String,
      memberYear: String,
      memberSemester: String
    }]
})

module.exports = mongoose.model('users', User)