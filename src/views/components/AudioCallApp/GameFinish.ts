import { createDomNode } from '../../../helpers/utils';
import { AudioCallApp } from './AudioCallApp';
import { API_URL } from '../../../api/config';
import { IAudioCallList } from '../../../helpers/interfaces';
import { IUserStatistic } from '../../../helpers/interfaces';
import { PlayIcon } from './PlayIcon';
import { getUserStatistic, updateUserStatistic } from '../../../api/users.statistic.api';
import { authState } from '../../pages/LogIn';

export class GameFinish {
  onRestart: () => void;
  onBack: () => void;

  constructor(parent: AudioCallApp) {
    parent.container.innerHTML = '';

    createDomNode(parent.container, 'h1', 'Аудиовызов');

    const trueAnswers = parent.wordList.filter((item) => item.userAnswer);
    const falseAnswers = parent.wordList.filter((item) => !item.userAnswer);

    if (parent.wordList.length > 0) {
      createDomNode(parent.container, 'h3', `Результат игры: ${parent.totalPoints} очков`);

      this.addWordList(parent.container, trueAnswers, 'Знаю:');
      this.addWordList(parent.container, falseAnswers, 'Не знаю:');

      if (authState.isAuthenticated)
        this.saveStatistics(
          trueAnswers.length,
          falseAnswers.length,
          parent.rightAnswerQueueMax,
          parent.newWordsCounter,
          parent.learnedWordsCounter
        );
    } else {
      createDomNode(parent.container, 'div', 'Слова для запуска игры отсутствуют', 'alert', 'alert-primary', 'mt-5');
    }

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
  async saveStatistics(
    rightWords: number,
    wrongWords: number,
    longestSeries: number,
    newWords: number,
    learnedWords: number
  ) {
    const res = await getUserStatistic(authState);
    const now = new Date();
    const date = `${now.getFullYear()}.${now.getMonth()}.${now.getDate()}`;

    if (!res.message) {
      const stat = res as IUserStatistic;
      const audioCallStat = stat.optional.audioCallShortStat;
      const wordStat = stat.optional.wordShortStat;
      if (audioCallStat.lastUpdate === date) {
        audioCallStat.newWords += newWords;
        audioCallStat.rightWords += rightWords;
        audioCallStat.wrongWords += wrongWords;
        audioCallStat.longestSeries =
          Number(audioCallStat.longestSeries) >= longestSeries ? audioCallStat.longestSeries : longestSeries;
      } else {
        audioCallStat.lastUpdate = date;
        audioCallStat.newWords = newWords;
        audioCallStat.rightWords = rightWords;
        audioCallStat.wrongWords = wrongWords;
        audioCallStat.longestSeries = longestSeries;
      }

      if (wordStat.lastUpdate === date) {
        wordStat.learnedWords += learnedWords;
      } else {
        wordStat.learnedWords = learnedWords;
      }
      await updateUserStatistic(authState, stat);
    }
  }
}
