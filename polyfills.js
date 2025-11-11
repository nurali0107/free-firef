// Polyfills for cross-browser compatibility
// This file is automatically loaded by Next.js webpack configuration

// Only run in browser environment
if (typeof window !== 'undefined') {
  // Import core-js for modern JavaScript features
  require('core-js/stable');
  require('regenerator-runtime/runtime');

  // Array.from polyfill for older browsers (fallback)
  if (!Array.from) {
    Array.from = function(object) {
      'use strict';
      return [].slice.call(object);
    };
  }

  // Object.assign polyfill for older browsers (fallback)
  if (typeof Object.assign !== 'function') {
    Object.assign = function(target) {
      'use strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    };
  }

  // String.includes polyfill for older browsers
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }
      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }

  // Array.includes polyfill for older browsers
  if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement, fromIndex) {
      'use strict';
      var O = Object(this);
      var len = parseInt(O.length) || 0;
      if (len === 0) {
        return false;
      }
      var n = parseInt(fromIndex) || 0;
      var k;
      if (n >= 0) {
        k = n;
      } else {
        k = len + n;
        if (k < 0) {
          k = 0;
        }
      }
      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }
      for (; k < len; k++) {
        if (sameValueZero(O[k], searchElement)) {
          return true;
        }
      }
      return false;
    };
  }

  // Smooth scroll behavior polyfill for older browsers
  if (!('scrollBehavior' in document.documentElement.style)) {
    var style = document.createElement('style');
    style.textContent = 'html { scroll-behavior: smooth; }';
    document.head.appendChild(style);
  }
}
