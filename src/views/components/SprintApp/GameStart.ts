import { createDomNode } from '../../../helpers/utils';
import { SprintApp } from './SprintApp';
import { LevelSelector } from './LevelSelector';
import { getWords } from '../../../api/sprint.api';
import { IWord } from '../../../helpers/interfaces';
import { authState } from '../../pages/LogIn';
import WordlistStore from '../../components/textbook/WordlistStore';
import { getWordsWithoutStudied } from '../../../api/userAggregatedWords';

export class GameStart {
  onMain: () => void;
  parent: SprintApp;

  constructor(parent: SprintApp) {
    this.parent = parent;
    parent.container.innerHTML = '';
    parent.totalPoints = 0;

    createDomNode(parent.container, 'h1', 'Sprint');
    createDomNode(parent.container, 'h6', '«Спринт» - это тренировка для повторения заученных слов из вашего словаря.');
    createDomNode(parent.container, 'p', 'Используйте мышь или клавиши влево/вправо для выбора');

    const levelSelector = LevelSelector(parent.container);
    levelSelector.onchange = (e) => {
      parent.level = Number((e.target as HTMLInputElement).value);
      console.log(parent.level);
    };

    const startButton = createDomNode(parent.container, 'button', 'Start', 'btn', 'btn-primary') as HTMLButtonElement;
    this.onMain = () => null;
    startButton.onclick = async () => {
      startButton.disabled = true;
      startButton.innerText = 'Loading...  ';
      createDomNode(startButton, 'span', '', 'spinner-border', 'spinner-border-sm');
      await this.createWordList();
      this.onMain();
    };
  }

  async createWordList() {
    const PAGE_NUMBERS = 29;
    const TRUE_FRACTION = 0.4;
    const res = !WordlistStore.startedFromBook
      ? await getWords(this.parent.level, Math.round(Math.random() * PAGE_NUMBERS))
      : await getWordsWithoutStudied(authState.userId, this.parent.level, WordlistStore.textbookPage);
    const wordNumbers = res.length;
    this.parent.wordList = res.map((item: IWord) => {
      if (Math.random() <= TRUE_FRACTION) {
        return {
          ...item,
          testedAnswer: item.wordTranslate,
          isTruePair: true,
        };
      }
      const wordOnRus = res[Math.round(Math.random() * (wordNumbers - 1))].wordTranslate;
      return {
        ...item,
        testedAnswer: wordOnRus,
        isTruePair: wordOnRus === item.wordTranslate ? true : false,
      };
    });
  }
}
