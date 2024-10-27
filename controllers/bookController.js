const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const Joi = require('joi');

// Get all books
exports.getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().populate('author');
  res.json(books);
});

// Get a book by ID
exports.getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author');
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Create a new book
exports.createBook = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    publishedYear: Joi.number(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const book = new Book(req.body);
  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

// Update a book
exports.updateBook = asyncHandler(async (req, res) => {
  const { title, author, publishedYear } = req.body;

  const book = await Book.findById(req.params.id);
  if (book) {
    book.title = title;
    book.author = author;
    book.publishedYear = publishedYear;
    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Delete a book
exports.deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await book.remove();
    res.json({ message: 'Book deleted' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});
