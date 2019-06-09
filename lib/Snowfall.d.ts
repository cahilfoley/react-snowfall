import React from 'react';
export interface SnowfallProps {
    color?: string;
    snowflakeCount?: number;
    style?: React.CSSProperties;
}
declare const Snowfall: ({ color, snowflakeCount, style }?: SnowfallProps) => JSX.Element;
export default Snowfall;
