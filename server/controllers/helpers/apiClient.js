const rp = require('request-promise');
const _ = require('lodash')
const utils = require('./utils');
const logger = require('../../logger');
const config = require('../../config');
const rawData = require('./rawData');
// const { SaveRawDataWorker } = require('../../workers');

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

        logger.trace(`Calling: ${JSON.stringify(httpOptions.uri)} ...`);
        logger.trace(`Headers: ${JSON.stringify(httpOptions.headers)}`);
        logger.trace(`Body: ${JSON.stringify(httpOptions.body)}`);
        logger.trace(`QS: ${JSON.stringify(httpOptions.qs)}`);

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
            logger.error(e.message);
            result = {};
        }

        const endTime = new Date();
        utils.logTimeDelta(startTime, endTime);

        // let w = new SaveRawDataWorker();
        // w.startWorker('worker_1', 'yelp', result);
        rawData.save(result.businesses);

        return result;
    }
}

exports.YelpApiClient = class YelpApiClient extends ApiClient {
    constructor(options) {
        super(options);
        this.baseUrl = config.YELP_BASE_URL;
    }

    _checkSearchQueries(query) {
        let term = query.term;
        let location = query.location;
        let coord = query.coord;

        if ((_.isString(term) && _.isString(location))) return true;
        // if ((_.isString(term) && _.isString(location)))
    }

    searchBusinessess(query) {

        let searchQueries = {
            term: query.term,
            type: 'restaurants',
            sort_by: 'best_match',
            location: query.location, // TODO: LOCATION REQUIRED
        }

        let headers = {
            'Authorization': `Bearer ${config.YELP_API_KEY}`,
        };

        let options = {
            uri: `${this.baseUrl}/businesses/search`,
            method: 'get',
            headers: headers,
            qs: searchQueries,
            json: true,
        };

        return this.makeCall(options);
    }
}

exports.GoogleApiClient = class GoogleApiClient extends ApiClient {
    constructor(options) {
        super(options);
        this.baseUrl = 'https://www.google.com';
    }
}
