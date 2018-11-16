const router = require('express').Router();
const usersControllers = require('../../controllers/userControllers');

router.get('/', usersControllers.getAll);

module.exports = router;
