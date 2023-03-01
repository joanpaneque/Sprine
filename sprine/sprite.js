import Hitbox from "./hitbox.js";
import Camera from "./camera.js";
import { context } from "./screen.js";
import Filter from "./filter.js";

var sprites = [];

export default class Sprite {
    static create() {
        let sprite = new SpritePrototype();
        sprites.push(sprite);
        return sprite;
    }
}

class SpritePrototype {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.size = 1;
        this.rotation = 0;
        this.visible = true;
        this.texture = null;
        this.hitbox = new Hitbox("sprite", this);
        this.filter = new Filter(this);

        this._fixedSprite = null;     
        this._image = [new Image()];
        this._frame = 0;
    }

    fixTo(SpritePrototype) {
        this.fixedPrototype = {
            xDiff: this.x - SpritePrototype.x,
            yDiff: this.y - SpritePrototype.y,
            rotationDiff: this.rotation - SpritePrototype.rotation,
            prototype: SpritePrototype
        }
    }

    update() {
        if (this.fixedPrototype) {
            this.x = this.fixedPrototype.prototype.x + this.fixedPrototype.xDiff;
            this.y = this.fixedPrototype.prototype.y + this.fixedPrototype.yDiff;
            this.rotation = this.fixedPrototype.prototype.rotation + this.fixedPrototype.rotationDiff;
        }
    }


    pointTo(SpritePrototype) {
        this.rotation = Math.atan2(SpritePrototype.y - this.y, SpritePrototype.x - this.x) * 180 / Math.PI;
    }

    distanceFrom(SpritePrototype) {
        return Math.sqrt((SpritePrototype.x - this.x) ** 2 + (SpritePrototype.y - this.y) ** 2);
    }

    move(steps) {
        this.x += Math.cos(this.rotation * Math.PI / 180) * steps;
        this.y += Math.sin(this.rotation * Math.PI / 180) * steps;
    }

    destroy() {
        sprites.splice(sprites.indexOf(this), 1);
    }
}

export function renderSprites() {
    sprites.forEach(sprite => {
        if (sprite.visible) {
            sprite.update();
            context.save();
            context.translate(-Camera.x, -Camera.y);
            context.rotate(Camera.rotation * Math.PI / 180);
            context.translate(sprite.x, sprite.y);
            context.rotate(sprite.rotation * Math.PI / 180);
            context.scale(sprite.size, sprite.size);

            if (typeof sprite.texture == "string") {
                sprite.texture = [sprite.texture];
            }
            
            sprite._image[sprite._frame].src = sprite.texture[sprite._frame];

            context.drawImage(sprite._image[sprite._frame], -sprite._image.width / 2, -sprite._image.height / 2);

            // Check if image is loaded
            if (sprite._image[sprite._frame].complete) {
            }

            context.restore();
        }
    })
}