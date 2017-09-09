import {xId} from './utils/utils';
import {UI} from './ui'
import {state} from './game-state';
import {Stats} from './utils/stats';
import {Plane} from "./entities/plane";
import {Backdrop} from "./entities/backdrop";
import {Hero} from "./entities/hero";
import {Cavern} from "./entities/cavern";
import {Comms} from "./comms";

window.onerror = function () {
    state.isRunning = false;
    document.getElementById('app-container').style.border = 'solid 4px #ff4444';
    return false;
};

class Game {
    constructor() {
        this.initialized = false;
        this.accumulator = 0;
        this.delta = 1000 / state.fps;  // delta between performance.now timings (in ms)
        this.step = 1 / state.fps;
        this.last = 0;
        this.rAF = null;
        this.now = 0;
        this.dt = 0;
        this.stats = new Stats();
    }

    init() {
        if (!this.initialized) {
            this.initialized = true;

            addEventListener('keydown', this.keydownEventHandler);
            addEventListener('keyup', this.keyupEventHandler);

            UI.init();

            state.console = xId('console');
            state.plane = new Plane();
            state.backdrop = new Backdrop();
            state.cavern = new Cavern();
            state.player = new Hero(state);
            state.comms = new Comms();

            this.startLoop();
        }
    }

    update() {

        state.ts++;

        // reset state
        state.ix = 0;
        state.iz = 0;

        state.player.update();
        state.plane.update();
        state.backdrop.update();
        state.cavern.update();

        state.objects.forEach(obj => obj.update());

        // 3.RestartMenu
        if(state.status !== 3)
            state.comms.update();

        if(state.player.z%400 === 50) {
            //xId('app-container').classList.add('a_hit');
            //setTimeout(()=>xId('app-container').classList.remove('a_hit'),500);
        }
    }

    render() {
        this.stats.render();
    }

    startLoop() {
        state.isRunning = true;
        this.last = performance.now();
        window.requestAnimationFrame(this.frame.bind(this));
    }

    frame(timestamp) {
        if(!state.isRunning) return false;

        this.now = performance.now();
        this.dt = this.now - this.last;
        this.last = this.now;

        // TODO: Start game after losing focus
        // TODO: Ability to stop game
        // prevent updating the game with a very large dt if the game were to lose focus
        // and then regain focus later
        if (this.dt > 1000) {
            return;
        }

        this.accumulator += this.dt;

        while (this.accumulator >= this.delta) {
            this.update(this.step);

            this.accumulator -= this.delta;
        }

        this.stats.update();
        this.render();

        this.rAF = window.requestAnimationFrame(this.frame.bind(this));
    }

    keydownEventHandler(e) {
        state.pressedKeys[e.which] = true;
        if (e.which === 49) {
            state.iz = 0;
            state.ix = 0;
            state.iy = 0;
            state.tz = 0;
            state.ts = 0;
            state.player.reset();
            state.plane.reset();
            state.backdrop.reset();
            state.doChecks = true;

            xId('layer-3d').classList.remove('a_over');
            state.status = 2;

            state.comms.showMsg('Let\'s go');
        }
    }

    keyupEventHandler(e) {
        state.pressedKeys[e.which] = false;
    }
}

const game = new Game();

document.addEventListener('DOMContentLoaded', () => game.init());