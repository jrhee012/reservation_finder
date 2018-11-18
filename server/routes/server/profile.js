const router = require('express').Router();
// const userControllers = require('../../controllers/userControllers');
const profileControllers = require('../../controllers/profileControllers');

router.get('/', profileControllers.getProfile);

module.exports = router;
