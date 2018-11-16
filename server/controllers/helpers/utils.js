const logger = require('../../logger');

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