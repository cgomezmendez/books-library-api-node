const Sequelize = require('sequelize');

const db = require('../database').getDatabase()
let Book = require('./book').Book;

let Page = db.define('page', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  html: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

Page.Book = Page.belongsTo(Book, {
  foreignKey: {
    allowNull: false
  }
});

Book.Page = Book.hasMany(Page);

module.exports = {
  Page: Page
}