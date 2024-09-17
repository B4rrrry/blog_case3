const Router = require('express');
const tagsRouter = require('./tagRouter');
const usersRouter = require('./userRouter');
const postsRouter = require('./postRouter');
const commentsRouter = require('./commentsRouter');
const subsRouter = require('./subUserRouter');
const subscriptionsRouter = require('./subscriptionRouter');

const router = new Router();

router.use('/tags', tagsRouter);
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/subs', subsRouter);
router.use('/subscriptions', subscriptionsRouter);


module.exports = router;