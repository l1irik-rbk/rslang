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
  const navLinks = document.querySelectorAll('.nav-link') as NodeListOf<HTMLLinkElement>;
  const audioCallLink = document.querySelector('.audiocall-link') as HTMLLinkElement;
  const sprintlink = document.querySelector('.sprint-link') as HTMLLinkElement;

  removeDisableClass(audioCallLink);
  removeDisableClass(sprintlink);

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

  if (counter === MAX_CARDS_ON_PAGE) {
    addStyles(true);
    disableGames(navLinks, audioCallLink, sprintlink);
  }
};

export const addStyles = (status = false) => {
  const background = document.querySelector('.textbook-section') as HTMLElement;
  const pageNumber = document.querySelector('.page-btn') as HTMLButtonElement;

  status ? (background.style.backgroundColor = BACKGROUND_COLOR) : (background.style.backgroundColor = '');
  status ? (pageNumber.style.backgroundColor = PAGE_NUMBER_BACKGROUND_COLOR) : (pageNumber.style.backgroundColor = '');
  status ? (pageNumber.style.color = PAGE_NUMBER_COLOR) : (pageNumber.style.color = '');
};

export const disableGames = (
  links: NodeListOf<HTMLLinkElement>,
  audioCallLink: HTMLLinkElement,
  sprintlink: HTMLLinkElement
) => {
  addDisableClass(audioCallLink);
  addDisableClass(sprintlink);

  links.forEach((link) => {
    if (!link.classList.contains('disabled') && !link.classList.contains('textbook-link')) {
      link.addEventListener('click', () => {
        removeDisableClass(audioCallLink);
        removeDisableClass(sprintlink);
      });
    }
  });
};

const addDisableClass = (link: HTMLLinkElement) => {
  link.classList.add('disabled');
};

const removeDisableClass = (link: HTMLLinkElement) => {
  link.classList.remove('disabled');
};
