const Router = require('express');
const router = new Router();
const objectRouter = require('./objectRouter')
const searchAppRouter = require('./searchAppRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter);
router.use('/object', objectRouter);
router.use('/searchapp', searchAppRouter);

module.exports = router;