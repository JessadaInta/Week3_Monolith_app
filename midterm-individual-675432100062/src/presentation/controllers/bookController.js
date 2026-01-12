// src/presentation/controllers/bookController.js
const bookService = require('../../business/services/bookService');

class BookController {

    // GET /api/books
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;

            const result = await bookService.getAllBooks(status);
            res.json(result);

        } catch (error) {
            next(error);
        }
    }

    // GET /api/books/:id
    async getBookById(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid book ID' });
            }

            const book = await bookService.getBookById(id);

            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }

            res.json(book);

        } catch (error) {
            next(error);
        }
    }

    // POST /api/books
    async createBook(req, res, next) {
        try {
            const { title, author, isbn } = req.body;

            if (!title || !author || !isbn) {
                return res.status(400).json({
                    error: 'Title, author, and ISBN are required'
                });
            }

            const newBook = await bookService.createBook(req.body);
            res.status(201).json(newBook);

        } catch (error) {
            // กรณี ISBN ซ้ำ
            if (error.message && error.message.includes('UNIQUE')) {
                return res.status(409).json({ error: 'ISBN already exists' });
            }
            next(error);
        }
    }

    // PUT /api/books/:id
    async updateBook(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const { title, author, isbn } = req.body;

            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid book ID' });
            }

            if (!title || !author || !isbn) {
                return res.status(400).json({
                    error: 'Title, author, and ISBN are required'
                });
            }

            const updatedBook = await bookService.updateBook(id, req.body);

            if (!updatedBook) {
                return res.status(404).json({ error: 'Book not found' });
            }

            res.json(updatedBook);

        } catch (error) {
            if (error.message && error.message.includes('UNIQUE')) {
                return res.status(409).json({ error: 'ISBN already exists' });
            }
            next(error);
        }
    }

    // PATCH /api/books/:id/borrow
    async borrowBook(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid book ID' });
            }

            const book = await bookService.borrowBook(id);
            res.json(book);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // PATCH /api/books/:id/return
    async returnBook(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid book ID' });
            }

            const book = await bookService.returnBook(id);
            res.json(book);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // DELETE /api/books/:id
    async deleteBook(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid book ID' });
            }

            await bookService.deleteBook(id);
            res.json({ message: 'Book deleted successfully' });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new BookController();
