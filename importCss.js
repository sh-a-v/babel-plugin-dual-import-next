/* eslint-disable */

var ADDED = {};

module.exports = function(chunkName) {
  var href = getHref(chunkName)
  if (!href) {
    if (process.env.NODE_ENV === 'development') {
      if (typeof window === 'undefined' || !window.__CSS_CHUNKS__) {
        console.warn(
          '[DUAL-IMPORT] no css chunks hash found at "window.__CSS_CHUNKS__"'
        )
        return
      }

      console.warn(
        '[DUAL-IMPORT] no chunk, ',
        chunkName,
        ', found in "window.__CSS_CHUNKS__"'
      )
    }

    return
  }
  
  if (ADDED[href] === true) {
    return Promise.resolve();
  }
  ADDED[href] = true;

  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');

  link.href = href;
  link.rel = 'stylesheet';

  return new Promise(function(resolve, reject) {
    link.onload = function() {
      resolve();
    };

    head.appendChild(link);
  })
}

function getHref(chunkName) {
  if (typeof window === 'undefined' || !window.__CSS_CHUNKS__) return null
  return window.__CSS_CHUNKS__[chunkName]
}
