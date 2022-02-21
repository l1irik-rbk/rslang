import { createDomNode } from '../../../helpers/utils';
import { AudioCallApp } from './AudioCallApp';
import { API_URL } from '../../../api/config';
import { IAudioCallList } from './../../../helpers/interfaces';
import { PlayIcon } from './PlayIcon';

export class GameFinish {
  onRestart: () => void;
  onBack: () => void;

  constructor(parent: AudioCallApp) {
    parent.container.innerHTML = '';

    const trueAnswers = parent.wordList.filter((item) => item.userAnswer);
    const falseAnswers = parent.wordList.filter((item) => !item.userAnswer);

    createDomNode(parent.container, 'h3', `Результат игры: ${parent.totalPoints} очков`);

    this.addWordList(parent.container, trueAnswers, 'Знаю:');
    this.addWordList(parent.container, falseAnswers, 'Не знаю:');

    const restartButton = createDomNode(parent.container, 'button', 'Restart', 'btn', 'btn-primary', 'mb-2', 'me-2');
    this.onRestart = () => null;
    restartButton.onclick = () => this.onRestart();

    const backButton = createDomNode(parent.container, 'button', 'Back', 'btn', 'btn-primary', 'mb-2');
    this.onBack = () => null;
    backButton.onclick = () => this.onBack();
  }

  addWordList(container: HTMLElement, answers: Array<IAudioCallList>, title: string) {
    createDomNode(container, 'h5', `${title} ${answers.length}`);
    answers.forEach((item) => {
      const row = createDomNode(container, 'div', '');
      const playButton = createDomNode(row, 'span', '', 'btn');
      playButton.innerHTML = PlayIcon;
      playButton.onclick = () => {
        const sound = new Audio(`${API_URL}/${item.audio}`);
        sound.oncanplaythrough = () => sound.play();
      };
      createDomNode(row, 'span', ` ${item.word} - ${item.wordTranslate}`);
    });
  }
}
