import { API_URL } from './config';

const wordsRoute = `${API_URL}/words`;

export const getWords = async (group: number, page: number) => {
  const rowResponse = await fetch(`${wordsRoute}?group=${group}&page=${page}`);
  const res = await rowResponse.json();
  return res;
};
