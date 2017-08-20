export function xId(id) {
    return document.getElementById(id);
}

export function rnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

(function () {
    Math.clamp = function (a, b, c) {
        return Math.max(b, Math.min(c, a));
    }

    Math.pong = function (a, b, c) {
        const val = Math.clamp(a, b, c);
        return (val === c) ? b : val;
    }

    Math.toggle = function () {
        return (Math.random() >= 0.5) ? 1 : -1;
    }
})();