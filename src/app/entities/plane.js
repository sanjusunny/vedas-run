import {addEl, rnd, xId} from '../utils/utils';
import {addEntity} from "./entityMgr";
import {state} from "../game-state";
import {Object3D} from "../utils/obj3d";

export class Plane {
    constructor(state) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.mesh = xId('game-plane');
        this.edges = xId('edges');

        this.gridSize = 60;
        this.mapWidth = 20;
        this.segmentLength = 660;
        this.mapLength = this.segmentLength * 10;

        this.segs = [
            addEntity('SEGMENT-1', this.mesh, 0, 0),
            addEntity('SEGMENT-2', this.mesh, 0, 0)];

        this.map = this.generateMap();

        this.activeSeg = 0;
        this.renderSegment(0, 0);
        this.renderSegment(1, 1);

        this.renderOnce();
    }

    renderOnce() {
        // draw edges
        addEl(this.edges,'div','edge',1);
        addEl(this.edges,'div','edge',2);
        addEl(this.edges,'div','edge',3);
        addEl(this.edges,'div','edge',4);
    }

    generateMap() {
        let map = [];
        let mapSrc = new Map([
            /*['100.6', 1],
            ['200.10', 1],
            ['300.11', 1],
            ['400.12', 1],
            ['500.10', 1],
            ['600.8', 1],
            ['700.12', 1],
            ['800.10', 1],
            ['1200.8', 1]*/
        ]);

        for (let i = 0; i < this.mapLength; i++) {
            map[i] = [];
            for (let j = 0; j < this.mapWidth; j++) {
                var val = mapSrc.get(`${i}.${j}`);
                map[i][j] = (val !== undefined) ? val : 0
            }
        }

        return map;
    }

    renderSegment(id, segNum) {

        let seg = this.segs[id];
        while (seg.hasChildNodes()) {
            seg.removeChild(seg.lastChild);
        }

        let sp = document.createElement('div');
        sp.className = 'e_snowplate';
        seg.appendChild(sp);

        let z1 = segNum * this.segmentLength;
        let z2 = z1 + this.segmentLength;

        for (let i = z1; i < z2; i++) {
            for (let j = 0; j < this.mapWidth; j++) {
                if (this.map[i][j] > 0) {
                    addEntity('PLATE-' + this.map[i][j], seg, j * this.gridSize, this.segmentLength - (i - z1));
                }
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