"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = random;
exports.lerp = lerp;

function random(min, max) {
  var randomNumber = Math.random() * (max - min + 1) + min;

  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    return randomNumber;
  } else {
    return Math.floor(randomNumber);
  }
}

function lerp(start, end, normal) {
  return (1 - normal) * start + normal * end;
}