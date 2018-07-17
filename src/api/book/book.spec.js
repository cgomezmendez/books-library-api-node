'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../')

describe('Book', function () {
  var server = null;
  const testPort = 5590;
  this.beforeAll(function () {
    server = api.api.server.listen(testPort);
  });
  this.afterAll(function () {
    if (server) {
      server.close();
    }
  })
  it('should return a list of books', function (done) {
    chai.use(chaiHttp).request('localhost:' + testPort)
      .get('/v1.0/book')
      .end(function (err, res) {
        chai.expect(res).to.have.status(200)
        chai.expect(res).to.be.json;
        chai.expect(res).to.be.a('object');
        chai.expect(res).to.have.property('value');
        chai.expect(res.body.value).to.be.a('array');
      });
  });
})