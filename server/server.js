const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');
const logger = require('./logger');

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

try {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

    logger.trace(`mongodb connected on: ${config.MONGODB_URI}`);

    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
        logger.trace('mongoose `debug` set `true`');
    }
} catch (e) {
    logger.trace(`cannot connect to mongodb on ${config.MONGODB_URI}!`);
    logger.error(e);

    process.exit(1);
}

const viewsPath = './server/views';
const publicPath = './server/public';

const server = express();

// use ejs for view engine for express server
server.use(express.static(path.resolve(publicPath)));
server.set('views', path.resolve(viewsPath));
server.set('view engine', 'ejs');

// middleware
require('./middleware')(server);

// requirece routes and models
require('./models/Users');
require('./models/RawData');

// pass passport for configuration
require('./config/passport')(passport);

// router(server);
server.use(require('./routes'));

module.exports = server;
