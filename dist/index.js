"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getUrl = function getUrl(key) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://maps.googleapis.com/maps/api/js';
  var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '3.31';
  var libraries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['places'];

  if (key === '') {
    throw new Error('You must pass an apiKey to use GoogleApi');
  }

  var queryStringParameters = {
    key: key,
    version: version,
    libraries: libraries.join(',')
  };
  var queryString = Object.keys(queryStringParameters).filter(function (queryStringKey) {
    return !!queryStringParameters[queryStringKey];
  }).map(function (queryStringKey) {
    return "".concat(queryStringKey, "=").concat(queryStringParameters[queryStringKey]);
  }).join('&');
  return "".concat(url, "?").concat(queryString);
};

var createScriptTag = function createScriptTag(key, libraries, url, version) {
  return new Promise(function (resolve, reject) {
    if (!window.google) {
      var _document$getElements;

      var scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.src = getUrl(key, url, version, libraries); // Below is important.
      // We cannot access google.maps until it's finished loading

      scriptTag.addEventListener('load', function () {
        resolve(window.google);
      });
      scriptTag.addEventListener('error', function () {
        reject();
      });
      var scriptParentElement = (_document$getElements = document.getElementsByTagName('head')[0]) !== null && _document$getElements !== void 0 ? _document$getElements : document.getElementsByTagName('body')[0];
      scriptParentElement.appendChild(scriptTag);
    } else {
      resolve(window.google);
    }
  });
}; // todo check it exists already with a warning!


var useGoogleApi = function useGoogleApi(key, libraries) {
  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      googleObject = _React$useState2[0],
      setGoogleObject = _React$useState2[1];

  createScriptTag(key, libraries).then(function (loadedGoogleObject) {
    setGoogleObject(loadedGoogleObject);
  })["catch"](function () {});
  return googleObject;
};

var _default = useGoogleApi;
exports["default"] = _default;
