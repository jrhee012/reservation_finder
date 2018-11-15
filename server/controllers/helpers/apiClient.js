const rp = require('request-promise');
// const assign = require('lodash/assign');
const _ = require('lodash')
const utils = require('./utils');
const logger = require('../../logger');

const YELP_BASE_URL = 'https://api.yelp.com/v3';

class ApiClient {
    constructor(options) {
        this.httpOptions = {};
        this.setHttpOptions(options);
    }

    setHttpOptions(options) {
        let validation = false;
        try {
            validation = this._validateHttpOptions(options);
        } catch (e) {
            logger.trace('yelp api client validate http options error:');
            logger.error(e);
        }

        if (validation) {
            this.httpOptions = options;
            logger.trace('http options updated');
        } else {
            logger.trace(`cannot set http options with: ${JSON.stringify(options)}`);
        }
    }

    _validateHttpOptions(options) {
        // TODO: UPDATE VALIDATIONS
        if (typeof options != 'object') return false;
        return true;
    }

    async makeCall(httpOptions) {
        if (_.isEmpty(httpOptions)
        && !_.isEmpty(this.httpOptions)) {
            logger.trace('http')
            httpOptions = this.httpOptions;
        }

        logger.trace(`Calling: ${httpOptions.uri} ...`);
        logger.trace(`Headers: ${httpOptions.headers}`);
        logger.trace(`Body: ${httpOptions.body}`);

        const isJson = httpOptions.json;
        if (isJson === null || isJson === undefined || !isJson) {
            _.assign(httpOptions, { json: true })
        }

        const startTime = new Date();

        let result = {};
        try {
            result = await rp(httpOptions)
        } catch (e) {
            logger.trace('API CALL ERROR:');
            logger.error(e);
            result = {};
        }

        const endTime = new Date();
        utils.logTimeDelta(startTime, endTime);

        return result;
    }
}

class YelpApiClient extends ApiClient {
    constructor(options) {
        super(options);
        this.baseUrl = YELP_BASE_URL;
    }
}

exports.GoogleApiClient = class GoogleApiClient extends ApiClient {
    constructor(options) {
        super(options);
        this.baseUrl = 'https://www.google.com';
    }
}
