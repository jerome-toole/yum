/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 705:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(639);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 239:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(705),
    getRawTag = __webpack_require__(607),
    objectToString = __webpack_require__(333);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 561:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var trimmedEndIndex = __webpack_require__(990);

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ 957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ 607:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Symbol = __webpack_require__(705);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 333:
/***/ ((module) => {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 639:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var freeGlobal = __webpack_require__(957);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 990:
/***/ ((module) => {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ 279:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(218),
    now = __webpack_require__(771),
    toNumber = __webpack_require__(841);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ 218:
/***/ ((module) => {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 5:
/***/ ((module) => {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 448:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseGetTag = __webpack_require__(239),
    isObjectLike = __webpack_require__(5);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 771:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(639);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ 841:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var baseTrim = __webpack_require__(561),
    isObject = __webpack_require__(218),
    isSymbol = __webpack_require__(448);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./_src/components/animate/scripts-main.js
const animateItems = document.querySelectorAll('.animate');
const animateObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate--play');
    } else if (entry.boundingClientRect.top > 0) {
      // Only replay the animation if the user scrolls back up to the top
      entry.target.classList.remove('animate--play');
    }
  });
}, {
  rootMargin: '100% 0px -30px 0px'
});
animateItems.forEach(item => {
  animateObserver.observe(item);
});
;// CONCATENATED MODULE: ./_src/scripts/helpers/cookies.js
// Get a Date a number of days in the future.
const futureDate = days => new Date(Date.now() + days * 24 * 60 * 60 * 1000); // Get a future date as a UTC string.


const utcFutureDate = days => futureDate(days).toUTCString(); // Create a key-value string for a cookie attribute.


const cAttr = (key, value) => "".concat(key, "=").concat(value, ";"); // Set a cookie with a given lifetime (in days).


const setCookie = (name, value, lifetime) => {
  document.cookie = cAttr(name, value) + cAttr('expires', utcFutureDate(lifetime)) + cAttr('path', '/') + cAttr('SameSite', 'strict');
}; // Retrieve a cookie value by name. Empty string if not found.


const getCookie = cname => {
  const name = "".concat(cname, "=");
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
};


;// CONCATENATED MODULE: ./_src/components/cookie-notice/scripts/CookieNotice.js

class CookieNotice {
  constructor(element) {
    this.el = element;
    this.bannerEl = this.el.querySelector('.cookie-notice__banner');
    this.bannerEl.setAttribute('tabindex', -1);
    this.acceptButton = this.el.querySelector('.js-cookie-notice-accept');
    this.rejectButton = this.el.querySelector('.js-cookie-notice-reject');
    this.togglers = document.querySelectorAll('.js-cookie-notice-toggler');
    this.prevActiveElement = null;
    this.cookieLifetime = 365; // Days

    this.cookieName = 'cookies';
    this.validCookieValues = ['accept', 'reject'];
    this.init();
  }

  init() {
    if (this.validCookieValues.indexOf(getCookie(this.cookieName)) === -1) {
      this.setActive(true);
    } else {
      this.prevActiveElement = document.activeElement;
      this.setActive(false);
    }

    this.acceptButton.addEventListener('click', () => {
      this.setCookieChoice('accept');
      this.setActive(false);
    });
    this.rejectButton.addEventListener('click', () => {
      this.setCookieChoice('reject');
      this.setActive(false);
    });
    this.togglers.forEach(element => {
      element.setAttribute('aria-expanded', this.isActive());
      element.setAttribute('aria-controls', this.el.id);
      element.addEventListener('click', this.handleTogglerClick.bind(this));
    });
  }
  /**
   * Set the active state of the notice
   *
   * @param {boolean} active Whether or not we want to set the notice as active
   */


  setActive(active) {
    if (active === true) {
      this.prevActiveElement = document.activeElement;
      this.el.removeAttribute('aria-hidden');
      this.bannerEl.focus();
      this.togglers.forEach(element => {
        element.setAttribute('aria-expanded', true);
      });
    } else {
      this.prevActiveElement.focus();
      this.el.setAttribute('aria-hidden', true);
      this.togglers.forEach(element => {
        element.setAttribute('aria-expanded', false);
      });
    }
  }
  /**
   * Toggle the active state
   *
   */


  toggleActive() {
    this.setActive(!this.isActive());
  }
  /**
   * Check whether the notice is currently active
   *
   */


  isActive() {
    return !this.el.hasAttribute('aria-hidden');
  }
  /**
   * Handle the given choice (accept/reject)
   *
   * @param {boolean} choice Whether the user has accepted/rejected site cookies.
   */


  setCookieChoice(choice) {
    setCookie(this.cookieName, choice, this.cookieLifetime);
  }
  /**
   * Handle a toggler click
   *
   */


  handleTogglerClick() {
    this.toggleActive();
  }

}
;// CONCATENATED MODULE: ./_src/components/cookie-notice/scripts-main.js

window.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.cookie-notice');

  if (element) {
    new CookieNotice(element);
  }
});
;// CONCATENATED MODULE: ./_src/components/reveal/scripts-main.js
// https://css-tricks.com/using-css-transitions-auto-dimensions/
class RevealItem {
  constructor(revealContainer) {
    this.revealContainer = revealContainer;
    this.revealButton = this.revealContainer.querySelector('.js-reveal-item');
    this.content = this.revealContainer.querySelector('.reveal__content');
    this.init();
  }

  init() {
    if (this.content && this.revealButton) {
      // ---------------------------------------------------------------------
      // Handle the triggers that will open and close the menu
      // ---------------------------------------------------------------------
      this.revealButton.addEventListener('click', e => {
        e.preventDefault();
        this.revealToggle();
      });
      this.revealContainer.addEventListener('reveal-open', this);
      this.revealContainer.addEventListener('reveal-close', this);
      this.revealContainer.classList.add('is-enabled');
      this.revealClose();
    }
  }

  transitionEnded(event) {
    if (event.propertyName !== 'height') return;
    this.content.removeEventListener('transitionend', this);
    const isCollapsed = this.revealButton.getAttribute('aria-expanded') === 'false';

    if (isCollapsed) {
      this.content.hidden = true;
    } else {
      // remove "height" from the element's inline styles, so it can return to its initial value
      this.content.style.height = null;
    }
  }

  revealOpen() {
    const {
      content
    } = this;
    content.hidden = false; // get the height of the element's inner content, regardless of its actual size

    const contentHeight = content.scrollHeight; // have the element transition to the height of its inner content

    content.style.height = "".concat(contentHeight, "px");
    content.addEventListener('transitionend', this); // mark the content as "currently not collapsed"

    this.revealButton.setAttribute('aria-expanded', 'true');
    this.revealContainer.classList.add('is-open');
  }

  revealClose() {
    const {
      content
    } = this;
    content.addEventListener('transitionend', this); // temporarily disable all css transitions

    const elementTransition = content.style.transition;
    content.style.transition = '';
    content.style.height = "".concat(0, "px");
    content.style.transition = elementTransition; // mark the content as 'currently collapsed'

    this.revealButton.setAttribute('aria-expanded', 'false');
    this.revealContainer.classList.remove('is-open');
    this.content.hidden = true;
  }

  revealCloseTransition() {
    const {
      content
    } = this;
    content.addEventListener('transitionend', this); // get the height of the element's inner content, regardless of its actual size

    const contentHeight = content.scrollHeight; // temporarily disable all css transitions

    const elementTransition = content.style.transition;
    content.style.transition = ''; // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we
    // aren't transitioning out of 'auto'

    requestAnimationFrame(() => {
      content.style.height = "".concat(contentHeight, "px");
      content.style.transition = elementTransition; // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0

      requestAnimationFrame(() => {
        content.style.height = "".concat(0, "px");
      });
    }); // mark the content as "currently collapsed"

    this.revealButton.setAttribute('aria-expanded', 'false');
    this.revealContainer.classList.remove('is-open');
  }

  revealToggle() {
    const isCollapsed = this.revealButton.getAttribute('aria-expanded') === 'false';

    if (isCollapsed) {
      this.revealOpen();
    } else {
      this.revealCloseTransition(this.content);
    }
  }

  handleEvent(e) {
    switch (e.type) {
      case 'transitionend':
        this.transitionEnded(e);
        break;

      case 'reveal-open':
        this.revealOpen(e);
        break;

      case 'reveal-close':
        this.revealClose(e);
        break;

      default: // do nothing

    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.reveal');
  elements.forEach(element => {
    new RevealItem(element);
  });
});
// EXTERNAL MODULE: ./node_modules/lodash/debounce.js
var debounce = __webpack_require__(279);
;// CONCATENATED MODULE: ./_src/scripts/helpers/isElementVisible.js
function isElementVisible(element) {
  const styles = window.getComputedStyle(element);
  return styles.getPropertyValue('display') !== 'none';
}
;// CONCATENATED MODULE: ./_src/components/site-header/scripts/SiteHeader.js


const dropdownSelector = '.menu-item-has-children'; // TODO manage focus leaving submenus and overlay mobile menu and close them appropriately.

class SiteHeader {
  constructor(element) {
    this.el = element;
    this.headerTop = this.el.querySelector('.site-header__top');
    this.navigation = this.el.querySelector('.site-header__navigation');
    this.menu = this.el.querySelector('.site-header__main-menu');
    this.dropdowns = this.el.querySelectorAll(dropdownSelector);
    this.toggles = this.el.querySelectorAll('.js-site-header-toggle');
    this.currentPageAnchors = this.el.querySelectorAll('.current-menu-item > [href*="#"]');
    this.burger = this.el.querySelector('.site-header__burger');
    this.lastScroll = 0;
    this.init();
    this.setHeight();
    window.addEventListener('resize', debounce(() => {
      this.setHeight();
    }, 50));
  }

  init() {
    if (this.isBurgerModeActive()) {
      this.closeHeader(true);
    } // ---------------------------------------------------------------------
    // Handle the toggles that will open and close the menu
    // ---------------------------------------------------------------------


    if (this.toggles.length > 0) {
      this.toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
          this.toggleHeader();
        });
      });
    } // ---------------------------------------------------------------------
    // Handle anchor links in the same page.
    // ---------------------------------------------------------------------


    if (this.currentPageAnchors.length > 0) {
      this.currentPageAnchors.forEach(link => {
        link.addEventListener('click', () => {
          this.closeHeader(true);
        });
      });
    } // ---------------------------------------------------------------------
    // If there are dropdowns
    // ---------------------------------------------------------------------


    if (this.dropdowns.length > 0) {
      this.dropdowns.forEach(dropdown => {
        // ---------------------------------------------------------------------
        // Get the top level link
        // ---------------------------------------------------------------------
        const link = dropdown.querySelector('a'); // ---------------------------------------------------------------------
        // Initialise the tab indexes
        // ---------------------------------------------------------------------

        SiteHeader.closeDropdown(dropdown); // ---------------------------------------------------------------------
        // Handle a click on the link
        // ---------------------------------------------------------------------

        link.addEventListener('click', event => {
          event.preventDefault();
          this.toggleDropdown(dropdown);
        });
      }); // ---------------------------------------------------------------------
      // Add an event listener to clicks so we can close the menu if clicked
      // outside of
      // ---------------------------------------------------------------------

      document.addEventListener('click', event => {
        this.dropdowns.forEach(dropdown => {
          if (!dropdown.contains(event.target)) {
            SiteHeader.closeDropdown(dropdown);
          }
        });
      }); // ---------------------------------------------------------------------
      // Listen for a press of the escape key and check if the we were within
      // a dropdown
      // ---------------------------------------------------------------------

      document.addEventListener('keyup', event => {
        if (event.key === 'Escape') {
          const {
            activeElement
          } = document;
          const activeDropdown = activeElement.closest(dropdownSelector); // ---------------------------------------------------------------------
          // Check if we actually tried to hit escape when we were in a dropdown
          // ---------------------------------------------------------------------

          if (activeDropdown) {
            const activeLink = activeDropdown.querySelector('a'); // Return focus to the parent link

            activeLink.focus(); // close the dropdown

            SiteHeader.closeDropdown(activeDropdown);
          }
        }
      });
    }
  }

  getHeight() {
    const headerHeight = this.headerTop.offsetHeight; // if (this.announcementBanner) {
    //     headerHeight += this.announcementBanner.offsetHeight;
    // }

    return headerHeight;
  }

  setHeight() {
    this.headerHeight = this.getHeight();
    document.documentElement.style.setProperty('--site-header--bottom', "".concat(this.headerHeight, "px"));
    this.el.classList.add('site-header--positioned');
  }

  toggleHeader() {
    if (this.el.classList.contains('is-open')) {
      this.closeHeader();
    } else {
      this.openHeader();
    }
  }

  openHeader() {
    let first = '';

    if (this.menu) {
      const listItems = Array.from(this.menu.children);
      listItems.forEach(li => {
        const a = li.querySelector('a');
        SiteHeader.setTabIndex([a], 0);

        if (first === '') {
          first = a;
        }
      });
    }

    this.el.classList.add('is-open');
    document.documentElement.classList.add('no-scroll');
    this.toggles.forEach(toggle => {
      toggle.setAttribute('aria-expanded', 'true');
    });
    SiteHeader.setTabIndex(this.toggles, 0);

    if (this.menu) {
      first.focus();
    }
  }

  closeHeader() {
    let initial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    // close the menu
    this.el.classList.remove('is-open');
    document.documentElement.classList.remove('no-scroll');

    if (this.isBurgerModeActive()) {
      this.toggles.forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
      }); // make the items not tabbable

      if (this.navigation) {
        const elements = SiteHeader.getTabbableItems(this.navigation);
        SiteHeader.setTabIndex(elements, -1);
      }

      if (initial !== true) {
        // Focus the burger
        this.burger.focus();
      }
    }
  }

  toggleDropdown(dropdown) {
    if (dropdown.classList.contains('is-active')) {
      SiteHeader.closeDropdown(dropdown);
    } else {
      this.openDropdown(dropdown);
    }
  }

  openDropdown(dropdown) {
    const submenu = dropdown.querySelector('.sub-menu');
    const elements = SiteHeader.getTabbableItems(submenu); // Close all non-parent dropdowns first

    this.dropdowns.forEach(otherDropdown => {
      if (!otherDropdown.contains(dropdown)) {
        SiteHeader.closeDropdown(otherDropdown);
      }
    }); // Make the elements of this dropdown active

    SiteHeader.setTabIndex(elements, 0); // Open the dropdown

    dropdown.classList.add('is-active'); // Set focus to the first element in the dropdown

    if (elements.length > 0) {
      elements[0].focus();
    }
  }

  static closeDropdown(dropdown) {
    const submenu = dropdown.querySelector('.sub-menu');
    const elements = SiteHeader.getTabbableItems(submenu);
    SiteHeader.setTabIndex(elements, -1);
    dropdown.classList.remove('is-active');
  }

  static setTabIndex(elements, index) {
    elements.forEach(element => {
      element.tabIndex = index;
    });
  }

  static getTabbableItems(parent) {
    return parent.querySelectorAll('a, button');
  }

  isBurgerModeActive() {
    return isElementVisible(this.burger);
  }

}
;// CONCATENATED MODULE: ./_src/components/site-header/scripts-main.js

window.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.site-header');
  new SiteHeader(element);
});
;// CONCATENATED MODULE: ./_src/components/video-item/scripts-main.js
class VideoItem {
  constructor(videoItem) {
    this.videoItem = videoItem;
    this.play = this.videoItem.querySelector('.js-video-item-play');
    this.close = this.videoItem.querySelector('.video-item__video-close');
    this.video = this.videoItem.querySelector('.video-item__video');
    this.iframe = this.videoItem.querySelector('iframe');
    this.init();
  }

  init() {
    this.play.addEventListener('click', () => {
      this.playVideo();
    });
    this.video.addEventListener('click', _ref => {
      let {
        target
      } = _ref;

      if (target !== this.iframe) {
        this.closeVideo();
      }
    });
    document.addEventListener('keydown', _ref2 => {
      let {
        key
      } = _ref2;

      if (key !== 'Escape' && this.isVideoPlaying()) {
        this.closeVideo();
      }
    });
  }

  playVideo() {
    this.videoItem.classList.add('video-item--play');
    this.iframe.src = this.iframe.getAttribute('data-src');
    document.documentElement.classList.add('no-scroll');
  }

  closeVideo() {
    this.videoItem.classList.remove('video-item--play');
    this.iframe.src = '';
    document.documentElement.classList.remove('no-scroll');
  }

  isVideoPlaying() {
    return this.iframe.src !== '';
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const videoItems = document.querySelectorAll('.video-item');
  videoItems.forEach(element => {
    new VideoItem(element);
  });
});
;// CONCATENATED MODULE: ./_src/main.js
/* eslint-disable import/no-unresolved */





})();

/******/ })()
;