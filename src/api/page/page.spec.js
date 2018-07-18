'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const api = require('../');
const database = require('../database');
const Book = require('../models').book.Book;
const Author = require('../models').author.Author;
const Sequelize = require('sequelize');
let config = require('../config').server.config;

describe('Page', function () {
  let server = null;
  const testPort = 5590;
  config.maxItemsPerPage = 5;
  const baseUrl = 'localhost:' + testPort;
  /**
   * @type {Sequelize.Sequelize}
   */
  let db = null;
  this.beforeAll(() => {
    db = database.getDatabase();
    server = api.api.server.listen(testPort);
    return db.sync({
      force: true
    }).then(() => {
      Book.sync().then(() => {
        Author.create({
          name: 'John Doe',
          books: [{
            title: 'Test-1',
            pages: [{
                text: `To Sherlock Holmes she is always THE woman. I have seldom heard
                him mention her under any other name. In his eyes she eclipses
                and predominates the whole of her sex. It was not that he felt
                any emotion akin to love for Irene Adler. All emotions, and that
                one particularly, were abhorrent to his cold, precise but
                admirably balanced mind. He was, I take it, the most perfect
                reasoning and observing machine that the world has seen, but as a
                lover he would have placed himself in a false position. He never
                spoke of the softer passions, save with a gibe and a sneer. They
                were admirable things for the observer--excellent for drawing the
                veil from men's motives and actions. But for the trained reasoner
                to admit such intrusions into his own delicate and finely
                adjusted temperament was to introduce a distracting factor which
                might throw a doubt upon all his mental results. Grit in a
                sensitive instrument, or a crack in one of his own high-power
                lenses, would not be more disturbing than a strong emotion in a
                nature such as his. And yet there was but one woman to him, and
                that woman was the late Irene Adler, of dubious and questionable
                memory.`
              },
              {
                text: `To Sherlock Holmes she is always THE woman. I have seldom heard
                him mention her under any other name. In his eyes she eclipses
                and predominates the whole of her sex. It was not that he felt
                any emotion akin to love for Irene Adler. All emotions, and that
                one particularly, were abhorrent to his cold, precise but
                admirably balanced mind. He was, I take it, the most perfect
                reasoning and observing machine that the world has seen, but as a
                lover he would have placed himself in a false position. He never
                spoke of the softer passions, save with a gibe and a sneer. They
                were admirable things for the observer--excellent for drawing the
                veil from men's motives and actions. But for the trained reasoner
                to admit such intrusions into his own delicate and finely
                adjusted temperament was to introduce a distracting factor which
                might throw a doubt upon all his mental results. Grit in a
                sensitive instrument, or a crack in one of his own high-power
                lenses, would not be more disturbing than a strong emotion in a
                nature such as his. And yet there was but one woman to him, and
                that woman was the late Irene Adler, of dubious and questionable
                memory.`
              },
              {
                text: `To Sherlock Holmes she is always THE woman. I have seldom heard
                him mention her under any other name. In his eyes she eclipses
                and predominates the whole of her sex. It was not that he felt
                any emotion akin to love for Irene Adler. All emotions, and that
                one particularly, were abhorrent to his cold, precise but
                admirably balanced mind. He was, I take it, the most perfect
                reasoning and observing machine that the world has seen, but as a
                lover he would have placed himself in a false position. He never
                spoke of the softer passions, save with a gibe and a sneer. They
                were admirable things for the observer--excellent for drawing the
                veil from men's motives and actions. But for the trained reasoner
                to admit such intrusions into his own delicate and finely
                adjusted temperament was to introduce a distracting factor which
                might throw a doubt upon all his mental results. Grit in a
                sensitive instrument, or a crack in one of his own high-power
                lenses, would not be more disturbing than a strong emotion in a
                nature such as his. And yet there was but one woman to him, and
                that woman was the late Irene Adler, of dubious and questionable
                memory.`
              },
              {
                text: `To Sherlock Holmes she is always THE woman. I have seldom heard
                him mention her under any other name. In his eyes she eclipses
                and predominates the whole of her sex. It was not that he felt
                any emotion akin to love for Irene Adler. All emotions, and that
                one particularly, were abhorrent to his cold, precise but
                admirably balanced mind. He was, I take it, the most perfect
                reasoning and observing machine that the world has seen, but as a
                lover he would have placed himself in a false position. He never
                spoke of the softer passions, save with a gibe and a sneer. They
                were admirable things for the observer--excellent for drawing the
                veil from men's motives and actions. But for the trained reasoner
                to admit such intrusions into his own delicate and finely
                adjusted temperament was to introduce a distracting factor which
                might throw a doubt upon all his mental results. Grit in a
                sensitive instrument, or a crack in one of his own high-power
                lenses, would not be more disturbing than a strong emotion in a
                nature such as his. And yet there was but one woman to him, and
                that woman was the late Irene Adler, of dubious and questionable
                memory.`
              },
              {
                text: `To Sherlock Holmes she is always THE woman. I have seldom heard
                him mention her under any other name. In his eyes she eclipses
                and predominates the whole of her sex. It was not that he felt
                any emotion akin to love for Irene Adler. All emotions, and that
                one particularly, were abhorrent to his cold, precise but
                admirably balanced mind. He was, I take it, the most perfect
                reasoning and observing machine that the world has seen, but as a
                lover he would have placed himself in a false position. He never
                spoke of the softer passions, save with a gibe and a sneer. They
                were admirable things for the observer--excellent for drawing the
                veil from men's motives and actions. But for the trained reasoner
                to admit such intrusions into his own delicate and finely
                adjusted temperament was to introduce a distracting factor which
                might throw a doubt upon all his mental results. Grit in a
                sensitive instrument, or a crack in one of his own high-power
                lenses, would not be more disturbing than a strong emotion in a
                nature such as his. And yet there was but one woman to him, and
                that woman was the late Irene Adler, of dubious and questionable
                memory.`
              },
              {
                text: `To Sherlock Holmes she is always THE woman. I have seldom heard
                him mention her under any other name. In his eyes she eclipses
                and predominates the whole of her sex. It was not that he felt
                any emotion akin to love for Irene Adler. All emotions, and that
                one particularly, were abhorrent to his cold, precise but
                admirably balanced mind. He was, I take it, the most perfect
                reasoning and observing machine that the world has seen, but as a
                lover he would have placed himself in a false position. He never
                spoke of the softer passions, save with a gibe and a sneer. They
                were admirable things for the observer--excellent for drawing the
                veil from men's motives and actions. But for the trained reasoner
                to admit such intrusions into his own delicate and finely
                adjusted temperament was to introduce a distracting factor which
                might throw a doubt upon all his mental results. Grit in a
                sensitive instrument, or a crack in one of his own high-power
                lenses, would not be more disturbing than a strong emotion in a
                nature such as his. And yet there was but one woman to him, and
                that woman was the late Irene Adler, of dubious and questionable
                memory.`
              },
              {
                text: `To Sherlock Holmes she is always THE woman. I have seldom heard
                him mention her under any other name. In his eyes she eclipses
                and predominates the whole of her sex. It was not that he felt
                any emotion akin to love for Irene Adler. All emotions, and that
                one particularly, were abhorrent to his cold, precise but
                admirably balanced mind. He was, I take it, the most perfect
                reasoning and observing machine that the world has seen, but as a
                lover he would have placed himself in a false position. He never
                spoke of the softer passions, save with a gibe and a sneer. They
                were admirable things for the observer--excellent for drawing the
                veil from men's motives and actions. But for the trained reasoner
                to admit such intrusions into his own delicate and finely
                adjusted temperament was to introduce a distracting factor which
                might throw a doubt upon all his mental results. Grit in a
                sensitive instrument, or a crack in one of his own high-power
                lenses, would not be more disturbing than a strong emotion in a
                nature such as his. And yet there was but one woman to him, and
                that woman was the late Irene Adler, of dubious and questionable
                memory.`
              },
              {
                text: `To Sherlock Holmes she is always THE woman. I have seldom heard
                him mention her under any other name. In his eyes she eclipses
                and predominates the whole of her sex. It was not that he felt
                any emotion akin to love for Irene Adler. All emotions, and that
                one particularly, were abhorrent to his cold, precise but
                admirably balanced mind. He was, I take it, the most perfect
                reasoning and observing machine that the world has seen, but as a
                lover he would have placed himself in a false position. He never
                spoke of the softer passions, save with a gibe and a sneer. They
                were admirable things for the observer--excellent for drawing the
                veil from men's motives and actions. But for the trained reasoner
                to admit such intrusions into his own delicate and finely
                adjusted temperament was to introduce a distracting factor which
                might throw a doubt upon all his mental results. Grit in a
                sensitive instrument, or a crack in one of his own high-power
                lenses, would not be more disturbing than a strong emotion in a
                nature such as his. And yet there was but one woman to him, and
                that woman was the late Irene Adler, of dubious and questionable
                memory.`
              },
              {
                text: `To Sherlock Holmes she is always THE woman. I have seldom heard
                him mention her under any other name. In his eyes she eclipses
                and predominates the whole of her sex. It was not that he felt
                any emotion akin to love for Irene Adler. All emotions, and that
                one particularly, were abhorrent to his cold, precise but
                admirably balanced mind. He was, I take it, the most perfect
                reasoning and observing machine that the world has seen, but as a
                lover he would have placed himself in a false position. He never
                spoke of the softer passions, save with a gibe and a sneer. They
                were admirable things for the observer--excellent for drawing the
                veil from men's motives and actions. But for the trained reasoner
                to admit such intrusions into his own delicate and finely
                adjusted temperament was to introduce a distracting factor which
                might throw a doubt upon all his mental results. Grit in a
                sensitive instrument, or a crack in one of his own high-power
                lenses, would not be more disturbing than a strong emotion in a
                nature such as his. And yet there was but one woman to him, and
                that woman was the late Irene Adler, of dubious and questionable
                memory.`
              },
              {
                text: `To Sherlock Holmes she is always THE woman. I have seldom heard
                him mention her under any other name. In his eyes she eclipses
                and predominates the whole of her sex. It was not that he felt
                any emotion akin to love for Irene Adler. All emotions, and that
                one particularly, were abhorrent to his cold, precise but
                admirably balanced mind. He was, I take it, the most perfect
                reasoning and observing machine that the world has seen, but as a
                lover he would have placed himself in a false position. He never
                spoke of the softer passions, save with a gibe and a sneer. They
                were admirable things for the observer--excellent for drawing the
                veil from men's motives and actions. But for the trained reasoner
                to admit such intrusions into his own delicate and finely
                adjusted temperament was to introduce a distracting factor which
                might throw a doubt upon all his mental results. Grit in a
                sensitive instrument, or a crack in one of his own high-power
                lenses, would not be more disturbing than a strong emotion in a
                nature such as his. And yet there was but one woman to him, and
                that woman was the late Irene Adler, of dubious and questionable
                memory.`
              }
            ]
          }]
        }, {
          include: [{
            association: Author.Book,
            include: [Book.Page]
          }]
        });
      });
    });
  });

  this.afterAll(() => {
    if (server) {
      server.close();
    }
  });

  describe('should return list of pages of a book', () => {
    const basePath = '/v1.0/book/1/page';

    it('should return pages of book given book id', (done) => {
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
            chai.expect(res.body.value).to.be.an('array');
          }
          done();
        });
    });
  });
});