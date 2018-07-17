'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

describe('Book', function () {
  it('should return a list of books', function (done) {
    chai.use(chaiHttp).request('/v1.0/book')
      .get('localhost:8090')
      .end(function (err, res) {
        chai.expect(res).to.have.status(200)
        chai.expect(res).to.be.json;
        chai.expect(res).to.be.a('object');
        chai.expect(res).to.have.property('value');
        chai.expect(res.body.value).to.be.a('array');
      }).catch(function (err) {
        done(err);
      });
  });
})