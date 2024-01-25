import isEqual from 'react-fast-compare';
import { lerp, random, randomElement } from './utils';
export const defaultConfig = {
    color: '#dee4fd',
    radius: [0.5, 3.0],
    speed: [1.0, 3.0],
    wind: [-0.5, 2.0],
    changeFrequency: 200,
    rotationSpeed: [-1.0, 1.0],
};
/**
 * An individual snowflake that will update it's location every call to `update`
 * and draw itself to the canvas every call to `draw`.
 */
class Snowflake {
    /**
     * A utility function to create a collection of snowflakes
     * @param canvas The canvas element
     * @param amount The number of snowflakes
     * @param config The configuration for each snowflake
     */
    static createSnowflakes(canvas, amount, config) {
        if (!canvas)
            return [];
        const snowflakes = [];
        for (let i = 0; i < amount; i++) {
            snowflakes.push(new Snowflake(canvas, config));
        }
        return snowflakes;
    }
    constructor(canvas, config = {}) {
        // Set custom config
        this.updateConfig(config);
        // Setting initial parameters
        const { radius, wind, speed, rotationSpeed } = this.config;
        this.params = {
            x: random(0, canvas.offsetWidth),
            y: random(-canvas.offsetHeight, 0),
            rotation: random(0, 360),
            radius: random(...radius),
            speed: random(...speed),
            wind: random(...wind),
            rotationSpeed: random(...rotationSpeed),
            nextSpeed: random(...wind),
            nextWind: random(...speed),
            nextRotationSpeed: random(...rotationSpeed),
        };
        this.framesSinceLastUpdate = 0;
    }
    selectImage() {
        if (this.config.images && this.config.images.length > 0) {
            this.image = randomElement(this.config.images);
        }
        else {
            this.image = undefined;
        }
    }
    updateConfig(config) {
        const previousConfig = this.config;
        this.config = Object.assign(Object.assign({}, defaultConfig), config);
        this.config.changeFrequency = random(this.config.changeFrequency, this.config.changeFrequency * 1.5);
        // Update the radius if the config has changed, it won't gradually update on it's own
        if (this.params && !isEqual(this.config.radius, previousConfig === null || previousConfig === void 0 ? void 0 : previousConfig.radius)) {
            this.params.radius = random(...this.config.radius);
        }
        if (!isEqual(this.config.images, previousConfig === null || previousConfig === void 0 ? void 0 : previousConfig.images)) {
            this.selectImage();
        }
    }
    updateTargetParams() {
        this.params.nextSpeed = random(...this.config.speed);
        this.params.nextWind = random(...this.config.wind);
        if (this.image) {
            this.params.nextRotationSpeed = random(...this.config.rotationSpeed);
        }
    }
    update(offsetWidth, offsetHeight, framesPassed = 1) {
        const { x, y, rotation, rotationSpeed, nextRotationSpeed, wind, speed, nextWind, nextSpeed, radius } = this.params;
        // Update current location, wrapping around if going off the canvas
        this.params.x = (x + wind * framesPassed) % (offsetWidth + radius * 2);
        if (this.params.x > offsetWidth + radius)
            this.params.x = -radius;
        this.params.y = (y + speed * framesPassed) % (offsetHeight + radius * 2);
        if (this.params.y > offsetHeight + radius)
            this.params.y = -radius;
        // Apply rotation
        if (this.image) {
            this.params.rotation = (rotation + rotationSpeed) % 360;
        }
        // Update the wind, speed and rotation towards the desired values
        this.params.speed = lerp(speed, nextSpeed, 0.01);
        this.params.wind = lerp(wind, nextWind, 0.01);
        this.params.rotationSpeed = lerp(rotationSpeed, nextRotationSpeed, 0.01);
        if (this.framesSinceLastUpdate++ > this.config.changeFrequency) {
            this.updateTargetParams();
            this.framesSinceLastUpdate = 0;
        }
    }
    getImageOffscreenCanvas(image, size) {
        var _a, _b;
        if (image instanceof HTMLImageElement && image.loading)
            return image;
        let sizes = Snowflake.offscreenCanvases.get(image);
        if (!sizes) {
            sizes = {};
            Snowflake.offscreenCanvases.set(image, sizes);
        }
        if (!(size in sizes)) {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            (_a = canvas.getContext('2d')) === null || _a === void 0 ? void 0 : _a.drawImage(image, 0, 0, size, size);
            sizes[size] = canvas;
        }
        return (_b = sizes[size]) !== null && _b !== void 0 ? _b : image;
    }
    draw(ctx) {
        const { x, y, rotation, radius } = this.params;
        if (this.image) {
            const radian = (rotation * Math.PI) / 180;
            const cos = Math.cos(radian);
            const sin = Math.sin(radian);
            // Translate to the location that we will be drawing the snowflake, including any rotation that needs to be applied
            // The arguments for setTransform are: a, b, c, d, e, f
            // a (scaleX), b (skewY), c (skewX), d (scaleY), e (translateX), f (translateY)
            ctx.setTransform(cos, sin, -sin, cos, x, y);
            // Draw the image with the center of the image at the center of the current location
            const image = this.getImageOffscreenCanvas(this.image, radius);
            ctx.drawImage(image, -(radius / 2), -(radius / 2), radius, radius);
        }
        else {
            // Not using images so no need to use transforms, just draw an arc in the right location
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.config.color;
            ctx.fill();
        }
    }
}
Snowflake.offscreenCanvases = new WeakMap();
export default Snowflake;
//# sourceMappingURL=Snowflake.js.map