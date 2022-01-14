export interface SnowflakeProps {
    /** The color of the snowflake, can be any valid CSS color. */
    color: string;
    /**
     * The minimum and maximum radius of the snowflake, will be
     * randomly selected within this range.
     *
     * The default value is `[0.5, 3.0]`.
     */
    radius: [minimumRadius: number, maximumRadius: number];
    /**
     * The minimum and maximum speed of the snowflake.
     *
     * The speed determines how quickly the snowflake moves
     * along the y axis (vertical speed).
     *
     * The values will be randomly selected within this range.
     *
     * The default value is `[1.0, 3.0]`.
     */
    speed: [minimumSpeed: number, maximumSpeed: number];
    /**
     * The minimum and maximum wind of the snowflake.
     *
     * The wind determines how quickly the snowflake moves
     * along the x axis (horizontal speed).
     *
     * The values will be randomly selected within this range.
     *
     * The default value is `[-0.5, 2.0]`.
     */
    wind: [minimumWind: number, maximumWind: number];
    /**
     * The frequency in frames that the wind and speed values
     * will update.
     *
     * The default value is 200.
     */
    changeFrequency: number;
}
export declare type SnowflakeConfig = Partial<SnowflakeProps>;
export declare const defaultConfig: SnowflakeProps;
/**
 * An individual snowflake that will update it's location every call to `update`
 * and draw itself to the canvas every call to `draw`.
 */
declare class Snowflake {
    private config;
    private params;
    private framesSinceLastUpdate;
    constructor(canvas: HTMLCanvasElement, config?: SnowflakeConfig);
    updateConfig(config: SnowflakeConfig): void;
    private updateTargetParams;
    update(canvas: HTMLCanvasElement, framesPassed?: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}
export default Snowflake;
