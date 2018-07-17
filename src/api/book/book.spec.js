'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../')
const database = require('../database');
const Book = require('../models').book.Book;
const Sequelize = require('sequelize');
let config = require('../config').server.config;

describe('Book', function () {
  let server = null;
  const testPort = 5590;
  config.maxItemsPerPage = 5;
  const baseUrl = 'localhost:' + testPort;
  /**
   * @type {Sequelize.Sequelize}
   */
  let db = null;
  this.beforeAll(function () {
    db = database.getDatabase()
    server = api.api.server.listen(testPort);
    return db.sync({
      force: false
    });
  });

  this.afterAll(function () {
    if (server) {
      server.close();
    }
  })

  describe('should return a list of books', function () {
    const basePath = '/v1.0/book';

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
          Book.create({
            title: 'Hello'
          });
        });
    });

    it('should return a list of books', function (done) {
      chai.use(chaiHttp)
        .request(baseUrl)
        .get(basePath)
        .end((err, res) => {
          chai.expect(res).to.have.status(200)
          chai.expect(res).to.be.json;
          chai.expect(res).to.be.a('object');
          chai.expect(res.body).to.have.property('value');
          if (res.body.value) {
            chai.expect(res.body.value).to.be.a('array');
          }
          done()
        });
    });

    it('should paginate list of books', function (done) {
      chai.use(chaiHttp)
        .request(baseUrl)
        .get(basePath)
        .end((err, res) => {
          chai.expect(res.body.value).to.be.of.length(config.maxItemsPerPage);
          chai.expect(res.body).of.have.property('nextLink');
          if (res.body.nextLink) {
            chai.expect(res.body.nextLink).to.be.a('string');
            chai.expect(res.body.nextLink).to.contains('?skip=' + config.maxItemsPerPage);
          }
          done();
        });
    });
  });
})