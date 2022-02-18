import { authState } from '../views/pages/LogIn';
import { API_URL } from './config';

export const getAggregatedWords = async (userId: string) => {
  const filter = `{"$and":[{"userWord.difficulty":"word", "userWord.optional.isDiff":true}]}`;
  const response = await fetch(`${API_URL}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter=${filter}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authState.token}`,
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  return data;
};

export const getWordsWithoutStudied = async (userId: string, group: number, page: number) => {
  const filter = `{"$or":[{"$and":[{"group": ${group}}, {"page": ${page}}, {"userWord":null}, {"userWord":null}]},{"userWord.optional.wasStudied":false}]}`;
  const response = await fetch(`${API_URL}/users/${userId}/aggregatedWords?wordsPerPage=20&filter=${filter}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authState.token}`,
      Accept: 'application/json',
    },
  });

  const data = (await response.json())[0].paginatedResults;
  return data;
};
