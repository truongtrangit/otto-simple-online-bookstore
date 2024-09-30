const { Router } = require('express');
const BookController = require('../controllers/bookController');

const router = Router();

router.get('/', BookController.getBooks);
router.get('/:query', BookController.getBook);
router.post('/', BookController.createBook);
router.put('/:query', BookController.updateBook);
router.delete('/:query', BookController.deleteBook);

module.exports = router;
