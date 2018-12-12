"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Snowflake = _interopRequireDefault(require("./Snowflake"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame; // Target of 60 frames per second

var targetFrameTime = 1000 / 60;

var Snowfall =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Snowfall, _React$Component);

  function Snowfall(props) {
    var _this;

    _classCallCheck(this, Snowfall);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Snowfall).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "canvasRef", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "snowflakes", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "snowflakeCount", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "snowflakeConfig", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lastUpdate", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resize", function () {
      _this.setState({
        height: document.body.clientHeight,
        width: document.body.clientWidth
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "draw", function () {
      var canvas = _this.canvas;

      if (canvas) {
        var ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

          _this.snowflakes.forEach(function (snowflake) {
            return snowflake.draw(canvas, ctx);
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "update", function () {
      var framesPassed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var canvas = _this.canvas;

      if (canvas) {
        _this.snowflakes.forEach(function (snowflake) {
          return snowflake.update(canvas, framesPassed);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loop", function () {
      if (_assertThisInitialized(_assertThisInitialized(_this))) {
        // Update based on time passed so that a slow frame rate won't slow down the snowflake
        var now = Date.now();

        var msPassed = Date.now() - _this.lastUpdate;

        _this.lastUpdate = now; // Frames that would have passed if running at 60 fps

        var framesPassed = msPassed / targetFrameTime;

        _this.update(framesPassed);

        _this.draw();

        requestAnimationFrame(_this.loop);
      }
    });

    _this.snowflakeCount = props.snowflakeCount || 150;
    _this.snowflakeConfig = {};
    _this.lastUpdate = Date.now();

    if (props.color) {
      _this.snowflakeConfig.color = props.color;
    }

    _this.canvasRef = React.createRef();
    return _this;
  }

  _createClass(Snowfall, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      /** Create snowflakes */
      for (var i = 0; i < this.snowflakeCount; i++) {
        this.snowflakes.push(new _Snowflake.default(this.canvas, this.snowflakeConfig));
      }
      /** Setup resize listeners */


      this.resize();
      window.addEventListener('resize', this.resize);
      document.addEventListener('resize', this.resize);
      this.loop();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
      document.removeEventListener('resize', this.resize);
    }
  }, {
    key: "render",
    value: function render() {
      var style = this.props.style;
      var _this$state = this.state,
          height = _this$state.height,
          width = _this$state.width;
      return React.createElement("canvas", {
        ref: this.canvasRef,
        height: height,
        width: width,
        style: _objectSpread({
          pointerEvents: 'none',
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }, style)
      });
    }
  }, {
    key: "canvas",
    get: function get() {
      return this.canvasRef.current;
    }
  }]);

  return Snowfall;
}(React.Component);

exports.default = Snowfall;