if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    YELP_BASE_URL: 'https://api.yelp.com/v3',
    YELP_API_KEY: process.env.YELP_API_KEY,
    YELP_CLIENT_ID: process.env.YELP_CLIENT_ID,
};
