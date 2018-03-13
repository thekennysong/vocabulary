module.exports = {
    /* predicates/conditions */
    isNull: function isNull (obj) {
        return obj === null || obj === undefined;
    },

    isNotNull: function isNotNull (obj) {
        return obj !== null && obj !== undefined;
    },

    isEmpty: function isEmpty (value) {
        if (value.length === undefined) {
            return Object.keys(value).length === 0;
        } else {
            return value.length === 0;
        }
    },

    isNotEmpty: function isNotEmpty (value) {
        if (value.length === undefined) {
            return Object.keys(value).length !== 0;
        } else {
            return value.length !== 0;
        }
    },

    isNullOrEmpty: function isNullOrEmpty (value) {
        Array.prototype.isNull = function () { 
            return this.join().replace(/,/g,'').length === 0; 
        };
        
        if (value === null || value === undefined) {
            return true;
        } if (Array.isArray(value) && value.isNull()) {
            return true;
        }
        if (value.length === undefined) {
            return Object.keys(value).length === 0;
        } else {
            return value.length === 0;
        }
    },

    // TODO: what should this return for value types?
    isNotNullOrEmpty: function isNotNullOrEmpty (value) {
        if (value === null || value === undefined) return false;
        if (value.length === undefined) {
            return Object.keys(value).length !== 0;
        } else {
            return value.length !== 0;
        }
    },

    isPositive: function isPositive (num) {
        return num > 0;
    },

    isNegative: function isNegative (num) {
        return num < 0;
    },

    isZero: function isZero (num) {
        return num === 0;
    },

    isSingular: function isSingular (value) {
        return (value.length === undefined && value === 1) || value.length === 1;
    },

    isPlural: function isPlural (value) {
        return (value.length === undefined && value > 1) || value.length > 1;
    },

    isEven: function isEven (num) {
        return num % 2 === 0;
    },

    isOdd: function isOdd (num) {
        return num % 2 !== 0;
    },

    isTrue: function isTrue (b) {
        return b === true;
    },

    isFalse: function isFalse (b) {
        return b === false;
    },

    // http://stackoverflow.com/q/1353684
    isValidDate: function isValidDate (d) {
        if (typeof d === 'string') {
            d = new Date(d);
        }
        if (Object.prototype.toString.call(d) !== '[object Date]') {
            return false;
        }
        return !isNaN(d.getTime());
    },

    isEscapeKeyEvent: function isEscapeKeyEvent (e) {
        var escapeKey = 27;
        return (e.which || e.keyCode) === escapeKey;
    },

    isEnterKeyEvent: function isEnterKeyEvent (e) {
        var escapeKey = 13;
        return (e.which || e.keyCode) === escapeKey;
    },

    isNodeList: function isNodeList (obj) {
        if (!obj) return false;
        return typeof obj.length === 'number'
            && typeof obj.item !== 'undefined'
            && typeof obj.nextNode === 'function'
            && typeof obj.reset === 'function';
    },

    // TODO: use more complex getType function?
    isString: function isString (value) {
        return typeof value === 'string';
    },

    // TODO: use more complex getType function?
    isObject: function isObject (value) {
        return typeof value === 'object' && !Array.isArray(value);
    },

    // TODO: use more complex getType function?
    isFunction: function isFunction (value) {
        return typeof value === 'function';
    },

    // isArray: function isArray (value) {
    //     return Array.isArray(value);
    // },

    hasLeadingForwardSlash: function hasLeadingForwardSlash (str) {
        return str && str.charAt(0) === '/';
    },

    hasTrailingForwardSlash: function hasTrailingForwardSlash (str) {
        return str && str.charAt(str.length - 1) === '/';
    },

    isLinkCurrentRoute: function isLinkCurrentRoute (link) {
        return link.href === window.location.href;
    },

    /* type conversions */
    toList: function toList (obj) {
        if (Array.isArray(obj)) return obj;
        return this.isNodeList(obj) ? [].slice.call(obj) : [obj];
    },

    toHtmlId: function toHtmlId (id) {
        return id.charAt(0) === '#' ? id : '#' + id;
    },

    toHtmlClass: function toHtmlClass (className) {
        return className.charAt(0) === '.' ? className : '.' + className;
    },

    // http://stackoverflow.com/a/15829686
    toCamelCase: function toCamelCase (str) {
        return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, p1, p2) {
            if (p2) return p2.toUpperCase();
            return p1.toLowerCase();
        });
    },

    // TODO: reference string as output type somehow?
    toMoneyString: function toMoneyString (decimal) {
        return decimal.toFixed(2);
    },

    toHexString: function toHexString (num) {
        return num.toString(16);
    },

    toHexNumber: function toHexNumber (hexStr) {
        return parseInt(hexStr, 16);
    },

    toAsciiCode: function toAsciiCode (c) {
        return c.charCodeAt(0);
    },

    toObject: function toObject (json) {
        return JSON.parse(json);
    },

    toPrettyJson: function toPrettyJson (obj) {
        return JSON.stringify(obj, null, 2);
    },

    toUniqueArray: function toUniqueArray (array) {
        var result = [];
        array.forEach(function (item) {
            result.indexOf(item) === -1 && result.push(item);
        });
        return result;
    },

    // http://stackoverflow.com/a/7124052
    toEscapedHtml: function toEscapedHtml (str) {
        return String(str)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
    },

    // http://stackoverflow.com/a/7124052
    toUnescapedHtml: function toUnescapedHtml (value) {
        return String(value)
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
    },

    toQueryString: function toQueryString (obj) {
        var result = Object.getOwnPropertyNames(obj)
                        .filter(function (name) { return typeof obj[name] !== 'function'; })
                        .map(function (name) { return name + '=' + obj[name]; })
                        .join('&');
        return result;
    },

    /* maps */
    first: function first (arrayOrStr) {
        return arrayOrStr[0];
    },

    second: function second (arrayOrStr) {
        return arrayOrStr[1];
    },

    last: function last (arrayOrStr) {
        return arrayOrStr[arrayOrStr.length - 1];
    },

    increment: function increment (num) {
        return num + 1;
    },

    decrement: function decrement (num) {
        return num - 1;
    },

    trim: function trim (str) {
        return str ? str.trim() : '';
    },

    capitalize: function capitalize (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    // TODO: rename to "nodes" or "getNodes" or "getElements"?
    query: function query (selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    },

    appendTrailingSlash: function appendTrailingSlash (url) {
        if (url.substr(-1) !== '/') url += '/';
        return url;
    },

    newObject: function newObject () {
        return {};
    },

    generateRandomNumber: function generateRandomNumber (min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    },

    random: function random (array) {
        var index = Math.floor(Math.random() * (array.length - 1));
        return array[index];
    },

    // TODO: rename arrayMin?
    min: function min (array) {
        return Math.min.apply(null, array);
    },

    // TODO: rename arrayMax?
    max: function max (array) {
        return Math.max.apply(null, array);
    },

    clone: function clone (array) {
        return array.slice();
    },

    group: function group (array, size) {
        var groups = [];
        array.forEach(function (value) {
            if (!this.last(groups) || this.last(groups).length === size) {
                groups.push([value]);
            } else {
                this.last(groups).push(value);
            }
        });
        return groups;
    },

    // get('a.b.c')({a: {b: {c: 7}}}); // -> 7
    getIn: function getIn (path) {
        return function (object) {
            path.split('.').forEach(function (prop) {
                object = object[prop];
            });
            return object;
        };
    },

    removePhrase: function removePhrase (str, phrase) {
        return str.replace(phrase, '');
    },

    /* reducers */
    add: function add (a, b) {
        return a + b;
    },

    subtract: function subtract (a, b) {
        return a - b;
    },
    and: function and (a, b) {
        return a && b;
    },

    or: function or (a, b) {
        return a || b;
    },

    orFalse: function orFalse (value) {
        return value || false;
    },

    orZero: function orZero (value) {
        return value || 0;
    },

    orEmptyString: function orEmptyString (value) {
        return value || '';
    },

    orEmptyArray: function orEmptyString (value) {
        return value || [];
    },

    orEmptyObject: function orEmptyObject (value) {
        return value || {};
    },

    joinBySpace: function joinBySpace (array) {
        return array.join(' ');
    },

    joinByNewLine: function joinByNewLine (array) {
        return array.join('\n');
    },

    joinByCommaSpace: function joinByCommaSpace (array) {
        return array.join(', ');
    },

    splitBySpace: function splitBySpace (string) {
        return string.split(' ');
    },

    splitByNewLine: function splitByNewLine (string) {
        return string.split('\n');
    },

    splitByComma: function splitByComma (string) {
        return string.split(',');
    },

    splitByCommaSpace: function splitByCommaSpace (string) {
        return string.split(', ');
    },

    /* getters */
    getType: function getType (value) {
        if (value === undefined) return 'undefined';
        if (value === null) return 'null';
        return typeof value;
    },

    getButtons: function getButtons (parent) {
        parent = parent || document;
        if (typeof parent === 'string') {
            parent = document.querySelector(parent);
        }
        return Array.prototype.call(parent.querySelectorAll('input[type="submit"], button'));
    },

    getDropdowns: function getDropdowns (parent) {
        parent = parent || document;
        if (typeof parent === 'string') {
            parent = document.querySelector(parent);
        }
        return Array.prototype.call(parent.querySelectorAll('select'));
    },

    getInputs: function getInputs (parent) {
        parent = parent || document;
        if (typeof parent === 'string') {
            parent = document.querySelector(parent);
        }
        return Array.prototype.call(parent.querySelectorAll('input:not([type="submit"])'));
    },

    getHtmlInputValue: function getHtmlInputValue (e) {
        return e.target.value;
    },

    getElementName: function getTagName (element) {
        return element.nodeName.toLowerCase();
    },

    getQueryStringRaw: function getQueryStringRaw () {
        var search = window.location.search;
        return search && search[0] === '?' ? search.substring(1) : '';
    },

    getQueryStringPairs: function getQueryStringPairs () {
        var raw = this.getQueryStringRaw();
        return raw.split('&');
    },

    getQueryStringValue: function getQueryStringValue (key) {
        var pairs = this.getQueryStringPairs();
        pairs.map(function (pair) {
            pair = pair.split('&');
            if (pair[0] === key) return pair[1];
        });
        return '';
    },

    getSelectedDropdownOption: function getSelectedDropdownOption (dropdown) {
        if (typeof dropdown === 'string') {
            dropdown = document.querySelector(dropdown);
        }
        return dropdown.options[dropdown.selectedIndex];
    },

    /* actions */
    addClass: function addClass (className) {
        return function (element) {
            element.classList.add(className);
        }
    },

    removeClass: function removeClass (className) {
        return function (element) {
            element.classList.remove(className);
        };
    },

    toggleClass: function toggleClass (className) {
        return function (element) {
            element.classList.toggle(className);
        };
    },

    // TODO: rename parameter to 'element'?
    setAttributes: function setAttributes (node, attributes) {
        Object.getOwnPropertyNames(attributes).forEach(function (prop) {
            node.setAttribute(prop, attributes[prop]);
        });
        return node;
    },

    // TODO: rename to 'createElement'?
    createNode: function createNode (type, attributes) {
        var node = document.createElement(type);
        Object.getOwnPropertyNames(attributes).forEach(function (prop) {
            node.setAttribute(prop, attributes[prop]);
        });
        return node;
    },

    focusFirstFormField: function focusFirstFormField () {
        var field = document.querySelector('input:not([type="submit"]), select');
        if (!field) return;
        field.focus();
    },

    ifNotNull: function ifNotNull (func, obj) {
        return obj ? func(obj) : obj;
    },

    ifNull: function ifNull (func, obj) {
        return obj ? obj : func(obj);
    },

    throwIfNull: function throwIfNull (value, error) {
        if (!value) throw error;
    },

    tryCatch: function tryCatch (func, handler) {
        return function (args) {
            try {
                func(args);
            } catch (e) {
                handler(e, args);
            }
        }
    },

    shuffleInPlace: function shuffleInPlace (array) {
        return array.sort(function () {
            return 0.5 - Math.random();
        });
    },

    clearDropdownOptions: function clearDropdownOptions (dropdown) {
        dropdown.options.length = 0;
        return dropdown;
    },

    removeProperty: function removeProperty (obj, property) {
        delete obj[property];
        return obj;
    },

    removeElement: function removeElement (element) {
        element.parentElement.removeChild(element);
    },

    disableElement: function disableElement (element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        element.disabled = true;
        return element;
    },

    enableElement: function enableElement (element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        element.disabled = false;
        return element;
    },

    redirect: function redirect (url) {
        window.location.href = url;
    },

    debug: function debug (args) {
        debugger;
        return args;
    },

    enableEs6: function enableEs6 () {
        require('babel-core/register');
    },

    enableJsx: function enableJsx () {
        require('node-jsx').install();
    },

    noop: function noop () {

    }
};
