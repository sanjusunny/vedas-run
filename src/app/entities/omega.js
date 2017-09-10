import {state} from "../game-state";
import {addEl, rnd, xId} from "../utils/utils";

export class Omega {
    constructor() {

        this.root = addEl(xId('game-plane'), 'div', 'omega-root', 0, 300, 180, 400, 300);
        this.el = addEl(this.root, 'div', 'omega', 0, 300, 200, 0, 0);
        addEl(this.el, 'div', 'omega-tile', 1, 40, 10, -1 * 42, 200 - 3 * 12);
        addEl(this.el, 'div', 'omega-tile', 1, 40, 10, 10 * 42, 200 - 3 * 12);

        this.map = new Map([
            ['0,3', 0],
            ['0,4', 0],
            ['0,5', 0],
            ['0,6', 0],

            ['1,4', 0],
            ['1,5', 0],

            ['4,0', 1],
            ['4,1', 1],
            ['5,1', 1],
            ['5,2', 1],
            ['6,2', 1],
            ['6,3', 1],

            ['4,9', 1],
            ['4,8', 1],
            ['5,8', 1],
            ['5,7', 1],
            ['6,7', 1],
            ['6,6', 1],

            ['10,0', 0],
            ['10,9', 0],

            ['11,0', 0],
            ['11,9', 0],

            ['13,3', 2],
            ['13,4', 2],
            ['12,4', 2],
            ['12,5', 2],
            ['13,5', 2],
            ['13,6', 2]
        ]);

        this.els = [];
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                let val = this.map.get(i + ',' + j);
                if(i>8 && (j==0||j===9)) val = 0;
                let x = addEl(this.el, 'div',
                    (val > 0) ? 'omega-x' : 'omega-tile',
                    1, 40, 11, j * 42, 200 - i * 12);
                if(val === 0)
                    x.style.opacity = 0;
                else
                    x.style.opacity = rnd(9, 10) / 10;
                this.els.push(x);
            }
        }
        this.update();
    }

    reset() {

    }

    update() {
        if (state.ts % 64 === 0) {
            let wink = Math.toggle();
            let index = 0;
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 10; j++) {
                    let val = this.map.get(i + ',' + j);
                    if (val === 1 && wink) {
                        let el = this.els[index];
                        el.classList.add('closed');
                        setTimeout(() => el.classList.remove('closed'), 250);
                    } else {
                        if(Math.toggle()) this.els[index].style.transform = `translateZ(${rnd(0,8)-16}px)`;
                    }
                    index++;
                }
            }
        }

        if(state.ts%1000 && Math.toggle()) {
            //this.root.style.transform = 'translateX(400px)';
        }
    }
}