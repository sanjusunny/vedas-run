import {addEl, rnd} from "../utils/utils";
import {state} from "../game-state";

let id = 0;

export class Turret {
    constructor(parent, x, y) {
        this.el = addEl(parent, 'div', 'turret', id, 8, 600, x, y);
        this.elHead = addEl(this.el, 'div', 'turret-head', id, 20, 20, -5, 10);
        this.pos = 500;
        id++;
    }

    update() {
        if (state.ts % 60 === 0 && Math.toggle()) {
            this.pos = rnd(400,580);
            this.elHead.style.transform = `translateY(${this.pos}px)`;
        }
    }
}