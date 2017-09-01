import {xId} from "../utils";
import {Object3D} from "../utils/obj3d";

export class Hero {

    constructor(state) {
        this.hero = new Object3D('hero', 0, 0, 60, 260);
        this.hero.el.style.transformOrigin = '50% 50%';

        this.leftLeg = this.hero.addChild(new Object3D('left-leg', -10, 110, 20, 90));
        this.leftLegLower = this.hero.mesh['left-leg'].addChild(new Object3D('lower', 0, 80, 20, 80));
        this.leftLegFoot = this.hero.mesh['left-leg'].mesh['lower'].addChild(new Object3D('foot', 0, 70, 40, 10));

        this.leftArm = this.hero.addChild(new Object3D('left-arm', 0, 38, 20, 60));
        this.leftArmLower = this.hero.mesh['left-arm'].addChild(new Object3D('lower', 0, 50, 20, 50));
        this.leftArmHand = this.hero.mesh['left-arm'].mesh['lower'].addChild(new Object3D('hand', 0, 40, 20, 20));

        this.head = this.hero.addChild(new Object3D('head', 10, 0, 20, 40));
        this.torso = this.hero.addChild(new Object3D('torso', -10, 35, 40, 90));

        this.rightLeg = this.hero.addChild(new Object3D('right-leg', -10, 110, 20, 90));
        this.rightLegLower = this.hero.mesh['right-leg'].addChild(new Object3D('lower', 0, 80, 20, 80));
        this.rightLegFoot = this.hero.mesh['right-leg'].mesh['lower'].addChild(new Object3D('foot', 0, 70, 40, 10));

        this.rightArm = this.hero.addChild(new Object3D('right-arm', 0, 38, 20, 60));
        this.rightArmLower = this.hero.mesh['right-arm'].addChild(new Object3D('lower', 0, 50, 20, 50));
        this.rightArmHand = this.hero.mesh['right-arm'].mesh['lower'].addChild(new Object3D('hand', 0, 40, 20, 20));

        //state.plane.mesh.appendChild(this.hero.el);
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
            this.rightArmHand
        ];

        this.baseFrame = [
            [0, -20, 0, 0, 0, 0], // hero
            [0, 0, 0, 0, 90, 0], // head
            [0, 0, 0, 0, 90, 0], // torso
            [0, 0, -15, 0, 0, 0], // leftLeg
            [0, 0, 0, 0, 0, 0], // leftLegLower
            [0, 0, 0, 0, 0, 0], // leftLegFoot
            [0, 0, -20, 0, 0, 0], // leftArm
            [0, 0, 0, 0, 0, 0], // leftArmLower
            [0, 0, 0, 0, 0, 0], // leftArmHand
            [0, 0, 15, 0, 0, 0], // rightLeg
            [0, 0, 0, 0, 0, 0], // rightLegLower
            [0, 0, 0, 0, 0, 0], // rightLegFoot
            [0, 0, 20, 0, 0, 0], // rightArm
            [0, 0, 0, 0, 0, 0], // rightArmLower
            [0, 0, 0, 0, 0, 0] // rightArmHand
        ];

        let rightMax = [
            [0, 0, 0, 0, 0, 18], // hero
            [0, 0, 0, 0, 90, 5], // head
            [0, 0, 0, 0, 90, 5], // torso
            [0, 0, -15, 0, 0, -60], // leftLeg
            [0, 0, 0, 0, 0, 20], // leftLegLower
            [0, 0, 0, 0, 0, 10], // leftLegFoot
            [0, 0, -20, 0, 0, 65], // leftArm
            [0, 0, 0, 0, 0, -80], // leftArmLower
            [0, 0, 0, 0, 0, -10], // leftArmHand
            [0, 0, 15, 0, 0, 10], // rightLeg
            [0, 0, 0, 0, 0, 70], // rightLegLower
            [0, 0, 0, 0, 0, 20], // rightLegFoot
            [0, 0, 20, 0, 0, -70], // rightArm
            [0, 0, 0, 0, 0, -90], // rightArmLower
            [0, 0, 0, 0, 0, -10], // rightArmHand
        ];

        let leftMax = [
            [0, 0, 0, 0, 0, 18], // hero
            [0, 0, 0, 0, 90, 5], // head
            [0, 0, 0, 0, 90, 5], // torso
            [0, 0, -15, 0, 0, 10], // rightLeg
            [0, 0, 0, 0, 0, 70], // rightLegLower
            [0, 0, 0, 0, 0, 20], // rightLegFoot
            [0, 0, -20, 0, 0, -70], // rightArm
            [0, 0, 0, 0, 0, -90], // rightArmLower
            [0, 0, 0, 0, 0, -10], // rightArmHand
            [0, 0, 15, 0, 0, -60], // leftLeg
            [0, 0, 0, 0, 0, 20], // leftLegLower
            [0, 0, 0, 0, 0, 10], // leftLegFoot
            [0, 0, 20, 0, 0, 65], // leftArm
            [0, 0, 0, 0, 0, -80], // leftArmLower
            [0, 0, 0, 0, 0, -10] // leftArmHand
        ];

        this.frames = [this.baseFrame, rightMax, this.baseFrame, leftMax];
        this.currFrame = 0;

        addEventListener('keydown', (e) => {
            if (e.which === 37) {
                this.a_isAnimating = true;
                this.a_endFrame = this.baseFrame;
            }

            if (e.which === 39) {
                this.a_isAnimating = true;
                this.a_endFrame = frame2;
            }
        });

        this.a_isAnimating = false;
        this.a_startFrame = this.frames[0];
        this.a_endFrame = this.frames[1];
        this.a_fn = 0;
        this.a_fmax = 30;
    }

    increment() {
        if (this.a_fn >= this.a_fmax) {
            //this.a_isAnimating = false;
            this.a_startFrame = this.a_endFrame;
            this.a_endFrame = this.getNextFrame();
            this.a_fn = 0;
            //return;
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
        this.increment();
        /*if (this.a_isAnimating) {
            this.increment();
        }*/
    }

    getNextFrame() {
        this.currFrame = (this.currFrame+1)%this.frames.length;
        return this.frames[this.currFrame];
    }

    render(state) {

    }

}