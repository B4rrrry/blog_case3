const Router = require('express');
const subsController = require('../controllers/subsController');

const router = new Router();

router.post('/', subsController.createSubUser);
router.get('/:id', subsController.getSubUser);





module.exports = router;