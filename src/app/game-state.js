export const state = {
    isRunning: false,
    fps: 60,
    vx: 0,
    vy: 0,
    vw: 1200,
    vh: 660,
    grid: 60,
    plane: null,
    player: null,
    probes: [],
    pressedKeys: {},
    iy: 0, /* forward movement made by player each turn */
    console: null,
    log: (msg) => state.console.innerText = msg
};