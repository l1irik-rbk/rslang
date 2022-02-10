import { createDomNode } from '../../../helpers/utils';
import { SprintApp } from './SprintApp';
import { CountDown } from './CountDown';

export class GameMain {
  onFinish: () => void;
  constructor(parent: SprintApp) {
    parent.container.innerHTML = '';
    const finishButton = createDomNode(parent.container, 'button', 'Finish');
    this.onFinish = () => null;

    finishButton.onclick = () => this.onFinish();
    CountDown(parent.container, 60, () => this.onFinish());

    console.log('GameMain constructed');
  }
}
