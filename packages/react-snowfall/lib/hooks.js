"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useComponentSize = void 0;
exports.useDeepCompareEffect = useDeepCompareEffect;
exports.useDeepMemo = useDeepMemo;
exports.useSnowflakes = exports.useSnowfallStyle = void 0;
var _react = require("react");
var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));
var _Snowflake = _interopRequireDefault(require("./Snowflake"));
var _config = require("./config");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * A utility function to create a collection of snowflakes
 * @param canvasRef A ref to the canvas element
 * @param amount The number of snowflakes
 * @param config The configuration for each snowflake
 */
var createSnowflakes = function createSnowflakes(canvasRef, amount, config) {
  if (!canvasRef.current) return [];
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
var useSnowflakes = exports.useSnowflakes = function useSnowflakes(canvasRef, amount, config) {
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    snowflakes = _useState2[0],
    setSnowflakes = _useState2[1];

  // Handle change of amount
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
  }, [amount, canvasRef, config]);

  // Handle change of config
  (0, _react.useEffect)(function () {
    setSnowflakes(function (snowflakes) {
      return snowflakes.map(function (snowflake) {
        snowflake.updateConfig(config);
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
var useComponentSize = exports.useComponentSize = function useComponentSize(ref) {
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
var useSnowfallStyle = exports.useSnowfallStyle = function useSnowfallStyle(overrides) {
  var styles = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, _config.snowfallBaseStyle), overrides || {});
  }, [overrides]);
  return styles;
};

/**
 * Same as `React.useEffect` but uses a deep comparison on the dependency array. This should only
 * be used when working with non-primitive dependencies.
 *
 * @param effect Effect callback to run
 * @param deps Effect dependencies
 */
function useDeepCompareEffect(effect, deps) {
  var ref = (0, _react.useRef)(deps);

  // Only update the current dependencies if they are not deep equal
  if (!(0, _reactFastCompare["default"])(deps, ref.current)) {
    ref.current = deps;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (0, _react.useEffect)(effect, ref.current);
}

/**
 * Utility hook to stabilize a reference to a value, the returned value will always match the input value
 * but (unlike an inline object) will maintain [SameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * equality until a change is made.
 *
 * @example
 *
 * const obj = useDeepMemo({ foo: 'bar', bar: 'baz' }) // <- inline object creation
 * const prevValue = usePrevious(obj) // <- value from the previous render
 * console.log(obj === prevValue) // <- always logs true until value changes
 */
function useDeepMemo(value) {
  var _useState5 = (0, _react.useState)(value),
    _useState6 = _slicedToArray(_useState5, 2),
    state = _useState6[0],
    setState = _useState6[1];
  useDeepCompareEffect(function () {
    return setState(value);
  }, [value]);
  return state;
}
//# sourceMappingURL=hooks.js.map