const router = require('express').Router();
const employmentdetailController = require('../../controllers/index').employmentdetail;

//Add/Delete employment
router.post('/', employmentdetailController.create);
//router.delete('/', employmentdetailController.remove())
module.exports = router;
