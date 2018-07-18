const Book = require('../models').book.Book;
const Page = require('../models').page.Page;
const Author = require('../models').author.Author;
const Router = require('router');
let config = require('../config').server.config;
const url = require('whatwg-url');
const util = require('../util');

/**
 * 
 * @param {Router} router 
 */
function setupRoutes(router) {
  router.get('/v1.0/book', async (req, res) => {
    util.pagination(req, res);
    result = {};
    const booksResult = await Book.findAndCountAll({
      limit: req.top,
      offset: req.skip,
      include: [{
        model: Author
      }]
    });
    result.value = booksResult.rows.map((book, _, __) => {
      return {
        id: book.id,
        title: book.title,
        author: {
          id: book.author.id,
          name: book.author.name
        }
      }
    });
    if (booksResult.count - req.skip > req.top) {
      result.nextLink = util.nextPage(req);
    }
    res.setHeader('Content-Type', util.ContentType.getContentTypeString(util.ContentType.json));
    res.end(JSON.stringify(result));
  });

  router.route('/v1.0/book/:bookId')
    .get((req, res) => {
      const bookId = req.params.bookId;
      Book.findById(bookId, {
        include: [{
          model: Author
        }, {
          model: Page
        }],
        subQuery: false,
        limit: config.maxItemsPerPage
      }).then((book) => {
        const bookResult = {
          id: book.id,
          title: book.title,
          author: {
            id: book.author.id,
            name: book.author.name
          },
          pages: book.pages.map((page, _, __) => {
            return {
              id: page.id,
              text: page.text,
              html: page.html
            }
          })
        }
        res.setHeader('Content-Type', util.ContentType.getContentTypeString(util.ContentType.json));
        res.end(JSON.stringify(bookResult));
      });
    });
}

module.exports = {
  setupRoutes: setupRoutes
}