const { Router } = require('express');
const books = require('./books');
const categories = require('./category');
const authors = require('./author');
const reviews = require('./reviews');
const { authenticate } = require('../middlewares/authenticate');

const router = Router();
router.use('/books', authenticate, books);
router.use(
  '/categories',
  // authenticate,
  categories
);
router.use(
  '/authors',
  // authenticate,
  authors
);
router.use(
  '/reviews',
  // authenticate,
  reviews
);

module.exports = router;
