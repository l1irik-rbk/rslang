import { getUserWords } from '../../../api/UserWords.api';
import {
  BACKGROUND_COLOR,
  MAX_CARDS_ON_PAGE,
  MAX_GROUP,
  PAGE_NUMBER_BACKGROUND_COLOR,
  PAGE_NUMBER_COLOR,
} from '../../../helpers/constants';
import { authState } from '../../pages/LogIn';
import { IGetUserWords } from './../../../helpers/interfaces';
import WordlistStore from './WordlistStore';

export const checkPage = async () => {
  const userWords: IGetUserWords[] = await getUserWords(authState.userId);
  const cards = document.querySelectorAll('.card-wrapper');

  if (WordlistStore.textbookGroup === MAX_GROUP) {
    addStyles();
    return;
  }

  addStyles();

  let counter = 0;

  cards.forEach((card) => {
    const cardID = card.id.split('-')[1];
    userWords.find((word) =>
      word.wordId === cardID && (word.optional.isDiff || word.optional.wasStudied) ? counter++ : ''
    );
  });

  if (counter === MAX_CARDS_ON_PAGE) addStyles(true);
};

export const addStyles = (status = false) => {
  const background = document.querySelector('.textbook-section') as HTMLElement;
  const pageNumber = document.querySelector('.page-btn') as HTMLButtonElement;

  status ? (background.style.backgroundColor = BACKGROUND_COLOR) : (background.style.backgroundColor = '');
  status ? (pageNumber.style.backgroundColor = PAGE_NUMBER_BACKGROUND_COLOR) : (pageNumber.style.backgroundColor = '');
  status ? (pageNumber.style.color = PAGE_NUMBER_COLOR) : (pageNumber.style.color = '');
};
