const rp = require('request-promise');
const assign = require('lodash/assign');
const utils = require('./utils');

exports.call = async httpOptions => {
    console.log(`Calling: ${httpOptions.uri} ...`);
    console.log(`Headers: ${httpOptions.headers}`);
    console.log(`Body: ${httpOptions.body}`);

    const isJson = httpOptions.json;
    if (isJson === null || isJson === undefined || !isJson) {
        assign(httpOptions, { json: true })
    }

    const startTime = new Date();

    let result = undefined;
    try {
        result = await rp(httpOptions)
    } catch (e) {
        console.log('API CALL ERROR:');
        console.error(e);
        result = {};
    }
    const endTime = new Date();

    utils.logTimeDelta(startTime, endTime);
}
