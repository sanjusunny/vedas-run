import {addEl, rnd, xId} from '../utils/utils';
import {state} from "../game-state";

export class Plane {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.mesh = xId('game-plane');
        this.edges = xId('edges');

        this.segmentWidth = 1200;
        this.segmentLength = 660; // pixel height of a segment
        this.maxSegments = 10; // how many segments till the end of the game
        this.horizTiles = 10; // num of horiz tiles in a segment
        this.vertTiles = 10; // num of vert tiles in a segment

        // tile size
        this.gsW = this.segmentWidth / this.horizTiles;
        this.gsH = this.segmentLength / this.vertTiles;

        // total distance to the end of the game
        this.mapLength = this.segmentLength * this.maxSegments;

        this.segs = [
            addEl(this.mesh, 'div', 'segment', 0, 1200, 660, 0, 0),
            addEl(this.mesh, 'div', 'segment', 1, 1200, 660, 0, 0)];

        //this.map = this.generateMap();

        this.activeSeg = 0;
        this.renderSegment(0, 0);
        this.renderSegment(1, 1);

        this.renderOnce();
    }

    renderOnce() {
        // draw edges
        addEl(this.edges, 'div', 'edge', 1);
        addEl(this.edges, 'div', 'edge', 2);
        addEl(this.edges, 'div', 'edge', 3);
        addEl(this.edges, 'div', 'edge', 4);
    }

    /*generateMap() {
        let map = [];
        let mapSrc = new Map([
            ['100.6', 1],
            ['200.10', 1],
            ['300.11', 1],
            ['400.12', 1],
            ['500.10', 1],
            ['600.8', 1],
            ['700.12', 1],
            ['800.10', 1],
            ['1200.8', 1]
        ]);

        for (let i = 0; i < this.mapLength; i++) {
            map[i] = [];
            for (let j = 0; j < this.mapWidth; j++) {
                var val = mapSrc.get(`${i}.${j}`);
                map[i][j] = (val !== undefined) ? val : 0
            }
        }

        return map;
    }*/

    renderSegment(id, segNum) {

        let seg = this.segs[id];
        while (seg.hasChildNodes()) {
            seg.removeChild(seg.lastChild);
        }

        let z1 = segNum * this.vertTiles; // starting grid number
        let z2 = z1 + this.vertTiles; // ending grid number

        for (let i = 0; i < this.vertTiles; i++) {
            for (let j = 2; j < this.horizTiles - 2; j++) {
                if (Math.toggle())
                    addEl(seg, 'div', 'plate', id, this.gsW-5, this.gsH-5, j * this.gsW, (this.vertTiles - i - 1) * this.gsH);
            }
        }
    }

    update() {
        if (this.z > this.mapLength) return;

        this.x = (this.x - state.ix);
        this.z = (this.z + state.iz);
        state.tz = this.z;

        var delta = this.z % this.segmentLength;
        var segNum = Math.floor(this.z / this.segmentLength);
        var currSeg = segNum % 2;
        var nextSeg = Math.abs(currSeg - 1);

        if (currSeg !== this.activeSeg) {
            this.renderSegment(nextSeg, segNum);
            this.activeSeg = currSeg;
        }

        this.edges.style.transform = `translateX(${this.x}px)`;
        this.segs[currSeg].style.transform = `translateX(${this.x}px) translateY(${delta}px)`;
        this.segs[nextSeg].style.transform = `translateX(${this.x}px) translateY(${-this.segmentLength + delta}px)`;

        if (state.iy > 0) {
            this.mesh.style.transform = `rotateX(97deg) translateZ(${-82 - state.iy}px) translateY(72px) scaleY(0.8) scaleX(0.5)`;
        }
    }
}