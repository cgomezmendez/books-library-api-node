let config = require('rc')('athena', {
  port: 3090,
  baseUrl: 'http://127.0.0.1:3090',
  maxItemsPerPage: 10,
  databaseUri: 'sqlite:db.sqlite',
  debugDatabase: false
});

module.exports = {
  config: config
}