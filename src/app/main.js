import {kontra} from './kontra';
import {renderBase, renderGame, renderUI} from './render';

function resize_game_canvas() {
    var app_container = document.getElementById('app-container');
    app_container.width = 1200;
    app_container.height = 660;

    var game_canvas = document.getElementById('canvas-base');
    game_canvas.width = 1200;
    game_canvas.height = 660;

    game_canvas = document.getElementById('canvas-game');
    game_canvas.width = 1200;
    game_canvas.height = 660;

    game_canvas = document.getElementById('canvas-ui');
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

        renderBase(document.getElementById('canvas-base').getContext('2d'));
        renderGame(document.getElementById('canvas-game').getContext('2d'));
        renderUI(document.getElementById('canvas-ui').getContext('2d'));
    }
});

loop.start();    // start the game
