const searchRouter = require('./search');

module.exports = server => {
    server.get('/', (req, res) => {
        console.log('req body:', req.body);
        return res.render('pages/home');
    })

    searchRouter(server);
};
