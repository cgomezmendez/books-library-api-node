const fs = require('fs');
const stripHeaders = require('./stripHeaders');
const parser = require('./parser');

const basePath = __dirname + '/../../sampleData/';
const jsonBasePath = basePath + '/../sampleDataJson/';
const authorsFile = jsonBasePath + 'authors.json';
const booksFile = jsonBasePath + 'books.json';

function main() {
  const authorsNames = fs.readdirSync(basePath);
  let currentAuthors = JSON.parse(fs.readFileSync(authorsFile).toString());
  let nextAuthorId = getNextId(currentAuthors);
  for (const authorName of authorsNames) {
    const author = getAuthorModel(nextAuthorId, authorName, currentAuthors);
    if (author.id == nextAuthorId) {
      nextAuthorId += 1;
    }

    const booksNames = fs.readdirSync(basePath + authorName);

    for (const bookName of booksNames) {
      let currentBooks = JSON.parse(fs.readFileSync(booksFile).toString());
      let nextBookId = getNextId(currentBooks);

      const bookModel = getBookModel(nextBookId, bookName, currentBooks, author);
      if (bookModel.id == nextBookId) {
        nextBookId += 1;
      }

      const bookPath = basePath + authorName + '/' + bookName + '/';
      text = stripHeaders.stripHeaders(fs.readFileSync(bookPath + 'book.txt').toString());
      html = stripHeaders.stripHeaders(fs.readFileSync(bookPath + 'book.html').toString());
      let pagesModels = getPagesModels(html, text, bookModel);
      const bookPagesBasePath = jsonBasePath + bookModel.id + '/';
      const bookPagesFile = bookPagesBasePath + 'pages.json';
      if (!fs.existsSync(bookPagesBasePath)) {
        fs.mkdirSync(bookPagesBasePath);
      }
      fs.writeFileSync(bookPagesFile, JSON.stringify(pagesModels));

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
      name: authorName,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    currentAuthors.push(authorModel);
    nextAuthorId += 1;
    fs.writeFileSync(authorsFile, JSON.stringify(currentAuthors));
  }
  return authorModel;
}

function getBookModel(nextBookId, bookName, currentBooks, author) {
  let bookModel = currentBooks.find((existentBook) => {
    return bookName == existentBook.title && author.id == existentBook.authorId;
  });

  if (!bookModel) {
    bookModel = {
      id: nextBookId,
      title: bookName,
      authorId: author.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    currentBooks.push(bookModel);
    nextBookId += 1;
    fs.writeFileSync(booksFile, JSON.stringify(currentBooks));
  }
  return bookModel;
}

function getPagesModels(html, text, book) {
  htmlPages = parser.getHtmlPages(html);
  textPages = parser.getTextPages(text);
  let pagesModels = [];
  for (let i = 0; i < htmlPages.length; i++) {
    pagesModels.push({
      number: i + 1,
      bookId: book.id,
      html: htmlPages[i],
      text: textPages[i],
      updatedAt: new Date(),
      createdAt: new Date()
    });
  }
  return pagesModels;
}

function getNextId(models) {
  return models.length > 0 ? Math.max.apply(Math, models.map((model) => model.id)) + 1 : 1;
}

main();