const Router = require('express');
const subsController = require('../controllers/subsController');

const router = new Router();

router.post('/', subsController.createSubscription);
router.put('/', subsController.deleteSubscription);



module.exports = router;