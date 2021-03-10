const nodemailer = require('nodemailer');
const getHostname = require('../utils/getHostname');
const Team = require('../models/team')

const Transport = nodemailer.createTransport({
  pool: true,
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: false,
  debug: false,
  // secureConnection: 'false',
  // secure: false,
  // tls: {
  //   ciphers: 'SSLv3',
  //   rejectUnauthorized: false,
  // },
});

exports.sendEmail = async (address, data) => {
  const { name, email, category, message } = data;
  const query_id = Math.floor(1000000 + Math.random() * 9000000);
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: address,
    subject: `ICPC Query - ${category} - ${query_id}`,
    html: `<strong>Name:</strong> ${name}<br /><strong>Email:</strong> ${email}<br /><strong>Query:</strong> ${message}<br /><a href="mailto:${email}">Reply to ${email}</a>`,
  };
  res = await Transport.sendMail(mailOptions);
  return query_id;
};

const sendCustomMail = async (address, subject, body) => {
  let mailOptions = {
    from: 'ICPC 2020',
    to: address,
    subject: subject,
    html: body,
  };
  return Transport.sendMail(mailOptions);
};


exports.sendTeamEmail = async (team, req, data) => {
  let { subject, body } = data;
  let emails = [team.Coach_Email, team.Member1_Email, team.Member2_Email, team.Member3_Email]
  let names = [team.Coach, team.Member1, team.Member2, team.Member3]
  const hostname = getHostname(req, 3000);
  const url = `${hostname}/payment/${team._id}`;

  let responses = [];
  try {
    for (let i = 0; i < emails.length; i++) {
      const replacedBody = body
      .replace(/<team>/g, team.Team_Name)
      .replace(/<name>/g, names[i])
      .replace(/<coach>/g, team.Coach)
      .replace(/<member1>/g, team.Member1)
      .replace(/<member2>/g, team.Member2)
      .replace(/<member3>/g, team.Member3)
      .replace(/<payment_link>/g, url)

      const response = await sendCustomMail(emails[i], subject, replacedBody);
      responses.push(response.accepted[0]);

      // TODO: Use regular expression. otherwise only the first one will be replaced.
      // console.log(replacedBody);
      // promise = new Promise(async (resolve, reject) => {
      //   result = await sendCustomMail(emails[i], subject, replacedBody);
      // });
      // promises.push(promise);
    }
    return responses;
  } catch (e) {
    throw e
  }
  Transport.close();
};

exports.confirmationEmail = async (team, data) => {
  const { subject, body } = data
  let emails = [team.Coach_Email, team.Member1_Email, team.Member2_Email, team.Member3_Email]
  let promises = []

  for (let email of emails) {
    promises.push(new Promise ((resolve, reject) => {
      sendCustomMail(email, subject, body)
      resolve(true)
    }))
  }

  Promise.all(promises)
}