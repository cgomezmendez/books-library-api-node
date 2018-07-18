const textStartMarkers = require('./text').textStartMarkers;
const textEndMarkers = require('./text').textEndMarkers;
const legaleseStartMarkers = require('./text').legaleseStartMarkers;
const legaleseEndMarkers = require('./text').legaleseEndMarkers;
var os = require('os');

function stripHeaders(text) {
  lines = text.split((/\r?\n/));
  sep = os.EOL;
  out = [];
  i = 0;
  footerFound = false;
  ignoreSection = false;

  for (let line of lines) {
    let reset = false;
    if (i <= 600) {
      if (textStartMarkers.some((token) => line.startsWith(token))) {
        reset = true;
      }
    }

    if (reset) {
      out = [];
      continue;
    }

    if (i >= 100) {
      if (textEndMarkers.some((token) => line.startsWith(token))) {
        footerFound = true;
      }
    }
    if (footerFound) {
      break;
    }

    if (legaleseStartMarkers.some((token) => line.startsWith(token))) {
      ignoreSection = true;
      continue;
    } else if (legaleseEndMarkers.some((token) => line.startsWith(token))) {
      ignoreSection = false;
      continue;
    }

    if (!ignoreSection) {
      out.push(line.trim());
      i += 1;
    }
  }
  return out.join(sep).trim();
}

module.exports = {
  stripHeaders: stripHeaders
}