import {addCl, addEl, rnd, xId} from '../utils/utils';
import {state} from "../game-state";

export class Backdrop {
    constructor() {
        this.x = 0;
        this.sc = 1;
        this.mesh = xId('b_base');
        this.twr = xId('b_tower');
        this.beam;

        this.renderBackdrop();
        this.renderTower();
    }

    renderBackdrop() {
        let ctx = xId('b_stars').getContext('2d');
        let w = state.vw;
        let h = 400;

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

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'lighten';

        let ctx2 = xId('b_lake').getContext('2d');
        ctx2.save();
        ctx2.scale(1, -1);
        ctx2.globalAlpha = 0.85;
        ctx2.drawImage(xId('b_stars'), 0, -260, 1200, 260);

        let fxCvs = document.createElement('canvas');
        fxCvs.width = 5;
        fxCvs.height = 50;
        let ctx3 = fxCvs.getContext('2d');
        for (let i = 0; i < 100; i++) {
            ctx3.fillStyle = `rgba(255,255,255,${rnd(2, 10) / 10})`;
            ctx3.fillRect(rnd(0, fxCvs.width), rnd(0, fxCvs.height), rnd(1, fxCvs.width/5), 2);
        }

        ctx2.restore();
        ctx2.fillStyle = '#fff';
        ctx2.globalAlpha = 0.5;
        ctx2.fillRect(0,0,1200,660);
        ctx2.globalCompositeOperation = 'soft-light';
        ctx2.globalAlpha = 0.75;
        ctx2.drawImage(fxCvs, 0, 0, 1200, 700);

        // star
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
        c.fillRect(6, 0, 2, 380);
        c.fillRect(-10, 0, 2, 200);
        c.fillRect(0, 0, 24, 100);
        c.fillRect(-20, 0, 32, 150);

        c.fillRect(-54, 0, 3, 320);
        c.fillRect(-62, 0, 18, 280);

        c.fillRect(-110, 0, 34, 170);
        c.fillRect(-40, 0, 44, 140);

        c.fillRect(-174, 0, 4, 100);
        c.fillRect(-124, 0, 2, 120);

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

        c.globalCompositeOperation = 'source-atop';
        c.globalAlpha = '0.8';
        c.fillStyle = '#fcffed';
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 50; j++) {
                c.fillRect(-200 + i * 15, j * 5, rnd(2,4), rnd(0,2));
            }
        }

        // flares
        addEl(this.twr, 'div', 'twr-flr');
        this.beam = addEl(this.twr, 'div', 'twr-beam');
    }

    update() {
        if (state.ts % 30 === 0) {
            this.beam.style.transform = `translateX(${rnd(0, 4)}px) scaleX(${rnd(10, 60) / 10})`;
        }

        this.x = this.x - state.ix / 20;
        this.sc = 1 + Math.round(state.tz*2) / 10000;
        this.twr.style.transform = `translateX(${this.x}px)`;
        this.mesh.style.transform = `translateY(${state.iy/2}px) scaleX(${this.sc}) scaleY(${this.sc})`;
    }
}