"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSnowfallStyle = exports.useComponentSize = exports.useSnowflakes = void 0;

var _react = require("react");

var _Snowflake = _interopRequireDefault(require("./Snowflake"));

var _config = require("./config");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * A utility function to create a collection of snowflakes
 * @param canvasRef A ref to the canvas element
 * @param amount The number of snowflakes
 * @param config The configuration for each snowflake
 */
var createSnowflakes = function createSnowflakes(canvasRef, amount, config) {
  var snowflakes = [];

  for (var i = 0; i < amount; i++) {
    snowflakes.push(new _Snowflake["default"](canvasRef.current, config));
  }

  return snowflakes;
};
/**
 * A utility hook to manage creating and updating a collection of snowflakes
 * @param canvasRef A ref to the canvas element
 * @param amount The number of snowflakes
 * @param config The configuration for each snowflake
 */


var useSnowflakes = function useSnowflakes(canvasRef, amount, config) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      snowflakes = _useState2[0],
      setSnowflakes = _useState2[1]; // Handle change of amount


  (0, _react.useEffect)(function () {
    setSnowflakes(function (snowflakes) {
      var sizeDifference = amount - snowflakes.length;

      if (sizeDifference > 0) {
        return [].concat(_toConsumableArray(snowflakes), _toConsumableArray(createSnowflakes(canvasRef, sizeDifference, config)));
      }

      if (sizeDifference < 0) {
        return snowflakes.slice(0, amount);
      }

      return snowflakes;
    });
  }, [amount, canvasRef, config]); // Handle change of config

  (0, _react.useEffect)(function () {
    setSnowflakes(function (snowflakes) {
      return snowflakes.map(function (snowflake) {
        snowflake.config = config;
        return snowflake;
      });
    });
  }, [config]);
  return snowflakes;
};
/**
 * Returns the height and width of a HTML element, uses the `ResizeObserver` api if available to detect changes to the
 * size. Falls back to listening for resize events on the window.
 * @param ref A ref to the HTML element to be measured
 */


exports.useSnowflakes = useSnowflakes;

var useComponentSize = function useComponentSize(ref) {
  var _useState3 = (0, _react.useState)((0, _utils.getSize)(ref.current)),
      _useState4 = _slicedToArray(_useState3, 2),
      size = _useState4[0],
      setSize = _useState4[1];

  var resizeHandler = (0, _react.useCallback)(function () {
    if (ref.current) {
      setSize((0, _utils.getSize)(ref.current));
    }
  }, [ref]);
  (0, _react.useLayoutEffect)(function () {
    var _window = window,
        ResizeObserver = _window.ResizeObserver;
    if (!ref.current) return;
    resizeHandler();

    if (typeof ResizeObserver === 'function') {
      var resizeObserver = new ResizeObserver(resizeHandler);
      resizeObserver.observe(ref.current);
      return function () {
        return resizeObserver.disconnect();
      };
    } else {
      window.addEventListener('resize', resizeHandler);
      return function () {
        return window.removeEventListener('resize', resizeHandler);
      };
    }
  }, [ref, resizeHandler]);
  return size;
};
/**
 * Utility hook that merges any provided styles with the default styles
 * @param overrides The style prop passed into the component
 */


exports.useComponentSize = useComponentSize;

var useSnowfallStyle = function useSnowfallStyle(overrides) {
  var styles = (0, _react.useMemo)(function () {
    return _objectSpread({}, _config.snowfallBaseStyle, overrides || {});
  }, [overrides]);
  return styles;
};

exports.useSnowfallStyle = useSnowfallStyle;
//# sourceMappingURL=hooks.js.map