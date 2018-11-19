const api = require('./helpers/apiClient');
const utils = require('./helpers/utils');

// const mongoose = require('mongoose')
// const RawData = mongoose.model('RawData');

exports.search = async (req, res) => {
    let data = utils.setSessionUser(req);
    let yc = new api.YelpApiClient();
    try {
        let r = await yc.searchBusinessess({
            term: 'startbucks',
            location: 'nyc',
        });
        // console.log('rrr', r.businesses.length);
        // console.log('start!!!!!')
    } catch (e) {
        console.error(e);
    }

    // let a = await RawData.create({data: {a: 1}})
    // console.log('aaaa1', a);

    return res.render('pages/search/index', data);
}
