import Screen, { canvas } from "./screen.js";

export default class Mouse {
    static mouseDown = false;
    static x = 0;
    static y = 0;

    static hide() {
        canvas.style.cursor = "none";
    }

    static show() {
        canvas.style.cursor = "default";
    }
}

export function initMouseEventListeners() {
    document.addEventListener("mousedown", () => {
        Mouse.mouseDown = true;
    });
    document.addEventListener("mouseup", () => {
        Mouse.mouseDown = false;
    });
    document.addEventListener("mousemove", e => {
        let rect = canvas.getBoundingClientRect();
        Mouse.x = e.clientX - rect.left - (Screen.width ?? window.innerWidth) / 2;
        Mouse.y = e.clientY - rect.top - (Screen.height ?? window.innerHeight) / 2;
    });
}