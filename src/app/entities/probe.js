import {rnd} from "../utils";

export class Probe {
    constructor(state) {
        this.width = 50;
        this.height = 50;
        this.x = rnd(0, state.vw);
        this.y = 0;

        this.mesh = document.createElement('div');
        this.mesh.className = 'xProbe';
        this.mesh.style.cssText = `top: ${this.y}px; left: ${this.x}px; width: ${this.width}px; height: ${this.height}px;`;

        state.plane.appendChild(this.mesh);

        this.render(state);
    }

    update(state) {
        this.y = Math.pong(this.y + 4, 0, state.vh); //-state.iy;
        this.mesh.style.top = this.y + 'px';

        this.x = Math.clamp( this.x + 4 * Math.toggle(), 0, state.vw );
        this.mesh.style.left = this.x + 'px';
    }

    render(state) {
    }
}