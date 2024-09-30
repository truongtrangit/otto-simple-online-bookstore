const { Router } = require('express');
const books = require('./books');
const { authenticate } = require('../middlewares/authenticate');

const router = Router();
router.use('/books', authenticate, books);

module.exports = router;
