const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const InstagramStrategy = require('passport-instagram').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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
        async function (req, username, password, done) {
            try {
                let user = await Users.findOne({ 'local.username': username });

                if (!user) {
                    return done(null, false, req.flash('error', 'Incorrect username.'));
                }

                if (!user.validatePassword(password)) {
                    return done(null, false, req.flash('error', 'Incorrect password.'));
                }

                user.last_login_at = new Date().toISOString();
                await user.save();
                return done(null, user);
            } catch (e) {
                console.error(e);
                return done(e);
            }
        }
    ));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use('local-signup', new LocalStrategy(
        { passReqToCallback: true },
        async function (req, username, password, done) {
            try {
                let user = await Users.findOne({ 'local.username': username });

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                }

                user = new Users();
                user.local.username = username;
                user.local.password = user.setPassword(password);
                user.created_at = new Date().toISOString();
                user.last_login_at = new Date().toISOString();
                await user.save();

                return done(null, user);
            } catch (e) {
                console.error(e);
                return done(e);
            }
        })
    );

    // =========================================================================
    // GOOGLE LOGIN ============================================================
    // =========================================================================

    passport.use(new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        async function(accessToken, refreshToken, profile, done) {
            try {
                let user = await Users.findOne({ 'google.id': profile.id });

                if (!user) {
                    let googleResp = {
                        id: profile.id,
                        token: accessToken,
                        email: profile.email,
                        name: profile.name,
                        full_profile: profile,
                    }
                    user = new Users();
                    user.google = googleResp;
                    user.last_login_at = new Date().toISOString();

                    let savedUser = await user.save();
                    return done(null, savedUser);
                }
                user.last_login_at = new Date().toISOString();
                await user.save();
                done(null, user);
            } catch (e) {
                console.log('google login error');
                console.error(e);
                return done(e);
            }
        }
    ));

    // =========================================================================
    // FACEBOOK LOGIN ==========================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
        clientID: config.FACEBOOK_APP_ID,
        clientSecret: config.FACEBOOK_APP_SECRET,
        callbackURL: "https://3dacaee4.ngrok.io/auth/facebook/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                let user = await Users.findOne({ 'facebook.id': profile.id });

                if (!user) {
                    let fBResp = {
                        id: profile.id,
                        token: accessToken,
                        username: profile.username,
                        displayName: profile.displayName,
                        name: profile.name,
                        gender: profile.gender,
                        profileUrl: profile.profileUrl,
                        provider: profile.provider,
                        full_profile: profile,
                    };
                    user = new Users();
                    user.facebook = fBResp;
                    user.last_login_at = new Date().toISOString();

                    let savedUser = await user.save();
                    return done(null, savedUser);
                }
                user.last_login_at = new Date().toISOString();
                await user.save();
                done(null, user);
            } catch (e) {
                console.log('facebook login error');
                console.error(e);
                return done(e);
            }
        }
    ));

    // =========================================================================
    // INSTAGRAM LOGIN =========================================================
    // =========================================================================
    // passport.use(new InstagramStrategy({
    //     clientID: config.INSTAGRAM_CLIENT_ID,
    //     clientSecret: config.INSTAGRAM_CLIENT_SECRET,
    //     callbackURL: "http://127.0.0.1:3000/auth/instagram/callback"
    // },
    //     function (accessToken, refreshToken, profile, done) {
    //         Users.findOrCreate({ instagramId: profile.id }, function (err, user) {
    //             return done(err, user);
    //         });
    //     }
    // ));
}
