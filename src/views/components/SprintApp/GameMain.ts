import { createDomNode } from '../../../helpers/utils';
import { SprintApp } from './SprintApp';
import { CountDown } from './CountDown';
import { WordCards } from './WordCards';

export class GameMain {
  onFinish: () => void;
  countDown: CountDown;
  wordCards: WordCards;

  constructor(parent: SprintApp) {
    const GAME_DURATION_IN_SEC = 60;
    parent.container.innerHTML = '';
    this.onFinish = () => null;

    createDomNode(parent.container, 'h1', `Спринт`, 'text-center');
    this.countDown = new CountDown(parent.container, GAME_DURATION_IN_SEC);
    this.countDown.onTime = () => this.onFinish();
    this.wordCards = new WordCards(parent);
    this.wordCards.onComplete = () => {
      this.countDown.destroy();
      this.onFinish();
    };

    const buttonContainer = createDomNode(parent.container, 'div', '', 'd-flex', 'justify-content-center');
    const finishButton = createDomNode(buttonContainer, 'button', 'Завершить', 'btn', 'btn-outline-primary');
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
