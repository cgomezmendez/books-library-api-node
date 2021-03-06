const Router = require('router');
const http = require('http');
const finalHandler = require('finalhandler');
let config = require('./config');
const book = require('./book');
const page = require('./page');

var router = Router();

router.get('/status', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8  ');
  res.end('OK');
});

book.routes.setupRoutes(router);
page.routes.setupRoutes(router);

const server = http.createServer(function (req, res) {
  router(req, res, finalHandler(req, res));
});

module.exports = {
  server: server
}