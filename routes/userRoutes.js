// routes/userRoutes.js
const express = require('express');
const { getUsers, getUserById } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * path:
 *  /users:
 *    get:
 *      tags: [Users]
 *      summary: Retrieve a list of users
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: A list of users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    name:
 *                      type: string
 *                    email:
 *                      type: string
 *                      format: email
 */
router.get('/', protect, getUsers);

/**
 * @swagger
 * path:
 *  /users/{id}:
 *    get:
 *      tags: [Users]
 *      summary: Retrieve a single user by ID
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the user to retrieve
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: A single user object
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *                    format: email
 *        404:
 *          description: User not found
 */
router.get('/:id', protect, getUserById);

module.exports = router;
