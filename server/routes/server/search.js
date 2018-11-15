// const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const searchControllers = require('../../controllers/searchControllers');

const passportAuth = passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
})

router.get('/', auth.optional, searchControllers.search)

module.exports = router;
