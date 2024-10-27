// routes/bookRoutes.js
const express = require('express');
const { 
  getBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
} = require('../controllers/bookController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 * path:
 *  /books:
 *    get:
 *      tags: [Books]
 *      summary: Retrieve a list of books
 *      responses:
 *        200:
 *          description: A list of books
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    title:
 *                      type: string
 *                    author:
 *                      type: string
 *                    publishedDate:
 *                      type: string
 *                      format: date
 */
router.get('/', getBooks);

/**
 * @swagger
 * path:
 *  /books/{id}:
 *    get:
 *      tags: [Books]
 *      summary: Retrieve a single book by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the book to retrieve
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: A single book object
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  title:
 *                    type: string
 *                  author:
 *                    type: string
 *                  publishedDate:
 *                    type: string
 *                    format: date
 *        404:
 *          description: Book not found
 */
router.get('/:id', getBookById);

/**
 * @swagger
 * path:
 *  /books:
 *    post:
 *      tags: [Books]
 *      summary: Create a new book
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: "The Great Gatsby"
 *                author:
 *                  type: string
 *                  example: "F. Scott Fitzgerald"
 *                publishedDate:
 *                  type: string
 *                  format: date
 *                  example: "1925-04-10"
 *      responses:
 *        201:
 *          description: Book created successfully
 *        400:
 *          description: Bad request, invalid input
 */
router.post('/', protect, createBook);

/**
 * @swagger
 * path:
 *  /books/{id}:
 *    put:
 *      tags: [Books]
 *      summary: Update an existing book
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the book to update
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                author:
 *                  type: string
 *                publishedDate:
 *                  type: string
 *                  format: date
 *      responses:
 *        200:
 *          description: Book updated successfully
 *        404:
 *          description: Book not found
 */
router.put('/:id', protect, updateBook);

/**
 * @swagger
 * path:
 *  /books/{id}:
 *    delete:
 *      tags: [Books]
 *      summary: Delete a book
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the book to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        204:
 *          description: Book deleted successfully
 *        404:
 *          description: Book not found
 */
router.delete('/:id', protect, deleteBook);

module.exports = router;
