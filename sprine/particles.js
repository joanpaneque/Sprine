import Sprite from "./sprite.js";
import Random from "./random.js";
import { deltaTime } from "./loop.js";

var particles = [];

export default class Particles {
    static create() {
        let particle = new ParticleEmitter();
        particles.push(particle);
        return particle;
    }
}

export function updateAllParticles() {
    particles.forEach(particle => {
        particle.update();
    });
}

class ParticleEmitter {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.size = 1;
        this.rotation = 0;
        this.visible = true;
        this.texture = null;

        this.quantity = Infinity;
        this.speed = 1;
        this.spawnDelay = 10;
        this.angle = 90;
        this.liveTime = 1000;
        this.gravity = 0.016;

        this._sprites = [];
        this._spawnTimer = 0;
    }

    update() {
        this._spawnTimer += deltaTime;
        if (this._sprites.length < this.quantity) {
            if (this._spawnTimer >= this.spawnDelay) {
                this._spawnTimer = 0;
                let sprite = Sprite.create();
                sprite.timeAlive = 0;
                sprite.texture = this.texture;
                sprite.size = this.size;
                sprite.visible = this.visible;
                sprite.x = this.x;
                sprite.y = this.y;
    
                // Calculate the angular distance between each particle
                const angularDistance = this.angle / (this.quantity - 1);
    
                // Calculate the random angle within the range of angles specified
                const randomAngle = (Math.random() * this.angle) - (this.angle / 2) + this.rotation;
    
                // Calculate the velocity vector based on the random angle
                const velocityY = this.speed * Math.cos(randomAngle * (Math.PI / 180));
                const velocityX = this.speed * Math.sin(randomAngle * (Math.PI / 180));
                sprite.velocity = { x: velocityX, y: velocityY };
    
                // Add the particle's vertical velocity
                sprite.velocityY = 0;
    
                this._sprites.push(sprite);
            }
        } else {
            for (let i = 0; i < this._sprites.length - this.quantity; i++) {
                this._sprites[i].destroy();
                this._sprites.splice(i, 1);
            }
        }

        this._sprites.forEach(sprite => {
            sprite.size = this.size;
            sprite.visible = this.visible;
            sprite.timeAlive += deltaTime;
            if (sprite.timeAlive > this.liveTime) {
                sprite.destroy();
                this._sprites.splice(this._sprites.indexOf(sprite), 1);
            } else {
                // Add the gravity acceleration to the particle's velocityY
                sprite.velocityY += this.gravity * deltaTime;

                // Update the particle's position based on its velocityX and velocityY
                sprite.x += sprite.velocity.x * deltaTime;
                sprite.y += sprite.velocity.y * deltaTime + 0.5 * this.gravity * deltaTime * deltaTime;
                sprite.pointTo(this);
            }
        });
    }
}