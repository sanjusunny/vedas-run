import {xId} from "./utils/utils";
import {state} from "./game-state";

export class Comms {

    constructor() {
        this.el = xId('msgs');
        if (!state.text) this.el.style.display = 'none';
        this.script = new Map([
            [0, 'I\'m lost... I\'ve spent 2 years searching this wasteland. The machines have finished the Quantum Beam, I can see it pulsing in the distance. I need to stop them... before it\'s too late.'],
            [400, 'Hmm, that should be a short jump (Press SPACE while moving). I need to be careful not to slip off the platforms.'],
            [730, 'Hmm, that\'s a really long way away but I should be able to clear it (Press and hold SPACE while moving to long jump).'],
            [1000, 'I made it!!'],
            [2200, 'Beam cannons! Need to be careful here and avoid the pulses. I can only take 5 before my shields are down.'],
            [7500, 'Something\'s not right... What are they waiting for?']
        ]);
        this.timer = 1;
        this.activeId = -1;
        this.activeEl = null;
        this.activeText = '';
        this.index = 0;
        this.length = 0;
        this.pause = 0;
    }

    update() {
        if (state.tz !== this.activeId) {
            let txt = this.script.get(state.tz);
            this.activeId = state.tz;

            if (txt !== undefined) {
                this.showMsg(txt);
            }
        }

        if (this.index < this.length && this.pause === 0) {
            this.index++;
            this.activeEl.innerHTML = this.activeText.substr(0, this.index);
            if (this.activeText.substr(this.index, 2) === '. ' || this.activeText.substr(this.index, 2) === ', ') this.pause = 24; // pause at breaks for more realistic speech
        } else {
            this.pause = Math.max(0, this.pause - 1);
        }

        // keep it permanently on screen if the game is paused
        this.timer = (state.status === 3) ? this.timer : Math.max(0, this.timer - 0.01);
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
        if (error) {
            li.classList.add('end');
        }

        this.el.appendChild(li);

        li.style.height = (li.clientHeight - 24) + 'px';
        li.style.width = Math.min(300, li.clientWidth) + 'px';

        setTimeout(() => {
            li.style.transform = 'translateX(0px)';
            li.innerHTML = (error) ? msg : '';
            this.activeText = msg;
            this.index = 0;
            this.length = msg.length;
        }, 10);

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