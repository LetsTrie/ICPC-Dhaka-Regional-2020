// Packages
const excelToJson = require('convert-excel-to-json');
const path = require('path');
// Models
const Payment = require('../models/payment');

const urlSlug = (url) =>
  url.toLowerCase().split(' ').join('.').split('_').join('-');

exports.parseFile = async () => {
  let result = excelToJson({
    sourceFile: path.join(__dirname, '..', 'uploads', 'teams.xls'),
  }).allTeamsTable;
  let teams = [];
  const allTeamsFromDb = await Payment.find({});
  let mapping = {};
  for (let t of allTeamsFromDb) mapping[t.team] = 1;

  for (let i = 1; i < result.length; i++) {
    teams.push({
      teamId: urlSlug(result[i]['C']),
      [result[0]['C']]: result[i]['C'],
      [result[0]['D']]: result[i]['D'],
      [result[0]['E']]: result[i]['E'],
      [result[0]['F']]: result[i]['F'],
      'Payment Status': mapping[result[i]['C']] ? 'Paid' : 'Not Paid Yet',
    });
  }
  teams.sort((a, b) => a.Team > b.Team);
  return teams;
};
