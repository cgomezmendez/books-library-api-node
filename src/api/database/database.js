const Sequelize = require('sequelize');


let database = null;

/**
 * @returns {Sequelize.Sequelize}
 * @returns 
 */
function getDatabase() {
  if (database == null) {
    database = new Sequelize('books', null,
      null, {
        dialect: 'sqlite',
        storage: './db.sqlite'
      });
  }
  return database;
}

module.exports = {
  getDatabase: getDatabase
}