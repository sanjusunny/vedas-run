import {TextureManager} from "./texture-manager";
import {xId} from "./utils/utils";
import {state} from "./game-state";

export class UI {
    static init() {
        if (xId('layer-ui')) {
            xId('logo-bg').src = TextureManager.createUIBG();
            xId('logo-bg-1').src = TextureManager.createUIBG();
            xId('logo-bg-2').src = TextureManager.createUIBG();
            xId('logo-fg').src = TextureManager.createUIFG();

            xId('btn-start').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                document.body.classList.add('in-game');
                xId('layer-ui').classList.add('tx-hide');
                setTimeout(() => state.game.startLoop(), 2000);
            });
        }
    }
}