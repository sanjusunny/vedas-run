import {rnd, xId} from '../utils';

export class Plane {
    constructor(state) {
        this.x = 0;
        this.mesh = xId('game-plane');
        this.render(state);
    }

    update(state) {
        this.x = this.x - state.ix;
        this.mesh.style.left = this.x + 'px';
    }

    render(state) {
    }
}