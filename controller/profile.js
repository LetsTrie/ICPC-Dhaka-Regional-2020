const User = require('../models/users.js');
const bcrypt = require('bcryptjs');
const { admin } = require('../config/adminCredentials');

const check = (data) => {
  return data == '' || data == undefined || data == null;
};

exports.getUser = async (req, res) => {
  if (req.user == admin.id) {
    res.json({
      status: true,
      msg: 'Admin logged in',
      user: admin,
    });
  }
  const user = await User.findOne({ _id: req.user });
  res.send({
    status: true,
    msg: 'User profile found',
    user,
  });
};

exports.updatePasswords = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (check(currentPassword)) {
    res.send({
      status: false,
      msg: 'Current password is incorrect',
    });
    return;
  } else if (
    check(newPassword) ||
    check(confirmNewPassword) ||
    newPassword != confirmNewPassword ||
    newPassword.length < 6 ||
    confirmNewPassword.length < 6
  ) {
    res.send({
      status: false,
      msg: 'New password should match and be of at least 6 characters',
    });
    return;
  }

  const user = await User.findOne({ _id: req.user });
  const match = await bcrypt.compare(currentPassword, user.password);

  if (match) {
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { _id: req.user },
      {
        $set: { password: hashed },
      }
    );

    res.send({
      status: true,
      msg: 'Password updated',
    });
  } else {
    res.send({
      status: false,
      msg: 'Current password is incorrect',
    });
  }
};

exports.updateEmail = async (req, res) => {
  const { email } = req.body;

  const exisitngUser = await User.findOne({ email: email });
  if (exisitngUser) {
    res.send({
      status: false,
      msg: 'Email already in use. Please try a different one.',
    });
    return;
  }

  if (check(email) || !/\S+@\S+\.\S+/.test(email)) {
    res.send({
      status: false,
      msg: 'Incorrect email',
    });
  } else {
    const user = await User.findOne({ _id: req.user });
    await User.findOneAndUpdate(
      { _id: req.user },
      {
        $set: {
          email: email,
        },
      }
    );
    res.send({
      status: true,
      msg: 'Email updated',
    });
  }
};

exports.updateProfile = async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  user.teamName = req.body.teamName;
  user.coachName = req.body.coachName;
  user.university = req.body.university;
  user.membersInfo = req.body.membersInfo;
  await user.save();
  res.send({
    status: true,
    msg: 'Profile updated',
  });
};
