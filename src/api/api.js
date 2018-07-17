const Router = require('router');
const http = require('http');
const finalHandler = require('finalhandler');
const config = require('./config');

var router = Router();

router.get('/status', function(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8  ');
  res.end('OK');
});

const server = http.createServer(function (req, res) {
  router(req, res, finalHandler(req, res));
});

module.exports = {
  server: server
}