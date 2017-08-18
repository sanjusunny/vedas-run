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

        this.addObject(layerGame, TextureManager.createCloud(), -350, -70, 768, 600);
        this.addObject(layerGame, TextureManager.createCloud(1), 0, -150);
        this.addObject(layerGame, TextureManager.createCloud(), -190, -170);
        this.addObject(layerGame, TextureManager.createCloud(), 0, -50, 1024);
        this.addObject(layerGame, TextureManager.createCloud(1), 450, -150);
        this.addObject(layerGame, TextureManager.createCloud(), 650, -100, 1024, 768);
        this.addObject(layerGame, TextureManager.createCloud(1), 750, -150);
        this.addObject(layerGame, TextureManager.createCloud(), 700, 20);

        this.addObject(layerGame, TextureManager.createRiver(), 0, 420, 1200);

        this.addObject(layerGame, TextureManager.createIcePlate(), 200, 394, 256, 128, 4);
        this.addObject(layerGame, TextureManager.createIcePlate(1), -340, 480, 600, 256, 2);
        this.addObject(layerGame, TextureManager.createIcePlate(), -140, 420, 512, 256, 9);
        this.addObject(layerGame, TextureManager.createIcePlate(1), -320, 520, 600);

        /*this.addObject(layerGame, TextureManager.createIcePlate(), -200, 500, 512, 128);
        this.addObject(layerGame, TextureManager.createIcePlate(), -300, 500, 512, 256, -8);*/

        this.addObject(layerGame, TextureManager.createIcePlate(), 720, 394, 256, 128, 4);
        this.addObject(layerGame, TextureManager.createIcePlate(1), 720, 360, 600);
        this.addObject(layerGame, TextureManager.createIcePlate(), 900, 364, 512, 256, 3);
        this.addObject(layerGame, TextureManager.createIcePlate(), 860, 500, 512, 128);
        this.addObject(layerGame, TextureManager.createIcePlate(), 980, 500, 512, 256, -8);

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
    }

    keyHandler(e) {
        if(e.which === 49) {
            document.getElementById('layer-backdrop-image').classList.toggle('hide');
        }
    }
}

const game = new Game();
game.init();

document.addEventListener('DOMContentLoaded', () => game.init());