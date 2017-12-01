const router = require('express').Router();
const taskController = require('../../controllers/index').taskdata;

router.get('/:jobCode', taskController.getOneAll);

module.exports = router;
