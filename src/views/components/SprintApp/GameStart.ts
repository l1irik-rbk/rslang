import { createDomNode } from '../../../helpers/utils';
import { SprintApp } from './SprintApp';
import { LevelSelector } from './LevelSelector';
import { getWords } from '../../../api/sprint.api';
import { IWord } from '../../../helpers/interfaces';
import { authState } from '../../pages/LogIn';
import { getWordsWithoutStudied } from '../../../api/userAggregatedWords';

export class GameStart {
  onMain: () => void;
  onEmpty: () => void;
  parent: SprintApp;

  constructor(parent: SprintApp) {
    this.parent = parent;
    parent.container.innerHTML = '';
    parent.totalPoints = 0;

    createDomNode(parent.container, 'h1', `Спринт`, 'text-center');
    createDomNode(
      parent.container,
      'h6',
      '«Спринт» - это тренировка для повторения заученных слов из вашего словаря.',
      'text-center'
    );
    createDomNode(parent.container, 'p', 'Используйте мышь или клавиши влево/вправо для выбора', 'text-center', 'mt-3');

    if (!parent.startedFromBook) {
      const levelSelector = LevelSelector(parent.container);
      levelSelector.onchange = (e) => {
        parent.wordsGroup = Number((e.target as HTMLInputElement).value);
      };
    } else {
      createDomNode(
        parent.container,
        'div',
        'Игра запущена из учебника. Будут использованы слова с активной страницы.',
        'alert',
        'alert-primary'
      );
    }

    const startButton = createDomNode(parent.container, 'button', 'Начать', 'btn', 'btn-primary') as HTMLButtonElement;
    this.onMain = () => null;
    this.onEmpty = () => null;
    startButton.onclick = async () => {
      startButton.disabled = true;
      startButton.innerText = 'Загрузка...  ';
      createDomNode(startButton, 'span', '', 'spinner-border', 'spinner-border-sm');
      const wordsCount = await this.createWordList();
      if (wordsCount) {
        this.onMain();
      } else {
        this.onEmpty();
      }
    };
  }

  async createWordList() {
    const PAGE_NUMBERS = 29;
    const TRUE_FRACTION = 0.4;

    let res: Array<IWord>;
    if (this.parent.startedFromBook) {
      if (authState.isAuthenticated) {
        res = await getWordsWithoutStudied(authState.userId, this.parent.wordsGroup, this.parent.wordsPage);
      } else {
        res = await getWords(this.parent.wordsGroup, this.parent.wordsPage);
      }
    } else {
      res = await getWords(this.parent.wordsGroup, Math.round(Math.random() * PAGE_NUMBERS));
    }

    const wordNumbers = res.length;
    this.parent.wordList = res.map((item: IWord) => {
      if (Math.random() <= TRUE_FRACTION) {
        return {
          ...item,
          testedAnswer: item.wordTranslate,
          isTruePair: true,
          userAnswer: false,
        };
      }
      const wordOnRus = res[Math.round(Math.random() * (wordNumbers - 1))].wordTranslate;
      return {
        ...item,
        testedAnswer: wordOnRus,
        isTruePair: wordOnRus === item.wordTranslate ? true : false,
        userAnswer: wordOnRus === item.wordTranslate ? false : true,
      };
    });
    return wordNumbers;
  }
}
