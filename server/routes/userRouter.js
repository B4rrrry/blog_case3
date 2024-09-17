const Router = require('express');
const userController = require('../controllers/usersController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

const router = new Router();

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/auth', AuthMiddleware, userController.check);
router.get('/:id', userController.getOne);
router.get('/', userController.getAll);






module.exports = router;