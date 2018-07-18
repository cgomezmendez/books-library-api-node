const Sequelize = require('sequelize');
let config = require('../config').server.config;


let database = null;

/**
 * @returns {Sequelize.Sequelize}
 * @returns 
 */
function getDatabase() {
  if (database == null) {
    database = new Sequelize(config.databaseUri, {
      logging: config.debugDatabase
    });
  }
  return database;
}

module.exports = {
  getDatabase: getDatabase
}