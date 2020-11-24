const router = require('express').Router();

router.use('/contest-info', require('./routes/contestInfo'));
router.use('/committee', require('./routes/committee'));
router.use('/auth', require('./routes/auth'));
router.use('/profile', require('./routes/profile'));
router.use('/user', require('./routes/user'))
router.use('/admin', require('./routes/admin'));
router.use('/contact', require('./routes/contact'));

module.exports = router;