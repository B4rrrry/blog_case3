const Router = require('express');
const postController = require('../controllers/postsController');

const router = new Router();

router.post('/', postController.create);
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.put('/', postController.deletePost);


module.exports = router;