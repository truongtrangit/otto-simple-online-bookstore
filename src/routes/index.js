const { Router } = require('express');
const books = require('./books');
const categories = require('./categories');
const authors = require('./authors');
const reviews = require('./reviews');

const router = Router();
router.use('/books', books);
router.use('/categories', categories);
router.use('/authors', authors);
router.use('/reviews', reviews);

module.exports = router;
