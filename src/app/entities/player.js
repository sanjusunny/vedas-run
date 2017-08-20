export class Player {

    constructor(state) {
        this.width = 150;
        this.height = 100;
        this.x = state.vw / 2 - this.width / 2;
        this.y = state.vh - this.height / 2;
        this.h = 0;

        this.mesh = document.createElement('div');
        this.mesh.className = 'xPlayer';
        this.mesh.style.cssText = `top: ${this.y}px; left: ${this.x}px; width: ${this.width}px; height: ${this.height}px; background-color: red`;

        state.plane.appendChild(this.mesh);

        this.render(state);
    }

    update(state) {

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

        if (state.pressedKeys['32']) {
            this.h = Math.clamp(this.h + 2, 0, 50);
            this.mesh.style.transform = `translateZ(${this.h}px)`;
        } else {
            this.h = Math.clamp(this.h - 4, 0, 50);
            this.mesh.style.transform = `translateZ(${this.h}px)`;
        }
    }

    render(state) {
    }

}