import { authState } from '../views/pages/LogIn';
import { API_URL } from './config';

export const getAggregatedWords = async (userId: string) => {
  const response = await fetch(
    `${API_URL}/users/${userId}/aggregatedWords?wordsPerPage=3600&filter={"$and":[{"userWord.difficulty":"word", "userWord.optional.isDiff":true}]}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authState.token}`,
        Accept: 'application/json',
      },
    }
  );

  const data = await response.json();
  return data;
};
