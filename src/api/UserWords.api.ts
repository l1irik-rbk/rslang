import { IUserWord, INewWord } from './../helpers/interfaces';
import { authState } from '../views/pages/LogIn';
import { API_URL } from './config';
import { getUserWord } from '../views/components/textbook/diffStudyBtns';

export const createUserWord = async (userWord: IUserWord) => {
  const response = await fetch(`${API_URL}/users/${userWord.id}/words/${userWord.wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authState.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userWord.word),
  });

  if (response.status === 417) return await updateUserWord(userWord);
  const data = await response.json();
  return data;
};

export const updateUserWord = async (userWord: IUserWord) => {
  if (
    !(userWord.word as INewWord).optional.isDiff &&
    !(userWord.word as INewWord).optional.wasStudied &&
    (userWord.word as INewWord).optional.rightAnswers === 0 &&
    (userWord.word as INewWord).optional.wrongAnswers === 0
  ) {
    await deleteUserWord(userWord.id, userWord.wordId);
    return;
  }

  const response = await fetch(`${API_URL}/users/${userWord.id}/words/${userWord.wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authState.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userWord.word),
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
  console.log(data);
  return data;
};

export const getUserWordAPI = async (userId: string, wordId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authState.token}`,
      Accept: 'application/json',
    },
  });

  if (response.status === 404) return await createUserWord(getUserWord(wordId));

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
