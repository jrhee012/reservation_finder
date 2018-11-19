const mongoose = require('mongoose');
const logger = require('../logger');

const { Schema } = mongoose;

/**
 * info = {
 *     address: LOCATION_ADDRESS,
 *     info: LOCATION_INFO,
 *     rating: LOCATION_RATINGS,
 * }
 */
const LocationsSchema = new Schema({
    raw_data: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RawData', index: true }],
    name: String,
    data: Schema.Types.Mixed,
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        default: new Date().toISOString(),
    },
});

/**
 * source = {
 *     "name": {SOURCE_NAME},
 *     "value": {SOURCE_URL},
 * }
 */
LocationsSchema.methods.saveRawData = async function (name, raw_data, source) {
    try {
        let rawData = {
            name: name,
            source: source,
            value: raw_data,
        };
        this.raw_data.push(rawData);
        await this.save();
        logger.trace('raw data updated for LOCATION entry!');
    } catch (e) {
        logger.trace('ERROR saveRawData');
        logger.error(e);
    }
    return;
};

mongoose.model('Locations', LocationsSchema);
