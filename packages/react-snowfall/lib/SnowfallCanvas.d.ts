import { SnowflakeConfig } from './Snowflake.js';
export interface SnowfallCanvasConfig extends SnowflakeConfig {
    /**
     * The number of snowflakes to be rendered.
     *
     * The default value is 150.
     */
    snowflakeCount: number;
}
export declare class SnowfallCanvas {
    #private;
    private lastUpdate;
    private snowflakes;
    private config;
    get ctx(): CanvasRenderingContext2D | null;
    get canvas(): HTMLCanvasElement;
    set canvas(canvas: HTMLCanvasElement);
    constructor(canvas: HTMLCanvasElement, config: Partial<SnowfallCanvasConfig>);
    /**
     * Updates the config used for the snowfall animation, if the number of snowflakes
     * has changed then this will create new or remove existing snowflakes gracefully
     * to retain the position of as many existing snowflakes as possible.
     */
    updateConfig(config: Partial<SnowfallCanvasConfig>): void;
    /**
     * Updates the location of each snowflake based on the number of frames passed then
     * clears the canvas and draws each snowflake.
     */
    private render;
    private animationFrame;
    /**
     * The animation loop, will calculate the time since the last render and update
     * the position of the snowflakes appropriately before queueing another frame.
     */
    private loop;
    /** Start the animation playing. */
    play(): void;
    /** Pause the animation. */
    pause(): void;
}
export default SnowfallCanvas;
