const express = require('express');

const router = express.Router();

const isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.use('/api', require('./api'));

router.use('/', require('./login'));
router.use('/', require('./server'));

module.exports = router;
