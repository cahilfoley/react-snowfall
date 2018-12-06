"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultConfig = {
  color: '#dee4fd',
  radius: [0.5, 3.0],
  speed: [1, 3],
  wind: [-0.5, 3.0]
};

var Snowflake = function Snowflake(_canvas, config) {
  var _this = this;

  _classCallCheck(this, Snowflake);

  _defineProperty(this, "config", void 0);

  _defineProperty(this, "params", void 0);

  _defineProperty(this, "updateData", function (canvas) {
    _this.params.x = (0, _utils.random)(0, canvas.offsetWidth);
    _this.params.y = (0, _utils.random)(-canvas.offsetHeight, 0);
  });

  _defineProperty(this, "resized", function () {
    return _this.params.isResized = true;
  });

  _defineProperty(this, "draw", function (canvas) {
    var ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.beginPath();
      ctx.arc(_this.params.x, _this.params.y, _this.params.radius, 0, 2 * Math.PI);
      ctx.fillStyle = _this.params.color;
      ctx.fill();
      ctx.closePath();
    }
  });

  _defineProperty(this, "translate", function () {
    _this.params.y += _this.params.speed;
    _this.params.x += _this.params.wind;
  });

  _defineProperty(this, "onDown", function (canvas) {
    if (_this.params.y < canvas.offsetHeight) {
      return;
    }

    if (_this.params.isResized) {
      _this.updateData(canvas);

      _this.params.isResized = false;
    } else {
      _this.params.y = 0;
      _this.params.x = (0, _utils.random)(0, canvas.offsetWidth);
    }
  });

  _defineProperty(this, "update", function (canvas) {
    _this.translate();

    _this.onDown(canvas);
  });

  // Merging input config with default config
  this.config = _objectSpread({}, defaultConfig, config); // Setting initial parameters

  var _this$config = this.config,
      color = _this$config.color,
      radius = _this$config.radius,
      wind = _this$config.wind,
      speed = _this$config.speed;
  this.params = {
    color: color,
    x: (0, _utils.random)(0, _canvas.offsetWidth),
    y: (0, _utils.random)(-_canvas.offsetHeight, 0),
    radius: _utils.random.apply(void 0, _toConsumableArray(radius)),
    speed: _utils.random.apply(void 0, _toConsumableArray(speed)),
    wind: _utils.random.apply(void 0, _toConsumableArray(wind)),
    isResized: false
  };
};

var _default = Snowflake;
exports.default = _default;