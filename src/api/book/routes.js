const Book = require('../models').book.Book;
const Page = require('../models').page.Page;
const Author = require('../models').author.Author;
const Router = require('router');
const config = require('../config').server.config;
const url = require('whatwg-url');

/**
 * 
 * @param {Router} router 
 */
function setupRoutes(router) {
  router.get('/v1.0/book', async (req, res) => {
    result = {};
    let params = new url.URL(config.baseUrl + req.url).searchParams;
    const skipParam = Number.parseInt(params.get('skip'));
    const skip = skipParam ? skipParam : 0;
    const topParam = Number.parseInt(params.get('top'));
    const maxPageSize = Number.parseInt(params.get('maxPageSize'));
    const maxBooksPerPage = maxPageSize < config.maxItemsPerPage ?
      maxPageSize : config.maxItemsPerPage;
    const top = topParam ? topParam < maxBooksPerPage ?
      topParam : maxBooksPerPage : maxBooksPerPage;
    const booksResult = await Book.findAndCountAll({
      limit: maxBooksPerPage,
      offset: skip,
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
    if (booksResult.count - skip > top) {
      let nextPageUrl = config.baseUrl + req.url + '?';
      nextPageUrl += 'skip=' + (skip + top);
      if (maxPageSize == maxBooksPerPage) {
        nextPageUrl += '&maxPageSize=' + maxPageSize
      }
      result.nextLink = nextPageUrl.toString();
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
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
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(bookResult));
      });
    });
}

module.exports = {
  setupRoutes: setupRoutes
}