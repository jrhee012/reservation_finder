const searchControllers = require('../controllers/searchControllers');

module.exports = server => {
    server.get('/search', searchControllers.search);
};
