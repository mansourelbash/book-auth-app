// routes/authRoutes.js
const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication API
 */

/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      tags: [Authentication]
 *      summary: Login a user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                  example: user@example.com
 *                password:
 *                  type: string
 *                  format: password
 *                  example: yourpassword123
 *      responses:
 *        200:
 *          description: Login successful
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    example: yourjsonwebtoken
 *        401:
 *          description: Invalid credentials
 */

/**
 * @swagger
 * path:
 *  /auth/register:
 *    post:
 *      tags: [Authentication]
 *      summary: Register a new user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: John Doe
 *                email:
 *                  type: string
 *                  format: email
 *                  example: user@example.com
 *                password:
 *                  type: string
 *                  format: password
 *                  example: yourpassword123
 *      responses:
 *        201:
 *          description: User registered successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: User registered successfully
 *        400:
 *          description: Bad request, invalid input
 */
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
