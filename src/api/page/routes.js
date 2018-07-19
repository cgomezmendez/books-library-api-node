const Router = require('router');
const util = require('../util');
const dataSource = require('../dataSource');


/**
 * 
 * @param {Router} router 
 */
function setupRoutes(router) {
  router.get('/v1.0/book/:bookId/page', async (req, res) => {
    util.pagination(req);
    result = {};
    const bookId = req.params.bookId;
    const pagesResult = await dataSource.getPages(req.top, req.skip, bookId);
    result.value = pagesResult.map((page, _, __) => {
      return {
        id: page.id,
        html: page.html,
        text: page.text,
        number: page.number
      }
    });
    if (pagesResult.count - req.skip > req.top) {
      result.nextLink = util.nextPage(req);
    }
    res.setHeader('Content-Type', util.ContentType.getContentTypeString(util.ContentType.json));
    res.end(JSON.stringify(result));
  });

  router.route('/v1.0/book/:bookId/page/:pageId')
    .get((req, res) => {
      const bookId = req.params.bookId;
      const pageId = req.params.pageId;
      dataSource.getPageByIdAndBookId(bookId, pageId).then((page) => {
        if (!page) {
          const error = {
            error: {
              code: 'PAGE_NOT_FOUND',
              message: 'page with this id couldn\'t be found'
            }
          }
          res.end(JSON.stringify(error));
          return
        }
        const pageResult = {
          id: page.id,
          text: page.text,
          html: page.html,
          number: page.number
        }
        res.setHeader('Content-Type', util.ContentType.getContentTypeString(util.ContentType.json));
        res.end(JSON.stringify(pageResult));
      });
    });

  router.route('/v1.0/book/:bookId/page/:pageId/:format')
    .get((req, res) => {
      const bookId = req.params.bookId;
      const pageId = req.params.pageId;
      const format = req.params.format;
      dataSource.getPageByIdAndBookId(bookId, pageId).then((page) => {
        if (!page) {
          const error = {
            error: {
              code: 'PAGE_NOT_FOUND',
              message: 'page with this id couldn\'t be found'
            }
          }
          res.end(JSON.stringify(error));
          return
        }
        let response = null;
        let contentType = null;
        switch (format) {
          case 'html':
            response = page.html;
            contentType = util.ContentType.getContentTypeString(util.ContentType.html);
            break;
          case 'text':
            response = page.text;
            contentType = util.ContentType.getContentTypeString(util.ContentType.text);
            break;
          default:
            response = page.text;
            contentType = util.ContentType.getContentTypeString(util.ContentType.text);
            break;
        }
        res.setHeader('Content-Type', contentType);
        res.end(response);
      });
    });
}

module.exports = {
  setupRoutes: setupRoutes
}