import {addEl, rnd} from "../utils/utils";
import {state} from "../game-state";

export class Ship {
    constructor(parent, id) {
        this.isFlying = false;
        this.trigger = rnd(2, 20);
        this.el = addEl(parent, 'div', 'ship', id);
        this.reset();
    }

    reset() {
        this.trigger = rnd(2, 20);
        this.el.style.transition = 'none';
        this.isFlying = false;
        this.el.style.opacity = 1;
        this.el.style.transform = `rotate(${-this.trigger * 2}deg) translateX(${-600 + this.trigger * 140}px) translateY(${-20 - this.trigger * 10}px) scaleX(3) scaleX(3)`;
    }

    update() {
        if (!this.isFlying && state.ts % (50 + this.trigger) === 0) {
            this.el.style.transition = `all ${3 + this.trigger / 3}s ease`;
            this.el.style.opacity = 0;
            this.el.style.transform = 'rotate(10deg) translateX(700px) translateY(180px) scaleX(1) scaleX(1)';
            this.isFlying = true;
            setTimeout(() => this.reset(), 7000);
        }
    }
}