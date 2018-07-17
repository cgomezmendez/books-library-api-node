const Sequelize = require('sequelize');

const db = require('../database').getDatabase()
let Book = require('./book').Book;

let Page = db.define('page', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
})

Page.Book = Page.belongsTo(Book, {
  foreignKey: {
    allowNull: false
  }
});

module.exports = {
  Page: Page
}