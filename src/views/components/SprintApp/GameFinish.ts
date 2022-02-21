import { createDomNode } from '../../../helpers/utils';
import { SprintApp } from './SprintApp';
import { API_URL } from '../../../api/config';
import { ISprintPair, IUserStatistic } from '../../../helpers/interfaces';
import { PlayIcon } from './PlayIcon';
import { getUserStatistic, updateUserStatistic } from '../../../api/users.statistic.api';
import { authState } from '../../pages/LogIn';

export class GameFinish {
  onRestart: () => void;
  onBack: () => void;

  constructor(parent: SprintApp) {
    parent.container.innerHTML = '';

    createDomNode(parent.container, 'h1', `Спринт`, 'text-center');

    const trueAnswers = parent.wordList.filter((item) => item.userAnswer === item.isTruePair);
    const falseAnswers = parent.wordList.filter((item) => !(item.userAnswer === item.isTruePair));

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

    const restartButton = createDomNode(
      parent.container,
      'button',
      'Начать заново',
      'btn',
      'btn-primary',
      'mb-2',
      'me-2'
    );
    this.onRestart = () => null;
    restartButton.onclick = () => this.onRestart();

    const backButton = createDomNode(parent.container, 'button', 'Назад', 'btn', 'btn-primary', 'mb-2');
    this.onBack = () => null;
    backButton.onclick = () => this.onBack();
  }

  addWordList(container: HTMLElement, answers: Array<ISprintPair>, title: string) {
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
      const sprintStat = stat.optional.sprintShortStat;
      const wordStat = stat.optional.wordShortStat;
      if (sprintStat.lastUpdate === date) {
        sprintStat.newWords += newWords;
        sprintStat.rightWords += rightWords;
        sprintStat.wrongWords += wrongWords;
        sprintStat.longestSeries =
          Number(sprintStat.longestSeries) >= longestSeries ? sprintStat.longestSeries : longestSeries;
      } else {
        sprintStat.lastUpdate = date;
        sprintStat.newWords = newWords;
        sprintStat.rightWords = rightWords;
        sprintStat.wrongWords = wrongWords;
        sprintStat.longestSeries = longestSeries;
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
