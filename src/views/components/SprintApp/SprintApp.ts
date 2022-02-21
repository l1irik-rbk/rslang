import { GameStart } from './GameStart';
import { GameMain } from './GameMain';
import { GameFinish } from './GameFinish';
import { ISprintPair } from '../../../helpers/interfaces';
import { ERROR_RATE } from '../../../helpers/constants';

export class SprintApp {
  container: HTMLElement;
  startedFromBook: boolean;
  wordsGroup: number;
  wordsPage: number;
  level: number;
  wordList: Array<ISprintPair>;
  rightAnswerQueueMax: number;
  totalPoints: number;

  constructor(container: HTMLElement, startedFromBook: boolean, wordsGroup: number, wordsPage: number) {
    this.container = container;
    this.startedFromBook = startedFromBook;
    this.wordsGroup = wordsGroup;
    this.wordsPage = wordsPage;
    this.level = 0;
    this.wordList = [];
    this.rightAnswerQueueMax = 0;
    this.totalPoints = 0;

    this.start();
  }
  start() {
    const gameStart = new GameStart(this);
    gameStart.onMain = () => {
      const gameMain = new GameMain(this);
      gameMain.onFinish = () => {
        const gameFinish = new GameFinish(this);
        gameFinish.onRestart = () => {
          this.start();
        };
        gameFinish.onBack = () => {
          history.back();
        };
      };
    };
  }
}
