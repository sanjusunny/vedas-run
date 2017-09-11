import {addEl, rnd, xId} from '../utils/utils';
import {state} from "../game-state";
import {Turret} from "./turret";

// 0 - 10x2 2x8
// 1 - 4x2 Rx8
// 2 - Rx8
// 3 - Rx8 T0 T9
// 4 - Rx8 T0 T9
// 5 - Rx8 T0 T9
// 6 - Rx8 T0 T9
// 7 - 2x10
// 8 - Rx6 6x4
// 9 - 1 and 2 and secret tile

let map = [
    '0001111000,0000110000,0000110000,0000110000,0000110000,0000110000,0000110000,0000110000,0000000000,0000110000',// 0
    '0000110000,0000110000,0000110000,0000000000,0000000000,0000000000,0000110000,0001111000,0001111000,0001111000',// 1
    '0001111000,0001111000,0077777700,0077777700,0077777700,0077777700,0077777700,0077777700,0077777700,0077777700',// 2
    '0001111000,0011111100,0011111100,0000000000,0000000000,0000000000,0001111000,0001111000,0001111000,0001111000',// 3
    '0001111000,0001111000,0000110000,0000110000,0000110000,0000110000,0000000000,0000000000,0000000000,2221111222',// 4
    '0011111100,0011001100,0011001100,0011001100,0011111100,0000110000,0000110000,0000110000,0000110000,0000110000',// 5
    '',// 6
    '',// 7
    '0077777700,0077777700,0011111100,2000000002,2000000002,0011111100,0077777700,0077777700,0077777700,0077777700',// 8
    '0001111000,0001111000,0011000000,0011000000,0011000000,0011110000,0000110000,0000110000,0000110000,0000110000',// 9
    '0077777700,0077777700,0077777700,0000000000,0000000000,0077777700,0077777700,0077777700,0077777700,0077777700',// 10
    '0000110000,0000000000,0000000000,0000110000,0000110000,0000110000,0000110000,0000110000,1111111111,1000000001',// 11
    '1000000001,4000000005,0000000000,0000000000,0000000000,2222222222,0000000000,0000110000,0000110000,0000110000',
    '0000110000,0000110000,0000660000,0000000000,0000000000,0000000000,0000000000,0000000000,0000000000,0000000000',
    'x'
];

export class Plane {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.mesh = xId('game-plane');

        this.segmentWidth = 1200;
        this.segmentLength = 660; // pixel height of a segment
        this.maxSegments = 13; // how many segments till the end of the game
        this.horizTiles = 10; // num of horiz tiles in a segment
        this.vertTiles = 10; // num of vert tiles in a segment
        this.endRow = (this.maxSegments-1) * this.vertTiles; // victor/defeat tiles

        // tile size
        this.gsW = this.segmentWidth / this.horizTiles;
        this.gsH = this.segmentLength / this.vertTiles;

        // total distance to the end of the game
        this.mapLength = this.segmentLength * this.maxSegments;

        this.segs = [
            addEl(this.mesh, 'div', 'segment', 0, 1200, 660, 0, 0),
            addEl(this.mesh, 'div', 'segment', 1, 1200, 660, 0, 0)];

        this.shadow = addEl(this.mesh, 'div', 'shadow', 0, 24, 24, 588, 638);

        this.activeSeg = 0;
        this.renderSegment(0, 0);
        this.renderSegment(1, 1);
    }

    // id of the segment to render, either 0 or 1
    renderSegment(id, segNum) {

        let seg = this.segs[id];
        state.objects.forEach(x => {
            if (x.parent === seg) x.destroy();
        });
        state.objects = state.objects.filter(x => x.isActive); // remove objects attached to this segment and wipe out DOM nodes
        while (seg.hasChildNodes()) {
            seg.removeChild(seg.lastChild);
        }

        for (let i = 0; i < this.vertTiles; i++) {
            let newRow = [];
            for (let j = 0; j < this.horizTiles; j++) {
                newRow.push(this.getTile(id, i, j, segNum));
            }
            state.map.push(newRow);
        }
    }

    getTile(id, i, j, segNum) {

        let t = 0;
        let seg = map[segNum];

        // figure out what to render
        if (seg.length > 1) {
            let x = seg.split(',')[i][j];
            t = (x === '7') ? ((Math.toggle()) ? 1 : 0) : parseInt(x);
        } else if (seg === '')
            t = (Math.toggle()) ? 1 : 0;

        // render it
        switch (t) {
            case 1:
            case 4:
            case 5:
            case 6:
                addEl(this.segs[id], 'div', 'plate', t, this.gsW, this.gsH, j * this.gsW, (this.vertTiles - i - 1) * this.gsH);
                break;
            case 2:
                state.objects.push(new Turret(this.segs[id], segNum, j * this.gsW + this.gsW / 2, (this.vertTiles - i - 1) * this.gsH + this.gsH / 2));
                break;
        }

        return t;
    }

    update() {
        this.x = (this.x - state.ix);
        this.z = Math.max((this.z + state.iz), 0); // stop 2 tiles short of the end
        state.tz = this.z;

        var delta = this.z % this.segmentLength;
        var segNum = Math.floor(this.z / this.segmentLength);
        var currSeg = segNum % 2;
        var nextSeg = Math.abs(currSeg - 1);

        if (currSeg !== this.activeSeg) {
            this.renderSegment(nextSeg, segNum + 1);
            this.activeSeg = currSeg;
        }

        this.segs[currSeg].style.transform = `translateX(${this.x}px) translateY(${delta}px)`;
        this.segs[nextSeg].style.transform = `translateX(${this.x}px) translateY(${-this.segmentLength + delta}px)`;

        if (state.iy > 0) {
            this.mesh.style.transform = `rotateX(97deg) translateZ(${-82 - state.iy}px) translateY(72px) scaleY(0.8) scaleX(0.5)`;
        }
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.z = 0;

        state.map = [];

        this.activeSeg = 0;
        this.renderSegment(0, 0);
        this.renderSegment(1, 1);
    }
}