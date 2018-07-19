const Router = require('router');
const util = require('../util');
const dataSource = require('../dataSource');

/**
 * 
 * @param {Router} router 
 */
function setupRoutes(router) {
  router.get('/v1.0/book', async (req, res) => {
    util.pagination(req, res);
    result = {};
    const booksResult = await dataSource.getBooks(req.top, req.skip);
    const count = await dataSource.getBooksCount();
    result.value = booksResult.map((book, _, __) => {
      return {
        id: book.id,
        title: book.title,
        author: {
          id: book.author.id,
          name: book.author.name
        }
      }
    });
    if (count - req.skip > req.top) {
      result.nextLink = util.nextPage(req);
    }
    res.setHeader('Content-Type', util.ContentType.getContentTypeString(util.ContentType.json));
    res.end(JSON.stringify(result));
  });

  router.route('/v1.0/book/:bookId')
    .get((req, res) => {
      res.setHeader('Content-Type', util.ContentType.getContentTypeString(util.ContentType.json));
      const bookId = req.params.bookId;
      dataSource.getBookById(bookId).then((book) => {
        if (!book) {
          const error = {
            error: {
              code: 'BOOK_NOT_FOUND',
              message: 'book with this id couldn\'t be found'
            }
          }
          res.end(JSON.stringify(error));
          return;
        }
        const bookResult = {
          id: book.id,
          title: book.title,
          author: {
            id: book.author.id,
            name: book.author.name
          }
        }
        res.end(JSON.stringify(bookResult));
      });
    });
}

module.exports = {
  setupRoutes: setupRoutes
}