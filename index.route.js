const router = require('express').Router();

router.use('/contest-info', require('./routes/contestInfo'));
router.use('/committee', require('./routes/committee'));
router.use('/auth', require('./routes/auth'));
router.use('/profile', require('./routes/profile'));

module.exports = router;