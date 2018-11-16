const api = require('./helpers/apiClient');
const utils = require('./helpers/utils');

exports.search = async (req, res) => {
    let data = utils.setSessionUser(req);
    // let yc = new api.YelpApiClient();
    // try {
    //     let r = await yc.searchBusinessess({
    //         term: 'startbucks',
    //         location: 'nyc',
    //     });
    //     console.log('rrr', r.businesses.length);
    // } catch (e) {
    //     console.error(e);
    // }
    return res.render('pages/search/index', data);
}
