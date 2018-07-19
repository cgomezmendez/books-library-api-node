let config = require('./api/config').server.config;
const api = require('./api').api;

api.server.listen(config.port, config.host);
if (process.env['NODE_ENV'] !== 'production' && config.debug) {
  console.debug('Starting server on http://' + config.host + ':' + config.port);
}