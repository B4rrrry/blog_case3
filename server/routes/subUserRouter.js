const Router = require('express');
const subsController = require('../controllers/subsController');

const router = new Router();

router.post('/', subsController.createSubUser);





module.exports = router;