const api = require('./helpers/apiClient');

exports.search = async (req, res) => {
    let yc = new api.YelpApiClient();
    try {
        let r = await yc.searchBusinessess({
            term: 'startbucks',
            location: 'nyc',
        });
        console.log('rrr', r.businesses.length);
    } catch (e) {
        console.error(e);
    }
    return res.render('pages/search/index');
}
