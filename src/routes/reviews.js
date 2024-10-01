const { Router } = require('express');
const ReviewController = require('../controllers/ReviewController');

const router = Router();

router.post('/', ReviewController.createReview);

module.exports = router;
