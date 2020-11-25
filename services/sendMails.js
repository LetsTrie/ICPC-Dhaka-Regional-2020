// const nodemailer = require('nodemailer');
// const { emailID, emailPassword, port } = require('./config');

// const adminEmail = process.env.ADMIN_EMAIL;
// const adminPassword = process.env.ADMIN_PASSWORD;

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: adminEmail,
//     pass: adminPassword
//   }
// });

// const host = `http://localhost:5000/api/v1`;

// exports.sendMailToAdmin = () => {
//   const mailOptions = {
//     from: emailID,
//     to: usermail,
//     subject: 'Contact us - ACM ICPC 2020',
//     html: `
//       <div> 
//       <p>Hi ${username},</p>
//       <p>Thank you for registration. Click Here for verify your account.</p>
//       <div> <a href="${link}">Verify account</a> </div>
//       </div>
//     `
//   };

//   return transporter.sendMail(mailOptions);
// }