const fs = require('fs');
const stripHeaders = require('./stripHeaders');
const parser = require('./parser');

const basePath = __dirname + '/../../sampleData/';
const authorsFile = basePath + '/../sampleDataJson/authors.json';

fs.readdir(basePath, (err, authors) => {
  let currentAuthors = JSON.parse(fs.readFileSync(authorsFile).toString());
  console.log(currentAuthors);
  const maxId = Math.max.apply(Math, currentAuthors.map((author) => author.id));
  let nextId = maxId + 1;
  for (const author of authors) {
    let authorModel = currentAuthors.find((existentAuthor) => {
      return author == existentAuthor.name;
    });
    if (!authorModel) {
      authorModel = {
        id: nextId,
        name: author
      };
      currentAuthors.push(authorModel);
    }
    fs.writeFileSync(authorsFile, JSON.stringify(currentAuthors));
    
    fs.readdir(basePath + author, (err, books) => {
      for (const book of books) {
        const bookPath = basePath + author + '/' + book + '/';
        text = stripHeaders.stripHeaders(fs.readFileSync(bookPath + 'book.txt').toString());
        html = stripHeaders.stripHeaders(fs.readFileSync(bookPath + 'book.html').toString());
        htmlPages = parser.getHtmlPages(html);
        textPages = parser.getTextPages(text);
        let pagesModels = [];
        for (let i = 0; i < htmlPages.length; i++) {
          pagesModels.push({
            bookId: 1,
            html: htmlPages[i],
            text: textPages[i],
            updatedAt: new Date(),
            createdAt: new Date()
          });
        }
        const bookModel = {
          id: 1,
          authorId: 1
        };
      }
    });
  }
});