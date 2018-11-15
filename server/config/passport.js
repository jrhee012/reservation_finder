const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config');

const Users = mongoose.model('Users');

module.exports = passport => {
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Users.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use(new LocalStrategy(
        { passReqToCallback: true },
        function (req, username, password, done) {
            Users.findOne({ 'local.username': username }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, req.flash('error', 'Incorrect username.'));
                }

                if (!user.validatePassword(password)) {
                    return done(null, false, req.flash('error', 'Incorrect password.'));
                }

                return done(null, user);
            });
        }
    ));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy(
        { passReqToCallback: true },
        function (req, username, password, done) {
            process.nextTick(function () {
                Users.findOne({ 'local.username': username }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        let newUser = new Users();

                        newUser.local.username = username;
                        newUser.local.password = newUser.setPassword(password);

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        })
    );

    // =========================================================================
    // GOOGLE LOGIN ============================================================
    // =========================================================================

    passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
    },
        function (accessToken, refreshToken, profile, cb) {
            Users.findOrCreate({ googleId: profile.id }, function (err, user) {
                return cb(err, user);
            });
        }
    ));
}
