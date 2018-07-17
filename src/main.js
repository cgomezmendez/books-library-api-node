const config = require('./api/config').server.config;
const api = require('./api').api;

api.server.listen(config.port);