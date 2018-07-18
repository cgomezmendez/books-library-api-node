const fs = require('fs');
const stripHeaders = require('./stripHeaders');
const parser = require('./parser');

const basePath = __dirname + '/../../sampleData/';

fs.readdir(basePath, (err, authors) => {
  const currentAuthors = JSON.parse(fs.readFileSync(basePath + '/../sampleDataJson/authors.json').toString());
  console.log(currentAuthors);
  // for (const author of authors) {
  //   const authorModel = {
  //     name: author
  //   };
  //   fs.readdir(basePath + author, (err, books) => {
  //     for (const book of books) {
  //       const bookPath = basePath + author + '/' + book + '/';
  //       text = stripHeaders.stripHeaders(fs.readFileSync(bookPath + 'book.txt').toString());
  //       html = stripHeaders.stripHeaders(fs.readFileSync(bookPath + 'book.html').toString());
  //       htmlPages = parser.getHtmlPages(html);
  //       textPages = parser.getTextPages(text);
  //       let pagesModels = [];
  //       for (let i = 0; i < htmlPages.length; i++) {
  //         pagesModels.push({
  //           bookId: 1,
  //           html: htmlPages[i],
  //           text: textPages[i],
  //           updatedAt: new Date(),
  //           createdAt: new Date()
  //         });
  //       }
  //       const bookModel = {
  //         id: 1,
  //         authorId: 1
  //       };
  //       console.log(bookModel);
  //       // console.log(JSON.stringify(pagesModels));
  //     }
  //   });
  // }
});