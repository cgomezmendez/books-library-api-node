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
  router.get('/v1.0/book/:bookId/page', async (req, res) => {
    result = {};
    const bookId = req.params.bookId
    let params = new url.URL(config.baseUrl + req.url).searchParams;
    const skipParam = Number.parseInt(params.get('skip'));
    const skip = skipParam ? skipParam : 0;
    const topParam = Number.parseInt(params.get('top'));
    const maxPageSize = Number.parseInt(params.get('maxPageSize'));
    const maxItemsPerPage = maxPageSize < config.maxItemsPerPage ?
      maxPageSize : config.maxItemsPerPage;
    const top = topParam ? topParam < maxItemsPerPage ?
      topParam : maxItemsPerPage : maxItemsPerPage;
    const pagesResult = await Page.findAndCountAll({
      limit: maxItemsPerPage,
      where: {
        bookId: bookId
      }
    });
    result.value = pagesResult.rows.map((page, _, __) => {
      return {
        id: page.id,
        html: page.html,
        text: page.text
      }
    });
    if (pagesResult.count - skip >= top) {
      let nextPageUrl = config.baseUrl + '?';
      nextPageUrl += 'skip=' + (skip + top);
      if (maxPageSize == maxItemsPerPage) {
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