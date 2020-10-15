const router = require('express').Router();
const CI = require('../controller/contestInfo.js');

router.get('/file/:slug', CI.sendFile);

module.exports = router;