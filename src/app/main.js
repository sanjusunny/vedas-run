import {kontra} from './kontra';
import {render} from './render';

function resize_game_canvas() {
    var app_container = document.getElementById('app-container');
    app_container.style.width = window.innerWidth;
    app_container.style.height = window.innerHeight;

    var game_canvas = document.getElementById('app-canvas');
    game_canvas.width = 1200;
    game_canvas.height = 660;
}

resize_game_canvas();

window.addEventListener('resize', resize_game_canvas, false);
window.addEventListener('orientationchange', resize_game_canvas, false);

kontra.init();
var loop = kontra.gameLoop({  // create the main game loop
    update: function() {        // update the game state

    },
    render: function() {        // render the game state

        render(kontra.context);
        loop.stop();
    }
});

loop.start();    // start the game