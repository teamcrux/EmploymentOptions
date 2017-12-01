const router = require('express').Router();
const clientsController = require('../../controllers/index').clients;
const pdfController = require('../../controllers/index').pdf

// Clients
router.post('/', clientsController.create);
router.get('/:ClientId', clientsController.getOneAll);
router.get('/', clientsController.getAll);
router.patch('/', clientsController.updateOne);

module.exports = router;
