import {xId} from "./utils/utils";
import {state} from "./game-state";

export class Comms {

    constructor() {
        this.el = xId('msgs');
        this.script = new Map([
            [0, 'The Dark Chamber. I\'ve finally found it.'],
            [100, 'I need to open the hangar doors, there must be a switch here somewhere.'],
            [200, 'I see something...'],
            [300, 'What is this place? I\'m lost.'],
            [400, 'I see something...']
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
                let li = document.createElement('div');
                li.appendChild(document.createTextNode(txt));
                li.className = 'msg';
                this.el.appendChild(li);
                setTimeout(() => li.style.transform = 'translateX(0px)', 10)
                if (this.activeEl) {
                    this.activeEl.classList.add('c1');
                    this.activeEl.style.transform = `translateY(-105%)`;
                }
                this.activeEl = li;

                if (this.el.children.length > 2) {
                    this.el.removeChild(this.el.firstChild);
                }

                this.timer = 5;
                this.el.style.opacity = this.timer;
            }
        }

        this.timer = Math.max(0, this.timer - 0.01);
        this.el.style.opacity = this.timer;
        if (this.timer === 0) {
            while (this.el.firstChild) {
                this.el.removeChild(this.el.firstChild);
            }

        }
    }
}