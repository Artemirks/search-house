const Router = require('express');
const router = new Router();
const SearchAppController = require('../controllers/searchAppController');

router.post('/', SearchAppController.getAll);

module.exports = router;