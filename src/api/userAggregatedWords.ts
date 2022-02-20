import { IAggregatedWord } from './../helpers/interfaces';
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
  const filter1 = `{"$and":[{"group": ${group}}, {"page": ${page}}, {"userWord.optional.wasStudied":false}]}`;
  const filter2 = `{"$and":[{"group": ${group}}, {"page": ${page}}, {"userWord":null}]}`;

  const newResponse = async (filter: string) => {
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
  const data1: IAggregatedWord[] = await newResponse(filter1);
  const data2: IAggregatedWord[] = await newResponse(filter2);

  return [...data1, ...data2];
};
