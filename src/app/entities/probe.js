import {rnd, xId} from "../utils";

export class Probe {
    constructor(state) {
        this.width = 50;
        this.height = 50;
        this.x = rnd(0, state.vw);
        this.y = 500;

        this.mesh = document.querySelector("#templates > .xProbe:first-of-type").cloneNode(true);
        this.mesh.style.cssText = `top: ${this.y}px; left: ${this.x}px; width: ${this.width}px; height: ${this.height}px;`;
        this.mesh = state.plane.insertBefore(this.mesh, state.player.mesh);
        /*if(Math.toggle()>0) this.mesh.classList.add('active');
        if(Math.toggle()>0) this.mesh.classList.add('alert');*/

        this.render(state);
    }

    update(state) {
        this.y = Math.pong(this.y - state.iy, 0, state.vh); //-state.iy;
        this.mesh.style.top = this.y + 'px';

        this.x = Math.clamp(this.x + 0 * Math.toggle(), 0, state.vw);
        this.mesh.style.left = this.x + 'px';

        if (Math.within(this.x, state.player.x, 100) && Math.within(this.y, state.player.y, 100)) {
            this.mesh.classList.add('alert');
        } else {
            this.mesh.classList.remove('alert');
        }

        if (Math.within(this.x, state.player.x, 50) && Math.within(this.y, state.player.y, 50)) {
            this.mesh.classList.add('active');
        } else {
            this.mesh.classList.remove('active');
        }
    }

    render(state) {
    }
}