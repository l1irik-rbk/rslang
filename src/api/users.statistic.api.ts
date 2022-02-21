import { IAuth, IUserStatistic } from '../helpers/interfaces';
import { API_URL } from './config';

export const getUserStatistic = async (auth: IAuth) => {
  const response = await fetch(`${API_URL}/users/${auth.userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return { learnedWords: data.learnedWords, optional: data.optional };
  }
  if (response.status === 401) return { message: 'Ошибка авторизации' };
  if (response.status === 404) return { message: 'Статистика для текущего пользователя отсутствует' };
  return { message: response.statusText };
};

export const updateUserStatistic = async (auth: IAuth, userStatistic: IUserStatistic) => {
  const response = await fetch(`${API_URL}/users/${auth.userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userStatistic),
  });
  if (response.ok) return await response.json();
  if (response.status === 400) return { message: 'Некорректный запрос' };
  if (response.status === 401) return { message: 'Ошибка авторизации' };
  return response.statusText;
};

export const createUserStatistic = async (auth: IAuth) => {
  const userStatisticTemplate = {
    learnedWords: 0,
    optional: {
      sprintShortStat: {
        newWords: 0,
        rightWords: 0,
        wrongWords: 0,
        longestSeries: 0,
        lastUpdate: '',
      },
      audioCallShortStat: {
        newWords: 0,
        rightWords: 0,
        wrongWords: 0,
        longestSeries: 0,
        lastUpdate: '',
      },
      wordShortStat: {
        newWords: 0,
        rightWords: 0,
        wrongWords: 0,
        learnedWords: 0,
        lastUpdate: '',
      },
    },
  };
  updateUserStatistic(auth, userStatisticTemplate);
};

export const updateLearnedWords = async (auth: IAuth, learnedWords: number) => {
  const res = await getUserStatistic(auth);
  const now = new Date();
  const date = `${now.getFullYear()}.${now.getMonth()}.${now.getDate()}`;

  if (!res.message) {
    const stat = res as IUserStatistic;
    const wordStat = stat.optional.wordShortStat;

    if (wordStat.lastUpdate === date) {
      wordStat.learnedWords += learnedWords;
    } else {
      wordStat.lastUpdate = date;
      wordStat.learnedWords = learnedWords;
    }
    if (wordStat.learnedWords < 0) wordStat.learnedWords = 0;
    await updateUserStatistic(auth, stat);
  }
};
