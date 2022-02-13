import { IUserWord } from './../helpers/interfaces';
import { authState } from '../views/pages/LogIn';
import { API_URL } from './config';

export const createUserWord = async ({ id, wordId, word }: IUserWord, option: string, optionStatus: boolean) => {
  const response = await fetch(`${API_URL}/users/${id}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authState.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });

  if (response.status === 417) return await updateUserWord({ id, wordId }, option, optionStatus);
  const data = await response.json();
  return data;
};

export const updateUserWord = async ({ id, wordId }: IUserWord, option: string, optionStatus: boolean) => {
  const word = await getUserWord(id, wordId);
  word.optional[`${option}`] = optionStatus;
  const updatedWord = { difficulty: word.difficulty, optional: word.optional };

  if (!updatedWord.optional.isDiff && !updatedWord.optional.wasStudied) {
    await deleteUserWord(id, wordId);
    return;
  }

  const response = await fetch(`${API_URL}/users/${id}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authState.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedWord),
  });

  const data = await response.json();
  return data;
};

export const getUserWords = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authState.token}`,
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  return data;
};

export const getUserWord = async (userId: string, wordId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authState.token}`,
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  return data;
};

export const deleteUserWord = async (userId: string, wordId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authState.token}`,
      Accept: 'application/json',
    },
  });

  if (response.status === 204) return 'DELETED';
};
