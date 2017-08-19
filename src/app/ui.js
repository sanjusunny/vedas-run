import {TextureManager} from "./texture-manager";

export class UI {
    static init() {
        document.getElementById('logo-bg-1').src = TextureManager.createUIBG();
        document.getElementById('logo-bg-2').src = TextureManager.createUIBG();
        document.getElementById('logo-fg').src = TextureManager.createUIFG();

        document.getElementById('btn-start').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('layer-ui').classList.add('hide');
        });
    }
}