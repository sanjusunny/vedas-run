import {xId} from "./utils/utils";
import {state} from "./game-state";

export class Comms {

    constructor() {
        this.el = xId('msgs');
        if(!state.text) this.el.style.display = 'none';
        this.script = new Map([
            [0, 'I\'m lost... I\'ve spent 2 years searching this wasteland. The machines have finished the Tachyon Beam. I need to stop them... before they turn it on.'],
            [100, 'The Arctic... it\'s unrecognizable now. How did it come to this? The machines... they were supposed to be our salvation.'],
            [300, 'The Tachyon Beam has to be near, I can feel the pulses. I need to find it... and shut it down.'],
            [500, 'The hangar doors are closed, there must be a switch here somewhere.'],
            [700, 'That did it. The bay doors are opening...'],
            [900, 'The Quantum Tower! It\'s active... I don\'t have much time.']
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

        if (state.ts%2 ===0 && this.index < this.length && this.pause === 0) {
            this.index++;
            this.activeEl.innerHTML = this.activeText.substr(0, this.index);
            if(this.activeText.substr(this.index, 2) === '. ' || this.activeText.substr(this.index, 2) === ', ') this.pause = 30; // pause at breaks for more realistic speech
        } else {
            this.pause = Math.max(0,this.pause-1);
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

        li.style.height = (li.clientHeight-24) + 'px';
        li.style.width = Math.min(300, li.clientWidth) + 'px';

        setTimeout(() => {
            li.style.transform = 'translateX(0px)';
            li.innerHTML = (error)?msg:'';
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