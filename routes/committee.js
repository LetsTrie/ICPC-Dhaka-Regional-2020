const router = require('express').Router();
const CM = require('../controller/committee.js');

router.get('/file/:slug', CM.sendFile);

module.exports = router;