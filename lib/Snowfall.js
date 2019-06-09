"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _config = require("./config");

var _hooks = require("./hooks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var Snowfall = function Snowfall() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#dee4fd' : _ref$color,
      _ref$snowflakeCount = _ref.snowflakeCount,
      snowflakeCount = _ref$snowflakeCount === void 0 ? 150 : _ref$snowflakeCount,
      style = _ref.style;

  var mergedStyle = (0, _hooks.useSnowfallStyle)(style);
  var canvasRef = (0, _react.useRef)();
  var canvasSize = (0, _hooks.useComponentSize)(canvasRef);
  var animationFrame = (0, _react.useRef)(0);
  var lastUpdate = (0, _react.useRef)(Date.now());
  var config = (0, _react.useMemo)(function () {
    return {
      color: color
    };
  }, [color]);
  var snowflakes = (0, _hooks.useSnowflakes)(canvasRef, snowflakeCount, config);

  var updateCanvasRef = function updateCanvasRef(element) {
    canvasRef.current = element;
  };

  var render = (0, _react.useCallback)(function () {
    var framesPassed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var canvas = canvasRef.current;

    if (canvas) {
      // Update the positions of the snowflakes
      snowflakes.forEach(function (snowflake) {
        return snowflake.update(canvas, framesPassed);
      }); // Render them if the canvas is available

      var ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        snowflakes.forEach(function (snowflake) {
          return snowflake.draw(canvas, ctx);
        });
      }
    }
  }, [snowflakes]);
  var loop = (0, _react.useCallback)(function () {
    // Update based on time passed so that a slow frame rate won't slow down the snowflake
    var now = Date.now();
    var msPassed = Date.now() - lastUpdate.current;
    lastUpdate.current = now; // Frames that would have passed if running at 60 fps

    var framesPassed = msPassed / _config.targetFrameTime;
    render(framesPassed);
    animationFrame.current = requestAnimationFrame(loop);
  }, [render]);
  (0, _react.useEffect)(function () {
    console.log('useEffect');
    loop();
    return function () {
      return cancelAnimationFrame(animationFrame.current);
    };
  }, [loop]);
  return _react["default"].createElement("canvas", {
    ref: updateCanvasRef,
    height: canvasSize.height,
    width: canvasSize.width,
    style: mergedStyle
  });
};

var _default = Snowfall;
exports["default"] = _default;