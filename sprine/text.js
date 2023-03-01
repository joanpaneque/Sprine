import { context } from "./screen.js";
import Camera from "./camera.js";

var texts = [];

export default class Text {
    static create() {
        let text = {
            text: undefined,
            size: 12,
            color: "#FFFFFF",
            x: 0,
            y: 0,
            rotation: 0,
            visible: true,
            font: "Arial",
        }
        texts.push(text);
        return text;
    }
}

export function renderTexts() {
    texts.forEach(text => {
        if (text.visible) {
            context.save();
            context.translate(-Camera.x, -Camera.y);
            context.rotate(Camera.rotation * Math.PI / 180);
            context.translate(text.x, text.y);
            context.rotate(text.rotation * Math.PI / 180);
            context.font = `${text.size}px ${text.font}`;
            context.fillStyle = text.color;
            context.fillText(text.text, text.x - context.measureText(text.text).width / 2, text.y - text.size / 2);
            context.restore();
        }
    })
}