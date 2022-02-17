import { ERROR_RATE, MAX_GROUP, MAX_PAGE, MIN_PAGE } from '../../../helpers/constants';
import { authState } from '../../pages/LogIn';
import { checkPage } from './completePage';
import { checkActiveBtns } from './diffStudyBtns';
import { getSoundsBnts, stopSound } from './sounds';
import { renderWords } from './WordlistCard';
import WordlistStore from './WordlistStore';

export const showPrevPage = async (wordsContainer: HTMLElement, pageNumber: HTMLButtonElement) => {
  WordlistStore.textbookPage--;
  wordsContainer.innerHTML = await renderWords(WordlistStore.textbookGroup, WordlistStore.textbookPage);
  pageNumber.innerHTML = `${WordlistStore.textbookPage + ERROR_RATE}`;
  getSoundsBnts();
  stopSound();

  if (authState.isAuthenticated) {
    await checkActiveBtns();
    await checkPage();
  }
};

export const showNextPage = async (wordsContainer: HTMLElement, pageNumber: HTMLButtonElement) => {
  WordlistStore.textbookPage++;
  wordsContainer.innerHTML = await renderWords(WordlistStore.textbookGroup, WordlistStore.textbookPage);
  pageNumber.innerHTML = `${WordlistStore.textbookPage + ERROR_RATE}`;
  getSoundsBnts();
  stopSound();

  if (authState.isAuthenticated) {
    await checkActiveBtns();
    await checkPage();
  }
};

export const updatePagesBtns = (
  nextBtn: HTMLButtonElement,
  prevBtn: HTMLButtonElement,
  pageNumber: HTMLButtonElement
) => {
  prevBtn.disabled = true;
  nextBtn.disabled = false;
  pageNumber.innerHTML = `${1}`;
  WordlistStore.textbookGroup === MAX_GROUP ? (nextBtn.disabled = true) : (nextBtn.disabled = false);
};

export const activatePagesBtns = (nextBtn: HTMLButtonElement, prevBtn: HTMLButtonElement) => {
  if (WordlistStore.textbookPage === MAX_PAGE) nextBtn.disabled = true;
  if (WordlistStore.textbookPage < MAX_PAGE) nextBtn.disabled = false;
  if (WordlistStore.textbookPage > MIN_PAGE) prevBtn.disabled = false;
  if (WordlistStore.textbookPage === MIN_PAGE) prevBtn.disabled = true;
};
