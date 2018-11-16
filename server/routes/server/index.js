const express = require('express');
const utils = require('../../controllers/helpers/utils');

const router = express.Router();
const isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    return res.redirect('/login');
}

// router.use('/search', isLoggedIn, require('./search'));
router.use('/search', require('./search'));
router.use('/users', require('./users'));

router.get('/', (req, res) => {
    let data = utils.setSessionUser(req);
    // console.log('session', req.session)
    return res.status(200).render('pages/home', data);
});

module.exports = router;
