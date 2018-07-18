'use strict';
module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
    name: DataTypes.STRING
  }, {});
  Author.associate = function(models) {
    // associations can be defined here
    Author.Book = Author.hasMany(models.Book);
  };
  return Author;
};