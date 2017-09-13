import {xId} from './utils/utils';
import {UI} from './ui'
import {state} from './game-state';
import {Stats} from './utils/stats';
import {Plane} from "./entities/plane";
import {Backdrop} from "./entities/backdrop";
import {Hero} from "./entities/hero";
import {Comms} from "./comms";
import {Omega} from "./entities/omega";

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

            state.game = this;
            state.console = xId('console');
            state.plane = new Plane();
            state.backdrop = new Backdrop();
            state.player = new Hero(state);
            state.comms = new Comms();

            this.dist = xId('distEl');
            this.health = xId('healthEl');

            window.gs = state;

            if (!state.intro)
                this.startLoop();
            else
                this.update();
        }
    }

    end(type) {
        let base = ' Press 1 to RESTART';
        switch (type) {
            case 1:
                state.comms.showMsg('The AI is strong... I feel it probing, try1ng t0 contr01 my m1nd... I cann0t g1ve 1n... 1 n10d 10 f1g10... 01101100 01101111 01110011 01110100' + base, true);
                break;
            case 2:
                state.comms.showMsg('I see them coming over the horizon... they are so many, thousands of them... I must... fight... I can\'t... I have lost.' + base, true);
                break;
            case 3:
                if(document.querySelector('.b_plate.b_6')) document.querySelector('.b_plate.b_6').style.opacity = 0;
                state.status = 3;
                state.doChecks = false;
                state.player.a_isAnimating = false;
                state.omega.outro();
                setTimeout(() => {
                    xId('layer-3d').classList.add('a_over');
                    xId('app-container').classList.remove('boss');
                }, 2500);
                setTimeout(() => {
                    state.comms.showMsg('It is done. The beam has been shutdown, the machines are disabled. This battle is won but the war is only getting started. Humanity... will prevail.', true);
                }, 3000);

                return;

                break;
            case 4:
                state.comms.showMsg('Watch your step and stay on the platforms. Avoid getting hit by the beam cannons.' + base, true);
                break;
        }

        state.status = 3;
        state.doChecks = false;
        state.player.a_isAnimating = false;
        xId('layer-3d').classList.add('a_over');
    }

    update() {
        this.dist.textContent = Math.max(0, Math.round((state.plane.mapLength - state.tz) / 100)).toLocaleString();
        this.health.textContent = state.player.health;

        state.ts++;

        // reset state
        state.ix = 0;
        state.iz = 0;

        state.player.update();


        // 3.RestartMenu
        if (state.status !== 3)
            state.comms.update();

        if (state.tz > 7000) {
            state.attack = false;
            state.vfx = false;
            if (state.omega === null)
                state.omega = new Omega();
            state.omega.update();
        }

        state.plane.update();
        state.backdrop.update();

        state.objects.forEach(obj => obj.update());
    }

    render() {
        //this.stats.render();
    }

    startLoop() {
        state.isRunning = true;
        this.last = performance.now();
        window.requestAnimationFrame(this.frame.bind(this));
    }

    frame(timestamp) {
        if (!state.isRunning) return false;

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
            if (state.omega) {
                state.omega.reset();
                state.omega = null;
            }
            state.doChecks = true;
            state.vfx = true;

            xId('layer-3d').classList.remove('a_over');
            state.status = 2;

            state.comms.showMsg('Let\'s go');
        }

        //state.game.end(e.which - 51);
    }

    keyupEventHandler(e) {
        state.pressedKeys[e.which] = false;
    }
}

const game = new Game();

document.addEventListener('DOMContentLoaded', () => game.init());