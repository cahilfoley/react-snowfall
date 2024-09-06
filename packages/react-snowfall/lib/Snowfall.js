import React, { useEffect, useRef } from 'react';
import { SnowfallCanvas } from './SnowfallCanvas';
import { defaultConfig } from './Snowflake';
import { useComponentSize, useDeepMemo, useSnowfallStyle } from './hooks';
export const Snowfall = ({ color = defaultConfig.color, changeFrequency = defaultConfig.changeFrequency, radius = defaultConfig.radius, speed = defaultConfig.speed, wind = defaultConfig.wind, rotationSpeed = defaultConfig.rotationSpeed, snowflakeCount = 150, images, style, } = {}) => {
    const mergedStyle = useSnowfallStyle(style);
    const canvasRef = useRef(null);
    const canvasSize = useComponentSize(canvasRef);
    const config = useDeepMemo({
        color,
        changeFrequency,
        radius,
        speed,
        wind,
        rotationSpeed,
        images,
        snowflakeCount,
    });
    // A reference to the config used for creating the initial instance
    const configRef = useRef(config);
    const snowfallCanvasRef = useRef();
    useEffect(() => {
        if (!snowfallCanvasRef.current && canvasRef.current) {
            snowfallCanvasRef.current = new SnowfallCanvas(canvasRef.current, configRef.current);
        }
        return () => {
            var _a;
            (_a = snowfallCanvasRef.current) === null || _a === void 0 ? void 0 : _a.pause();
            snowfallCanvasRef.current = undefined;
        };
    }, []);
    useEffect(() => {
        if (snowfallCanvasRef.current) {
            snowfallCanvasRef.current.updateConfig(config);
        }
    }, [config]);
    return (React.createElement("canvas", { ref: canvasRef, height: canvasSize.height, width: canvasSize.width, style: mergedStyle, "data-testid": "SnowfallCanvas" }));
};
export default Snowfall;
//# sourceMappingURL=Snowfall.js.map