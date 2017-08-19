export class TextureManager {

    static createPlayer() {
        var canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 512;
        var ctx = canvas.getContext('2d');

        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = -4;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = '#999';

        // boat
        /*        ctx.fillStyle = '#333';
                ctx.fill(new Path2D('M 64 192 H 48 L 32 208 L 16 224 L 0 256 H 128 L 112 224 L 96 208 L 80 192 H 64'));

                ctx.fillStyle = '#222';
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = -2;
                ctx.fill(new Path2D('M 80 208 H 48 L 32 224 L 16 256 H 112 L 96 224 L 80 208'));*/

        // body
        ctx.shadowColor = '#777';
        ctx.fillStyle = '#444';
        ctx.shadowOffsetX = -2;
        ctx.shadowOffsetY = -1;
        ctx.fill(new Path2D('M 80 176 H 48 L 32 192 L 38 256 H 90 L 96 192 L 80 176'));

        // cape
        ctx.shadowColor = '#777';
        ctx.fillStyle = '#444';
        ctx.shadowOffsetX = -2;
        ctx.shadowOffsetY = -1;
        ctx.fill(new Path2D('M 80 176 L 59 175 L 44 204 L 10 255 L 90 256 L 87 226 L 80 176'));
        ctx.save();
        ctx.fillStyle = '#555';
        ctx.translate(10, 0);
        ctx.fill(new Path2D('M 80 176 L 59 175 L 44 204 L 10 255 L 90 256 L 87 226 L 80 176'));
        ctx.fillStyle = '#666';
        ctx.translate(10, 0);
        ctx.fill(new Path2D('M 80 176 L 59 175 L 44 204 L 10 255 L 90 256 L 87 226 L 80 176'));
        ctx.restore();


        // head
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.ellipse(64, 160, 15, 25, 0 * Math.PI / 180, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#141414';
        ctx.beginPath();
        ctx.ellipse(60, 190, 15, 30, 15 * Math.PI / 180, 0, 2 * Math.PI);
        ctx.fill();

        return canvas.toDataURL();
    }

    static createIceTexture() {
        var canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = '#777';
        ctx.filter = 'blur(4px)';
        ctx.stroke(new Path2D('M -1 20 L 125 10 L 8 52 L 125 58 L -3 110 L 126 103'));

        return canvas;
    }

    static createMountain(type = 0) {

        var types = [
            [
                '#999',
                'M 32 512 L 128 224 L 224 192 L 256 160 L 416 224 L 480 512',
                '#777',
                'M 320 512 V 256 L 352 224 L 256 160 L 416 224 L 448 512'
            ],
            [
                '#444',
                'M 318 512 L 384 256 L 318 192 H 222 L 192 256 L 128 512',
                '#999',
                'M 318 512 L 384 256 L 318 192 H 222 L 352 160 L 480 512'
            ],
            [
                '#fff',
                'M 160 512 L 224 352 V 288 L 288 64 L 96 352 L 64 512',
                '#aaa',
                'M 160 512 L 224 352 V 288 L 288 64 L 256 352 L 288 512'
            ],
            [
                '#777',
                'M 64 416 L 224 192 L 96 224 L 224 128 L 256 224 L 224 352 L 288 288 L 384 512 H 64 L 160 352',
                '#333',
                'M 96 384 L 192 256 L 128 288 L 224 128 L 320 192 L 384 288 L 416 512 H 64'
            ]
        ]

        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        var ctx = canvas.getContext('2d');

        ctx.globalAlpha = 0.64;

        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = -4;
        ctx.shadowOffsetY = 4;

        ctx.fillStyle = types[type][0];
        ctx.shadowColor = '#777';
        ctx.fill(new Path2D(types[type][1]));
        ctx.fillStyle = types[type][2];
        ctx.shadowColor = '#444';
        ctx.fill(new Path2D(types[type][3]));

        return canvas.toDataURL();
    }

    static createCastle() {

        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        var ctx = canvas.getContext('2d');

        ctx.globalAlpha = 0.4;
        ctx.globalCompositeOperation = 'multiply';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = -4;
        ctx.shadowOffsetY = 4;
        ctx.shadowColor = '#777';

        ctx.fillStyle = '#444';

        ctx.fill(new Path2D('M 64 288 L 96 320 V 128 L 128 160 V 224 L 160 256 H 192 V 192 L 160 160 L 210 96 L 256 160 L 224 192 V 288 L 288 384 L 352 160 L 384 96 V 32 L 416 0 V 416 H 448 L 480 384 L 512 512 H 0 L 32 256 L 64 224 z'));
        ctx.fillRect(24, 0, 24, 512);

        return canvas.toDataURL();
    }

    static createWaterLine() {
        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 128;
        var ctx = canvas.getContext('2d');

        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#222';
        ctx.filter = 'blur(10px)';
        ctx.fill(new Path2D('M 32 64 L 128 32 L 224 64 H 320 H 480 L 288 96 L 96 64 z'));

        return canvas.toDataURL();
    }

    static createFog() {
        var canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 256;
        var ctx = canvas.getContext('2d');

        ctx.globalCompositeOperation = 'multiply';

        ctx.fillStyle = '#ccc';
        ctx.filter = 'blur(24px)';
        ctx.fill(new Path2D('M 128 192 L 192 64 V 128 L 224 64 V 160 L 448 128 L 480 32 V 192 L 512 96 L 544 192 V 128 V 64 L 576 96 L 608 32'));

        ctx.filter = 'blur(24px)';
        ctx.fillStyle = '#fff';
        ctx.fillRect(150, 100, 700, 56);

        return canvas.toDataURL();
    }

    static createCloud(type = 0) {

        var cloudTypes = [
            [
                '#111',
                '#444',
                'M 181 167 H 301 V 127 H 261 L 160 320 L 352 256 L 221 127 L 256 224 V 256 L 221 247 V 287 L 141 247 L 341 287 L 301 327 L 261 287 L 101 207 H 341 L 181 167'
            ],
            [
                '#ddd',
                '#777',
                'M 200 191 L 403 120 L 352 192 L 280 151 L 179 344 L 371 280 L 240 151 L 339 312 L 275 280 V 344 L 240 311 L 128 288 L 403 216 L 320 320 L 280 311 L 147 120 L 360 231 L 128 224'
            ]
        ]

        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = cloudTypes[type][0];
        ctx.filter = 'blur(20px)';

        ctx.fill(new Path2D(cloudTypes[type][2]));

        ctx.translate(256, 256);
        ctx.rotate(90 * Math.PI / 180);

        ctx.translate(-256, -256);
        ctx.fillStyle = cloudTypes[type][1];
        ctx.filter = 'blur(16px)';
        ctx.fill(new Path2D(cloudTypes[type][2]));

        return canvas.toDataURL();
    }

    static createRiver() {
        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#111';
        ctx.filter = 'blur(12px)';
        ctx.fill(new Path2D('M 160 0 H 352 L 512 128 V 256 H 0 V 128 L 160 0 z'));

        return canvas.toDataURL();
    }

    static createIcePlate(type = 0) {

        var plateTypes = [
            [
                '#fff',
                '#fff',
                'M 192 192 L 0 64 L 480 32 L 384 128 z'
            ],
            [
                '#efefef',
                '#fff',
                'M 96 64 L 448 96 L 384 160 L 32 128 z'
            ]
        ]

        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        var ctx = canvas.getContext('2d');

        ctx.globalAlpha = '0.7';
        ctx.fillStyle = plateTypes[type][0];
        ctx.shadowColor = '#ccc';
        ctx.shadowBlur = 1;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 8;
        ctx.fill(new Path2D(plateTypes[type][2]));
        ctx.clip(new Path2D(plateTypes[type][2]));

        ctx.drawImage(TextureManager.createIceTexture(), 0, 0, 512, 256);

        return canvas.toDataURL();
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