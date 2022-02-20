import { GameStart } from './GameStart';
import { GameMain } from './GameMain';
import { IAudioCallList } from './IAudioCallList';
import { GameFinish } from './GameFinish';
import './AudioCallApp.scss';

export class AudioCallApp {
  container: HTMLElement;
  level: number;
  wordList: Array<IAudioCallList>;
  totalPoints: number;

  constructor(container: HTMLElement) {
    this.container = container;
    this.wordList = [];
    this.level = 0;
    this.totalPoints = 0;

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
