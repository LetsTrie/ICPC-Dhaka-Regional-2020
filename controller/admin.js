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

const { Parser } = require('json2csv');

const getHostname = require('../utils/getHostname');

const { sendTeamEmail } = require('../config/sendMail');

const updatePaymentField = (container) => {
  return container.map((t) => {
    let teamInfo = { ...t._doc };
    if (t['payment_status'] === 'Not Paid Yet') teamInfo.payment_date = '-';
    return teamInfo;
  });
};

exports.getATeamInfo = asyncHandler(async (req, res) => {
  let team = await Team.findById(req.params.id);
  return res.json({ success: true, team });
});

exports.downloadTeamInfos = asyncHandler(async (req, res) => {
  let teams = await Team.find();
  const modifiedTeam = updatePaymentField([...teams]);
  const json2csvParser = new Parser();
  const csv = await json2csvParser.parse(modifiedTeam);
  res.setHeader('Content-disposition', 'attachment; filename=Teams.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csv);
});

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

// Team Information from DB...
exports.teamInfo = asyncHandler(async (req, res) => {
  let teams = await Team.find().sort({ Team_Name: 1 });
  if (!teams) return res.status(404).json({ success: false });
  let modifyTeams = updatePaymentField(teams);
  modifyTeams.sort((a, b) => a.Team_Name < b.Team_Name);
  return res.status(200).json({ success: true, teams: modifyTeams });
});

exports.partialTeamInformation = asyncHandler(async (req, res) => {
  let level = parseInt(req.params.level) || 0;
  const teams = await Team.find()
    .skip(level * 100)
    .limit(100);
  return res.status(200).json({ success: true, teams });
});

// Store Information from File to DB
exports.storeTeamInfo = asyncHandler(async (req, res) => {
  const teams = await parseFile();
  if (!teams) return res.status(404).json({ success: false });

  const teamsFromDb = await Team.find().sort({ Team_Name: 1 });
  let mapping = {};
  let indexMapping = {};
  let resTeam = {};
  const allteams = [];
  if (teamsFromDb) {
    let index = 0;
    for (let t of teamsFromDb) {
      mapping[t.Team_Name] = true;
      indexMapping[t.Team_Name] = index++;
    }
  }
  let hostname = getHostname(req, 3000);
  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];
    resTeam[team.Team_Name] = true;
    if (!mapping[team.Team_Name]) {
      let newTeam = new Team(team);
      await newTeam.save();
      allteams.push(newTeam);
    } else {
      let teamFromDb = teamsFromDb[indexMapping[team.Team_Name]];
      let anyChange = false;
      const notChangeFields = [
        'Team_Name',
        'payment_transition_id',
        'teamPaymentMailSend',
        'teamPaymentMailSendTime',
        'payment_status',
        'payment_date',
      ];
      for (let key in team) {
        let found = false;
        for (let ch of notChangeFields) {
          if (ch === key) {
            found = true;
            break;
          }
        }
        if (found) continue;
        if (teamFromDb[key] !== team[key]) {
          teamFromDb[key] = team[key];
          anyChange = true;
        }
      }
      allteams.push(teamFromDb);
      if (anyChange) {
        await teamFromDb.save();
      }
    }
  }
  if (teamsFromDb) {
    for (let t of teamsFromDb) {
      if (!resTeam[t.Team_Name]) {
        allteams.push(t);
      }
    }
  }
  // console.log(updatePaymentField(allteams));
  let modifyTeams = updatePaymentField(allteams);
  modifyTeams.sort((a, b) => a.Team_Name < b.Team_Name);
  return res.status(200).json({ success: true, teams: modifyTeams });
});

// Team Information from Database...
// exports.fetchRegisteredTeams = asyncHandler(async (req, res) => {
//   const teams = await Team.find().sort({ _id: -1 });
//   return res.status(200).json({ success: true });
// });

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

exports.uploadFAQ = async (req, res, next) => {
  return res.status(200).json({ success: true });
};

exports.email = async (req, res) => {
  const { data } = req.body;
  const { teams, teamName, subject, body } = data;

  if (teams == 'Single team') {
    const team = await Team.findOne({ Team_Name: teamName });
    const P = await sendTeamEmail(team, req, { subject, body });
    res.status(200).json({ success: true, msg: 'Emails sent successfully' });
  } else if (teams == 'Unpaid teams') {
    const unpaidTeams = await Team.find({ payment_status: 'Not Paid Yet' });
    const promises = [];

    for (let team of unpaidTeams) {
      const promise = new Promise((resolve, reject) => {
        sendTeamEmail(team, req, { subject, body });
        resolve(true);
      });
      promises.push(promise);
    }

    Promise.all(promises)
      .then((data) =>
        res.status(200).json({ success: true, msg: 'Emails sent successfully' })
      )
      .catch((data) =>
        res.status(200).json({ success: false, msg: 'Error sending emails' })
      );
  } else if (teams == 'Paid teams') {
    // const paidTeams = await Team.find({ payment_status: 'Paid' })
    const promises = [];
    const paidTeams = new Array(50).fill('team');
    console.log(paidTeams);
    let t = 0;
    for (let team of paidTeams) {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          sendTeamEmail(team, req, { subject, body })
            .then((data) => {
              resolve(true);
            })
            .catch((e) => {
              reject(e);
            });
          console.log(t);
        }, t * 30);
        t++;
      });
      promises.push(promise);
    }

    Promise.all(promises)
      .then((data) =>
        res.status(200).json({ success: true, msg: 'Emails sent successfully' })
      )
      .catch((data) =>
        res.status(200).json({ success: false, msg: 'Error sending emails' })
      );
  } else {
    let allTeams = await Team.find();

    const promises = [];

    for (let team of allTeams) {
      const promise = new Promise((resolve, reject) => {
        sendTeamEmail(team, req, { subject, body });
        resolve(true);
      });
      promises.push(promise);
    }

    Promise.all(promises)
      .then((data) =>
        res.status(200).json({ success: true, msg: 'Emails sent successfully' })
      )
      .catch((data) =>
        res.status(200).json({ success: false, msg: 'Error sending emails' })
      );
  }
};

exports.getTeams = async (req, res) => {
  const teams = await Team.find();
  res.status(200).json({
    success: true,
    teams,
  });
};
