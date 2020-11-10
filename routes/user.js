const { Router } = require("express");
const router = require('express').Router()
const { getNavbar, contactUs } = require('../controller/user.js');
const { auth } = require('../middlewares/auth.js')

router.get('/getNavbar', getNavbar)
router.post('/contactUs', contactUs)

module.exports = router