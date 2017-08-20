import {rnd, xId} from "../utils";

export class Probe {
    constructor(state) {
        this.width = 50;
        this.height = 50;
        this.x = rnd(0, state.vw);
        this.y = 0;

        this.mesh = document.querySelector("#templates > .xProbe:first-of-type").cloneNode(true);
        this.mesh.style.cssText = `top: ${this.y}px; left: ${this.x}px; width: ${this.width}px; height: ${this.height}px;`;
        this.mesh = state.plane.insertBefore(this.mesh, state.player.mesh);
        this.mesh.querySelector(".s1").style.animationDelay = `${rnd(0,4)}s`;

        this.render(state);
    }

    update(state) {
        this.y = Math.pong(this.y + 1, 0, state.vh); //-state.iy;
        this.mesh.style.top = this.y + 'px';

        this.x = Math.clamp( this.x + 0 * Math.toggle(), 0, state.vw );
        this.mesh.style.left = this.x + 'px';
    }

    render(state) {
    }
}