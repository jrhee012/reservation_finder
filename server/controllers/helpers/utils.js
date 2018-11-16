const mongoose = require('mongoose');
const logger = require('../../logger');

const Users = mongoose.model('Users');
const Roles = mongoose.model('Roles');

const getAdminRole = async function() {
    let adminRole = await Roles.findOne({ name: 'admin' });
    return adminRole;
}

exports.logTimeDelta = (time1, time2) => {
    logger.trace(`Time Delta: ${time2 - time1}`);
};

exports.setSessionUser = req => {
    let data = {};
    try {
        data = { user: req.user ? req.user : {} };
    } catch (e) {
        data = { user: {} };
    }
    return data;
}

exports.checkAdmin = async reqSession => {
    try {
        let adminRole = await getAdminRole();
        let userId = reqSession.passport.user;
        let user = await Users.findById(userId);

        if (user.roles.includes(adminRole._id)) {
            return true;
        }
    } catch (e) {
        logger.trace('utils.checkAdmin ERROR')
        logger.error(e);
    }
    return false;
}
