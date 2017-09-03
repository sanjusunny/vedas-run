import {xId} from './utils/utils';
import {TextureManager} from './texture-manager';
import {UI} from './ui'
import {state} from './game-state';
import {Probe} from './entities/probe';
import {Stats} from './utils/stats';
import {Plane} from "./entities/plane";
import {Backdrop} from "./entities/backdrop";
import {Hero} from "./entities/hero";

window.onerror = function (msg, url, lineNo, columnNo, error) {
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
            state.player = new Hero(state);
            //state.player = new Player(state);
            /*for (var i = 0; i < 5; i++) {
                state.probes.push(new Probe(state));
            }
*/
            this.startLoop();
            //this.preRender();
        }
    }

    update() {

        // reset state
        state.ix = 0;
        state.iy = 0;
        state.iz = 0;

        state.player.update(state);
        state.plane.update(state);

        if(state.player.z%400 === 50) {
            xId('app-container').classList.add('a_hit');
            setTimeout(()=>xId('app-container').classList.remove('a_hit'),500);
        }

        /*for (var i = 0; i < state.probes.length; i++) {
            state.probes[i].update(state);
        }
        state.plane.update(state);
        state.backdrop.update(state);*/

        //state.log(`P(${state.player.x},${state.player.y})`);
    }

    render() {
        this.stats.render();
    }

    log(msg) {
        state.console.innerText = msg;
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
            document.getElementById('layer-backdrop-image').classList.toggle('hide');
        }
    }

    keyupEventHandler(e) {
        state.pressedKeys[e.which] = false;
    }
}

const game = new Game();

document.addEventListener('DOMContentLoaded', () => game.init());