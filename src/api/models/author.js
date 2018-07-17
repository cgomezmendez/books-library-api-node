const Sequelize = require('sequelize');

const db = require('../database').getDatabase()

let Author = db.define('author', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

module.exports = {
  Author: Author
}