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

exports.sendEmail = async (address, subject, body) => {
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: 'safwan.du16@gmail.com',
    subject: subject,
    html: body,
  };

  res =  await Transport.sendMail(mailOptions);
  console.log(res)
  return 
};
