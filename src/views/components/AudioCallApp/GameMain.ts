import { createDomNode } from '../../../helpers/utils';
import { AudioCallApp } from './AudioCallApp';
import { CountDown } from './CountDown';
import { WordCardsAudioCall } from './WordCards';

export class GameMain {
  onFinish: () => void;
  countDown: CountDown;
  wordCards: WordCardsAudioCall;

  constructor(parent: AudioCallApp) {
    const GAME_DURATION_IN_SEC = 300;
    parent.container.innerHTML = '';
    this.onFinish = () => null;

    this.countDown = new CountDown(parent.container, GAME_DURATION_IN_SEC);
    this.countDown.onTime = () => this.onFinish();
    this.wordCards = new WordCardsAudioCall(parent);
    this.wordCards.onComplete = () => {
      this.countDown.destroy();
      this.onFinish();
    };

    const finishButton = createDomNode(parent.container, 'button', 'Finish', 'btn', 'btn-primary');
    finishButton.onclick = () => {
      this.countDown.destroy();
      this.onFinish();
    };

    this.startGameFlow();
  }
  async startGameFlow() {
    this.countDown.start();
    this.wordCards.start();
  }
}
