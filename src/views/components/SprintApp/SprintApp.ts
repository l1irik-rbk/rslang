import { GameStart } from './GameStart';
import { GameMain } from './GameMain';
import { GameFinish } from './GameFinish';

export class SprintApp {
  container: HTMLElement;
  startedFromBook: boolean;
  wordsGroup: number;
  wordsPage: number;
  level: number;

  constructor(container: HTMLElement, startedFromBook: boolean, wordsGroup: number, wordsPage: number) {
    this.container = container;
    this.startedFromBook = startedFromBook;
    this.wordsGroup = wordsGroup;
    this.wordsPage = wordsPage;
    this.level = 1;
    console.log('Sprint app constructed');
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
      };
    };
  }
}
