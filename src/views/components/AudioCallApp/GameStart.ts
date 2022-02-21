import { createDomNode } from '../../../helpers/utils';
import { AudioCallApp } from './AudioCallApp';
import { LevelSelector } from './LevelSelector';
import { getWords } from '../../../api/sprint.api';
import { IWord } from '../../../helpers/interfaces';
import { getArrayRandomInt } from './getRandomInt';
import WordlistStore from '../textbook/WordlistStore';
import { authState } from '../../pages/LogIn';
import { getWordsWithoutStudied } from '../../../api/userAggregatedWords';

export class GameStart {
  onMain: () => void;
  parent: AudioCallApp;

  constructor(parent: AudioCallApp) {
    this.parent = parent;
    parent.container.innerHTML = '';
    parent.totalPoints = 0;

    createDomNode(parent.container, 'h1', 'Аудиовызов');
    createDomNode(
      parent.container,
      'h6',
      'Выберите из предложенных вариантов ответа правильный перевод слова, который услышите'
    );
    createDomNode(parent.container, 'p', 'Используйте мышь или клавиши от 1 до 5 для выбора ответа');
    createDomNode(parent.container, 'p', 'Клавишу пробел для проигрывания слова');
    createDomNode(parent.container, 'p', 'Клавишу Enter для перехода к следующему слову');
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

    const startButton = createDomNode(parent.container, 'button', 'Старт', 'btn', 'btn-primary') as HTMLButtonElement;
    this.onMain = () => null;
    startButton.onclick = async () => {
      startButton.disabled = true;
      startButton.innerText = 'Загрузка...  ';
      createDomNode(startButton, 'span', '', 'spinner-border', 'spinner-border-sm');
      await this.createWordList();
      this.onMain();
    };
  }

  async createWordList() {
    const PAGE_NUMBERS = 29;

    let res: Array<IWord>;
    if (this.parent.startedFromBook) {
      if (authState.isAuthenticated) {
        res = await getWordsWithoutStudied(authState.userId, WordlistStore.textbookGroup, WordlistStore.textbookPage);
      } else {
        res = await getWords(WordlistStore.textbookGroup, WordlistStore.textbookPage);
      }
    } else {
      res = await getWords(this.parent.wordsGroup, Math.round(Math.random() * PAGE_NUMBERS));
    }

    this.parent.wordList = res.map((item: IWord, index: number) => {
      return {
        ...item,
        testAnswerList: getArrayRandomInt(5, 0, res.length, index).map((elem) => res[elem].wordTranslate),
        userAnswer: false,
      };
    });
  }
}
