const api = require('./helpers/api');
const utils = require('./helpers/utils');

exports.search = (req, res) => {
    api.call(req.body)
    return res.render('pages/search/index');
}