const fs = require('fs');
const stripHeaders = require('./stripHeaders');
const parser = require('./parser');

const basePath = __dirname + '/../../sampleData/';
const authorsFile = basePath + '/../sampleDataJson/authors.json';
const booksFile = basePath + '/../sampleDataJson/books.json';

function main() {
  const authorsNames = fs.readdirSync(basePath);
  let currentAuthors = JSON.parse(fs.readFileSync(authorsFile).toString());
  let nextAuthorId = getNextId(currentAuthors);
  for (const authorName of authorsNames) {
    const author = getAuthorModel(nextAuthorId, authorName, currentAuthors);

    const booksNames = fs.readdirSync(basePath + authorName);

    for (const bookName of booksNames) {
      let currentBooks = JSON.parse(fs.readFileSync(booksFile).toString());
      let nextBookId = getNextId(currentBooks);

      let bookModel = currentBooks.find((existentBook) => {
        return bookName == existentBook.title && author.id == existentBook.id;
      });

      if (!bookModel) {
        bookModel = {
          id: nextBookId,
          title: bookName,
          authorId: author.id
        };
        currentBooks.push(bookModel);
        nextAuthorId += 1;
        fs.writeFileSync(booksFile, JSON.stringify(currentBooks));
      }

      const bookPath = basePath + authorName + '/' + bookName + '/';
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
    }
  }
}

function getAuthorModel(nextAuthorId, authorName, currentAuthors) {
  let authorModel = currentAuthors.find((existentAuthor) => {
    return authorName == existentAuthor.name;
  });
  if (!authorModel) {
    authorModel = {
      id: nextAuthorId,
      name: authorName
    };
    currentAuthors.push(authorModel);
    nextAuthorId += 1;
    fs.writeFileSync(authorsFile, JSON.stringify(currentAuthors));
  }
  return authorModel;
}

function getNextId(models) {
  return models.length > 0 ? Math.max.apply(Math, models.map((model) => model.id)) + 1 : 1;
}