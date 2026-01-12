const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');

class BookService {

    async getAllBooks(status = null) {
        if (status && !['available', 'borrowed'].includes(status)) {
            const error = new Error('Invalid status');
            error.name = 'ValidationError';
            throw error;
        }

        const books = await bookRepository.findAll(status);

        const available = books.filter(b => b.status === 'available').length;
        const borrowed = books.filter(b => b.status === 'borrowed').length;

        return {
            books,
            statistics: {
                available,
                borrowed,
                total: books.length
            }
        };
    }

    async getBookById(id) {
        id = bookValidator.validateId(id);

        const book = await bookRepository.findById(id);
        if (!book) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }

        return book;
    }

    async createBook(bookData) {
        // 🔧 แก้เฉพาะชื่อ method
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);

        try {
            const createdBook = await bookRepository.create(bookData);
            return createdBook;
        } catch (err) {
            if (err.message.includes('UNIQUE')) {
                const error = new Error('ISBN already exists');
                error.name = 'ConflictError';
                throw error;
            }
            throw err;
        }
    }

    async updateBook(id, bookData) {
        id = bookValidator.validateId(id);

        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);

        const existingBook = await bookRepository.findById(id);
        if (!existingBook) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }

        try {
            await bookRepository.update(id, bookData);
            return await bookRepository.findById(id);
        } catch (err) {
            if (err.message.includes('UNIQUE')) {
                const error = new Error('ISBN already exists');
                error.name = 'ConflictError';
                throw error;
            }
            throw err;
        }
    }

    async borrowBook(id) {
        id = bookValidator.validateId(id);

        const book = await bookRepository.findById(id);
        if (!book) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }

        if (book.status === 'borrowed') {
            const error = new Error('Book is already borrowed');
            error.name = 'ValidationError';
            throw error;
        }

        return await bookRepository.updateStatus(id, 'borrowed');
    }

    async returnBook(id) {
        id = bookValidator.validateId(id);

        const book = await bookRepository.findById(id);
        if (!book) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }

        if (book.status !== 'borrowed') {
            const error = new Error('Book is not borrowed');
            error.name = 'ValidationError';
            throw error;
        }

        return await bookRepository.updateStatus(id, 'available');
    }

    async deleteBook(id) {
        id = bookValidator.validateId(id);

        const book = await bookRepository.findById(id);
        if (!book) {
            const error = new Error('Book not found');
            error.name = 'NotFoundError';
            throw error;
        }

        if (book.status === 'borrowed') {
            const error = new Error('Cannot delete borrowed book');
            error.name = 'ValidationError';
            throw error;
        }

        await bookRepository.delete(id);
        return true;
    }
}

module.exports = new BookService();
