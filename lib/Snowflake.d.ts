export interface SnowflakeProps {
    color: string;
    radius: [number, number];
    speed: [number, number];
    wind: [number, number];
    changeFrequency: number;
}
export declare type SnowflakeConfig = Partial<SnowflakeProps>;
/** An individual snowflake that will update it's location every call to `draw` */
declare class Snowflake {
    config: SnowflakeConfig;
    private params;
    private framesSinceLastUpdate;
    constructor(canvas: HTMLCanvasElement, config?: SnowflakeConfig);
    private readonly fullConfig;
    resized: () => boolean;
    draw: (canvas: HTMLCanvasElement, inputCtx?: CanvasRenderingContext2D | undefined) => void;
    private translate;
    private updateTargetParams;
    update: (canvas: HTMLCanvasElement, framesPassed?: number | undefined) => void;
}
export default Snowflake;
