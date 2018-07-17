const Sequelize = require('sequelize');

const db = require('../database').getDatabase()

const Book = db.define('book', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING
})

module.exports = {
  Book: Book
}