const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registraion', userController.registraion);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.put('/', userController.update);
router.get('/:id', userController.getOne);

module.exports = router;