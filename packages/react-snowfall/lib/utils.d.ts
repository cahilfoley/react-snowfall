/**
 * Enhanced random function, selects a random value between a minimum and maximum. If the values provided are both
 * integers then the number returned will be an integer, otherwise the return number will be a decimal.
 * @param min The minimum value
 * @param max The maximum value
 */
export declare function random(min: number, max: number): number;
/**
 * Linear interpolation function to gradually step towards a target value
 * @param start The current value
 * @param end The target value
 * @param normal The rate of change between 0 and 1 (0 = no change, 1 = instant)
 */
export declare function lerp(start: number, end: number, normal: number): number;
/**
 * Selects a random item from an array of inputs.
 *
 * @param items The array of items to choose from
 * @returns A random item selected from the array
 */
export declare function randomElement<T>(items: T[]): T;
/**
 * Gets the height and width of the provided HTML element
 * @param element The html element to measure
 */
export declare function getSize(element?: HTMLElement | null): {
    height: number;
    width: number;
};
/**
 * Store the value of PI * 2.
 *
 * This is so we can avoid calculating this value every time we draw a circle.
 */
export declare const twoPi: number;
