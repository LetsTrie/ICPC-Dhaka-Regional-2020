const router = require('express').Router();
const multer = require('multer');

const C = require('../controller/admin');
const M = require('../middlewares/authorization');

let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let teamInfoFile = multer({ storage }).single('file');

router.post('/login', C.login);
// router.get('/teams', M.AdminAccess, C.fetchRegisteredTeams);
router.get('/team-file-xlsx', C.teamInfo);
router.post(
  '/team-file-xlsx-upload',
  [M.AdminAccess, teamInfoFile],
  C.storeTeamInfo
);
router.get('/download-team', C.downloadTeamInfos);
router.get('/teamInfo/:id', C.getATeamInfo);

// Committee
const committee = [
  'Steering Committee',
  'Executive Committee',
  'Judging Panel',
  'Sub-Committee',
];

const urlSlug = (url) => url.toLowerCase().split(' ').join('-');
for (let com of committee) {
  router.post(
    `/committee/${urlSlug(com)}`,
    [M.AdminAccess, multer({ storage }).single(urlSlug(com))],
    (req, res, next) => {
      return res.status(200).json({ success: true });
    }
  );
}

// Contest Info
const contestInfo = [
  'Rules of ICPC Dhaka Regional',
  'Informations for participants',
  'Accomodation',
  'Payment',
  'Program Schedule',
];

for (let con of contestInfo) {
  router.post(
    `/contestInfo/${urlSlug(con)}`,
    [M.AdminAccess, multer({ storage }).single(urlSlug(con))],
    (req, res, next) => {
      return res.status(200).json({ success: true });
    }
  );
}

// Contest Time
router.get('/contest-time', C.getContestTime);
router.post('/contest-time', M.AdminAccess, C.setContestTime);

// FAQ file
faqStore = multer({ storage }).single('faq');
// Post the faq.xls file
router.post('/faq/faq', [M.AdminAccess, faqStore], C.uploadFAQ);
// Get request handled in controller/contact.js

module.exports = router;
