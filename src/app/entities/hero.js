import {xId} from "../utils/utils";
import {Object3D} from "../utils/obj3d";

export class Hero {

    constructor(state) {
        this.hero = new Object3D('hero', 0, 0, 60, 260);
        this.hero.el.style.transformOrigin = '50% 50%';

        this.leftLeg = this.hero.addChild(new Object3D('left-leg', -10, 110, 18, 90));
        this.leftLegLower = this.hero.mesh['left-leg'].addChild(new Object3D('lower', 0, 80, 18, 80));
        this.leftLegFoot = this.hero.mesh['left-leg'].mesh['lower'].addChild(new Object3D('foot', 0, 70, 40, 10));

        this.leftArm = this.hero.addChild(new Object3D('left-arm', 0, 38, 16, 62));
        this.leftArmLower = this.hero.mesh['left-arm'].addChild(new Object3D('lower', 0, 48, 10, 50));
        this.leftArmHand = this.hero.mesh['left-arm'].mesh['lower'].addChild(new Object3D('hand', 0, 48, 4, 20));

        this.head = this.hero.addChild(new Object3D('head', 10, 0, 20, 40));
        this.torso = this.hero.addChild(new Object3D('torso', -10, 35, 40, 90));

        this.rightLeg = this.hero.addChild(new Object3D('right-leg', -10, 110, 18, 90));
        this.rightLegLower = this.hero.mesh['right-leg'].addChild(new Object3D('lower', 0, 80, 18, 80));
        this.rightLegFoot = this.hero.mesh['right-leg'].mesh['lower'].addChild(new Object3D('foot', 0, 70, 40, 10));

        this.rightArm = this.hero.addChild(new Object3D('right-arm', 0, 38, 16, 62));
        this.rightArmLower = this.hero.mesh['right-arm'].addChild(new Object3D('lower', 0, 48, 10, 55));
        this.rightArmHand = this.hero.mesh['right-arm'].mesh['lower'].addChild(new Object3D('hand', 0, 48, 14, 20));

        this.cape = this.hero.addChild(new Object3D('cape', -34, 105, 40, 70));

        xId('hero').appendChild(this.hero.el);

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

            [0, 0, 0, 0, 0, 32] // cape
        ];

        let rightMax = [
            [0, 0, 0, 0, 0, 18], // hero
            [0, 0, 0, 0, 0, 5], // head
            [0, 0, 0, 0, 0, 5], // torso

            [0, 0, -12, 0, 0, -60], // leftLeg
            [0, 0, 0, 0, 0, 20], // leftLegLower
            [0, 0, 0, 0, 0, 10], // leftLegFoot
            [0, 0, -25, 0, 0, 65], // leftArm
            [0, 0, 0, 0, 0, -80], // leftArmLower
            [0, 0, 0, 0, 0, -10], // leftArmHand

            [0, 0, 12, 0, 0, 10], // rightLeg
            [0, 0, 0, 0, 0, 70], // rightLegLower
            [0, 0, 0, 0, 0, 20], // rightLegFoot
            [0, 0, 20, 0, 0, -70], // rightArm
            [0, 0, 0, 0, 0, -90], // rightArmLower
            [0, 0, 0, 0, 0, -10], // rightArmHand

            [0, 0, 0, -5, -10, 50] // cape
        ];

        let leftMax = [
            [0, 0, 0, 0, 0, 18], // hero
            [0, 0, 0, 0, 0, 5], // head
            [0, 0, 0, 0, 0, 5], // torso

            [0, 0, -12, 0, 0, 10], // rightLeg
            [0, 0, 0, 0, 0, 70], // rightLegLower
            [0, 0, 0, 0, 0, 20], // rightLegFoot
            [0, 0, -25, 0, 0, -70], // rightArm
            [0, 0, 0, 0, 0, -90], // rightArmLower
            [0, 0, 0, 0, 0, -10], // rightArmHand

            [0, 0, 12, 0, 0, -60], // leftLeg
            [0, 0, 0, 0, 0, 20], // leftLegLower
            [0, 0, 0, 0, 0, 10], // leftLegFoot
            [0, 0, 20, 0, 0, 65], // leftArm
            [0, 0, 0, 0, 0, -80], // leftArmLower
            [0, 0, 0, 0, 0, -10], // rightArmHand

            [0, 0, 0, 5, 10, 50] // cape
        ];

        this.frames = [this.baseFrame, rightMax, this.baseFrame, leftMax];
        this.currFrame = 0;

        addEventListener('keydown', (e) => {
            if (e.which === 37) {
                this.a_isAnimating = !this.a_isAnimating;
            }
        });

        this.a_isAnimating = false;
        this.a_startFrame = this.frames[0];
        this.a_endFrame = this.frames[1];
        this.a_fn = 0;
        this.a_fmax = 10;
    }

    increment() {
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

    update(state) {
        if (this.a_isAnimating) {
            this.increment();
        }
    }

    getNextFrame() {
        this.currFrame = (this.currFrame+1)%this.frames.length;
        return this.frames[this.currFrame];
    }

    render(state) {

    }

}