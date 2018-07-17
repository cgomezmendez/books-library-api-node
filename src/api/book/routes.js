function setupRoutes(router) {
  router.get('/v1.0/book', function (req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end('');
  });
}

module.exports = {
  setupRoutes: setupRoutes
}