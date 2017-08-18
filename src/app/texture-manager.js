export class TextureManager {

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

    static createShard() {

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
        ctx.fill(new Path2D('M -64 256 L 160 0 H 352 L 576 256 z'));

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

        ctx.drawImage( TextureManager.createIceTexture(), 0, 0, 512, 256);

        return canvas.toDataURL();
    }
}