import { createDomNode } from '../../../helpers/utils';
import { authState } from '../../pages/LogIn';
import { getUserStatistic } from '../../../api/users.statistic.api';

export const ShortStats = async (container: HTMLElement) => {
  const shortStats = await getUserStatistic(authState);

  createDomNode(container, 'h1', 'Краткосрочная статистика');

  if (shortStats.message) {
    createDomNode(container, 'div', shortStats.message, 'alert', 'alert-warning');
    return;
  }

  const sprintCard = createDomNode(container, 'div', '', 'card', 'mb-3', 'text-dark', 'bg-light');
  const sprintCardBody = createDomNode(sprintCard, 'div', '', 'card-body');
  createDomNode(sprintCardBody, 'h5', 'Мини игра "Спринт"', 'card-title');
  const sprintStat = shortStats.optional.sprintShortStat;
  createDomNode(sprintCardBody, 'p', `Новых слов за день: ${sprintStat.newWords}`, 'card-text');
  const totalSprintAnswers = sprintStat.rightWords + sprintStat.wrongWords;
  let percentSprintRightWords = Math.round((100 * sprintStat.rightWords) / totalSprintAnswers);
  if (!percentSprintRightWords) percentSprintRightWords = 0;
  createDomNode(sprintCardBody, 'p', `Верные ответы: ${percentSprintRightWords}%`, 'card-text');
  createDomNode(sprintCardBody, 'p', `Серия верных ответов: ${sprintStat.longestSeries}`, 'card-text');

  const audioCallCard = createDomNode(container, 'div', '', 'card', 'mb-3', 'text-dark', 'bg-light');
  const audioCallCardBody = createDomNode(audioCallCard, 'div', '', 'card-body');
  createDomNode(audioCallCardBody, 'h5', 'Мини игра "Аудиовызов"', 'card-title');
  const audioCallStat = shortStats.optional.audioCallShortStat;
  createDomNode(audioCallCardBody, 'p', `Новых слов за день: ${audioCallStat.newWords}`, 'card-text');
  const totalAudioCallAnswers = audioCallStat.rightWords + audioCallStat.wrongWords;
  let percentAudioCallRightWords = Math.round((100 * audioCallStat.rightWords) / totalAudioCallAnswers);
  if (!percentAudioCallRightWords) percentAudioCallRightWords = 0;
  createDomNode(audioCallCardBody, 'p', `Верные ответы: ${percentAudioCallRightWords}%`, 'card-text');
  createDomNode(audioCallCardBody, 'p', `Серия верных ответов: ${audioCallStat.longestSeries}`, 'card-text');

  const wordCard = createDomNode(container, 'div', '', 'card', 'mb-3', 'text-dark', 'bg-light');
  const wordCardBody = createDomNode(wordCard, 'div', '', 'card-body');
  createDomNode(wordCardBody, 'h5', 'Слова по всем играм', 'card-title');
  const wordStat = shortStats.optional.wordShortStat;
  createDomNode(wordCardBody, 'p', `Новых слов за день: ${audioCallStat.newWords + sprintStat.newWords}`, 'card-text');
  const totalRightWord = sprintStat.rightWords + audioCallStat.rightWords;
  const totalWords = totalSprintAnswers + totalAudioCallAnswers;
  let percentWordRightWords = Math.round((100 * totalRightWord) / totalWords);
  if (!percentWordRightWords) percentWordRightWords = 0;
  createDomNode(wordCardBody, 'p', `Верные ответы: ${percentWordRightWords}%`, 'card-text');
  createDomNode(wordCardBody, 'p', `Изучено слов: ${wordStat.learnedWords}`, 'card-text');
};
