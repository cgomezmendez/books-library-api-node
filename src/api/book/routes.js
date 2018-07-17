const Book = require('../models').book.Book;

function setupRoutes(router) {
  router.get('/v1.0/book', async function (req, res) {
    result = {};
    const books = await Book.findAll();
    result.value = books.map((book, _, __) => {
      return {
        title: book.title
      }
    });
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(result));
  });
}

module.exports = {
  setupRoutes: setupRoutes
}