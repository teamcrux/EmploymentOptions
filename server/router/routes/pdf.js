const router = require('express').Router();
const pdf = require('../../controllers/index').pdf;

// Clients
router.get('/form/:clientId', pdf.getForm);
router.get('/:clientId', pdf.all);

module.exports = router;
