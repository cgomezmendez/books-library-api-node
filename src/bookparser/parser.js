const os = require('os');

function getTextPages(text) {
  return text.split(os.EOL.repeat(4)).filter((item) => item !== undefined);
}

function getHtmlPages(html) {
  let regex = /<div style="height: 4em;">\r\n(<br\W+\/>){4}\r\n<\/div>/gi;
  let pages = [];
  let haveWords = /<p|<h1|<h2|<h3|<a/gi
  pages = html.split(/(?=<h2[^>]*>)|(?=<h1[^>]*>)|(?=<h3[^>]*><a)/gi).filter((item) => item !== undefined && item.trim().length > 0 && item.search(haveWords) > -1);
  return pages;
}

module.exports = {
  getTextPages: getTextPages,
  getHtmlPages: getHtmlPages
}