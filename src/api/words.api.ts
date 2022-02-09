import { API_URL } from './config';

export const getWords = async () => {
  const response = await fetch(`${API_URL}/words?group=0&page=0`);
  const data = await Promise.all(await response.json());
  console.log(data);
  return data;
};
