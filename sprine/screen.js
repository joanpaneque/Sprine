import { renderDraws } from "./draw.js";
import { initKeyboardEventListeners } from "./keyboard.js";
import { initMouseEventListeners } from "./mouse.js";
import { updateAllParticles } from "./particles.js";
import { renderSprites } from "./sprite.js";
import { renderTexts } from "./text.js";

// Internal use only
export var canvas = document.createElement('canvas');
export var context = canvas.getContext('2d');

export default class Screen {

    static width;
    static height;
    static bgColor;

    static create() {
        // Remove the weird margin around the canvas
        document.body.style.position = 'absolute';
        document.body.style.top = '50%';
        document.body.style.left = '50%';
        document.body.style.transform = 'translate(-50%, -50%)';
        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';

        initKeyboardEventListeners();
        initMouseEventListeners();
        
        document.body.appendChild(canvas);
        gameLoop();
    }
}


function gameLoop() {
    resize();
    updateAllParticles();
    renderSprites();
    renderTexts();
    renderDraws();
    requestAnimationFrame(gameLoop);
}

function resize() {
    // If screen size is not defined, use window size
    canvas.width = Screen.width ?? window.innerWidth;
    canvas.height = Screen.height ?? window.innerHeight;
    context.translate(canvas.width / 2, canvas.height / 2);


    // If background color is not defined, use black
    canvas.style.backgroundColor = Screen.bgColor ?? 'black';
}