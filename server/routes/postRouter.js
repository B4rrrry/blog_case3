const Router = require('express');
const postController = require('../controllers/postsController');

const router = new Router();

router.post('/', postController.create);
router.post('/update', postController.updatePost);
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.put('/', postController.deletePost);


module.exports = router;