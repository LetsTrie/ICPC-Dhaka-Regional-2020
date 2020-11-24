const router = require('express').Router();
const CU = require('../controller/contact.js');

router.post('/', CU.receiveMessage);

module.exports = router;