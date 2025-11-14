import React from 'react';
import { SnowfallCanvasConfig } from './SnowfallCanvas.js';
export interface SnowfallProps extends Partial<SnowfallCanvasConfig> {
    /**
     * Any style properties that will be passed to the canvas element.
     */
    style?: React.CSSProperties;
}
export declare const Snowfall: ({ color, changeFrequency, radius, speed, wind, rotationSpeed, opacity, snowflakeCount, images, enable3DRotation, style, }?: SnowfallProps) => JSX.Element;
export default Snowfall;
