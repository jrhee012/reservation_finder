const logger = require('../../logger');

exports.logTimeDelta = (time1, time2) => {
    logger.trace(`Time Delta: ${time2 - time1}`);
};
