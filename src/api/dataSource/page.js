const models = require('../../db/models');


function getPages(top, skip, bookId) {
  return new Promise((resolve, reject) => {
    models.Page.findAll({
      limit: top,
      offset: skip,
      where: {
        bookId: bookId
      },
      order: [
        'number'
      ]
    }).then((pages) => {
      const result = pages.map((page) => {
        return {
          id: page.id,
          html: page.html,
          text: page.text,
          number: page.number
        }
      });
      resolve(result);
    });
  });
}

function getPageByIdAndBookId(bookId, pageId) {
  return new Promise((resolve, reject) => {
    models.Page.findOne({
      where: {
        bookId: bookId,
        id: pageId
      }
    }).then((page) => {
      if (!page) {
        resolve(null);
        return;
      }
      const result = {
        id: page.id,
        text: page.text,
        html: page.html,
        number: page.number
      };
      resolve(result);
    });
  });
}

function getPagesCount(bookId) {
  return new Promise((resolve, reject) => {
    models.Page.count({
      where: {
        bookId: bookId
      }
    }).then((count) => {
      resolve(count);
    });
  });
}

module.exports = {
  getPages: getPages,
  getPageByIdAndBookId: getPageByIdAndBookId,
  getPagesCount: getPagesCount
}