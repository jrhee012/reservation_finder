const utils = require('./helpers/utils');

exports.getLogin = (req, res) => {
    console.log('login page!');
    console.log(req.flash('error'))
    let data = utils.setSessionUser(req);
    return res.status(200)
        .render('pages/login/login', data);
        // .render('pages/login/login', {
        //     message: ['wwww'],
        //     messages: req.flash('error'),
        //     errors: req.flash('error'),
        //     user: req.user ? req.user : {},
        // });
}

exports.getSignUp = (req, res) => {
    console.log('sign up page!');
    console.log(req.flash('signupMessage'))
    let data = utils.setSessionUser(req);
    return res.status(200)
        .render('pages/login/signup', data);
    // return res.status(200)
    //     .render('pages/login/signup', {
    //         messages: req.flash('signupMessage'),
    //         user: req.user ? req.user : {},
    //     });
}
