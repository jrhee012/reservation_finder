// const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const loginControllers = require('../../controllers/loginControllers');

router.get('/login/facebook', (req, res) => res.redirect('/auth/facebook'));
router.get('/login/google', (req, res) => res.redirect('/auth/google'));
router.get('/login', loginControllers.getLogin);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/signup', loginControllers.getSignUp);
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
}));

// GOOGLE AUTH
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true,
    }),
    (req, res) => {
        // console.log('!!!!!')
        return res.send(200)
    },
);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));

// facebook
router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        console.log('!!!!!')
        return res.redirect('/profile');
    },
);
router.get('/auth/facebook', passport.authenticate('facebook'));


module.exports = router;
