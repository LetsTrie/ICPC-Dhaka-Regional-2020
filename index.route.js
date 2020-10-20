const router = require('express').Router();

router.use('/contest-info', require('./routes/contestInfo'));
router.use('/committee', require('./routes/committee'));
router.use('/auth', require('./routes/auth'));

module.exports = router;