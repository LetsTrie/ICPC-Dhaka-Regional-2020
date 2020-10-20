const { Router } = require("express");
const router = require('express').Router()
const { auth } = require('../middlewares/auth.js')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('here');
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    const filename = req.body.filename;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array('images', 3);

const {
  postRegister,
  postLogin,
  createPost
} = require('../controller/auth.js')

router.post('/register', upload, postRegister)
router.post('/login', postLogin)
router.post('/create', auth, createPost)

module.exports = router