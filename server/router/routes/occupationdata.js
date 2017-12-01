const router = require('express').Router();
const occupationController = require('../../controllers/index').occupationdata;

router.get('/', occupationController.getAll);

module.exports = router;
