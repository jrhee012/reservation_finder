const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const InstagramStrategy = require('passport-instagram').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const config = require('../config');

const Users = mongoose.model('Users');

// const cbForAuth = function (err, user) {
//     if (err) {
//         return done(err);
//     }
//     user.last_login_at = new Date().toISOString();
//     // return done(null, user);

//     user.save(function (err) {
//         if (err) throw err;
//         return done(null, user);
//     });
// }

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

                // user.update({}, { $set: { last_login_at: new Date() } });
                // return done(null, user);

                user.last_login_at = new Date().toISOString();
                user.save(function (err) {
                    if (err) throw err;
                    return done(null, user);
                });
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
                        newUser.created_at = new Date().toISOString();
                        newUser.last_login_at = new Date().toISOString();

                        newUser.save(function (err) {
                            if (err) throw err;
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

    passport.use(new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        function(accessToken, refreshToken, profile, done) {
            Users.findOneAndUpdate(
                {
                    google: {
                        id: profile.id,
                    },
                },
                {
                    google: {
                        id: profile.id,
                        token: accessToken,
                        email: profile.email,
                        name: profile.name,
                        full_profile: profile,
                    },
                },
                {
                    new: true,
                    upsert: true,
                },
                function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user.created_at === null || user.created_at || undefined) {
                        user.created_at = new Date().toISOString();
                    }
                    user.last_login_at = new Date().toISOString();
                    // return done(null, user);

                    user.save(function (err) {
                        if (err) throw err;
                        return done(null, user);
                    });
                }
            );
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
        function (accessToken, refreshToken, profile, done) {
            console.log('profile:', profile);
            console.log('token: ', accessToken);
            console.log('refresh: ', refreshToken);
            Users.findOneAndUpdate(
                {
                    facebook: {
                        id: profile.id,
                    },
                },
                {
                    facebook: {
                        id: profile.id,
                        token: accessToken,
                        username: profile.username,
                        displayName: profile.displayName,
                        name: profile.name,
                        gender: profile.gender,
                        profileUrl: profile.profileUrl,
                        provider: profile.provider,
                        full_profile: profile,
                    },
                },
                {
                    new: true,
                    upsert: true,
                },
                function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user.created_at === null || user.created_at || undefined) {
                        user.created_at = new Date().toISOString();
                    }
                    user.last_login_at = new Date().toISOString();
                    // return done(null, user);

                    user.save(function (err) {
                        if (err) throw err;
                        return done(null, user);
                    });
                }
            );
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
