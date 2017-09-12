export const state = {
    isRunning: false,
    fps: 60,
    vx: 0,
    vy: 0,
    vw: 1200,
    vh: 660,
    grid: 60,
    game: null,
    plane: null, // 3d plane
    player: null,
    comms: null,
    status: 2, /* 1.Pregame 2.In-game 3.RestartMenu */
    pressedKeys: {},
    objects: [],
    omega: null,
    ix: 0, /* horizontal movement made by player each turn */
    iy: 0, /* accumulated vertical player position */
    iz: 0, /* forward movement made by player each turn */
    tz: 0, /* accumulated movement */
    ts: 0, /* elapsed ticks */
    vfx: true,
    text: true,
    doChecks: false,
    attack: true,
    speed: 4,
    intro: true,
    map: [],
    tx_fuzzy: null,
    console: null,
    log: (msg) => {
        state.console.style.display = 'block';
        state.console.innerText = msg;
    }
};