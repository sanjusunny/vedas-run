export class Object3D {
    constructor(name, left = 0, top = 0, w = 40, h = 40, x = 0, y = 0, z = 0, rotX = 0, rotY = 0, rotZ = 0) {
        this.name = name;

        this.left = left;
        this.top = top;
        this.w = w;
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
        this.el.style.cssText = 'position:absolute; opacity: 0.8; transform-origin: 50% 0';
        this.el.style.top = this.top + 'px';
        this.el.style.left = this.left + 'px';
        this.el.style.width = this.w + 'px';
        this.el.style.height = this.h + 'px';
        //this.el.style.transform = `translate3d(${this.x}px,${this.y}px,${this.z}px) rotate3d(${this.rotX}deg,${this.rotY}deg,${this.rotZ}deg)`;
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
        this.el.style.transform = `translateX(${this.x}px) translateY(${this.y}px) rotateX(${this.rotX}deg) rotateY(${this.rotY}deg) rotateZ(${this.rotZ}deg)`;
    }
}