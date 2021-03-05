// Packages
const excelToJson = require('convert-excel-to-json');
const path = require('path');
// Models
const Payment = require('../models/payment');

const urlSlug = (url) =>
  url.toLowerCase().split(' ').join('.').split('_').join('-');

exports.parseFile = async () => {
  try {
    let sourceFile = path.join(__dirname, '..', 'uploads', 'teams.xlsx');
    let result = excelToJson({ sourceFile })['Sheet1'];

    const keys = Object.values(result[0]).map((k) => k.split(' ').join('_'));
    const infos = result.slice(1);

    const allTeamsFromDb = await Payment.find({});
    let mapping = {};
    for (let t of allTeamsFromDb) mapping[t.Team_Name] = 1;

    let teams = [];
    for (let i = 0; i < infos.length; i++) {
      let team = {};
      let values = Object.values(infos[i]);
      for (let j = 0; j < keys.length; j++) team[keys[j]] = values[j];
      team['payment_status'] = 'Not Paid Yet';
      if (mapping[team.Team_Name]) team['payment_status'] = 'Paid';
      teams.push(team);
    }
    teams.sort((a, b) => a.University > b.University);
    return teams;
  } catch (error) {
    return null;
  }
};
