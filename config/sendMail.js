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
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: address,
    subject: `ICPC Query - ${category}`,
    html: `<strong>Name:</strong> ${name}<br /><strong>Email:</strong> ${email}<br /><strong>Query:</strong> ${message}<br /><a href="mailto:${email}">Reply to ${email}</a>`,
  };
  res =  await Transport.sendMail(mailOptions);
  console.log(res)
  return 
};
