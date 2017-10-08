const router = require('express').Router();
const jobDevelopersController = require('../../controllers/index').jobDevelopers;

// Job Developers
router.post('/', jobDevelopersController.create);
router.get('/:jobDeveloperId', jobDevelopersController.getOne);
router.get('/', jobDevelopersController.getAll);

module.exports = router;