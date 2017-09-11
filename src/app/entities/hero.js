import {isClose, Keys, xId} from "../utils/utils";
import {Object3D} from "../utils/obj3d";
import {state} from "../game-state";

export class Hero {

    constructor(state) {
        this.el = xId('hero');
        this.hero = new Object3D('hero', 0, 0, 60, 260);
        this.hero.el.style.transformOrigin = '50% 50%';

        this.leftLeg = this.hero.addChild(new Object3D('left-leg', -10, 110, 18, 90));
        this.leftLegLower = this.hero.mesh['left-leg'].addChild(new Object3D('lower', 0, 80, 18, 80));
        this.leftLegFoot = this.hero.mesh['left-leg'].mesh['lower'].addChild(new Object3D('foot', 0, 70, 40, 10,0,0,0,0,0,0, false));

        this.leftArm = this.hero.addChild(new Object3D('left-arm', 0, 38, 14, 60));
        this.leftArmLower = this.hero.mesh['left-arm'].addChild(new Object3D('lower', 0, 48, 10, 50));
        this.leftArmHand = this.hero.mesh['left-arm'].mesh['lower'].addChild(new Object3D('hand', 2, 48, 4, 20));

        this.head = this.hero.addChild(new Object3D('head', -10, 2, 18, 32,0,0,0,0,0,0, false));
        this.torso = this.hero.addChild(new Object3D('torso', -10, 35, 40, 90));

        this.rightLeg = this.hero.addChild(new Object3D('right-leg', -10, 110, 18, 90));
        this.rightLegLower = this.hero.mesh['right-leg'].addChild(new Object3D('lower', 0, 80, 18, 80));
        this.rightLegFoot = this.hero.mesh['right-leg'].mesh['lower'].addChild(new Object3D('foot', 0, 70, 40, 10,0,0,0,0,0,0, false));

        this.rightArm = this.hero.addChild(new Object3D('right-arm', 0, 38, 14, 60));
        this.rightArmLower = this.hero.mesh['right-arm'].addChild(new Object3D('lower', 0, 48, 10, 55));
        this.rightArmHand = this.hero.mesh['right-arm'].mesh['lower'].addChild(new Object3D('hand', 2, 48, 4, 20));

        this.cape = this.hero.addChild(new Object3D('cape', -20, 105, 38, 70));
        this.hair = this.hero.addChild(new Object3D('hair', -6, 30, 10, 46));

        this.el.appendChild(this.hero.el);

        this.meshMap = [
            this.hero,
            this.head,
            this.torso,
            this.leftLeg,
            this.leftLegLower,
            this.leftLegFoot,
            this.leftArm,
            this.leftArmLower,
            this.leftArmHand,
            this.rightLeg,
            this.rightLegLower,
            this.rightLegFoot,
            this.rightArm,
            this.rightArmLower,
            this.rightArmHand,
            this.cape,
            this.hair
        ];

        this.baseFrame = [
            [0, -20, 0, 0, 0, 0], // hero
            [0, 0, 0, 0, 0, 0], // head
            [0, 0, 0, 0, 0, 0], // torso

            [0, 0, -12, -2, 0, 0], // leftLeg
            [0, 0, 0, 0, 0, 0], // leftLegLower
            [0, 0, 0, 0, 0, 0], // leftLegFoot
            [0, 0, -22, -10, 0, 0], // leftArm
            [0, 0, 0, 0, 0, 0], // leftArmLower
            [0, 0, 0, 0, 0, 0], // leftArmHand

            [0, 0, 12, 2, 0, 0], // rightLeg
            [0, 0, 0, 0, 0, 0], // rightLegLower
            [0, 0, 0, 0, 0, 0], // rightLegFoot
            [0, 0, 22, 10, 0, 0], // rightArm
            [0, 0, 0, 0, 0, 0], // rightArmLower
            [0, 0, 0, 0, 0, 0], // rightArmHand

            [0, 0, 0, 0, 0, 24], // cape
            [0, 0, 0, 0, 0, 36] // cape
        ];

        let rightMax = [
            [0, 0, 0, 0, 0, 18],
            [0, 0, 0, 0, 0, 5],
            [0, 0, 0, 0, 0, 5],

            [0, 0, -12, 0, 0, -60],
            [0, 0, 0, 0, 0, 20],
            [0, 0, 0, 0, 0, 10],
            [0, 0, -25, -20, 0, 65],
            [0, 0, 0, 0, 0, -80],
            [0, 0, 0, 0, 0, -10],

            [0, 0, 12, 0, 0, 10],
            [0, 0, 0, 0, 0, 70],
            [0, 0, 0, 0, 0, 20],
            [0, 0, 20, 0, 0, -70],
            [0, 0, 0, 0, 0, -90],
            [0, 0, 0, 0, 0, -10],

            [0, 0, 0, -5, -10, 50],
            [0, 0, 0, 15, 10, 50]
        ];

        let leftMax = [
            [0, 0, 0, 0, 0, 18],
            [0, 0, 0, 0, 0, 5],
            [0, 0, 0, 0, 0, 5],

            [0, 0, -12, 0, 0, 10],
            [0, 0, 0, 0, 0, 70],
            [0, 0, 0, 0, 0, 20],
            [0, 0, -25, 0, 0, -70],
            [0, 0, 0, 0, 0, -90],
            [0, 0, 0, 0, 0, -10],

            [0, 0, 12, 0, 0, -60],
            [0, 0, 0, 0, 0, 20],
            [0, 0, 0, 0, 0, 10],
            [0, 0, 20, 20, 0, 65],
            [0, 0, 0, 0, 0, -80],
            [0, 0, 0, 0, 0, -10],

            [0, 0, 0, 5, 10, 50],
            [0, 0, 0, -15, -10, 50]
        ];

        this.frames = [this.baseFrame, rightMax, this.baseFrame, leftMax];
        this.currFrame = 0;
        this.a_isAnimating = true;
        this.a_startFrame = this.frames[0];
        this.a_endFrame = this.frames[1];
        this.a_fn = 0;
        this.a_fmax = 8; // frame rate for the animation

        this.xInc = 5;
        this.zInc = state.speed;
        this.yInc = 1;
        this.yMax = 50; // max jump height
        this.isInFall = false;
        this.coastX = 0; // coasting at the peak of the jump
        this.isRunning = false;
        this.x = state.vw / 2;
        this.z = 0;
        this.baseTransform = 'translateZ(264px) rotateY(90deg) scale3d(0.24,0.24,0.24)';
        this.currTransform = null;
        this.isHit = false;
        this.health = 5;

        this.updateAnimation();
    }

    updateAnimation() {
        if (this.a_fn >= this.a_fmax) {
            this.a_startFrame = this.a_endFrame;
            this.a_endFrame = this.getNextFrame();
            this.a_fn = 0;
        }

        let matrix = [this.baseFrame[0].length];
        for (let i = 0; i < this.baseFrame.length; i++) {
            for (let j = 0; j < this.baseFrame[0].length; j++) {
                matrix[j] = this.a_startFrame[i][j] + ((this.a_endFrame[i][j] - this.a_startFrame[i][j]) * (this.a_fn / this.a_fmax));
            }
            this.meshMap[i].transform(matrix);
        }
        this.a_fn++;
    }

    updateState() {

        if(state.status !== 2) return;

        let newTransform = this.baseTransform;

        if (state.pressedKeys[Keys.LEFT] || state.pressedKeys[Keys.RIGHT]) {
            if (state.pressedKeys[Keys.LEFT]) {
                state.ix = -this.xInc;
                newTransform = newTransform.replace('90deg', '110deg');
            } else {
                state.ix = this.xInc;
                newTransform = newTransform.replace('90deg', '70deg');
            }
        }

        if (state.pressedKeys[Keys.UP] || state.pressedKeys[Keys.DOWN]) {
            state.iz = (state.pressedKeys[Keys.UP]) ? this.zInc : -this.zInc;
            this.a_isAnimating = true;
        } else {
            this.a_isAnimating = false;
        }

        if (state.pressedKeys[Keys.SPACE] && !this.isInFall) {
            state.iy = Math.clamp(state.iy + this.yInc, 0, this.yMax);
            if (state.iy === this.yMax) {
                this.isInFall = true;
                this.coastX = 0;
            }
            newTransform = newTransform.replace('280', (280 - state.iy).toString());
        } else if (this.coastX < 20) {
            this.coastX++;
            newTransform = newTransform.replace('280', (280 - this.yMax).toString());
        } else {
            state.iy = Math.clamp(state.iy - this.yInc, 0, this.yMax);
            if (state.iy === 0) {
                this.isInFall = false;
            }
            newTransform = newTransform.replace('280', (280 - state.iy).toString());
        }

        if (newTransform !== this.currTransform) {
            this.currTransform = newTransform;
            this.el.style.transform = newTransform;
        }

        this.z += state.iz;
        this.x += state.ix;
        state.tx = this.x - state.vw / 2;

        this.a_fmax = (state.iy > 0 && !this.isInFall) ? 30 : 8;

        this.checkCollision();
    }

    // check hit by missile, x/y in game-plane space
    checkHit(mx) {
        if (state.doChecks && state.iy === 0 && isClose(-state.tx, mx - state.vw / 2, 20)) {
            this.health--;
            xId('app-container').classList.add('a_hit');
            setTimeout(() => xId('app-container').classList.remove('a_hit'), 500);

            if(this.health==0) {
                state.game.end(4);
            }

            return true;
        }

        return false;
    }

    checkCollision() {

        let currRow = Math.floor(state.tz / state.plane.gsH);
        let currCol = Math.floor((1200 / 2 - state.plane.x) / state.plane.gsW);
        let hasTile = state.map[currRow][currCol];

        // don't need to check if the player is in the air
        if (state.doChecks && state.iy === 0) {

            if (!this.isHit && !hasTile) {
                this.isHit = true;
                xId('app-container').classList.add('a_hit');
                this.el.style.top = '450px';
                state.plane.shadow.style.display = 'none';
                setTimeout(() => xId('app-container').classList.remove('a_hit'), 500);
            }
        }

        if (this.isHit) {
            state.iz = this.zInc;
            state.ix = 0;
            state.iy = 0;
            this.zInc = Math.max(0, this.zInc - 0.03); // decelerate
            if (this.zInc < 1.5) {
                state.game.end(4);
            }
        }

        if(state.iy === 0) {
            if (currRow === state.plane.endRow && (currCol === 0 || currCol === 9)) {
                state.game.end((currCol === 0) ? 1 : 2); // the game ends when either of the two end tiles are reached
            } else if (currRow > (state.plane.endRow + 17)) {
                state.game.end(3); // or the secret end tile is reached
            }
        }
    }

    update() {

        this.updateState();

        if (this.a_isAnimating) {
            this.updateAnimation();
        }
    }

    getNextFrame() {
        this.currFrame = (this.currFrame + 1) % this.frames.length;
        return this.frames[this.currFrame];
    }

    reset() {
        this.xInc = 5;
        this.zInc = state.speed;
        this.yInc = 1;
        this.isInFall = false;
        this.coastX = 0; // coasting at the peak of the jump
        this.isRunning = false;
        this.x = state.vw / 2;
        this.z = 0;
        this.health = 5;
        this.currTransform = this.baseTransform;
        this.isHit = false;
        this.el.style.top = '270px';
        state.plane.shadow.style.display = 'block';
    }
}