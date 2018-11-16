const express = require('express');
const utils = require('../../controllers/helpers/utils');

const router = express.Router();

router.use('/search', require('./search'));

router.get('/', (req, res) => {
    let data = utils.setSessionUser(req);
    console.log('session', req.session)
    return res.status(200).render('pages/home', data);
});

module.exports = router;
