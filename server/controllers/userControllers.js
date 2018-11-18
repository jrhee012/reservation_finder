const mongoose = require('mongoose');
const isEmpty = require('lodash/isEmpty');
const utils = require('./helpers/utils');
const logger = require('../logger');

const Users = mongoose.model('Users');

// const getUser = async userID => {
//     let user = {};
//     try {
//         user = await Users.findById(userID);
//     } catch (e) {
//         logger.trace('get user error');
//         logger.error(e);
//     }
//     return user;
// }

const buildUserAttr = reqParams => '';

exports.getAll = async (req, res) => {
    let check = await utils.checkAdmin(req.session);
    console.log('check: ', check);
    return res.status(200).send('ok');
}

exports.getOne = async (req, res) => {
    let user = utils.getUser(req.params.userId);

    if (!user) {
        return res.redirect('/users');
    }

    return res.status(200)
        .render('pages/users/info', user);
}

exports.create = async (req, res) => res.render('pages/users/create');

exports.save = async (req, res) => {
    let userAttrs = buildUserAttr(req.body || req.parms);
    try {
        let newUser = await Users.create(userAttrs);
        return res.redirect(`/users/${newUser.id}`);
    } catch (e) {
        logger.trace(`error at ${req.url}`);
        logger.error(e);
        // TODO: ??? render form again or redirct ???
        return res.redirect('/users/create');
    }

}



// exports.update

// exports.delete
