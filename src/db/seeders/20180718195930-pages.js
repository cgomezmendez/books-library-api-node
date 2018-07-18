'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Pages', [{
      id: 1,
      bookId: 1,
      text: `THE ADVENTURES OF SHERLOCK HOLMES

    by
    
    SIR ARTHUR CONAN DOYLE
    
    
    
       I. A Scandal in Bohemia
      II. The Red-headed League
     III. A Case of Identity
      IV. The Boscombe Valley Mystery
       V. The Five Orange Pips
      VI. The Man with the Twisted Lip
     VII. The Adventure of the Blue Carbuncle
    VIII. The Adventure of the Speckled Band
      IX. The Adventure of the Engineer's Thumb
       X. The Adventure of the Noble Bachelor
      XI. The Adventure of the Beryl Coronet
     XII. The Adventure of the Copper Beeches`,
      html: `<hr size="3" noshade="">
    <center>
    <h1>THE ADVENTURES OF<br>SHERLOCK HOLMES</h1><br><h3>BY</h3><br><h2>SIR ARTHUR CONAN DOYLE</h2>
    <hr size="3" noshade="">
    <br>
    <h2>CONTENTS</h2></center>
    <div class="toc">
    <br>
    <table class="bold" cellpadding="2" cellspacing="2" summary="Table of Contents">
    <colgroup><col align="right">
    <col align="left">
    </colgroup><tbody><tr><td>I.</td><td><a href="#1">A Scandal in Bohemia</a></td></tr>
    <tr><td>II.</td><td><a href="#2">The Red-Headed League</a></td></tr>
    <tr><td>III.</td><td><a href="#3">A Case of Identity</a></td></tr>
    <tr><td>IV.</td><td><a href="#4">The Boscombe Valley Mystery</a></td></tr>
    <tr><td>V.</td><td><a href="#5">The Five Orange Pips</a></td></tr>
    <tr><td>VI.</td><td><a href="#6">The Man with the Twisted Lip</a></td></tr>
    <tr><td>VII.</td><td><a href="#7">The Adventure of the Blue Carbuncle</a></td></tr>
    <tr><td>VIII.</td><td><a href="#8">The Adventure of the Speckled Band</a></td></tr>
    <tr><td>IX.</td><td><a href="#9">The Adventure of the Engineer’s Thumb</a></td></tr>
    <tr><td>X.</td><td><a href="#10">The Adventure of the Noble Bachelor</a></td></tr>
    <tr><td>XI.</td><td><a href="#11">The Adventure of the Beryl Coronet</a></td></tr>
    <tr><td>XII.</td><td><a href="#12">The Adventure of the Copper Beeches</a></td></tr>
    </tbody></table></div>
    <br>
    <hr>
    <br>`,
      updatedAt: new Date(),
      createdAt: new Date()
    }], {});
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