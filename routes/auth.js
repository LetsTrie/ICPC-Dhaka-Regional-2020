const multer = require('multer');

const C = require('../controller/auth.js');
const router = require('express').Router();
const { auth } = require('../middlewares/auth.js');
const M = require('../middlewares/authorization');
let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

var registerUpload = multer({ storage }).fields([
  { name: 'coachDp' },
  { name: 'p1Dp' },
  { name: 'p2Dp' },
  { name: 'p3Dp' },
]);

router.post('/register/info', C.registerInfo);
router.post('/register/upload', registerUpload, C.registerUpload);
router.get('/register/payment/init', C.paymentInitiate);
router.post('/register/payment/IpnListener', C.paymentIpnListener);
router.post('/register/payment/unsuccessful', C.paymentUnseccessful);
router.post('/register/payment/failed', C.paymentFailed);

router.post('/login', C.teamLogin);

router.get('/teamInformation', M.verifyToken, C.teamInformation);
router.post('/update-password', M.verifyToken, C.updatePassword);

router.get('/teamPaymentInitiate/:id', C.teamPaymentInitiate);

module.exports = router;
