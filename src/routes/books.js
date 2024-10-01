const { Router } = require('express');
const BookController = require('../controllers/BookController');

const router = Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books
 *     security:
 *       - ApiKeyAuth: []
 *     tags: [Books]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of books per page
 *         schema:
 *           type: integer
 *       - name: isbn
 *         in: query
 *         description: ISBN of the book
 *         schema:
 *           type: string
 *       - name: startPrice
 *         in: query
 *         description: Minimum price of the book
 *         schema:
 *           type: number
 *       - name: endPrice
 *         in: query
 *         description: Maximum price of the book
 *         schema:
 *           type: number
 *       - name: authorId
 *         in: query
 *         description: ID of the author
 *         schema:
 *           type: string
 *       - name: categoryId
 *         in: query
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', BookController.getBooks);
/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Retrieve a single book by ID or ISBN
 *     security:
 *       - ApiKeyAuth: []
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID or ISBN of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get('/:id', BookController.getBook);
/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     security:
 *       - ApiKeyAuth: []
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               isbn:
 *                 type: string
 *               price:
 *                  type: number
 *               authorId:
 *                 type: string
 *               categoryId:
 *                  type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.post('/', BookController.createBook);
/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update an existing book
 *     security:
 *       - ApiKeyAuth: []
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID or ISBN of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               authorId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.put('/:id', BookController.updateBook);
/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID or ISBN
 *     security:
 *       - ApiKeyAuth: []
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID or ISBN of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete('/:id', BookController.deleteBook);

module.exports = router;
