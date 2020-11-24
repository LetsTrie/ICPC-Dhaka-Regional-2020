const nodemailer = require('nodemailer');

const Transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'safwan.du16@gmail.com',
    pass: process.env.Mail_Password,
  },
});

exports.passwordResetMail = async (email, type) => {
  const mailBody = ` <strong>Dear User</strong>
  <br>
  Seems like you just forgot your password.
  <br>
  Click 
  <a href="http://bad-blogger.herokuapp.com/admin/reset_password?email=${email}&usertype=${type}">here</a>
  to reset your password.<br>
  
   <br> 
   Nice day!`;
  let mailOptions = {
    from: 'manager@trin-innovation.com',
    to: email,
    subject: 'Moner Shastho - Password reset link',
    html: mailBody,
  };

  return await Transport.sendMail(mailOptions);
};

exports.sendClusterMail = async (address, subject, body) => {
  let mailOptions = {
    from: 'ICPC Dhaka Regionals 2021',
    to: address, //zaidfarzan@aol.com
    subject: subject,
    html: body,
  };

  return await Transport.sendMail(mailOptions);
};
