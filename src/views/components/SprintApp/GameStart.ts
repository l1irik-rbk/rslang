import { createDomNode } from '../../../helpers/utils';
import { SprintApp } from './SprintApp';

import { LevelSelector } from './LevelSelector';
export class GameStart {
  onMain: () => void;

  constructor(parent: SprintApp) {
    parent.container.innerHTML = '';

    createDomNode(parent.container, 'h1', 'Sprint');
    createDomNode(parent.container, 'h6', '«Спринт» - это тренировка для повторения заученных слов из вашего словаря.');
    createDomNode(parent.container, 'p', 'Используйте мышь или клавиши влево/вправо для выбора');
    const levelSelector = LevelSelector(parent.container);
    levelSelector.onchange = (e) => {
      parent.level = Number((e.target as HTMLInputElement).value);
    };

    const startButton = createDomNode(parent.container, 'button', 'Start');
    this.onMain = () => null;
    startButton.onclick = () => this.onMain();
    console.log('GameStart constructed');
  }
}
