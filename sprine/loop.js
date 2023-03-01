export default class Loop {
    static gameLoop(callback) {
        loop(callback);
    }
}

var lastTime = performance.now();
export var deltaTime = 0;
var time = 0;

function loop(callback) {
    const currentTime = performance.now();
    deltaTime = currentTime - lastTime;
    // Call the callback with the delta time and the fps
    time += deltaTime/1000;
    callback(deltaTime/1000, 1 / deltaTime * 1000, time);
    lastTime = currentTime;
    requestAnimationFrame(() => loop(callback));
  }