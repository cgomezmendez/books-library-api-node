'use strict';

const fs = require('fs');
const sampleDataBasePath = __dirname + '/../../../sampleDataJson/';
const booksFile = sampleDataBasePath + 'books.json';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const books = JSON.parse(fs.readFileSync(booksFile).toString());
    for (const book of books) {
      const pagesFile = sampleDataBasePath + book.id + '/' + 'pages.json';
      const pages = JSON.parse(fs.readFileSync(pagesFile).toString());
      return queryInterface.bulkInsert('Pages', pages, {});
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Pages', null, {});
  }
};