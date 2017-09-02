import {rnd, xId} from '../utils/utils';

export class Backdrop {
    constructor(state) {
        this.x = 0;
        this.y = 0;
        this.z = 1;

        this.mesh = xId('layer-game');

        this.render(state);
    }

    update(state) {
        this.x = this.x - state.ix/4;
        this.mesh.style.left = Math.round(this.x) + 'px';
        this.y = this.y + state.iy/50;
        this.mesh.style.top = this.y + 'px';
        this.z = this.z - state.iy/10000;
        this.mesh.style.transform = `scaleX(${this.z}) scaleY(${this.z})`;
    }

    render(state) {
    }
}