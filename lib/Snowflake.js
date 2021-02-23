"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.defaultConfig = void 0;

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultConfig = {
  color: '#dee4fd',
  radius: [0.5, 3.0],
  speed: [1.0, 3.0],
  wind: [-0.5, 2.0],
  changeFrequency: 200
};
exports.defaultConfig = defaultConfig;

/** An individual snowflake that will update it's location every call to `draw` */
var Snowflake = /*#__PURE__*/function () {
  function Snowflake(_canvas) {
    var _this = this;

    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Snowflake);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "params", void 0);

    _defineProperty(this, "framesSinceLastUpdate", void 0);

    _defineProperty(this, "draw", function (canvas, inputCtx) {
      var ctx = inputCtx || canvas.getContext('2d');

      if (ctx) {
        ctx.beginPath();
        ctx.arc(_this.params.x, _this.params.y, _this.params.radius, 0, 2 * Math.PI);
        ctx.fillStyle = _this.fullConfig.color;
        ctx.closePath();
        ctx.fill();
      }
    });

    _defineProperty(this, "translate", function (canvas) {
      var framesPassed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var _this$params = _this.params,
          x = _this$params.x,
          y = _this$params.y,
          wind = _this$params.wind,
          speed = _this$params.speed,
          nextWind = _this$params.nextWind,
          nextSpeed = _this$params.nextSpeed; // Update current location, wrapping around if going off the canvas

      _this.params.x = (x + wind * framesPassed) % canvas.offsetWidth;
      _this.params.y = (y + speed * framesPassed) % canvas.offsetHeight; // Update the wind and speed towards the desired values

      _this.params.speed = (0, _utils.lerp)(speed, nextSpeed, 0.01);
      _this.params.wind = (0, _utils.lerp)(wind, nextWind, 0.01);

      if (_this.framesSinceLastUpdate++ > _this.fullConfig.changeFrequency) {
        _this.updateTargetParams();

        _this.framesSinceLastUpdate = 0;
      }
    });

    _defineProperty(this, "updateTargetParams", function () {
      _this.params.nextSpeed = _utils.random.apply(void 0, _toConsumableArray(_this.fullConfig.speed));
      _this.params.nextWind = _utils.random.apply(void 0, _toConsumableArray(_this.fullConfig.wind));
    });

    _defineProperty(this, "update", function (canvas, framesPassed) {
      _this.translate(canvas, framesPassed);
    });

    // Set custom config
    this.config = config; // Setting initial parameters

    var _this$fullConfig = this.fullConfig,
        radius = _this$fullConfig.radius,
        _wind = _this$fullConfig.wind,
        _speed = _this$fullConfig.speed;
    this.params = {
      x: (0, _utils.random)(0, _canvas.offsetWidth),
      y: (0, _utils.random)(-_canvas.offsetHeight, 0),
      radius: _utils.random.apply(void 0, _toConsumableArray(radius)),
      speed: _utils.random.apply(void 0, _toConsumableArray(_speed)),
      wind: _utils.random.apply(void 0, _toConsumableArray(_wind)),
      nextSpeed: _utils.random.apply(void 0, _toConsumableArray(_wind)),
      nextWind: _utils.random.apply(void 0, _toConsumableArray(_speed))
    };
    this.framesSinceLastUpdate = 0;
  }

  _createClass(Snowflake, [{
    key: "fullConfig",
    get: function get() {
      return _objectSpread(_objectSpread({}, defaultConfig), this.config);
    }
  }]);

  return Snowflake;
}();

var _default = Snowflake;
exports["default"] = _default;
//# sourceMappingURL=Snowflake.js.map