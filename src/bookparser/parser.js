const os = require('os');

function getTextPages(text) {
  return text.split(os.EOL.repeat(4));  
}

function getHtmlPages(html) {
  let pages = html.split(/<hr[^>]*>/gi);
  pages.splice(0, 1);
  pages.splice(pages.length - 1, 1);
  return pages;
}

module.exports = {
  getTextPages: getTextPages,
  getHtmlPages: getHtmlPages
}