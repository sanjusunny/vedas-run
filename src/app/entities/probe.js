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

    update() {
        /*        this.x += 1;
                if (this.x > 1200) this.x = 0;
                this.mesh.style.left = this.x + 'px';*/
    }

    render(state) {
    }
}