import {xId} from "./utils/utils";
import {state} from "./game-state";

export class UI {
    static init() {
        if (xId('layer-ui')) {
            if(!state.intro) xId('layer-ui').style.display = 'none';

            xId('btn-start').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                document.body.classList.add('in-game');
                xId('layer-ui').classList.add('ui-hide');
                setTimeout(() => state.game.startLoop(), 750);
            });
        }
    }
}