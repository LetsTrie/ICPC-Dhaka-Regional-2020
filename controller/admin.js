const Team = require('../models/team');
const jwt = require('jsonwebtoken');
const adminCred = require('../config/adminCredentials');

// const User = require('../models/users.js');
// const fs = require('fs');
// const path = require('path');
// const { sendClusterMail } = require('../config/sendMail.js');

exports.fetchRegisteredTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ _id: -1});
    return res.status(200).json({
      success: true,
      teams,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (username !== adminCred.username || password !== adminCred.password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }

  const accessToken = await jwt.sign(
    { id: adminCred.id },
    process.env.JWT_SECRET,
    { expiresIn: '420h' }
  );
  console.log(accessToken);
  return res.status(200).json({
    success: true,
    accessToken,
  });
};

// exports.getAllUsers = async (req, res) => {
//   const users = await User.find();
//   const participantCount = users
//     .map((user) => user.membersInfo.length)
//     .reduce((total, val) => {
//       return total + val;
//     });
//   res.json({
//     status: true,
//     users,
//     participantCount,
//   });
// };

// exports.uploadImage = async (req, res) => {
//   const galleryFile = path.resolve('data', 'gallery-images.json');
//   fs.readFile(galleryFile, 'utf8', function (err, data) {
//     if (err) throw err;
//     let gallery = JSON.parse(data);
//     const image = {
//       name: req.file.filename,
//       visibility: true,
//     };
//     gallery.push(image);
//     console.log(gallery);
//     fs.writeFileSync(galleryFile, JSON.stringify(gallery));
//     res.json({
//       status: true,
//       msg: 'Image added to the gallery',
//       gallery,
//     });
//   });
// };

// exports.loadGallery = async (req, res) => {
//   console.log('load');
//   const galleryFile = path.resolve('data', 'gallery-images.json');
//   fs.readFile(galleryFile, 'utf8', function (err, data) {
//     if (err) throw err;
//     let gallery = JSON.parse(data);
//     res.json({
//       status: true,
//       msg: 'Gallery loaded',
//       gallery,
//     });
//   });
// };

// exports.uploadPDF = async (req, res) => {
//   res.json({
//     status: true,
//     msg: 'File upload successful',
//   });
// };

// exports.updateImageVisibility = async (req, res) => {
//   const galleryFile = path.resolve('data', 'gallery-images.json');
//   const { name, visibility } = req.body;

//   fs.readFile(galleryFile, 'utf8', function (err, data) {
//     if (err) throw err;
//     let gallery = JSON.parse(data);
//     gallery[
//       gallery.findIndex((img) => {
//         return img.name == name;
//       })
//     ].visibility = visibility;
//     gallery = JSON.stringify(gallery);
//     fs.writeFileSync(galleryFile, gallery);
//     res.json({
//       status: true,
//       msg: 'Gallery imge visibility updated',
//       gallery,
//     });
//   });
// };

// exports.updateSubmenus = async (req, res) => {
//   const navbarFile = path.resolve('data', 'navbar.json');
//   const { index, body } = req.body;
//   console.log(req.body);
//   fs.readFile(navbarFile, 'utf8', function (err, data) {
//     if (err) {
//       throw err;
//     }
//     let navbar = JSON.parse(data);
//     navbar[index].submenu = body;
//     navbar = JSON.stringify(navbar);
//     fs.writeFileSync(navbarFile, navbar);
//     res.json({
//       status: true,
//       msg: 'Submenu updated',
//     });
//   });
// };

// exports.clusterMail = async (req, res) => {
//   console.log(req.body);
//   let mailingList = [];
//   const { audience, subject, body } = req.body;
//   const users = await User.find();
//   mailingList = users.map((user) => user.email);
//   let memberEmails = [];

//   if (audience == 'all') {
//     const memberArrays = users.map((user) => user.membersInfo);
//     for (let arr of memberArrays) {
//       for (let member of arr) {
//         memberEmails.push(member.memberEmail);
//       }
//     }
//     mailingList = mailingList.concat(memberEmails);
//   }

//   // for (let address of mailingList) {
//   //   sendClusterMail(address, subject, body)
//   // }

//   res.json({
//     status: true,
//     msg: 'Email has been sent',
//   });
// };
