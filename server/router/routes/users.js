const router = require('express').Router();
const usersController = require('../../controllers/index').users;

router.post('/', usersController.create);

router.get('/current', usersController.getCurrent);

module.exports = router;