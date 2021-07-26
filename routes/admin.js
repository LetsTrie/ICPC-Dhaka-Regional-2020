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

router.get('/team-file-xlsx', C.teamInfo);
router.get('/selected-team-file-xlsx', C.selectedTeamInfo);

router.get('/teamInfo/:id', C.getATeamInfo);
router.get('/selectedTeamInfo/:id', C.getASelectedTeamInfo);

router.get('/par-team-info/:level', C.partialTeamInformation);
router.get('/par-selected-team-info/:level', C.partialSelectedTeamInformation);

router.post('/team-file-xlsx-upload', teamInfoFile, C.storeTeamInfo);
router.post(
  '/selected-team-file-xlsx-upload',
  teamInfoFile,
  C.storeSelectedTeamInfo
);
router.get('/download-team', C.downloadTeamInfos);
router.get('/download-selected-team', C.downloadSelectedTeamInfos);

// Committee
const committee = ['Steering Committee', 'Judging Panel', 'Sub-committees'];

const urlSlug = (url) => url.toLowerCase().split(' ').join('-');
for (let com of committee) {
  router.post(
    `/committee/${urlSlug(com)}`,
    multer({ storage }).single(urlSlug(com)),
    (req, res, next) => {
      return res.status(200).json({ success: true });
    }
  );
}

// Contest Info
const contestInfo = [
  'Rules of ICPC Dhaka Regional',
  'Information for participants',
  'Program Schedule',
  'Qualification Criteria',
];

for (let con of contestInfo) {
  router.post(
    `/contestInfo/${urlSlug(con)}`,
    multer({ storage }).single(urlSlug(con)),
    (req, res, next) => {
      return res.status(200).json({ success: true });
    }
  );
}

router.post(
  `/teams/${urlSlug('Selected Teams for Dhaka Regional')}`,
  multer({ storage }).single(urlSlug('Selected Teams for Dhaka Regional')),
  (req, res, next) => {
    return res.status(200).json({ success: true });
  }
);

// Contest Time
router.get('/contest-time', C.getContestTime);
router.post('/contest-time', C.setContestTime);

// FAQ file
faqStore = multer({ storage }).single('faq');
// Post the faq.xls file
router.post('/faq/faq', faqStore, C.uploadFAQ);
// Get request handled in controller/contact.js

router.post('/email', C.email);
router.get('/getTeams', C.getTeams);

router.get('/addTeam', C.addTeam);
module.exports = router;
