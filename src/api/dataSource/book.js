const models = require('../../db/models');

/**
 * 
 * @param {Number} top 
 * @param {Number} skip
 * 
 * get books from multiple sources as for now only database
 * @returns {Promise} 
 */
function getBooks(top, skip) {
  return new Promise((resolve, reject) => {
    models.Book.findAll({
      limit: top,
      offset: skip,
      include: [{
        model: models.Author
      }]
    }).then((books) => {
      const result = books.map((book) => {
        return {
          id: book.id,
          title: book.title,
          author: {
            id: book.Author.id,
            name: book.Author.name
          }
        }
      });
      resolve(result);
    })
  });
}

/**
 * 
 * @param {Number} bookId 
 * returns book given id from multiple sources, as for now only db
 */
function getBookById(bookId) {
  return new Promise((resolve, reject) => {
    models.Book.findById(bookId, {
      include: [{
        model: models.Author
      }],
      subQuery: false,
    }).then((book) => {
      if (!book) {
        resolve(null);
        return;
      }
      resolve({
        id: book.id,
        title: book.title,
        author: {
          id: book.Author.id,
          name: book.Author.name
        }
      });
    });
  })
}

/**
 * returns book count from multiple sources as for now only db
 * @returns {Number} count
 */
function getBooksCount() {
  return new Promise((resolve, reject) => {
    models.Book.count().then((count) => {
      resolve(count);
    });
  });
}

module.exports = {
  getBooks: getBooks,
  getBooksCount: getBooksCount,
  getBookById: getBookById
}