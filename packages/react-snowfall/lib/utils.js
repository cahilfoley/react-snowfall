/**
 * Enhanced random function, selects a random value between a minimum and maximum. If the values provided are both
 * integers then the number returned will be an integer, otherwise the return number will be a decimal.
 * @param min The minimum value
 * @param max The maximum value
 */
export function random(min, max) {
    const randomNumber = Math.random() * (max - min + 1) + min;
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        return randomNumber;
    }
    else {
        return Math.floor(randomNumber);
    }
}
/**
 * Linear interpolation function to gradually step towards a target value
 * @param start The current value
 * @param end The target value
 * @param normal The rate of change between 0 and 1 (0 = no change, 1 = instant)
 */
export function lerp(start, end, normal) {
    return (1 - normal) * start + normal * end;
}
/**
 * Selects a random item from an array of inputs.
 *
 * @param items The array of items to choose from
 * @returns A random item selected from the array
 */
export function randomElement(items) {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
}
/**
 * Gets the height and width of the provided HTML element
 * @param element The html element to measure
 */
export function getSize(element) {
    if (!element)
        return { height: 0, width: 0 };
    return {
        height: element.offsetHeight,
        width: element.offsetWidth,
    };
}
/**
 * Store the value of PI * 2.
 *
 * This is so we can avoid calculating this value every time we draw a circle.
 */
export const twoPi = Math.PI * 2;
//# sourceMappingURL=utils.js.map