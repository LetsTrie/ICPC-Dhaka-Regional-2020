const { Router } = require("express");
const router = require('express').Router()
const { auth } = require('../middlewares/auth.js')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('[server]', req.files);
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    const filename = 'image.jpeg';
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
uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([{name: 'image'}])

const {
  postRegister,
  postLogin,
  createPost,
  uploadImage
} = require('../controller/auth.js')

router.post('/register', postRegister)
router.post('/login', postLogin)
router.post('/create', auth, createPost)
router.post('/upload', uploads, uploadImage)

module.exports = router