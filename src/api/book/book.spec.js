'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
let config = require('../config').server.config;
let database = require('../../db/models').sequelize;
let models = require('../../db/models');
const sequelize = require('sequelize');

describe('Book', function () {
  const testPort = 5590;
  const server = require('../').api.server;
  config.maxItemsPerPage = 1;
  const baseUrl = 'localhost:' + testPort;

  this.beforeAll(() => {
    /**
     * @type {sequelize.Model}
     */
    const Book = models.Book;
    /**
     * @type {sequelize.Model}
     */
    let Author = models.Author;
    server.listen(testPort);
    return new Promise((resolve, reject) => {
      database.sync({
        force: true
      }).then(() => {
        Author.create({
          name: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
          Books: [{
            title: 'Test-1',
            authorId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: 'Test-2',
            authorId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          }]
        }, {
          include: [{
            association: Author.Book,
            include: [Book.Page]
          }]
        }).then(() => {
          resolve();
        });
      })
    });
  });

  this.afterAll(() => {
    if (server) {
      server.close();
    }
  });

  describe('should return a list of books', () => {
    const basePath = '/v1.0/book';

    it('should return a list of books', done => {
      chai
        .use(chaiHttp)
        .request(baseUrl)
        .get(basePath)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res).to.be.json;
          chai.expect(res).to.be.a('object');
          chai.expect(res.body).to.have.property('value');
          if (res.body.value) {
            chai.expect(res.body.value).to.be.a('array');
          }
          done();
        });
    });

    it('should paginate list of books', done => {
      chai
        .use(chaiHttp)
        .request(baseUrl)
        .get(basePath)
        .end((err, res) => {
          chai.expect(res.body.value).to.be.of.length(config.maxItemsPerPage);
          chai.expect(res.body).to.have.property('nextLink');
          if (res.body.nextLink) {
            chai.expect(res.body.nextLink).to.be.a('string');
            chai.expect(res.body.nextLink).to.contains('?skip=' + config.maxItemsPerPage);
          }
          done();
        });
    });
  });

  describe('should view single book', done => {
    const basePath = '/v1.0/book/1';

    it('should return single view', done => {
      chai
        .use(chaiHttp)
        .request(baseUrl)
        .get(basePath)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res).to.be.json;
          chai.expect(res.body).to.have.property('id');
          chai.expect(res.body).to.have.property('title');
          chai.expect(res.body).to.have.property('author');
          if (res.body.pages) {
            chai.expect(res.body.pages).to.be.a('array');
          }
          done();
        });
    });
  });
});