const api = require('./helpers/apiClient');

exports.search = async (req, res) => {
    return res.render('pages/search/index');
}