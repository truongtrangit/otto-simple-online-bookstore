const { Router } = require('express');
const AuthorController = require('../controllers/AuthorController');

const router = Router();

router.get('/', AuthorController.getAuthors);
router.post('/', AuthorController.createAuthor);

module.exports = router;
