const express = require('express');

const router = express.Router();

router.use('/api', require('./api'));

router.use('/', require('./login'));
router.use('/', require('./server'));

module.exports = router;
