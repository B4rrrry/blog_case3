const Router = require('express');
const tagsController = require('../controllers/tagsController');

const router = new Router();

router.post('/', tagsController.create);
router.get('/', tagsController.getAll);

module.exports = router;