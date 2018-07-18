'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
    Book.Author = Book.belongsTo(models.Author);
    Book.Page = Book.hasMany(models.Page);
  };
  return Book;
};