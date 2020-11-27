const router = require('express').Router()

const C = require('../controller/admin');
const M = require('../middlewares/authorization');

router.post('/login', C.login);
router.get('/teams', M.AdminAccess, C.fetchRegisteredTeams);

// const { auth } = require('../middlewares/auth.js')
// const { adminAccess } = require('../middlewares/adminAcess')
// const { 
//   login,
//   getAllUsers, 
//   uploadImage,
//    loadGallery, 
//    uploadPDF, 
//    updateImageVisibility,
//    updateSubmenus,
//    clusterMail
//   } = require('../controller/admin.js')

// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'client/src/assests/gallery/');
//   },
//   filename: (req, file, cb) => {
//     const filename = 'gallery-image-' + Date.now().toString() + path.extname(file.originalname);
//     console.log('filename', filename)
//     cb(null, filename);
//   },
// });

// const pdfStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'data/demo');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname+'.pdf');
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// const uploads = multer({
//   storage: storage,
// }).single('image')

// const pdfUploads = multer({
//   storage: pdfStorage
// }).single('pdf')

// router.get('/getAllUsers', [auth, adminAccess], getAllUsers)
// router.post('/upload-image', [auth, adminAccess, uploads], uploadImage)
// router.get('/load-gallery', [auth, adminAccess], loadGallery)
// router.post('/upload-pdf', [auth, adminAccess, pdfUploads], uploadPDF)
// router.post('/update-image-visibility', [auth, adminAccess], updateImageVisibility)
// router.post('/update-submenu', [auth, adminAccess], updateSubmenus)
// router.post('/email', [auth, adminAccess], clusterMail)

module.exports = router