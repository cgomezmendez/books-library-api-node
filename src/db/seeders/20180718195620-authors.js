'use strict';

const fs = require('fs');
const sampleDataBasePath = __dirname + '/../../../sampleDataJson/';
const authorsFile = sampleDataBasePath + 'authors.json';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const authors = JSON.parse(fs.readFileSync(authorsFile).toString());
    return queryInterface.bulkInsert('Authors', authors, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Authors', null, {});
  }
};