import {rnd, xId} from '../utils/utils';
import {addEntity} from "./entityMgr";

export class Plane {
    constructor(state) {
        this.x = 0;
        this.z = 0;
        this.mesh = xId('game-plane');

        this.map = [];

        this.gridSize = 60;
        this.mapWidth = 10;
        this.segmentLength = 660;
        this.mapLength = this.segmentLength * 10;

        this.segs = [addEntity('SEGMENT-1', this.mesh, 0, 0),
            addEntity('SEGMENT-2', this.mesh, 0, 0)];
        this.activeSeg = 0;
        this.renderSegment(this.activeSeg);
    }

    generateMap() {
        let mapSrc = new Map([
            ['4.4', 1],
            ['10.8', 1],
            ['11.15', 1]
        ]);

        let objIndex = 0;
        let currObj = mapSrc[objIndex];

        let baseLayer = [];
        let objLayer = [];

        for (let i = 0; i < this.mapLength; i++) {
            this.map[i] = [];
            for (let j = 0; j < this.mapWidth; j++) {
                if (mapSrc.get(`${i}.${j}`) !== undefined) {
                    this.map[i][j] = addEntity('PLATE-1', this.mesh, j * this.gridSize, i * this.gridSize);
                } else {
                    this.map[i][j] = addEntity('PLATE-2', this.mesh, j * this.gridSize, i * this.gridSize);
                }
            }
        }
    }

    renderSegment(id) {
        console.warn('Rendering new segment');
    }

    update(state) {
        if (this.z > this.mapLength) return;

        this.x = (this.x - state.ix);
        this.z = (this.z + state.iz);

        var delta = this.z % this.segmentLength;
        var currSeg = Math.floor(this.z / this.segmentLength) % 2;
        var nextSeg = Math.abs(currSeg - 1);

        if(currSeg !== this.activeSeg) {
            this.renderSegment(nextSeg);
            this.activeSeg = currSeg;
        }

        state.log(state.player.x);

        this.segs[currSeg].style.transform = `translateX(${this.x}px) translateY(${delta}px)`;
        this.segs[nextSeg].style.transform = `translateX(${this.x}px) translateY(${-this.segmentLength + delta}px)`;
    }

    render(state) {
        renderSegment();
    }
}