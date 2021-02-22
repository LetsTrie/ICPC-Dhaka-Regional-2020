const router = require('express').Router();
const CU = require('../controller/contact.js');

router.post('/', CU.receiveMessage);
router.get('/getFAQ', CU.getFAQ);

module.exports = router;