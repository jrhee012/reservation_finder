const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');
const logger = require('./logger');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// configure Mongoose
// console.log(config.MONGODB_URI)
// mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true }, err => {
//     if (err) console.log('err:', err);
//     console.log(`mongodb connected on: ${config.MONGODB_URI}`);
// });

try {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });
    // console.log(`mongodb connected on: ${config.MONGODB_URI}`);
    logger.trace(`mongodb connected on: ${config.MONGODB_URI}`);
    mongoose.set('debug', true);
    // console.log('mongoose `debug` set `true`');
    logger.trace('mongoose `debug` set `true`');
} catch (e) {
    // console.log(`cannot connect to mongodb on ${config.MONGODB_URI}!`);
    // console.error(e);
    logger.trace(`cannot connect to mongodb on ${config.MONGODB_URI}!`);
    logger.error(e);
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

// pass passport for configuration
require('./config/passport')(passport);

// router(server);
server.use(require('./routes'));

module.exports = server;
