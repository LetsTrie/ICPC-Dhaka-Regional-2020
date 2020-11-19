const User = require('../models/users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { object } = require('@hapi/joi');


exports.registerInfo = async (req, res) => {
  return res.json(req.body);
};

exports.registerUpload = async (req, res) => {
  return res.json(req.files);
};

exports.postRegister = async (req, res) => {
  console.log('[backend/register]: ', req.body);
  const { password, conPassword, teamName } = req.body;
  const {
    validateRegCredentials,
  } = require('../validations/validateRegCredentials.js');
  const { error } = validateRegCredentials(req.body);

  const existingUser = await User.findOne({ teamName: teamName });

  if (error) {
    res.json({
      status: false,
      msg: error.details[0].message,
    });
  } else if (password != conPassword) {
    res.json({
      status: false,
      msg: 'Passwords do not match',
    });
  } else if (existingUser) {
    res.json({
      status: false,
      msg: 'Team name already in use. Please try a different one',
    });
  } else {
    delete req.body['conPassword'];
    const hashed = await bcrypt.hash(password, 10);
    req.body.password = hashed;
    const user = new User(req.body);
    await user.save();
    console.log('User saved', user);
    res.json({
      status: true,
      msg: 'Your team has successfully been registered!',
    });
  }
};

exports.postLogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ teamName: email });

  if (user) {
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '3h',
      });
      res.json({
        status: true,
        msg: 'User found',
        data: {
          token,
          user,
        },
      });
    } else {
      res.json({
        status: false,
        msg: 'Password does not match',
      });
    }
  } else {
    res.json({
      status: false,
      msg: 'Team name not found',
    });
  }
};

exports.createPost = async (req, res) => {
  res.json({
    id: req.user,
  });
};

exports.uploadImage = async (req, res) => {
  console.log('uploaded');
  res.send('uploaded');
};
