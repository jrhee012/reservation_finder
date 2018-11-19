const mongoose = require('mongoose');
const isEmpty = require('lodash/isEmpty');
const logger = require('../../logger');

require('../../models/Permissions');
require('../../models/Roles');
require('../../models/Histories');
require('../../models/Locations');
require('../../models/Saves');
require('../../models/Users');
require('../../models/RawData');

const Permissions = mongoose.model('Permissions');
const Roles = mongoose.model('Roles');
const Histories = mongoose.model('Permissions');
const Locations = mongoose.model('Roles');
const Saves = mongoose.model('Permissions');
const Users = mongoose.model('Roles');
const RawData = mongoose.model('RawData');

const locationFilter = async name => {
    let result = [];
    try {
        result = await RawData.find({ name: name });
    } catch (e) {
        logger.trace('ERROR: locationFilter');
        logger.error(e)
    }
    return result;
}

const createNewLocaion = async (locationName, rawData) => {};

exports.cleanRawData = async locationName => {
    let locations = await locationFilter();
    if (locations.length < 1) {
        logger.trace(`LOCATION not found -> { name: ${locationName} }`)
        return;
    }
}

exports.checkAndSave = async (locationName, rawData) => {
    let location = await Locations.findOne({ name: locationName });
    if (isEmpty(location)) {
        logger.trace('LOCATION not found!');
        await createNewLocaion(locationName, rawData);
        logger.trace('LOCATION created!');
    }
    let raw = this.raw_data;
    if (!raw || raw === null || raw === undefined) {
        this.raw_data = [];
        raw = this.raw_data;
    }
    raw.push(rawData);
    logger.trace('updating LOCATION with new raw data!');
    try {
        await location.save();
        logger.trace('LOCATION updated!');
    } catch (e) {
        logger.trace('ERROR: checkAndSave update LOCATION');
        logger.error(e);
    }
    return;
}

// const test = async () => {
//     const rp = require('request-promise');
//     console.log('starting!')
//     let result = await rp({method: 'get', uri: 'https://www.google.com', json: true });
//     console.log('finished!', result);
// }
