const { Router } = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = Router();

router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.createCategory);

module.exports = router;
