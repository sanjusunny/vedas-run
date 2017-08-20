import {xId} from "../utils";

export class Player {

    constructor(state) {
        this.width = 50;
        this.height = 50;
        this.jumpMax = 20;
        this.isFalling = false;
        this.x = state.vw / 2 - this.width / 2;
        this.y = state.vh - this.height * 2;
        this.h = 0;

        this.mesh = xId('xPlayer');
        this.mesh.style.cssText = `top: ${this.y}px; left: ${this.x}px; width: ${this.width}px; height: ${this.height}px;`;

        this.render(state);
    }

    update(state) {

        var oldX = this.y;

        if (state.pressedKeys['37']) {
            this.x = (this.x - 1) % state.vw;
            this.mesh.style.left = this.x + 'px';

        } else if (state.pressedKeys['39']) {
            this.x = (this.x + 1) % state.vw;
            this.mesh.style.left = this.x + 'px';
        }

        if (state.pressedKeys['38']) {
            this.y = (this.y - 1) % state.vh;
            this.mesh.style.top = this.y + 'px';
        } else if (state.pressedKeys['40']) {
            this.y = (this.y + 1) % state.vh;
            this.mesh.style.top = this.y + 'px';
        }

        if (state.pressedKeys['32'] && !this.isFalling) {
            this.h = Math.clamp(this.h + 1, 0, this.jumpMax);
            this.mesh.style.transform = `translateZ(${this.h}px)`;
            this.isFalling = (this.h === this.jumpMax);
        } else {
            this.h = Math.clamp(this.h - 1, 0, this.jumpMax);
            this.mesh.style.transform = `translateZ(${this.h}px)`;
            this.isFalling = !(this.h === 0);
        }

        state.iy = this.y - oldX;
    }

    render(state) {
    }

}