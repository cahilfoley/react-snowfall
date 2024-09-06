import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { snowfallBaseStyle } from './config.js';
import { getSize } from './utils.js';
/**
 * Returns the height and width of a HTML element, uses the `ResizeObserver` api if available to detect changes to the
 * size. Falls back to listening for resize events on the window.
 * @param ref A ref to the HTML element to be measured
 */
export const useComponentSize = (ref) => {
    const [size, setSize] = useState(getSize(ref.current));
    const resizeHandler = useCallback(() => {
        if (ref.current) {
            setSize(getSize(ref.current));
        }
    }, [ref]);
    useEffect(() => {
        const { ResizeObserver } = window;
        if (!ref.current)
            return;
        resizeHandler();
        if (typeof ResizeObserver === 'function') {
            const resizeObserver = new ResizeObserver(resizeHandler);
            resizeObserver.observe(ref.current);
            return () => resizeObserver.disconnect();
        }
        else {
            window.addEventListener('resize', resizeHandler);
            return () => window.removeEventListener('resize', resizeHandler);
        }
    }, [ref, resizeHandler]);
    return size;
};
/**
 * Utility hook that merges any provided styles with the default styles
 * @param overrides The style prop passed into the component
 */
export const useSnowfallStyle = (overrides) => {
    const styles = useMemo(() => ({
        ...snowfallBaseStyle,
        ...(overrides || {}),
    }), [overrides]);
    return styles;
};
/**
 * Same as `React.useEffect` but uses a deep comparison on the dependency array. This should only
 * be used when working with non-primitive dependencies.
 *
 * @param effect Effect callback to run
 * @param deps Effect dependencies
 */
export function useDeepCompareEffect(effect, deps) {
    const ref = useRef(deps);
    // Only update the current dependencies if they are not deep equal
    if (!isEqual(deps, ref.current)) {
        ref.current = deps;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useEffect(effect, ref.current);
}
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
export function useDeepMemo(value) {
    const [state, setState] = useState(value);
    useDeepCompareEffect(() => setState(value), [value]);
    return state;
}
//# sourceMappingURL=hooks.js.map