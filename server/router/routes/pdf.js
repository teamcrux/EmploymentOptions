const router = require('express').Router();
const pdf = require('../../controllers/index').pdf;

// Clients
//router.get('/:clientId', pdf.getAll);
router.get('/', pdf.getAll);

module.exports = router;
