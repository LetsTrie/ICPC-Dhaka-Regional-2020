// Packages
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const path = require('path');
// Models
const Team = require('../models/team');
// Config
const adminCred = require('../config/adminCredentials');
// Utils
const ErrRes = require('../utils/errorResponse');
// Middlewares
const asyncHandler = require('../middlewares/asyncHandler');
// Helper Functions
const { parseFile } = require('./helpers');

// Admin login
exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (username !== adminCred.username || password !== adminCred.password)
    return next(new ErrRes('Invalid credentials', 401));

  const accessToken = await jwt.sign(
    { id: adminCred.id },
    process.env.JWT_SECRET,
    { expiresIn: '420h' }
  );

  return res.status(200).json({ success: true, accessToken });
});

// Team Information from File...
exports.teamInfo = asyncHandler(async (req, res) => {
  const teams = await parseFile();
  return res.status(200).json({ success: true, teams });
});

// Team Information from Database...
exports.fetchRegisteredTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find().sort({ _id: -1 });
  return res.status(200).json({ success: true, teams });
});

// Get/Set Contest Time
const contestTime = require('../data/contestTime.json');
exports.getContestTime = asyncHandler(async (req, res, next) => {
  return res.json({ ...contestTime });
});

exports.setContestTime = asyncHandler(async (req, res, next) => {
  await fs.writeFile(
    path.join(__dirname, '..', 'data', 'contestTime.json'),
    JSON.stringify({ date: req.body.date })
  );
  return res.status(200).json({ success: true });
});
