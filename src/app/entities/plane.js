import {addEl, rnd, xId} from '../utils/utils';
import {state} from "../game-state";
import {Turret} from "./turret";

export class Plane {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.mesh = xId('game-plane');

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

        //state.map = [];//this.generateMap();

        this.activeSeg = 0;
        this.renderSegment(0, 0);
        this.renderSegment(1, 1);
    }

    // id of the segment to render, either 0 or 1
    renderSegment(id, segNum) {

        let seg = this.segs[id];
        state.objects.forEach(x=> {
            if(x.parent === seg) x.destroy();
        });
        state.objects = state.objects.filter(x=>x.isActive); // remove objects attached to this segment and wipe out DOM nodes
        while (seg.hasChildNodes()) {
            seg.removeChild(seg.lastChild);
        }

        for (let i = 0; i < this.vertTiles; i++) {
            let newRow = [];
            for (let j = 0; j < this.horizTiles; j++) {
                let tile = this.getTile(id, i, j, segNum);
                if (tile !== null) {
                    newRow.push(tile);
                } else {
                    newRow.push(0);
                }
            }
            state.map.push(newRow);
        }
    }

    getTile(id, i, j, segNum) {

/*        if ((j === 0 || j === (this.horizTiles - 1)) && i % 4 === 0 && segNum === 1) {
            let t = new Turret(this.segs[id], j * this.gsW + this.gsW/2, (this.vertTiles - i - 1) * this.gsH + this.gsH/2);
            state.objects.push(t);
            return 2;
        }*/

        if ((j > 1 && j < (this.horizTiles - 2)) && segNum === 0 && (i <2 || (i>4 && Math.toggle()) ) ) {//(state.map.length < 1 || Math.toggle())) {
            addEl(this.segs[id], 'div', 'plate', id, this.gsW, this.gsH, j * this.gsW, (this.vertTiles - i - 1) * this.gsH);
            return 1;
        }

        return null;
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