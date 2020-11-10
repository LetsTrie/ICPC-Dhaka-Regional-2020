const mongoose = require('mongoose')
const { string } = require('@hapi/joi')

const User = mongoose.Schema({
  teamName: String,
  coachFirstName: String,
  coachLastName: String,
  university: String,
  email: String,
  password: String,
  membersInfo: [{
      memberFirstName: String,
      memberLastName: String,
      memberYear: String,
      memberSemester: String,
      memberEmail: String,
      tshirtSize: String,
      image: String
    }]
})

module.exports = mongoose.model('users', User)