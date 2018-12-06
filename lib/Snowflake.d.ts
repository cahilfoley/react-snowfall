export interface SnowflakeConfig {
    color?: string;
    radius?: [number, number];
    speed?: [number, number];
    wind?: [number, number];
}
interface SnowflakeProps {
    color: string;
    radius: [number, number];
    speed: [number, number];
    wind: [number, number];
}
interface SnowflakeParams {
    color: string;
    x: number;
    y: number;
    radius: number;
    speed: number;
    wind: number;
    isResized: boolean;
}
declare class Snowflake {
    config: SnowflakeProps;
    params: SnowflakeParams;
    constructor(canvas: HTMLCanvasElement, config?: SnowflakeConfig);
    updateData: (canvas: HTMLCanvasElement) => void;
    resized: () => boolean;
    draw: (canvas: HTMLCanvasElement) => void;
    translate: () => void;
    onDown: (canvas: HTMLCanvasElement) => void;
    update: (canvas: HTMLCanvasElement) => void;
}
export default Snowflake;
