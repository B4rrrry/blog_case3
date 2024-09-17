const Router = require('express');
const commentsController = require('../controllers/commentsController');

const router = new Router();

router.post('/', commentsController.create);
router.get('/', commentsController.getAll);



module.exports = router;