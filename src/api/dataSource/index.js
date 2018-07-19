const bookModule = require('./book');
const pageModule = require('./page');

module.exports = {
  getBooks: bookModule.getBooks,
  getBooksCount: bookModule.getBooksCount,
  getBookById: bookModule.getBookById,
  getPages: pageModule.getPages,
  getPageByIdAndBookId: pageModule.getPageByIdAndBookId,
  getPagesCount: pageModule.getPagesCount
}