import {TextureManager} from "./texture-manager";

window.onerror = function (msg, url, lineNo, columnNo, error) {
    document.getElementById('app-container').style.border = 'solid 4px #ff4444';
    return false;
};

class Game {
    constructor() {
        this.initialized = false;
    }

    init() {
        if(!this.initialized) {
            this.initialized = true;

            addEventListener('keydown', this.keyHandler);

            this.render();
        }
    }

    render() {

        var layerBackdrop = document.getElementById('layer-backdrop');
        var layerGame = document.getElementById('layer-game');

        this.addObject(layerGame, TextureManager.createMountain(3), -200, 100, 512, 320, 0);

/*        this.addObject(layerGame, TextureManager.createCloud(1), -150, -100, 768, 768);
        this.addObject(layerGame, TextureManager.createCloud(), -190, -170);*/

        this.addTimedAnimation( this.addObject(layerGame, TextureManager.createCloud(), -450, -100, 1024, 512), 'thunder', 2);
        this.addTimedAnimation( this.addObject(layerGame, TextureManager.createCloud(1), -450, -100, 1024, 512), 'thunder', 4);

        this.addObject(layerGame, TextureManager.createCloud(), -50, 100, 1024, 256);
        this.addTimedAnimation( this.addObject(layerGame, TextureManager.createCloud(1), -50, 100, 1024, 256), 'thunder', 6);

        this.addObject(layerGame, TextureManager.createMountain(3), 100, 300, 400, 120, 0);
        this.addObject(layerGame, TextureManager.createMountain(1), 400, -300, 512, 740, -8);
        this.addObject(layerGame, TextureManager.createMountain(), 500, -150, 256, 600, 8);
        this.addObject(layerGame, TextureManager.createMountain(), 350, 16, 512, 400, 0);
        this.addObject(layerGame, TextureManager.createMountain(2), 460, 200, 100, 250, 8);

        this.addObject(layerGame, TextureManager.createCloud(), 250, -100, 1024, 256);
        this.addObject(layerGame, TextureManager.createCloud(1), 250, -50, 1024, 256);

        this.addObject(layerGame, TextureManager.createMountain(1), 80, 300, 256, 120, 0);
        this.addObject(layerGame, TextureManager.createMountain(), -50, 220, 256, 200, 0);
        this.addObject(layerGame, TextureManager.createMountain(1), 750, 290, 256, 128, 0);
        this.addObject(layerGame, TextureManager.createMountain(), 800, 200, 512, 256, 0);

        this.addTimedAnimation( this.addObject(layerGame, TextureManager.createCloud(), 450, 0, 1024, 256), 'thunder', 0);
        this.addObject(layerGame, TextureManager.createCloud(1), 450, 50, 1024, 256);

        this.addObject(layerGame, TextureManager.createCloud(), 200, -150, 1024, 512).classList.add('anm-fog', 'seq-2');
        this.addObject(layerGame, TextureManager.createCloud(1), 400, -150, 1024, 512).classList.add('anm-fog', 'seq-3');

        this.addObject(layerGame, TextureManager.createMountain(2), 960, 200, 200, 250, -24);
        this.addObject(layerGame, TextureManager.createMountain(2), 100, 270, 100, 150, 0);
        this.addObject(layerGame, TextureManager.createMountain(2), 60, 180, 100, 250, 0);

        this.addObject(layerGame, TextureManager.createMountain(3), 660, 200, 200, 250, -24);
        this.addObject(layerGame, TextureManager.createMountain(3), 560, 300, 200, 150, 4);

        this.addObject(layerGame, TextureManager.createRiver(), 0, 420, 1200);

        this.addObject(layerGame, TextureManager.createIcePlate(), 200, 394, 256, 128, 4);
        this.addObject(layerGame, TextureManager.createIcePlate(1), -340, 480, 600, 256, 2);
        this.addObject(layerGame, TextureManager.createIcePlate(), -140, 420, 512, 256, 9);
        this.addObject(layerGame, TextureManager.createIcePlate(1), -320, 520, 600);

        this.addObject(layerGame, TextureManager.createIcePlate(), 720, 394, 256, 128, 4);
        this.addObject(layerGame, TextureManager.createIcePlate(1), 720, 360, 600);
        this.addObject(layerGame, TextureManager.createIcePlate(), 900, 364, 512, 256, 3);
        this.addObject(layerGame, TextureManager.createIcePlate(), 860, 500, 512, 128);
        this.addObject(layerGame, TextureManager.createIcePlate(), 980, 500, 512, 256, -8);

        this.addObject(layerGame, TextureManager.createFog(), -100, 360, 1400, 128).classList.add('anm-fog', 'seq-1');
        this.addObject(layerGame, TextureManager.createFog(), -100, 320, 1400, 128).classList.add('anm-fog', 'seq-1');
        this.addObject(layerGame, TextureManager.createFog(), -100, 280, 1300, 300).classList.add('anm-fog', 'seq-2');
        this.addObject(layerGame, TextureManager.createFog(), -100, 200, 1300, 400).classList.add('anm-fog', 'seq-3');
        this.addObject(layerGame, TextureManager.createFog(), 400, 200, 800, 400).classList.add('anm-fog', 'seq-2');

        this.addObject(layerGame, TextureManager.createWaterLine(), 400, 500, 256, 16).classList.add('anm-waterline', 'seq-1');
        this.addObject(layerGame, TextureManager.createWaterLine(), 500, 480, 256, 16).classList.add('anm-waterline', 'seq-2');
        this.addObject(layerGame, TextureManager.createWaterLine(), 500, 600, 512, 32).classList.add('anm-waterline', 'seq-3');
        this.addObject(layerGame, TextureManager.createWaterLine(), 300, 540, 300, 16).classList.add('anm-waterline', 'seq-2');
        this.addObject(layerGame, TextureManager.createWaterLine(), 400, 550, 300, 24).classList.add('anm-waterline', 'seq-3');
    }

    addObject(parent, texture, x, y, width, height, rotate) {
        var img = document.createElement('img');
        img.src = texture;
        if(width) img.width = width;
        if(height) img.height = height;
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        if(rotate) img.style.transform = 'rotate(' + rotate + 'deg)';
        parent.appendChild(img);
        return img;
    }

    keyHandler(e) {
        if(e.which === 49) {
            document.getElementById('layer-backdrop-image').classList.toggle('hide');
        }
    }

    addTimedAnimation(element, className, delay) {
        setTimeout(() => element.classList.add(className), delay*1000);
    }
}

const game = new Game();
game.init();

document.addEventListener('DOMContentLoaded', () => game.init());