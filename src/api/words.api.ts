import { API_URL } from './config';

export const getWords = async (group: number, page: number) => {
  const response = await fetch(`${API_URL}/words?group=${group}&page=${page}`);
  const data = await Promise.all(await response.json());
  console.log(data);
  return data;
};
