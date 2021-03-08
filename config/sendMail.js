const nodemailer = require('nodemailer');

const Transport = nodemailer.createTransport({
  // name: 'gmail.com',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true,
  debug: true,
  // secureConnection: 'false',
  secure: false,
  // tls: {
  //   ciphers: 'SSLv3',
  //   rejectUnauthorized: false,
  // },
});

exports.sendEmail = async (address, data) => {
  const { name, email, category, message } = data
  const query_id = Math.floor(1000000 + Math.random() * 9000000)
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: address,
    subject: `ICPC Query - ${category} - ${query_id}`,
    html: `<strong>Name:</strong> ${name}<br /><strong>Email:</strong> ${email}<br /><strong>Query:</strong> ${message}<br /><a href="mailto:${email}">Reply to ${email}</a>`,
  };
  res =  await Transport.sendMail(mailOptions);
  return query_id
};

const sendCustomMail = async (address, subject, body) => {
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: address,
    subject: subject,
    html: body,
  };
  await Transport.sendMail(mailOptions);
  return 
};

exports.sendTeamEmail = async (team, data) => {
  let { subject, body } = data
  let emails = [team.Coach_Email, team.Member1_Email, team.Member2_Email, team.Member3_Email]
  let names = [team.Coach, team.Member1, team.Member2, team.Member3]
  
  let promises = []
  for (let i=0; i<emails.length; i++) {
    const replacedBody = body.replace('<team>', team.Team_Name).replace('<name>', names[i])
    promise = new Promise(async(resolve, reject) => {
       await sendCustomMail(emails[i], subject, replacedBody)
       resolve(true)
    })
    promises.push(promise)
  }

  Promise.all(promises).then((data) => { console.log(data) })
}
