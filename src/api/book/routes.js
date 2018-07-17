const Book = require('../models').book.Book;
const Author = require('../models').author.Author;
const Router = require('router');
const config = require('../config').server.config;
const url = require('whatwg-url');

/**
 * 
 * @param {Router} router 
 */
function setupRoutes(router) {
  router.get('/v1.0/book', async function (req, res) {
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
      include: [{
        model: Author
      }]
    });
    result.value = booksResult.rows.map((book, _, __) => {
      return {
        title: book.title,
        author: {
          id: book.author.id,
          name: book.author.name
        }
      }
    });
    if (booksResult.count - skip >= top) {
      let nextPageUrl = config.baseUrl + '?';
      nextPageUrl += 'skip=' + (skip + top);
      if (maxPageSize == maxBooksPerPage) {
        nextPageUrl += '&maxPageSize=' + maxPageSize
      }
      result.nextLink = nextPageUrl.toString();
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(result));
  });
}

module.exports = {
  setupRoutes: setupRoutes
}