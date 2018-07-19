let config = require('rc')('athena', {
  host: 'localhost',
  port: 3090,
  baseUrl: 'http://127.0.0.1:3090',
  maxItemsPerPage: 10,
  debug: true
});

module.exports = {
  config: config
}