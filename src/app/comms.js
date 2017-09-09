import {xId} from "./utils/utils";
import {state} from "./game-state";

export class Comms {

    constructor() {
        this.el = xId('msgs');
        this.script = new Map([
            [0, 'I\'m lost...i\'ve spent 2 years searching this wasteland. I need to keep moving, the machines have finished the Infinity Beam. I need to stop them... before they turn it on.'],
            [100, 'The Arctic... it\'s unrecognizable now. How did it come to this? The machines... they were supposed to be our salvation.'],
            [300, 'The Infinity Beam has to be near, I need to find it... and shut it down.'],
            [500, 'The hangar doors are closed, there must be a switch here somewhere.'],
            [700, 'That did it. The bay doors are opening...'],
            [900, 'The Quantum Tower! It\'s active... I don\'t have much time.']
        ]);
        this.timer = 1;
        this.activeId = -1;
        this.activeEl = null;
    }

    update() {
        if (state.tz !== this.activeId) {
            let txt = this.script.get(state.tz);
            this.activeId = state.tz;

            if (txt !== undefined) {
                this.showMsg(txt);
            }
        }

        this.timer = (this.end) ? this.timer : Math.max(0, this.timer - 0.01);
        this.el.style.opacity = this.timer;
        if (this.timer === 0) {
            while (this.el.firstChild) {
                this.el.removeChild(this.el.firstChild);
            }

        }
    }

    showMsg(msg, error = false) {
        if (state.status === 3) return;

        let li = document.createElement('div');
        li.appendChild(document.createTextNode(msg));
        li.className = 'msg';
        if (error) li.classList.add('end');

        this.el.appendChild(li);
        setTimeout(() => li.style.transform = 'translateX(0px)', 10);

        if (this.activeEl) {
            this.activeEl.classList.add('c1');
            this.activeEl.style.transform = `translateY(-105%)`;
        }
        this.activeEl = li;

        if (this.el.children.length > 2) {
            this.el.removeChild(this.el.firstChild);
        }

        this.timer = 10;
        this.el.style.opacity = this.timer;
    }
}