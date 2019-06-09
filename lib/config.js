"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAnimationFrame = exports.targetFrameTime = exports.snowfallBaseStyle = void 0;
var snowfallBaseStyle = {
  pointerEvents: 'none',
  backgroundColor: 'transparent',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%' // Target of 60 frames per second

};
exports.snowfallBaseStyle = snowfallBaseStyle;
var targetFrameTime = 1000 / 60;
exports.targetFrameTime = targetFrameTime;
var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
exports.requestAnimationFrame = requestAnimationFrame;
//# sourceMappingURL=config.js.map