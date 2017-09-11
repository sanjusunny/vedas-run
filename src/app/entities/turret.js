import {addEl, rnd, segmentToPlane, xId} from "../utils/utils";
import {state} from "../game-state";

let id = 0;

export class Turret {
    constructor(parent, segNum, x, y) {
        this.segNum = segNum;
        let pos = segmentToPlane(x, y, segNum);
        this.prevTz = state.iz;
        this.x = pos[0]; // missile x
        this.y = pos[1];
        this.bx = x;//pos[0]; // turret x
        this.by = y;//pos[1];
        this.xInc = 0; // missile increment
        this.yInc = 0;
        this.tX = 0; // missile target
        this.tY = 660;
        this.absX = 0; // missile target in segment coordinates
        this.el = addEl(parent, 'div', 'turret', id, 8, 900, x, y);
        this.elHead = addEl(this.el, 'div', 'turret-head', id, 20, 20, -5, 10);

        this.missile = addEl(xId('game-plane'), 'div', 'missile', id, 6, 3, this.x, this.y);
        this.pos = 500;
        this.busy = 0;
        this.missileActive = 0;
        this.coasting = false;
        this.parent = parent;
        id++;

        this.isActive = true;
    }

    destroy() {
        this.isActive = false;
        this.el.remove();
        this.elHead.remove();
        this.missile.remove();
    }

    update() {

        if (this.busy === 0 && state.ts % 60 === 0 && Math.toggle()) {
            this.pos = 400;
            this.busy = 200;
        } else if (this.busy > 0) {
            this.busy = Math.max(0, this.busy - 1);
            if (this.busy === 0 && this.missileActive === 0 && Math.toggle()) {
                if (state.attack) {
                    this.addMissile();
                    this.elHead.classList.add('fire');
                }
                setTimeout(() => {
                    this.pos = rnd(300, 800);
                    this.elHead.classList.remove('fire');
                }, 500);
                this.busy = 200;
            }
        }

        this.elHead.style.transform = `translateY(${this.pos}px)`;

        if (this.missileActive > 0) {
            this.y += (this.yInc + state.iz);
            this.missile.style.top = this.y + 'px';
            this.x += (this.xInc - state.ix);
            this.missile.style.left = this.x + 'px';

            this.missileActive = Math.max(0, this.missileActive - 1);
            if (!this.coasting && this.missileActive === 0) {
                if (state.player.checkHit(this.absX)) {
                    this.missile.style.display = 'none';
                } else {
                    this.coasting = true;
                    this.missileActive = 5;
                }
            } else if (this.coasting && this.missileActive === 0) {
                this.coasting = false;
                this.missile.style.display = 'none';
            }
        }
    }

    addMissile() {
        this.missileActive = 100;

        let pos = segmentToPlane(this.bx, this.by, this.segNum);
        this.x = this.bx - state.tx;
        this.y = pos[1];

        this.tX = 600;
        this.tY = 660;
        this.absX = this.tX - state.tx;
        this.xInc = (this.tX - this.x) / this.missileActive;
        this.yInc = (this.tY - this.y) / this.missileActive;

        // only fire it if its a certain distance away
        if ((this.tY - this.y) > 100)
            this.missile.style.display = 'block';
    }
}
