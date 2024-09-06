/**
 * Returns the height and width of a HTML element, uses the `ResizeObserver` api if available to detect changes to the
 * size. Falls back to listening for resize events on the window.
 * @param ref A ref to the HTML element to be measured
 */
export declare const useComponentSize: (ref: React.RefObject<HTMLElement>) => {
    height: number;
    width: number;
};
/**
 * Utility hook that merges any provided styles with the default styles
 * @param overrides The style prop passed into the component
 */
export declare const useSnowfallStyle: (overrides?: React.CSSProperties) => React.CSSProperties;
/**
 * Same as `React.useEffect` but uses a deep comparison on the dependency array. This should only
 * be used when working with non-primitive dependencies.
 *
 * @param effect Effect callback to run
 * @param deps Effect dependencies
 */
export declare function useDeepCompareEffect(effect: React.EffectCallback, deps: React.DependencyList): void;
/**
 * Utility hook to stabilize a reference to a value, the returned value will always match the input value
 * but (unlike an inline object) will maintain [SameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * equality until a change is made.
 *
 * @example
 *
 * const obj = useDeepMemo({ foo: 'bar', bar: 'baz' }) // <- inline object creation
 * const prevValue = usePrevious(obj) // <- value from the previous render
 * console.log(obj === prevValue) // <- always logs true until value changes
 */
export declare function useDeepMemo<T>(value: T): T;
