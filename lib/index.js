"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Snowfall = require("./Snowfall");

Object.keys(_Snowfall).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Snowfall[key];
    }
  });
});