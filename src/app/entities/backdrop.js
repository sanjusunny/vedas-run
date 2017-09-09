import {addEl, rnd, xId, xPath} from '../utils/utils';
import {state} from "../game-state";
import {Ship} from "./ship";

export class Backdrop {
    constructor() {
        this.x = 0;
        this.sc = 1;
        this.mesh = xId('b_base');
        this.twr = xId('b_tower');
        this.beam;

        this.renderBackdrop();
        this.renderTower();
        this.renderCliffs();
        addEl(this.mesh, 'div', 'fog', 0, 1200, 150, 0, 352);
        this.ships = (state.vfx) ? [new Ship(this.mesh, 0), new Ship(this.mesh, 1), new Ship(this.mesh, 2), new Ship(this.mesh, 3)] : [];
    }

    renderCliffs() {
        let c = addEl(this.mesh, 'canvas', 'cliff', 0, 600, 500).getContext('2d');
        xPath(c, 400, 20, 45, '#359bc7', '#9ee9f4', [
            [0, 8, 0],
            [2, 9, 1],
            [5, 8, 0],
            [6, 8, 2],
            [9, 7, 0],
            [9, 6, 1],
            [11, 5, 1],
            [11, 4, 0],
            [13, 5, 2],
            [17, 3, 2],
            [17, 2, 1],
            [20, 1.5, 0]
        ]);
        c = addEl(this.mesh, 'canvas', 'cliff', 1, 600, 500).getContext('2d');
        xPath(c, 400, 20, 40, '#359bc7', '#9ee9f4', [
            [0, 2, 1],
            [2, 3, 0],
            [2, 4, 0],
            [3, 5, 2],
            [4, 4, 0],
            [6, 7, 1],
            [9, 7, 2],
            [9, 8, 2],
            [11, 9, 0],
            [13, 9, 0],
            [13, 9, 1],
            [20, 10, 0]
        ]);
    }

    renderBackdrop() {
        let ctx = xId('b_stars').getContext('2d');
        let w = state.vw;
        let h = 660;

        let g = ctx.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, '#19587B');
        g.addColorStop(1, '#7BCEF0');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = 'overlay';

        g = ctx.createRadialGradient(w / 2, h, h / 2, w / 2, h / 1.5, h);
        g.addColorStop(0.0, '#fff');
        g.addColorStop(0.4, '#7BCEF0');
        g.addColorStop(1.0, 'rgba(25,88,123,0.5)');
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#41c2e5';
        ctx.globalAlpha = 0.2;
        ctx.fillRect(0, 380, w, 40);

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'lighten';

        // lake
        let ctx2 = xId('b_lake').getContext('2d');
        ctx2.save();
        ctx2.scale(1, -1);
        ctx2.globalAlpha = 0.85;
        ctx2.drawImage(xId('b_stars'), 0, -260, 1200, 460);

        // wavy texture
        let fxCvs = document.createElement('canvas');
        fxCvs.width = 5;
        fxCvs.height = 50;
        let ctx3 = fxCvs.getContext('2d');
        for (let i = 0; i < 100; i++) {
            ctx3.fillStyle = `rgba(0,0,0,${rnd(2, 10) / 10})`;
            ctx3.fillRect(rnd(1, fxCvs.width), rnd(1, fxCvs.height), rnd(1, fxCvs.width / 5), 1);
        }

        ctx2.restore();
        ctx2.fillStyle = '#124F7B';
        ctx2.globalAlpha = 0.8;
        //ctx2.fillRect(0, 0, 1200, 260);
        ctx2.globalCompositeOperation = 'screen';
        ctx2.globalAlpha = 1;
        ctx2.drawImage(fxCvs, 0, 0, 1200, 700);

        // stars
        for (let i = 0; i < 100; i++) {
            ctx.beginPath();
            ctx.arc(rnd(10, w), rnd(10, h * 0.8), rnd(0, 20) / 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = `rgba(255,255,255,${rnd(2, 10) / 10})`;
            ctx.fill();
        }
    }

    renderTower() {

        let c = addEl(this.twr, 'canvas', 'twr-cvs', 0, 600, 600).getContext('2d');
        c.fillStyle = '#2C99C9';
        c.globalAlpha = '0.6';
        c.globalCompositeOperation = 'screen';
        c.translate(200, 400);
        c.scale(1, -1);
        c.fillRect(6, 0, 2, 280);
        c.fillRect(-10, 0, 2, 200);
        c.fillRect(0, 0, 24, 100);
        c.fillRect(-20, 0, 32, 150);

        c.fillRect(-54, 0, 3, 320);
        c.fillRect(-62, 0, 18, 280);

        c.fillRect(-110, 0, 34, 170);
        c.fillRect(-40, 0, 44, 140);

        c.fillRect(-174, 0, 4, 100);
        c.fillRect(-124, 0, 2, 120);

        // beam
        c.globalCompositeOperation = 'screen';
        c.globalAlpha = '0.2';
        c.fillStyle = '#94EBF2';
        c.fillRect(-14, 0, 28, 400);
        c.globalAlpha = '1';
        c.fillStyle = '#fff';
        c.fillRect(-2, 0, 4, 400);

        c.globalCompositeOperation = 'overlay';
        c.globalAlpha = '0.2';
        c.fillStyle = '#2C99C9';

        // habitation domes
        c.lineWidth = 18;
        c.strokeStyle = '#2C99C9';
        c.beginPath();
        c.arc(-40, 80, 120, 2 * Math.PI, 2.2 * Math.PI, true);
        c.stroke();
        c.beginPath();
        c.arc(-20, 40, 90, 0, 2 * Math.PI, false);
        c.arc(-140, 40, 50, 0, 2 * Math.PI, false);
        c.fill();
        c.fillRect(-100, 0, 150, 60);
        c.fillRect(-60, 0, 70, 80);

        // building lights
        c.globalCompositeOperation = 'source-atop';
        c.globalAlpha = '0.8';
        c.fillStyle = '#fcffed';
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 50; j++) {
                c.fillRect(-200 + i * 15, j * 5, rnd(2, 4), rnd(0, 2));
            }
        }

        // beam
        this.beam = addEl(this.twr, 'div', 'twr-beam');
    }

    update() {
        if (state.ts % 5 === 0) {
            this.beam.style.backgroundColor = (Math.toggle()) ? 'white' : '#ffcee9';
            this.beam.style.transform = `translateX(${rnd(0, 8)}px) scaleX(${rnd(10, 60) / 10})`;
        }

        if (state.tz >= 700) {
            this.x = this.x - state.ix / 40;
            this.sc = 1 + (state.tz - 700) * 2 / 10000;
            this.twr.style.transform = `translateX(${this.x}px)`;
            this.mesh.style.transform = `translateY(${state.iy / 2}px) scaleX(${this.sc}) scaleY(${this.sc})`;
        }

        this.ships.forEach((ship) => ship.update());
    }

    reset() {
        this.x = 0;
        this.sc = 1;
        this.twr.style.transform = `translateX(${this.x}px)`;
        this.mesh.style.transform = `translateY(${state.iy / 2}px) scaleX(${this.sc}) scaleY(${this.sc})`;
    }
}