const router = require('express').Router();
const clientsController = require('../../controllers/index').clients;

// Clients
router.post('/', clientsController.create);
router.get('/:clientId', clientsController.getOneAll);
router.get('/', clientsController.getAll);
//router.get('/:clientId/resume.pdf', clientsController.generatePDF);

module.exports = router;
