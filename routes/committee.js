const router = require('express').Router();
const CI = require('../controller/committee.js');

router.get('/file/:slug', CI.sendFile);

module.exports = router;