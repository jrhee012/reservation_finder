const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const config = require('../config');

module.exports = server => {
    server.use(cookieParser())
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(flash());
    server.use(session({ secret: 'cats' }));
    server.use(morgan('[:date[iso]] :method :url :status :response-time ms :remote-addr :remote-user'));
    server.use(passport.initialize());
    server.use(passport.session());

    if (config.NODE_ENV !== 'production') {
        server.use(errorHandler());
    }
}
