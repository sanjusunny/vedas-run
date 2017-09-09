import {addEl, rnd, segmentToPlane, xId} from "../utils/utils";
import {state} from "../game-state";

let id = 0;

export class Turret {
    constructor(parent, x, y) {
        let pos = segmentToPlane(x,y);
        this.prevTz = state.iz;
        this.x = pos[0]; // missile x
        this.y = pos[1];
        this.bx = pos[0]; // turret x
        this.by = pos[1];
        this.xInc = 0; // missile increment
        this.yInc = 0;
        this.tX = 0; // missile target
        this.tY = 660;
        this.el = addEl(parent, 'div', 'turret', id, 8, 600, x, y);
        this.elHead = addEl(this.el, 'div', 'turret-head', id, 20, 20, -5, 10);

        this.missile = addEl(xId('game-plane'), 'div', 'missile', id, 8, 8, this.x, this.y);
        this.pos = 500;
        this.busy = 0;
        this.missileActive = 0;
        this.parent = parent;
        id++;

        this.isActive = true;
    }

    destroy() {
        console.warn('destroy');
        this.isActive = false;
        this.el.remove();
        this.elHead.remove();
        this.missile.remove();
    }

    update() {

        if (this.busy === 0 && state.ts % 60 === 0 && Math.toggle()) {
            this.pos = rnd(400, 580);
            this.elHead.style.transform = `translateY(${this.pos}px)`;
            this.busy = 120;
        } else if (this.busy > 0) {
            this.busy = Math.max(0, this.busy - 1);
            if (this.busy === 0 && this.missileActive === 0 && Math.toggle()) {
                this.addMissile();
                this.busy = 120;
            }
        }

        if (this.missileActive > 0) {
            this.y += (this.yInc+state.iz);
            this.missile.style.top = this.y + 'px';
            this.x += (this.xInc-state.ix);
            this.missile.style.left = this.x + 'px';
            this.missileActive = Math.max(0, this.missileActive - 1);
            if (this.missileActive === 0) {
                this.missile.style.display = 'none';
            }
        }
    }

    addMissile() {
        this.missile.style.display = 'block';
        this.missileActive = 100;
        this.x = this.bx;
        this.y = this.by + (state.tz - this.prevTz);
        this.tX = 600;
        this.tY = 660;
        this.xInc = (this.tX - this.x) / this.missileActive;
        this.yInc = (this.tY - this.y) / this.missileActive;
    }
}
