import { API_URL } from './config';

export const getWords = async (group: number, page: number) => {
  const response = await fetch(`${API_URL}/words?group=${group}&page=${page}`);
  const data = await Promise.all(await response.json());

  return data;
};

export const getWord = async (id: string) => {
  const response = await fetch(`${API_URL}/words/${id}`);
  const data = await response.json();

  return data;
};
