import {rnd, xId} from '../utils/utils';

export function addEntity(type,parent,x,y) {
    switch(type) {
        case 'PLATE-1':

            var el = document.createElement('div');
            el.style.cssText = `left:${x}px;top:${y}px;`;
            el.className = 'e_plate-1';
            return parent.appendChild(el);

        case 'PLATE-2':

            var el = document.createElement('div');
            el.style.cssText = `position:absolute;width:10px;height:10px;background-color:green;top:${x}px;left:${y}px;`;
            el.className = 'e_plate-2';
            return parent.appendChild(el);

        case 'SEGMENT-1':

            var el = document.createElement('div');
            el.className = 'e_segment-1';
            return parent.appendChild(el);

        case 'SEGMENT-2':

            var el = document.createElement('div');
            el.className = 'e_segment-2';
            return parent.appendChild(el);
    }
}