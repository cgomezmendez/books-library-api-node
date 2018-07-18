let config = require('../config').server.config;
const url = require('whatwg-url');


function pagination(req) {
  const params = new url.URL(config.baseUrl + req.url).searchParams;
  const skipParam = getNumberParamOrDefault(params, 'skip', null);
  const topParam = getNumberParamOrDefault(params, 'top', null);
  const maxPageSize = getNumberParamOrDefault(params, 'maxPageSize', null);
  const maxItemsPerPage = config.maxItemsPerPage;

  let top = null;
  if (topParam && topParam < maxItemsPerPage) {
    top = topParam;
  } else if (maxPageSize && maxPageSize <= maxItemsPerPage) {
    top = maxPageSize;
    req.maxPageSize = maxPageSize;
  } else {
    top = maxItemsPerPage;
  }

  let skip = null;
  if (skipParam && skipParam >= 0) {
    skip = skipParam;
  } else {
    skip = 0;
  }

  req.top = top;
  req.skip = skip;
}

function getNumberParamOrDefault(params, key, defaultValue) {
  const value = Number.parseInt(params.get(key));
  return Number.isInteger(value) ? value : defaultValue;
}

module.exports = {
  pagination: pagination
}