const router = require('express').Router();
const pdf = require('../../controllers/index').pdf;

// Clients
router.get('/form/:ClientId', pdf.getForm);
router.get('/:ClientId', pdf.getResume);

module.exports = router;
