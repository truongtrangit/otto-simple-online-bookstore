const { Router } = require('express');
const BookController = require('../controllers/BookController');

const router = Router();

router.get('/', BookController.getBooks);
router.get('/:id', BookController.getBook);
router.post('/', BookController.createBook);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

module.exports = router;
