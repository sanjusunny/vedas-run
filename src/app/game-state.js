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
    tz: 0, /* accumulated movement */
    ts: 0, /* elapsed ticks */
    vfx: true,
    tx_fuzzy: null,
    console: null,
    log: (msg) => {
        state.console.style.display = 'block';
        state.console.innerText = msg;
    }
};