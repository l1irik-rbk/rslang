import { GameStart } from './GameStart';
import { GameMain } from './GameMain';
import { IAudioCallList } from './IAudioCallList';
import { GameFinish } from './GameFinish';
import './AudioCallApp.scss';

export class AudioCallApp {
  container: HTMLElement;
  startedFromBook: boolean;
  level: number;
  wordList: Array<IAudioCallList>;
  rightAnswerQueueMax: number;
  totalPoints: number;
  newWordsCounter: number;
  learnedWordsCounter: number;

  constructor(container: HTMLElement, startedFromBook: boolean) {
    this.container = container;
    this.startedFromBook = startedFromBook;
    this.wordList = [];
    this.level = 0;
    this.rightAnswerQueueMax = 0;
    this.totalPoints = 0;
    this.newWordsCounter = 0;
    this.learnedWordsCounter = 0;

    this.start();
  }

  private start() {
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
