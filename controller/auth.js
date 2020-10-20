const User = require('../models/users.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { object } = require('@hapi/joi')

exports.postRegister = async (req, res) => {
  console.log('[backend/register]: ',req.body)
  const { password, conPassword } = req.body
  const {validateRegCredentials} = require('../config/validateRegCredentials')
  const { error } = validateRegCredentials(req.body)
  if (error) {
    res.json({
      status: false,
      msg: error.details[0].message
    })
  } else if (password != conPassword) {
    res.json({
      status: false,
      msg: 'Passwords do not match'
    })
   } else {
      delete req.body['conPassword']
      const hashed = await bcrypt.hash(password, 10)
      req.body.password = hashed
      const user = new User(req.body)
      // await user.save()
      console.log('User saved', user)
      res.json({
        status: true,
        msg: 'user saved',
      })
    }
  }

  exports.postLogin = async (req, res) => {
    console.log(req.body)
    const {
      email,
      password
    } = req.body
    const user = await User.findOne({ email: email })

    if (user) {
      console.log(user)
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        const token = await jwt.sign(
          { id: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 
          process.env.JWT_SECRET
          )
        res.json({
          status: true,
          msg: 'User found',
          data: {
            token,
            user
          }
        })
      } else {
        res.json({
          status: false,
          msg: 'Password does not match'
        })
      }
    } else {
      res.json({
        status: false,
        msg: 'Email not found'
      })
    }
  }

exports.createPost = async (req, res) => {
  res.json({
    id: req.user
  })
}