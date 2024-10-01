const { Router } = require('express');
const AuthorController = require('../controllers/AuthorController');

const router = Router();

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Retrieve a list of authors
 *     tags: [Authors]
 *     description: Retrieve a list of authors from the database.
 *     responses:
 *       200:
 *         description: A list of authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 */
router.get('/', AuthorController.getAuthors);
/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     description: Create a new author and store it in the database.
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birthDate:
 *                 type: string
 *                 format: date
 *               nationality:
 *                  type: string
 *     responses:
 *       201:
 *         description: The created author
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 */
router.post('/', AuthorController.createAuthor);

module.exports = router;
