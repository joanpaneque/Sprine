import Sprine from './sprine/sprine.js'
Sprine.screen.create();

let sprite = Sprine.sprite.create();
sprite.texture = "images/flappy.png";
sprite.x = 0;
sprite.y = 0;

Sprine.loop.gameLoop((deltaTime, fps, time) => {

})