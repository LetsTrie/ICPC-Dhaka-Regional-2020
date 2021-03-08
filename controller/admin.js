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

const { sendTeamEmail } = require('../config/sendMail')

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
  let teams = await Team.find();
  if (!teams) return res.status(404).json({ success: false });
  let modifyTeams = updatePaymentField(teams);
  modifyTeams.sort((a, b) => a.Team_Name < b.Team_Name);
  return res.status(200).json({ success: true, teams: modifyTeams });
});

// Store Information from File to DB
exports.storeTeamInfo = asyncHandler(async (req, res) => {
  const teams = await parseFile();
  if (!teams) return res.status(404).json({ success: false });

  const teamsFromDb = await Team.find();
  let mapping = {};
  const allteams = [...teamsFromDb];
  if (teamsFromDb) for (let t of teamsFromDb) mapping[t.Team_Name] = true;
  let hostname = getHostname(req, 3000);
  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];
    if (!mapping[team.Team_Name]) {
      let newTeam = new Team(team);
      await newTeam.save();
      allteams.push(newTeam);

      // Client Side URL is: [send this link to the mail for payment.]
      const url = `${hostname}/payment/${newTeam._id}`;
      console.log(url);

      // TODO: SAFWAN [Send mail to these emails] -- DONE
      // Need to know: kader kader mail pathate hobe
      // Unique Team Id: team.team_id
      // send email: team.Coach_Email
      // send email: team.Member1_Email
      // send email: team.Member2_Email
      // send email: team.Member3_Email

      const data = {
        subject: `ICPC Payment`,
        body: `Please click on the following link, ${url}`
      }
      sendTeamEmail(newTeam, data)
    }
  }
  return res
    .status(200)
    .json({ success: true, teams: updatePaymentField(allteams) });
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
}

exports.email = async (req, res) => {
  const { data } = req.body
  const { teams, teamName, subject, body } = data

  if (teams == 'Single team') {
    const team = await Team.findOne({ Team_Name: teamName })
    await sendTeamEmail(team, { subject, body })
    res.status(200).json({ success: true, msg: 'Emails sent successfully' })

} else if (teams == 'Unpaid teams') {
  const unpaidTeams = await Team.find({ payment_status: 'Not Paid Yet' })
  const promises = []

  for (let team of unpaidTeams) {
    const promise = new Promise((resolve, reject) => {
      sendTeamEmail(team, {subject, body})
      resolve(true)
    })
    promises.push(promise)
  }
  
  Promise.all(promises).then(data => res.status(200).json({ success: true, msg: 'Emails sent successfully' })).catch(data => res.status(200).json({ success: false, msg: 'Error sending emails' }))

} else if (teams == 'Paid teams') {
  const paidTeams = await Team.find({ payment_status: 'Paid' })
  const promises = []

  for (let team of paidTeams) {
    const promise = new Promise((resolve, reject) => {
      sendTeamEmail(team, {subject, body})
      resolve(true)
    })
    promises.push(promise)
  }
  
  Promise.all(promises).then(data => res.status(200).json({ success: true, msg: 'Emails sent successfully' })).catch(data => res.status(200).json({ success: false, msg: 'Error sending emails' }))

} else {
  let allTeams = await Team.find()

  const promises = []

  for (let team of allTeams) {
    const promise = new Promise((resolve, reject) => {
      sendTeamEmail(team, {subject, body})
      resolve(true)
    })
    promises.push(promise)
  }
  
  Promise.all(promises).then(data => res.status(200).json({ success: true, msg: 'Emails sent successfully' })).catch(data => res.status(200).json({ success: false, msg: 'Error sending emails' }))

}

}

exports.getTeams = async (req, res) => {
  const teams = await Team.find()
  res.status(200).json({
    success: true,
    teams
  })
}