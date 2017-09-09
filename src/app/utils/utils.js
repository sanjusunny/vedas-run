import {state} from "../game-state";

export function segmentToPlane(x, y) {
    let posX = x;
    let posY = state.tz % 660 + (660 - y);
    return [posX, -posY];
}

// ctx, 20px, #fff, [[x1,y1],...]
export function xPath(ctx, height, sX, sY, color1, color2, data) {
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.globalAlpha = 1;
    for (let i = 0; i < data.length - 1; i++) {
        let x1 = data[i][0] * sX;
        let y1 = data[i][1] * sY;
        let x2 = data[i + 1][0] * sX;
        let y2 = data[i + 1][1] * sY;

        if (x1 !== x2) {
            let grd = ctx.createLinearGradient(x1, height - y1, x1, height);
            grd.addColorStop(0, brighten(color1, data[i][2] * 10));
            grd.addColorStop(1, brighten(color2, data[i][2] * 10));
            ctx.fillStyle = grd;

            ctx.beginPath();
            ctx.moveTo(x1, height);
            ctx.lineTo(x1, height - y1);
            ctx.lineTo(x2, height - y2);
            ctx.lineTo(x2, height);
            ctx.fill();
            ctx.stroke();
        }
    }
    ctx.globalCompositeOperation = 'source-atop';
    ctx.drawImage(txFuzzy('#4DA9CF'), 0, 100, 400, height);
}


function txFuzzy(col) {
    let cvs = addEl(null, 'canvas', 'x', 0, 256, 32);
    var ctx = cvs.getContext('2d');
    ctx.globalCompositeOperation = 'hard-light';
    ctx.fillStyle = col;
    for (let i = 0; i < 40; i++) {
        ctx.globalAlpha = rnd(0, 10) / 10;
        ctx.fillRect(rnd(0, 256), rnd(0, 16), rnd(1, 7), rnd(0, 32));
    }
    return cvs;
}

function brighten(color, amount) {
    color = (color.indexOf("#") >= 0) ? color.substring(1, color.length) : color;
    amount = parseInt((255 * amount) / 100);
    return `#${addLight(color.substring(0, 2), amount)}${addLight(color.substring(2, 4), amount)}${addLight(color.substring(4, 6), amount)}`;
}

function addLight(color, amount) {
    let cc = parseInt(color, 16) + amount;
    let c = (cc > 255) ? 255 : (cc);
    c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
    return c;
}

export function xId(id) {
    return document.getElementById(id);
}

// create and add a DOM element to the parent, size it and give it a class name
export function addEl(parent, type, name, id, w, h, x, y) {
    let el = document.createElement(type);
    if (w !== undefined) {
        el.width = w;
        el.height = h;
        el.style.width = w + 'px';
        el.style.height = h + 'px';
    }
    if (x !== undefined) {
        el.style.left = x + 'px';
        el.style.top = y + 'px';
    }
    el.className = 'b_' + name;
    if (id) el.classList.add('b_' + id);
    return (parent) ? parent.appendChild(el) : el;
}

export function rnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export function isClose(a, b, tolerance) {
    return Math.abs(a - b) < tolerance;
}

(function () {

    // clamp between 2 values
    Math.clamp = function (a, b, c) {
        return Math.max(b, Math.min(c, a));
    }

    // clamp and reset to lowest if the highest is hit
    Math.pong = function (a, b, c) {
        const val = Math.clamp(a, b, c);
        return (val === c) ? b : val;
    }

    // get a random 1 or -1
    Math.toggle = function () {
        return (Math.random() >= 0.5);
    }

    // check if a is within x units of b
    Math.within = function (a, b, range) {
        return (Math.abs(a - b) <= range);
    }
})();

export const Keys = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    SPACE: 32
};