"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = exports["default"] = void 0;

var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultConfig = {
  color: '#dee4fd',
  radius: [0.5, 3.0],
  speed: [1.0, 3.0],
  wind: [-0.5, 2.0],
  changeFrequency: 200,
  rotationSpeed: [-1.0, 1.0]
};
exports.defaultConfig = defaultConfig;

/**
 * An individual snowflake that will update it's location every call to `update`
 * and draw itself to the canvas every call to `draw`.
 */
var Snowflake = /*#__PURE__*/function () {
  function Snowflake(canvas) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Snowflake);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "params", void 0);

    _defineProperty(this, "framesSinceLastUpdate", void 0);

    _defineProperty(this, "image", void 0);

    // Set custom config
    this.updateConfig(config); // Setting initial parameters

    var _this$config = this.config,
        radius = _this$config.radius,
        wind = _this$config.wind,
        speed = _this$config.speed,
        rotationSpeed = _this$config.rotationSpeed;
    this.params = {
      x: (0, _utils.random)(0, canvas.offsetWidth),
      y: (0, _utils.random)(-canvas.offsetHeight, 0),
      rotation: (0, _utils.random)(0, 360),
      radius: _utils.random.apply(void 0, _toConsumableArray(radius)),
      speed: _utils.random.apply(void 0, _toConsumableArray(speed)),
      wind: _utils.random.apply(void 0, _toConsumableArray(wind)),
      rotationSpeed: _utils.random.apply(void 0, _toConsumableArray(rotationSpeed)),
      nextSpeed: _utils.random.apply(void 0, _toConsumableArray(wind)),
      nextWind: _utils.random.apply(void 0, _toConsumableArray(speed)),
      nextRotationSpeed: _utils.random.apply(void 0, _toConsumableArray(rotationSpeed))
    };
    this.framesSinceLastUpdate = 0;
  }

  _createClass(Snowflake, [{
    key: "selectImage",
    value: function selectImage() {
      if (this.config.images && this.config.images.length > 0) {
        this.image = (0, _utils.randomElement)(this.config.images);
      } else {
        this.image = undefined;
      }
    }
  }, {
    key: "updateConfig",
    value: function updateConfig(config) {
      var previousConfig = this.config;
      this.config = _objectSpread(_objectSpread({}, defaultConfig), config);
      this.config.changeFrequency = (0, _utils.random)(this.config.changeFrequency, this.config.changeFrequency * 1.5); // Update the radius if the config has changed, it won't gradually update on it's own

      if (this.params && !(0, _reactFastCompare["default"])(this.config.radius, previousConfig === null || previousConfig === void 0 ? void 0 : previousConfig.radius)) {
        this.params.radius = _utils.random.apply(void 0, _toConsumableArray(this.config.radius));
      }

      if (!(0, _reactFastCompare["default"])(this.config.images, previousConfig === null || previousConfig === void 0 ? void 0 : previousConfig.images)) {
        this.selectImage();
      }
    }
  }, {
    key: "updateTargetParams",
    value: function updateTargetParams() {
      this.params.nextSpeed = _utils.random.apply(void 0, _toConsumableArray(this.config.speed));
      this.params.nextWind = _utils.random.apply(void 0, _toConsumableArray(this.config.wind));

      if (this.image) {
        this.params.nextRotationSpeed = _utils.random.apply(void 0, _toConsumableArray(this.config.rotationSpeed));
      }
    }
  }, {
    key: "update",
    value: function update(canvas) {
      var framesPassed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var _this$params = this.params,
          x = _this$params.x,
          y = _this$params.y,
          rotation = _this$params.rotation,
          rotationSpeed = _this$params.rotationSpeed,
          nextRotationSpeed = _this$params.nextRotationSpeed,
          wind = _this$params.wind,
          speed = _this$params.speed,
          nextWind = _this$params.nextWind,
          nextSpeed = _this$params.nextSpeed,
          radius = _this$params.radius; // Update current location, wrapping around if going off the canvas

      this.params.x = (x + wind * framesPassed) % (canvas.offsetWidth + radius * 2);
      if (this.params.x > canvas.offsetWidth + radius) this.params.x = -radius;
      this.params.y = (y + speed * framesPassed) % (canvas.offsetHeight + radius * 2);
      if (this.params.y > canvas.offsetHeight + radius) this.params.y = -radius; // Apply rotation

      if (this.image) {
        this.params.rotation = (rotation + rotationSpeed) % 360;
      } // Update the wind, speed and rotation towards the desired values


      this.params.speed = (0, _utils.lerp)(speed, nextSpeed, 0.01);
      this.params.wind = (0, _utils.lerp)(wind, nextWind, 0.01);
      this.params.rotationSpeed = (0, _utils.lerp)(rotationSpeed, nextRotationSpeed, 0.01);

      if (this.framesSinceLastUpdate++ > this.config.changeFrequency) {
        this.updateTargetParams();
        this.framesSinceLastUpdate = 0;
      }
    }
  }, {
    key: "getImageOffscreenCanvas",
    value: function getImageOffscreenCanvas(image, size) {
      var _sizes$size;

      if (image instanceof HTMLImageElement && image.loading) return image;
      var sizes = Snowflake.offscreenCanvases.get(image);

      if (!sizes) {
        sizes = {};
        Snowflake.offscreenCanvases.set(image, sizes);
      }

      if (!(size in sizes)) {
        var _canvas$getContext;

        var canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        (_canvas$getContext = canvas.getContext('2d')) === null || _canvas$getContext === void 0 ? void 0 : _canvas$getContext.drawImage(image, 0, 0, size, size);
        sizes[size] = canvas;
      }

      return (_sizes$size = sizes[size]) !== null && _sizes$size !== void 0 ? _sizes$size : image;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      if (this.image) {
        // ctx.save()
        // ctx.translate(this.params.x, this.params.y)
        ctx.setTransform(1, 0, 0, 1, this.params.x, this.params.y);
        var radius = Math.ceil(this.params.radius);
        ctx.rotate(this.params.rotation * Math.PI / 180);
        ctx.drawImage(this.getImageOffscreenCanvas(this.image, radius), -Math.ceil(radius / 2), -Math.ceil(radius / 2), radius, radius); // ctx.restore()
      } else {
        ctx.beginPath();
        ctx.arc(this.params.x, this.params.y, this.params.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.config.color;
        ctx.closePath();
        ctx.fill();
      }
    }
  }]);

  return Snowflake;
}();

_defineProperty(Snowflake, "offscreenCanvases", new WeakMap());

var _default = Snowflake;
exports["default"] = _default;
//# sourceMappingURL=Snowflake.js.map