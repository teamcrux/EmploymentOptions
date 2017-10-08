const router = require('express').Router();
const userTypesController = require('../../controllers/index').userTypes;

// User Types
router.post('/', userTypesController.create);

module.exports = router;