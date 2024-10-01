const { Router } = require('express');
const ReviewController = require('../controllers/ReviewController');

const router = Router();

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     description: Endpoint to create a new review.
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewer:
 *                 type: string
 *                 description: Name of the reviewer
 *               content:
 *                 type: string
 *                 description: Content of the review
 *               bookId:
 *                 type: string
 *                 description: ID of the book being reviewed
 *     responses:
 *       201:
 *         description: Review created successfully
 *
 */
router.post('/', ReviewController.createReview);

module.exports = router;
