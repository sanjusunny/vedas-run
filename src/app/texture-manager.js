import {state} from "./game-state";

export class TextureManager {
    constructor() {
    }

    static createUIFG() {

        var canvas = document.createElement('canvas');
        canvas.width = 576;
        canvas.height = 256;
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0,576,256);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill(new Path2D('M 0 32 H 48 V 160 H 112 L 128 208 H 0 V 32'));
        ctx.fill(new Path2D('M 144 208 V 32 H 272 V 208 H 144'));
        ctx.fill(new Path2D('M 288 144 V 32 H 416 V 80 H 352 L 368 96 H 416 V 208 H 288 V 160 H 352 L 336 144 H 288'));
        ctx.fill(new Path2D('M 432 32 H 560 L 576 80 H 528 V 208 H 464 V 80 H 432 V 32'));

        ctx.globalCompositeOperation = 'source-over';
        ctx.fill(new Path2D('M 208 81 L 224 97 V 161 H 192 L 208 81'));

        return canvas.toDataURL();
    }

    static createUIBG() {

        var canvas = document.createElement('canvas');
        canvas.width = 576;
        canvas.height = 256;
        var ctx = canvas.getContext('2d');

        // TODO: Replace blurs with scaling
        ctx.filter = 'blur(25px)';
        ctx.fillStyle = '#000';
        ctx.font = "64px Arial";
        ctx.fillText("!@$!^$_&___%*",50,170);
        ctx.filter = 'blur(32px)';
        ctx.fillText("&*((___12$^_d",70,180);
        ctx.filter = 'blur(28px)';
        ctx.fillStyle = '#000';
        ctx.font = "64px Arial";
        ctx.fillText("--_9_)*&&",60,190);
        ctx.fillStyle = '#000';
        ctx.font = "48px Arial";
        ctx.fillText("AFSY$%GDC",50,140);

        return canvas.toDataURL();
    }
}