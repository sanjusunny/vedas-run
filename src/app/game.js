import {xId} from './utils';
import {TextureManager} from './texture-manager';
import {UI} from './ui'
import {state} from './game-state';
import {Player} from "./entities/player";
import {Probe} from "./entities/probe";

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
    }

    init() {
        if (!this.initialized) {
            this.initialized = true;

            addEventListener('keydown', this.keydownEventHandler);
            addEventListener('keyup', this.keyupEventHandler);

            state.plane = xId('game-plane');
            state.player = new Player(state);
            /*for (var i = 0; i < 10; i++) {
                state.probes.push(new Probe(state));
            }*/

            this.startLoop();
            //this.preRender();
        }
    }

    startLoop() {
        state.isRunning = true;
        this.last = performance.now();
        window.requestAnimationFrame(this.frame.bind(this));
    }

    frame() {
        if(!state.isRunning) return false;

        this.rAF = window.requestAnimationFrame(this.frame.bind(this));

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

        this.render();
    }

    update() {
        state.player.update(state);
        for (var i = 0; i < state.probes.length; i++) {
            state.probes[i].update(state);
        }
    }

    render() {

    }

    preRender() {

        var layerPlayer = xId('layer-player');
        var layerGame = xId('layer-game');

        UI.init();

        /*this.addTimedAnimation(this.addObject(layerGame, TextureManager.createCloud(1), -50, 100, 1024, 256), 'thunder', 6);
        this.addObject(layerGame, TextureManager.createCastle(), 150, 150, 256, 256);
        this.addObject(layerGame, TextureManager.createCastle(), 270, 220, 100, 160);
        this.addObject(layerGame, TextureManager.createMountain(3), -200, 100, 512, 320, 0);

        this.addTimedAnimation(this.addObject(layerGame, TextureManager.createCloud(), -450, -100, 1024, 512), 'thunder', 2);
        this.addTimedAnimation(this.addObject(layerGame, TextureManager.createCloud(1), -450, -100, 1024, 512), 'thunder', 4);
        this.addObject(layerGame, TextureManager.createCloud(), -50, 100, 1024, 256);
        this.addTimedAnimation(this.addObject(layerGame, TextureManager.createCloud(), 450, 0, 1024, 256), 'thunder', 0);


        this.addObject(layerGame, TextureManager.createMountain(3), 100, 300, 400, 120, 0);
        this.addObject(layerGame, TextureManager.createMountain(1), 400, -300, 512, 740, -8);
        this.addObject(layerGame, TextureManager.createMountain(), 600, -300, 512, 740, 16);
        this.addObject(layerGame, TextureManager.createMountain(), 500, -150, 256, 600, 8);
        this.addObject(layerGame, TextureManager.createMountain(2), 450, 200, 100, 250, 20);
        this.addObject(layerGame, TextureManager.createMountain(2), 520, 140, 100, 320, 8);
        this.addObject(layerGame, TextureManager.createMountain(), 350, 16, 512, 400, 0);

        this.addObject(layerGame, TextureManager.createCloud(), 250, -100, 1024, 256);
        this.addObject(layerGame, TextureManager.createCloud(1), 250, -50, 1024, 256);

        this.addObject(layerGame, TextureManager.createMountain(1), 80, 300, 256, 120, 0);
        this.addObject(layerGame, TextureManager.createMountain(), -50, 220, 256, 200, 0);
        this.addObject(layerGame, TextureManager.createMountain(1), 750, 290, 256, 128, 0);
        this.addObject(layerGame, TextureManager.createMountain(), 800, 200, 512, 256, 0);

        this.addObject(layerGame, TextureManager.createCloud(1), 450, 50, 1024, 256);

        this.addObject(layerGame, TextureManager.createCloud(), 200, -150, 1024, 512).classList.add('anm-fog', 'seq-2');
        this.addObject(layerGame, TextureManager.createCloud(1), 400, -150, 1024, 512).classList.add('anm-fog', 'seq-3');

        this.addObject(layerGame, TextureManager.createMountain(3), 660, 200, 200, 250, -24);
        this.addObject(layerGame, TextureManager.createMountain(3), 560, 300, 200, 150, 4);

        this.addObject(layerGame, TextureManager.createRiver(), 0, 420, 1200);

        // ice plates
        this.addObject(layerGame, TextureManager.createIcePlate(), 480, 410, 256, 32, 1);
        this.addObject(layerGame, TextureManager.createIcePlate(), 200, 410, 256, 64, 1);
        this.addObject(layerGame, TextureManager.createIcePlate(1), -240, 320, 600);
        this.addObject(layerGame, TextureManager.createIcePlate(1), -380, 480, 500, 256, 2);
        this.addObject(layerGame, TextureManager.createIcePlate(), -290, 420, 512, 256, 9);

        this.addObject(layerGame, TextureManager.createIcePlate(), 780, 410, 256, 32, -1);
        this.addObject(layerGame, TextureManager.createIcePlate(1), 840, 340, 512, 256);
        this.addObject(layerGame, TextureManager.createIcePlate(), 920, 364, 512, 256, 3);
        this.addObject(layerGame, TextureManager.createIcePlate(), 940, 500, 512, 128, 20);

        // spikes
        this.addObject(layerGame, TextureManager.createMountain(2), 60, 380, 60, 40, 0);
        this.addObject(layerGame, TextureManager.createMountain(2), 120, 360, 50, 60, 0);

        this.addObject(layerGame, TextureManager.createMountain(2), 860, 380, 60, 40, 0);
        this.addObject(layerGame, TextureManager.createMountain(2), 1156, 380, 60, 40, -8);
        this.addObject(layerGame, TextureManager.createMountain(2), 1080, 392, 40, 20, -8);

        // fog
        this.addObject(layerGame, TextureManager.createFog(), -100, 360, 1400, 128).classList.add('anm-fog', 'seq-1');
        this.addObject(layerGame, TextureManager.createFog(), -100, 320, 1400, 128).classList.add('anm-fog', 'seq-1');
        this.addObject(layerGame, TextureManager.createFog(), -100, 280, 1300, 300).classList.add('anm-fog', 'seq-2');
        this.addObject(layerGame, TextureManager.createFog(), -100, 200, 1300, 400).classList.add('anm-fog', 'seq-3');
        this.addObject(layerGame, TextureManager.createFog(), 400, 200, 800, 400).classList.add('anm-fog', 'seq-2');

        // waves
        this.addTimedAnimation(this.addObject(layerGame, TextureManager.createWaterLine(), 400, 500, 256, 16), 'shimmer', 0);
        this.addTimedAnimation(this.addObject(layerGame, TextureManager.createWaterLine(), 500, 480, 256, 16), 'shimmer', 1);
        this.addTimedAnimation(this.addObject(layerGame, TextureManager.createWaterLine(), 500, 600, 512, 32), 'shimmer', 2);
        this.addTimedAnimation(this.addObject(layerGame, TextureManager.createWaterLine(), 300, 540, 300, 16), 'shimmer', 3);
        this.addTimedAnimation(this.addObject(layerGame, TextureManager.createWaterLine(), 400, 550, 300, 24), 'shimmer', 4);

        this.addObject(layerPlayer, TextureManager.createPlayer(), 500, 404);*/

        for (var i = 0; i < 10; i++) {
            var el = document.createElement('div');
            el.classList.add('nmy');
            el.style.top = i * 20 + 'px';
            el.style.left = i * 100 + 'px'
            el.style.animationDelay = i / 2 + 's';
            xId('game-plane').appendChild(el);
        }
    }

    addObject(parent, texture, x, y, width, height, rotate) {
        var img = document.createElement('img');
        img.crossOrigin = 'anonymous';
        img.src = texture;
        if (width) img.width = width;
        if (height) img.height = height;
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        if (rotate) img.style.transform = 'rotate(' + rotate + 'deg)';
        parent.appendChild(img);
        return img;
    }

    keydownEventHandler(e) {
        state.pressedKeys[e.which.toString()] = true;
        if (e.which === 49) {
            document.getElementById('layer-backdrop-image').classList.toggle('hide');
        }
    }

    keyupEventHandler(e) {
        state.pressedKeys[e.which.toString()] = false;
    }

    addTimedAnimation(element, className, delay) {
        setTimeout(() => element.classList.add(className), delay * 1000);
    }
}

const game = new Game();

document.addEventListener('DOMContentLoaded', () => game.init());