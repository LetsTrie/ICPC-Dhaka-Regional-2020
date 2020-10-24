const { Router } = require("express");
const router = require('express').Router()
const { getUser, updatePasswords, updateEmail, updateProfile } = require('../controller/profile.js');
const { auth } = require('../middlewares/auth.js')

router.get('/getUser', auth, getUser)
router.post('/update/password', auth, updatePasswords)
router.post('/update/email', auth, updateEmail)
router.post('/update/profile', auth, updateProfile)

module.exports = router