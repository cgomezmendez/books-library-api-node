'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../')
const database = require('../database');
const Book = require('../models').book.Book;
const Sequelize = require('sequelize');

describe('Book', function () {
  let server = null;
  const testPort = 5590;
  /**
   * @type {Sequelize.Sequelize}
   */
  let db = null;
  this.beforeAll(function () {
    db = database.getDatabase()
    server = api.api.server.listen(testPort);
    return db.sync({
      force: true
    });
  });

  this.afterAll(function () {
    if (server) {
      server.close();
    }
  })

  describe('should return a list of books', function () {

    before(function () {
      return Book.sync()
        .then(() => {
          Book.create({
            title: 'Hello'
          });
          Book.create({
            title: 'Hello'
          });
          Book.create({
            title: 'Hello'
          });
          Book.create({
            title: 'Hello'
          });
          Book.create({
            title: 'Hello'
          });
          Book.create({
            title: 'Hello'
          });
          Book.create({
            title: 'Hello'
          });
          Book.create({
            title: 'Hello'
          });
          Book.create({
            title: 'Hello'
          });
          Book.create({
            title: 'Hello'
          });
          Book.create({
            title: 'Hello'
          });
        });
    });

    it('should return a list of books', function (done) {
      chai.use(chaiHttp).request('localhost:' + testPort)
        .get('/v1.0/book')
        .end(function (err, res) {
          console.log(res.text);
          chai.expect(res).to.have.status(200)
          chai.expect(res).to.be.json;
          chai.expect(res).to.be.a('object');
          chai.expect(res.body).to.have.property('value');
          if (res.body.value) {
            chai.expect(res.body.value).to.be.a('array');
          }
        });
    });
  });
})