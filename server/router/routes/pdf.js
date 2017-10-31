const router = require('express').Router();
const pdf = require('../../controllers/index').pdf;

// Clients
//router.get('/:clientId', pdf.getAll);
router.get('/:clientId', pdf.all);

module.exports = router;
