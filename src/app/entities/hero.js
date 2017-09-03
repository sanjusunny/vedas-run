import {Keys, xId} from "../utils/utils";
import {Object3D} from "../utils/obj3d";
import {state} from "../game-state";

export class Hero {

    constructor(state) {
        this.el = xId('hero');
        this.hero = new Object3D('hero', 0, 0, 60, 260);
        this.hero.el.style.transformOrigin = '50% 50%';

        this.leftLeg = this.hero.addChild(new Object3D('left-leg', -10, 110, 18, 90));
        this.leftLegLower = this.hero.mesh['left-leg'].addChild(new Object3D('lower', 0, 80, 18, 80));
        this.leftLegFoot = this.hero.mesh['left-leg'].mesh['lower'].addChild(new Object3D('foot', 0, 70, 40, 10));

        this.leftArm = this.hero.addChild(new Object3D('left-arm', 0, 38, 14, 60));
        this.leftArmLower = this.hero.mesh['left-arm'].addChild(new Object3D('lower', 0, 48, 10, 50));
        this.leftArmHand = this.hero.mesh['left-arm'].mesh['lower'].addChild(new Object3D('hand', 2, 48, 4, 20));

        this.head = this.hero.addChild(new Object3D('head', 10, 6, 18, 32));
        this.torso = this.hero.addChild(new Object3D('torso', -10, 35, 40, 90));

        this.rightLeg = this.hero.addChild(new Object3D('right-leg', -10, 110, 18, 90));
        this.rightLegLower = this.hero.mesh['right-leg'].addChild(new Object3D('lower', 0, 80, 18, 80));
        this.rightLegFoot = this.hero.mesh['right-leg'].mesh['lower'].addChild(new Object3D('foot', 0, 70, 40, 10));

        this.rightArm = this.hero.addChild(new Object3D('right-arm', 0, 38, 14, 60));
        this.rightArmLower = this.hero.mesh['right-arm'].addChild(new Object3D('lower', 0, 48, 10, 55));
        this.rightArmHand = this.hero.mesh['right-arm'].mesh['lower'].addChild(new Object3D('hand', 2, 48, 4, 20));

        this.cape = this.hero.addChild(new Object3D('cape', -20, 105, 38, 70));

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
            this.cape
        ];

        this.baseFrame = [
            [0, -20, 0, 0, 0, 0], // hero
            [0, 0, 0, 0, 0, 0], // head
            [0, 0, 0, 0, 0, 0], // torso

            [0, 0, -12, -2, 0, 0], // leftLeg
            [0, 0, 0, 0, 0, 0], // leftLegLower
            [0, 0, 0, 0, 0, 0], // leftLegFoot
            [0, 0, -25, -10, 0, 0], // leftArm
            [0, 0, 0, 0, 0, 0], // leftArmLower
            [0, 0, 0, 0, 0, 0], // leftArmHand

            [0, 0, 12, 2, 0, 0], // rightLeg
            [0, 0, 0, 0, 0, 0], // rightLegLower
            [0, 0, 0, 0, 0, 0], // rightLegFoot
            [0, 0, 25, 10, 0, 0], // rightArm
            [0, 0, 0, 0, 0, 0], // rightArmLower
            [0, 0, 0, 0, 0, 0], // rightArmHand

            [0, 0, 0, 0, 0, 24] // cape
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

            [0, 0, 0, -5, -10, 50] // cape
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

            [0, 0, 0, 5, 10, 50]
        ];

        this.frames = [this.baseFrame, rightMax, this.baseFrame, leftMax];
        this.currFrame = 0;
        this.a_isAnimating = true;
        this.a_startFrame = this.frames[0];
        this.a_endFrame = this.frames[1];
        this.a_fn = 0;
        this.a_fmax = 10;

        this.xInc = 5;
        this.yInc = 5;
        this.zInc = 5;
        this.x = state.vw / 2;
        this.z = 0;
        this.transform = 'translateZ(200px) rotateY(70deg) scale3d(0.44,0.44,0.44)';
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
        /*this.a_isAnimating = false;*/
    }

    updateState() {

        let newTransform = this.transform;

        if (state.pressedKeys[Keys.LEFT] || state.pressedKeys[Keys.RIGHT]) {
            if (state.pressedKeys[Keys.LEFT]) {
                state.ix = -this.xInc;
                newTransform = 'translateZ(200px) rotateY(110deg) scale3d(0.44,0.44,0.44)';
            }

            if (state.pressedKeys[Keys.RIGHT]) {
                state.ix = this.xInc;
                newTransform = 'translateZ(200px) rotateY(70deg) scale3d(0.44,0.44,0.44)';
            }
        } else {
            newTransform = 'translateZ(200px) rotateY(90deg) scale3d(0.44,0.44,0.44)';
        }

        if (state.pressedKeys[Keys.UP] || state.pressedKeys[Keys.DOWN]) {
            if (state.pressedKeys[Keys.UP]) {
                state.iz = this.zInc;
                this.a_isAnimating = true;
            }

            if (state.pressedKeys[Keys.DOWN]) {
                state.iz = -this.zInc;
                this.a_isAnimating = true;
            }
        } else {
            this.a_isAnimating = false;
        }

        if (state.pressedKeys[Keys.SPACE]) {
            state.iy = -this.yInc;
            this.a_isAnimating = true;
        } else {
            this.a_isAnimating = false;
        }

        if (newTransform !== this.transform) {
            this.transform = newTransform;
            this.el.style.transform = this.transform;
        }

        this.z += state.iz;
        this.x += state.ix;
    }

    update(state) {

        this.updateState();

        if (this.a_isAnimating) {
            this.updateAnimation();
        }
    }

    getNextFrame() {
        this.currFrame = (this.currFrame + 1) % this.frames.length;
        return this.frames[this.currFrame];
    }

    render(state) {

    }

}