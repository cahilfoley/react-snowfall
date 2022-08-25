"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSize = getSize;
exports.lerp = lerp;
exports.random = random;
exports.randomElement = randomElement;

/**
 * Enhanced random function, selects a random value between a minimum and maximum. If the values provided are both
 * integers then the number returned will be an integer, otherwise the return number will be a decimal.
 * @param min The minimum value
 * @param max The maximum value
 */
function random(min, max) {
  var randomNumber = Math.random() * (max - min + 1) + min;

  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    return randomNumber;
  } else {
    return Math.floor(randomNumber);
  }
}
/**
 * Linear interpolation function to gradually step towards a target value
 * @param start The current value
 * @param end The target value
 * @param normal The rate of change between 0 and 1 (0 = no change, 1 = instant)
 */


function lerp(start, end, normal) {
  return (1 - normal) * start + normal * end;
}
/**
 * Gets the height and width of the provided HTML element
 * @param element The html element to measure
 */


function getSize(element) {
  if (!element) return {
    height: 0,
    width: 0
  };
  return {
    height: element.offsetHeight,
    width: element.offsetWidth
  };
}
/**
 * Selects a random item from an array of inputs.
 *
 * @param items The array of items to choose from
 * @returns A random item selected from the array
 */


function randomElement(items) {
  var index = Math.floor(Math.random() * items.length);
  return items[index];
}
//# sourceMappingURL=utils.js.map