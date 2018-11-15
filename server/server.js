const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes');

const viewsPath = './server/views';
const publicPath = './server/public';

const server = express();

// use ejs for view engine for express server
server.use(express.static(path.resolve(publicPath)));
server.set('views', path.resolve(viewsPath));
server.set('view engine', 'ejs');

// middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan('[:date[iso]] :method :url :status :response-time ms :remote-addr :remote-user'));

router(server);

module.exports = server;
