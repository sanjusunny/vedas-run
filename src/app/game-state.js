export const state = {
    isRunning: false,
    fps: 60,
    vx: 0,
    vy: 0,
    vw: 1200,
    vh: 660,
    grid: 60,
    plane: null, // 3d plane
    player: null,
    probes: [],
    pressedKeys: {},
    ix: 0,
    iy: 0,
    iz: 0, /* forward movement made by player each turn */
    console: null,
    log: (msg) => state.console.innerText = msg
};