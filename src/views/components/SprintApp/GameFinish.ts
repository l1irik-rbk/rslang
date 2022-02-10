import { createDomNode } from '../../../helpers/utils';
import { SprintApp } from './SprintApp';

export class GameFinish {
  onRestart: () => void;
  constructor(parent: SprintApp) {
    parent.container.innerHTML = '';
    const restartButton = createDomNode(parent.container, 'button', 'Restart');
    this.onRestart = () => null;
    restartButton.onclick = () => this.onRestart();
    console.log('GameFinish constructed');
  }
}
