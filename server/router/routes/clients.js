const router = require('express').Router();
const clientsController = require('../../controllers/index').clients;

// Clients
router.post('/', clientsController.create);
router.get('/:clientId', clientsController.getOneAll);
router.get('/', clientsController.getAll);
<<<<<<< HEAD
//router.get('/:clientId/resume.pdf', clientsController.generatePDF);
=======
router.patch('/', clientsController.updateOne);
>>>>>>> 9d9c4fe9368bbe3a74a52eb7abcdede5d1a26444

module.exports = router;
