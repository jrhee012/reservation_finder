const isEmpty = require('lodash/isEmpty');
const utils = require('./helpers/utils');
const logger = require('../logger');

exports.getProfile = async (req, res) => {
    try {
        let user = await utils.getUser(req.session.passport.user);
        let data = { user: user };

        // console.log('aaa', data)

        if (isEmpty(data)) {
            return res.redirect('/');
        }

        return res.status(200)
            .render('pages/profile/index', data);
    } catch (e) {
        logger.trace('get profile error');
        logger.error(e);
        return res.redirect('/');
    }
}

exports.updateProfile = async (req, res) => {
    try {
        let user = await utils.getUser(req.session.passport.user);
        let data = { user: user };

        if (isEmpty(data)) {
            return res.redirect('/');
        }

        return res.status(200)
            .render('pages/profile/update', data);
    } catch (e) {
        logger.trace('update profile error');
        logger.error(e);
        return res.redirect('/profile/update');
    }
}

exports.saveUpdate = async (req, res) => {
    try {
        let user = await utils.getUser(req.session.passport.user);
        await user.update(req.params);
    } catch (e) {
        logger.trace('update save error');
        logger.error(e);
        return res.redirect('/profile/update');
    }
}