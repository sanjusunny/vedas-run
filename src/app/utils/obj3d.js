export class Object3D {
    constructor(name, left = 0, top = 0, w = 40, h = 40, x = 0, y = 0, z = 0, rotX = 0, rotY = 0, rotZ = 0, split = true) {
        this.name = name;

        this.left = left;
        this.top = top;
        this.w = w/1.5;
        this.h = h;
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotX = rotX;
        this.rotY = rotY;
        this.rotZ = rotZ;
        this.children = [];
        this.mesh = {};

        this.el = document.createElement('div');
        this.el.className = 'c_' + name;
        this.el.classList.add('c_root');
        this.el.style.cssText = 'position:absolute; transform-origin: 50% 0;' + ((split) ? 'background-color: transparent !important;' : '');
        this.el.style.top = this.top + 'px';
        this.el.style.left = this.left + 'px';
        this.el.style.width = this.w + 'px';
        this.el.style.height = this.h + 'px';

        // create segments
        if (split) {
            this.seg1 = document.createElement('div');
            this.seg1.className = 'c_' + name;
            this.seg1.classList.add('c_seg','c_0');
            this.seg1.style.cssText = 'position:absolute; transform-origin: 0 0; top: 0px; left: 0px;';
            this.seg1.style.width = this.w + 'px';
            this.seg1.style.height = this.h + 'px';
            this.seg1.style.transform = 'rotateY(60deg)';

            this.seg2 = document.createElement('div');
            this.seg2.className = 'c_' + name;
            this.seg2.classList.add('c_seg','c_1');
            this.seg2.style.cssText = 'position:absolute; transform-origin: 0 0; top: 0px; left: 0px;';
            this.seg2.style.width = this.w + 'px';
            this.seg2.style.height = this.h + 'px';
            this.seg2.style.transform = 'rotateY(-60deg)';
            this.seg2.style.filter = 'brightness(80%)';

            this.el.appendChild(this.seg1);
            this.el.appendChild(this.seg2);
        }
    }

    addChild(child) {
        this.el.appendChild(child.el);
        this.children.push(child);
        this.mesh[child.name] = child;
        return child;
    }

    transform(matrix) {
        this.x = matrix[0];
        this.y = matrix[1];
        this.z = matrix[2];
        this.rotX = matrix[3];
        this.rotY = matrix[4];
        this.rotZ = matrix[5];
        this.el.style.transform = `translateX(${this.x}px) translateY(${this.y}px) translateZ(${this.z}px) rotateX(${this.rotX}deg) rotateY(${this.rotY}deg) rotateZ(${this.rotZ}deg)`;
    }
}