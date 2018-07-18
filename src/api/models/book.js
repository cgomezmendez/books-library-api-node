const Sequelize = require('sequelize');

const db = require('../database').getDatabase()
let Author = require('./author').Author;

let Book = db.define('book', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
});


Book.Author = Book.belongsTo(Author, {
  foreignKey: {
    allowNull: true,
  }
});;

Author.Book = Author.hasMany(Book);

module.exports = {
  Book: Book
}