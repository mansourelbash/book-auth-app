const asyncHandler = require('express-async-handler');
const Author = require('../models/Author');
const Book = require('../models/Book');
const Joi = require('joi');
const mongoose = require('mongoose');

// Get all authors
exports.getAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

// Get a single author by ID
exports.getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    res.json(author);
  } else {
    res.status(404).json({ message: 'Author not found' });
  }
});

// Create a new author
exports.createAuthor = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    bio: Joi.string(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const author = new Author(req.body);
  const createdAuthor = await author.save();
  res.status(201).json(createdAuthor);
});

// Update an author
exports.updateAuthor = asyncHandler(async (req, res) => {
  const { name, bio } = req.body;

  const author = await Author.findById(req.params.id);
  if (author) {
    author.name = name || author.name;
    author.bio = bio || author.bio;
    const updatedAuthor = await author.save();
    res.json(updatedAuthor);
  } else {
    res.status(404).json({ message: 'Author not found' });
  }
});

// Delete an author
exports.deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    await author.remove();
    res.json({ message: 'Author deleted' });
  } else {
    res.status(404).json({ message: 'Author not found' });
  }
});

// Get all books by an author
exports.getBooksByAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid author ID' });
  }

  const books = await Book.find({ author: id }).populate('author', 'name');
  if (books.length > 0) {
    res.json(books);
  } else {
    res.status(404).json({ message: 'No books found for this author' });
  }
});
