export function xId(id) {
    return document.getElementById(id);
}

export function addEl(parent, type, name, id, w, h) {
    let el = document.createElement(type);
    if(w) {
        el.width = w;
        el.height = h;
    }
    el.className = 'b_' + name;
    if(id) el.classList.add('b_' + id);
    return parent.appendChild(el);
}

export function addCl(el, cName) {
    el.classList.add(cName);
    //setTimeout(()=>el.classList.remove(cName), 500);
}

export function rnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
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
        return (Math.random() >= 0.5) ? 1 : -1;
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