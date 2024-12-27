const Router = require('express');
const subsController = require('../controllers/subsController');

const router = new Router();

router.post('/', subsController.createSubscription);
router.put('/', subsController.deleteSubscription);
router.get('/:id', subsController.getSubscriptionsById);



module.exports = router;