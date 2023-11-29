export interface SnowflakeProps {
    /** The color of the snowflake, can be any valid CSS color. */
    color: string;
    /**
     * The minimum and maximum radius of the snowflake, will be
     * randomly selected within this range.
     *
     * The default value is `[0.5, 3.0]`.
     */
    radius: [number, number];
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
    speed: [number, number];
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
    wind: [number, number];
    /**
     * The frequency in frames that the wind and speed values
     * will update.
     *
     * The default value is 200.
     */
    changeFrequency: number;
    /**
     * An array of images that will be rendered as the snowflakes instead
     * of the default circle shapes.
     */
    images?: CanvasImageSource[];
    /**
     * The minimum and maximum rotation speed of the snowflake (in degrees of
     * rotation per frame).
     *
     * The rotation speed determines how quickly the snowflake rotates when
     * an image is being rendered.
     *
     * The values will be randomly selected within this range.
     *
     * The default value is `[-1.0, 1.0]`.
     */
    rotationSpeed: [number, number];
    /**
     * The minimum and maximum opacity of the snowflake image.
     *
     * This value only applies to snowflakes that are using images.
     */
    opacity: [number, number];
}
export type SnowflakeConfig = Partial<SnowflakeProps>;
export declare const defaultConfig: SnowflakeProps;
/**
 * An individual snowflake that will update it's location every call to `update`
 * and draw itself to the canvas every call to `draw`.
 */
declare class Snowflake {
    private static offscreenCanvases;
    /**
     * A utility function to create a collection of snowflakes
     * @param canvas The canvas element
     * @param amount The number of snowflakes
     * @param config The configuration for each snowflake
     */
    static createSnowflakes(canvas: HTMLCanvasElement | null, amount: number, config: SnowflakeConfig): Snowflake[];
    private config;
    private params;
    private framesSinceLastUpdate;
    private image?;
    constructor(canvas: HTMLCanvasElement, config?: SnowflakeConfig);
    private selectImage;
    updateConfig(config: SnowflakeConfig): void;
    private updateTargetParams;
    update(offsetWidth: number, offsetHeight: number, framesPassed?: number): void;
    private getImageOffscreenCanvas;
    /**
     * Draws a circular snowflake to the canvas.
     *
     * This method should only be called if our config does not have images.
     *
     * This method assumes that a path has already been started on the canvas.
     * `ctx.beginPath()` should be called before calling this method.
     *
     * After calling this method, the fillStyle should be set to the snowflake's
     * color and `ctx.fill()` should be called to fill the snowflake.
     *
     * Calling `ctx.fill()` after multiple snowflakes have had `drawCircle` called
     * will render all of the snowflakes since the last call to `ctx.beginPath()`.
     *
     * @param ctx The canvas context to draw to
     */
    drawCircle(ctx: CanvasRenderingContext2D): void;
    /**
     * Draws an image-based snowflake to the canvas.
     *
     * This method should only be called if our config has images.
     *
     * @param ctx The canvas context to draw to
     */
    drawImage(ctx: CanvasRenderingContext2D): void;
}
export default Snowflake;
