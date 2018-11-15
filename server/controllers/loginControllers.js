exports.getLogin = (req, res) => {
    console.log('login page!');
    console.log(req.flash('error'))
    return res.status(200)
        .render('pages/login/login', {
            message: ['wwww'],
            messages: req.flash('error'),
            errors: req.flash('error'),
        });
}

exports.getSignUp = (req, res) => {
    console.log('sign up page!');
    console.log(req.flash('signupMessage'))
    return res.status(200)
        .render('pages/login/signup', {
            messages: req.flash('signupMessage')
        });
}
