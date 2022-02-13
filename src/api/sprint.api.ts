import { API_URL } from './config';

const wordsRoute = `${API_URL}/words`;

export const getWords = async (group: number, page: number) => {
  const rowRespponse = await fetch(`${wordsRoute}?group=${group}&page=${page}`);
  const res = await rowRespponse.json();
  return res;
};
