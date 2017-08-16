import {kontra} from './kontra'

function resize_game_canvas() {
    var app_container = document.getElementById('app-container');
    app_container.style.width = window.innerWidth;
    app_container.style.height = window.innerHeight;

    var game_canvas = document.getElementById('app-canvas');
    game_canvas.width = window.innerWidth;
    game_canvas.height = window.innerHeight;
}

resize_game_canvas();

window.addEventListener('resize', resize_game_canvas, false);
window.addEventListener('orientationchange', resize_game_canvas, false);


kontra.init();

var sprite = kontra.sprite({
    x: 100,        // starting x,y position of the sprite
    y: 80,
    color: 'red',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 40,
    dx: 2          // move the sprite 2px to the right every frame
});

var loop = kontra.gameLoop({  // create the main game loop
    update: function() {        // update the game state
        sprite.update();

        // wrap the sprites position when it reaches
        // the edge of the screen
        if (sprite.x > kontra.canvas.width) {
            sprite.x = -sprite.width;
        }
    },
    render: function() {        // render the game state
        sprite.render();
    }
});

loop.start();    // start the game