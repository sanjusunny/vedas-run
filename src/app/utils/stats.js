

export class Stats {

    constructor(){
        this.fps = 0;
        this.prevTs = 0;
        this.frames = 0;

        this.canvas = document.createElement('canvas');
        this.canvas.width = 80;
        this.canvas.height = 40;
        this.canvas.style.cssText = 'position:absolute; top: 8px; right: 8px;opacity: 0.5;';
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.ctx.font="16px san-serif";
    }

    update() {
        this.frames++;
        let currTs = performance.now();
        if(this.prevTs === 0) this.prevTs = currTs;
        if(currTs-this.prevTs >= 1000) {
            this.fps = this.frames;
            this.frames = 0;
            this.prevTs = currTs;
        }
    }

    render() {
        this.ctx.fillStyle = '#111';
        this.ctx.fillRect(0,0,80,40);
        this.ctx.fillStyle = '#69a6ff';
        this.ctx.fillText(this.fps, 8, 32);
    }
}