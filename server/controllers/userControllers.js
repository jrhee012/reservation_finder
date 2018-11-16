const mongoose = require('mongoose');
const utils = require('./helpers/utils');
const logger = require('../logger');

const Users = mongoose.model('Users');

exports.getAll = async (req, res) => {
    let check = await utils.checkAdmin(req.session);
    console.log('check: ', check);
    return res.status(200).send('ok');
}

exports.getOne = async (req, res) => {
    let userId = req.params.user_id;
    let user;

    try {
        user = await Users.findById(userId);
    } catch (e) {
        logger.trace('get user error');
        logger.error(e);
        return res.status(e.code)
            .json({
                code: e.code,
                message: e.message,
            })
    }

    if (!user) {
        return res.redirect('/users');
    }

    return res.status(200)
        .render('pages/users/info', user);
}

exports.create = async (req, res) => {

}



// exports.update

// exports.delete
