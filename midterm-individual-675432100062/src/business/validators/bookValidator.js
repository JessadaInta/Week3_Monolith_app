class BookValidator {

    // Validate ข้อมูลหนังสือพื้นฐาน
    validateBookData(data) {
        const { title, author, isbn } = data || {};

        if (!title || !author || !isbn) {
            const error = new Error('Title, author, and ISBN are required');
            error.name = 'ValidationError';
            throw error;
        }

        return true;
    }

    // Validate รูปแบบ ISBN
    // Pattern: (978|979) + 9 digits + (digit or X)
    validateISBN(isbn) {
        if (!isbn) {
            const error = new Error('ISBN is required');
            error.name = 'ValidationError';
            throw error;
        }

        const isbnPattern = /^(97[89])?\d{9}[\dXx]$/;
        const cleanISBN = isbn.replace(/-/g, '');

        if (!isbnPattern.test(cleanISBN)) {
            const error = new Error('Invalid ISBN format');
            error.name = 'ValidationError';
            throw error;
        }

        return true;
    }

    // Validate และแปลง ID
    validateId(id) {
        const numId = parseInt(id);

        if (isNaN(numId) || numId <= 0) {
            const error = new Error('Invalid book ID');
            error.name = 'ValidationError';
            throw error;
        }

        return numId;
    }
}

module.exports = new BookValidator();
