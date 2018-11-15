const express = require('express');

const router = express.Router();

router.use('/search', require('./search'));

router.get('/', (req, res) => res.status(200)
    .render('pages/home'));

module.exports = router;
