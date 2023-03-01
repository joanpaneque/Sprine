export default class Hitbox {
    constructor(type, object) {
        this.type = type;
        this.object = object;
    }

    // Check if this hitbox is colliding with another hitbox
    collidesWith(Hitbox) {
        // Check if both objects are visible
        if (!this.object.visible || !Hitbox.object.visible) return false;

        if (this.type == "sprite" && Hitbox.type == "sprite") {
            // Check if both sprites images are loaded
            if (!this.object._image.complete || !Hitbox.object._image.complete ||
                this.object._image.width == 0 || Hitbox.object._image.width == 0 ||
                this.object._image.height == 0 || Hitbox.object._image.height == 0) return false;

            // Check if there is a possible collision between the two sprites based on their positions and width and height
            // Commented because it's not working properly yet (it's not detecting collisions when the object is rotated)

            if (this.object.x - this.object._image.width / 2 * this.object.size > Hitbox.object.x + Hitbox.object._image.width / 2 * Hitbox.object.size ||
                this.object.x + this.object._image.width / 2 * this.object.size < Hitbox.object.x - Hitbox.object._image.width / 2 * Hitbox.object.size ||
                this.object.y - this.object._image.height / 2 * this.object.size > Hitbox.object.y + Hitbox.object._image.height / 2 * Hitbox.object.size ||
                this.object.y + this.object._image.height / 2 * this.object.size < Hitbox.object.y - Hitbox.object._image.height / 2 * Hitbox.object.size) return false;

            
            let virtualCanvas1 = document.createElement("canvas");
            let virtualContext1 = virtualCanvas1.getContext("2d");

            let virtualCanvas2 = document.createElement("canvas");
            let virtualContext2 = virtualCanvas2.getContext("2d");


            // Set both of the virtual canvases to the minimum size needed to fit both sprites
            virtualCanvas1.width = Math.max(this.object.x + this.object._image.width / 2, Hitbox.object.x + Hitbox.object._image.width / 2) - Math.min(this.object.x - this.object._image.width / 2, Hitbox.object.x - Hitbox.object._image.width / 2);
            virtualCanvas1.height = Math.max(this.object.y + this.object._image.height / 2, Hitbox.object.y + Hitbox.object._image.height / 2) - Math.min(this.object.y - this.object._image.height / 2, Hitbox.object.y - Hitbox.object._image.height / 2);

            virtualCanvas2.width = virtualCanvas1.width;
            virtualCanvas2.height = virtualCanvas1.height;

            // Draw both sprites, each one in a different virtual canvas
            // Draw the first sprite
            virtualContext1.save();
            virtualContext1.translate(this.object.x - Math.min(this.object.x - this.object._image.width / 2, Hitbox.object.x - Hitbox.object._image.width / 2), this.object.y - Math.min(this.object.y - this.object._image.height / 2, Hitbox.object.y - Hitbox.object._image.height / 2));
            virtualContext1.rotate(this.object.rotation * Math.PI / 180);
            virtualContext1.scale(Math.abs(this.object.size), Math.abs(this.object.size));
            virtualContext1.drawImage(this.object._image, -this.object._image.width / 2, -this.object._image.height / 2);
            virtualContext1.restore();

            // Draw the second sprite
            virtualContext2.save();
            virtualContext2.translate(Hitbox.object.x - Math.min(this.object.x - this.object._image.width / 2, Hitbox.object.x - Hitbox.object._image.width / 2), Hitbox.object.y - Math.min(this.object.y - this.object._image.height / 2, Hitbox.object.y - Hitbox.object._image.height / 2));
            virtualContext2.rotate(Hitbox.object.rotation * Math.PI / 180);
            virtualContext2.scale(Math.abs(Hitbox.object.size), Math.abs(Hitbox.object.size));
            virtualContext2.drawImage(Hitbox.object._image, -Hitbox.object._image.width / 2, -Hitbox.object._image.height / 2);
            virtualContext2.restore();

            // Get the pixels of both virtual canvases
            let pixels1 = virtualContext1.getImageData(0, 0, virtualCanvas1.width, virtualCanvas1.height).data;
            let pixels2 = virtualContext2.getImageData(0, 0, virtualCanvas2.width, virtualCanvas2.height).data;

            // Check if there is a collision between the two sprites based on their pixels
            for (let i = 0; i < pixels1.length; i += 4) {
                if (pixels1[i + 3] != 0 && pixels2[i + 3] != 0) {
                    // Return the position of the collision in the real canvas
                    return {
                        x: Math.floor(i / 4) % virtualCanvas1.width + Math.min(this.object.x - this.object._image.width / 2, Hitbox.object.x - Hitbox.object._image.width / 2),
                        y: Math.floor(i / 4 / virtualCanvas1.width) + Math.min(this.object.y - this.object._image.height / 2, Hitbox.object.y - Hitbox.object._image.height / 2)
                    };

                }
            }
            return false;
        }

        if (this.type == "line" && Hitbox.type == "line") {
            let a = this.object.x1;
            let b = this.object.y1;
            let c = this.object.x2;
            let d = this.object.y2;
            let p = Hitbox.object.x1;
            let q = Hitbox.object.y1;
            let r = Hitbox.object.x2;
            let s = Hitbox.object.y2;

            var det, gamma, lambda;
            det = (c - a) * (s - q) - (r - p) * (d - b);
            if (det === 0) {
                return false;
            } else {
                lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
                gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
                return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
            }
        }
    }
}