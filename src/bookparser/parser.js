const os = require('os');

function getTextPages(text) {
  return text.split(os.EOL.repeat(4)).filter((item) => item !== undefined);
}

function getHtmlPages(html) {
  let regex = /<div style="height: 4em;">\r\n(<br\W+\/>){4}\r\n<\/div>/gi;
  // let regex = /<a name="\w" id="\w"><\/a>/gi;
  let pages = [];
  // if (regex.test(html)) {
  //   `<p>
  //   <br> <br>
  // </p>`
  //   // pages = html.split(/(<p>\r\n<br[^>]*>\W+br\W+\/>\r\n<\/p>)|(<hr[^>]*>)/gi);
  // pages = html.split(/(<hr[^>]*>)|(<h2[^>]*>)/gi);
  //   console.log(pages[0]);
  //   console.log(pages.length);
  // } else {
  let haveWords = /<p|<h1|<h2|<h3|<a/gi
  pages = html.split(/(?=<h2[^>]*>)|(?=<h1[^>]*>)|(?=<h3[^>]*><a)/gi).filter((item) => item !== undefined && item.trim().length > 0 && item.search(haveWords) > -1);
  // console.log(pages.length);
  // console.log(pages[0]);
  // }
  // pages.splice(0, 1);
  // pages.splice(pages.length - 1, 1);
  return pages;
}

module.exports = {
  getTextPages: getTextPages,
  getHtmlPages: getHtmlPages
}