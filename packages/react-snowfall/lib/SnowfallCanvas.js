var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _SnowfallCanvas_ctx, _SnowfallCanvas_canvas;
import Snowflake, { defaultConfig } from './Snowflake';
import { targetFrameTime } from './config';
export class SnowfallCanvas {
    get ctx() {
        return __classPrivateFieldGet(this, _SnowfallCanvas_ctx, "f");
    }
    get canvas() {
        return __classPrivateFieldGet(this, _SnowfallCanvas_canvas, "f");
    }
    set canvas(canvas) {
        __classPrivateFieldSet(this, _SnowfallCanvas_canvas, canvas, "f");
        __classPrivateFieldSet(this, _SnowfallCanvas_ctx, canvas.getContext('2d'), "f");
    }
    constructor(canvas, config) {
        this.lastUpdate = Date.now();
        this.snowflakes = [];
        _SnowfallCanvas_ctx.set(this, void 0);
        _SnowfallCanvas_canvas.set(this, void 0);
        __classPrivateFieldSet(this, _SnowfallCanvas_canvas, canvas, "f");
        __classPrivateFieldSet(this, _SnowfallCanvas_ctx, canvas.getContext('2d'), "f");
        this.config = Object.assign(Object.assign({ snowflakeCount: 150 }, defaultConfig), config);
        this.snowflakes = [];
        this.snowflakes = Snowflake.createSnowflakes(canvas, config.snowflakeCount || 150, config);
        this.play();
    }
    /**
     * Updates the config used for the snowfall animation, if the number of snowflakes
     * has changed then this will create new or remove existing snowflakes gracefully
     * to retain the position of as many existing snowflakes as possible.
     */
    updateConfig(config) {
        this.config = Object.assign(Object.assign({}, this.config), config);
        const sizeDifference = this.config.snowflakeCount - this.snowflakes.length;
        if (sizeDifference > 0) {
            this.snowflakes = [...this.snowflakes, ...Snowflake.createSnowflakes(this.canvas, sizeDifference, config)];
        }
        if (sizeDifference < 0) {
            this.snowflakes = this.snowflakes.slice(0, this.config.snowflakeCount);
        }
        this.snowflakes.forEach((snowflake) => snowflake.updateConfig(this.config));
    }
    /**
     * Updates the location of each snowflake based on the number of frames passed then
     * clears the canvas and draws each snowflake.
     */
    render(framesPassed = 1) {
        const { ctx, canvas, snowflakes } = this;
        const { offsetWidth, offsetHeight } = canvas;
        // Update the position of each snowflake
        snowflakes.forEach((snowflake) => snowflake.update(offsetWidth, offsetHeight, framesPassed));
        // Render them if the canvas is available
        if (ctx) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, offsetWidth, offsetHeight);
            snowflakes.forEach((snowflake) => snowflake.draw(ctx));
        }
    }
    /**
     * The animation loop, will calculate the time since the last render and update
     * the position of the snowflakes appropriately before queueing another frame.
     */
    loop() {
        // Update based on time passed so that a slow frame rate won't slow down the snowflake
        const now = Date.now();
        const msPassed = Date.now() - this.lastUpdate;
        this.lastUpdate = now;
        // Frames that would have passed if running at 60 fps
        const framesPassed = msPassed / targetFrameTime;
        this.render(framesPassed);
        this.animationFrame = requestAnimationFrame(() => this.loop());
    }
    /** Start the animation playing. */
    play() {
        this.loop();
    }
    /** Pause the animation. */
    pause() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = undefined;
        }
    }
}
_SnowfallCanvas_ctx = new WeakMap(), _SnowfallCanvas_canvas = new WeakMap();
export default SnowfallCanvas;
//# sourceMappingURL=SnowfallCanvas.js.map