import React from 'react';
import { SnowflakeProps } from './Snowflake';
export interface SnowfallProps extends Partial<SnowflakeProps> {
    /**
     * The number of snowflakes to be rendered.
     *
     * The default value is 150.
     */
    snowflakeCount?: number;
    /**
     * Any style properties that will be passed to the canvas element.
     */
    style?: React.CSSProperties;
}
declare const Snowfall: ({ color, changeFrequency, radius, speed, wind, rotationSpeed, snowflakeCount, images, style, }?: SnowfallProps) => JSX.Element;
export default Snowfall;
