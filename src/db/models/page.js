'use strict';
module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define('Page', {
    text: DataTypes.STRING,
    html: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {});
  Page.associate = function(models) {
    // associations can be defined here
    Page.Book = Page.belongsTo(models.Book);
  };
  return Page;
};