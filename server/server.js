const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// configure Mongoose
mongoose.connect(config.MONGODB_URI);
mongoose.set('debug', true);

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
