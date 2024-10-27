const express = require('express');
const { 
  getAuthors, 
  getAuthorById, 
  createAuthor, 
  updateAuthor, 
  deleteAuthor, 
  getBooksByAuthor 
} = require('../controllers/authorController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: The authors managing API
 */

/**
 * @swagger
 * path:
 *  /authors:
 *    get:
 *      tags: [Authors]
 *      summary: Retrieve a list of authors
 *      responses:
 *        200:
 *          description: A list of authors
 */
router.get('/', getAuthors);

/**
 * @swagger
 * path:
 *  /authors/{id}:
 *    get:
 *      tags: [Authors]
 *      summary: Retrieve a single author by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the author to retrieve
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: A single author object
 *        404:
 *          description: Author not found
 */
router.get('/:id', getAuthorById);

/**
 * @swagger
 * path:
 *  /authors/{id}/books:
 *    get:
 *      tags: [Authors]
 *      summary: Retrieve books by a specific author
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the author whose books to retrieve
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: A list of books by the author
 *        404:
 *          description: Author not found
 */
router.get('/:id/books', getBooksByAuthor);

/**
 * @swagger
 * path:
 *  /authors:
 *    post:
 *      tags: [Authors]
 *      summary: Create a new author
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                bio:
 *                  type: string
 *      responses:
 *        201:
 *          description: Author created successfully
 */
router.post('/', protect, createAuthor);

/**
 * @swagger
 * path:
 *  /authors/{id}:
 *    put:
 *      tags: [Authors]
 *      summary: Update an existing author
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the author to update
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
 *                name:
 *                  type: string
 *                bio:
 *                  type: string
 *      responses:
 *        200:
 *          description: Author updated successfully
 *        404:
 *          description: Author not found
 */
router.put('/:id', protect, updateAuthor);

/**
 * @swagger
 * path:
 *  /authors/{id}:
 *    delete:
 *      tags: [Authors]
 *      summary: Delete an author
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the author to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        204:
 *          description: Author deleted successfully
 *        404:
 *          description: Author not found
 */
router.delete('/:id', protect, deleteAuthor);

module.exports = router;
