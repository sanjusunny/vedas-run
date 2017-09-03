import {rnd, xId} from '../utils/utils';
import {addEntity} from "./entityMgr";
import {state} from "../game-state";

export class Plane {
    constructor(state) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.mesh = xId('game-plane');

        this.gridSize = 60;
        this.mapWidth = 20;
        this.segmentLength = 660;
        this.mapLength = this.segmentLength * 10;

        this.segs = [
            addEntity('SEGMENT-1', this.mesh, 0, 0),
            addEntity('SEGMENT-2', this.mesh, 0, 0)];

        this.map = this.generateMap();

        this.activeSeg = 0;
        this.renderSegment(this.activeSeg, 0);

        this.renderOnce();
    }

    renderOnce() {
        let ctx = xId('b_stars').getContext('2d');
        let w = state.vw;
        let h = 400;

        let g = ctx.createLinearGradient(0,0,0,h);
        g.addColorStop(0, '#19587B');
        g.addColorStop(1, '#7BCEF0');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = 'overlay';

        g = ctx.createRadialGradient(w/2,h,h/2,w/2,h/1.5,h);
        g.addColorStop(0.0, '#fff');
        g.addColorStop(0.4, '#7BCEF0');
        g.addColorStop(1.0, 'rgba(25,88,123,0.5)');
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'lighten';

        for(let i=0;i<100;i++) {
            ctx.beginPath();
            ctx.arc( rnd(10,w), rnd(10,h*0.8), rnd(0,20)/10, 0, 2 * Math.PI, false);
            ctx.fillStyle = `rgba(255,255,255,${rnd(2,10)/10})`;
            ctx.fill();
        }
    }

    generateMap() {
        let map = [];
        let mapSrc = new Map([
            ['100.6', 2],
            ['200.10', 1],
            ['300.11', 2],
            ['400.12', 1],
            ['500.10', 2],
            ['650.8', 2],
            ['800.12', 1],
            ['900.10', 1],
            ['1250.8', 1]
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

    update(state) {
        if (this.z > this.mapLength) return;

        this.x = (this.x - state.ix);
        this.z = (this.z + state.iz);

        var delta = this.z % this.segmentLength;
        var segNum = Math.floor(this.z / this.segmentLength);
        var currSeg = segNum % 2;
        var nextSeg = Math.abs(currSeg - 1);

        if (currSeg !== this.activeSeg) {
            this.renderSegment(nextSeg, segNum);
            this.activeSeg = currSeg;
        }

        //state.log(segNum);

        this.segs[currSeg].style.transform = `translateX(${this.x}px) translateY(${delta}px)`;
        this.segs[nextSeg].style.transform = `translateX(${this.x}px) translateY(${-this.segmentLength + delta}px)`;
    }

    render(state) {
        renderSegment();
    }
}