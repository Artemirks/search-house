const Router = require('express');
const router = new Router();
const ObjectController = require('../controllers/objectController')

router.post('/', ObjectController.create);
router.get('/', ObjectController.getAll);
router.get('/:id', ObjectController.getOne);
router.post('/forUpdate', ObjectController.getOneUpdate);
router.post('/apartmentTypes', ObjectController.getAppartTypes)
router.post('/bedTypes', ObjectController.getBedTypes)
router.post('/kitchenTypes', ObjectController.getKitchenTypes)
router.post('/cities', ObjectController.getCities)
router.put('/', ObjectController.update);
router.delete('/:id/:id_user', ObjectController.delete);

module.exports = router;