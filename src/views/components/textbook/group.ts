import { MIN_PAGE } from '../../../helpers/constants';
import { authState } from '../../pages/LogIn';
import { checkUsedWords } from '../progress/checkProgress';
import { checkPage } from './completePage';
import { checkActiveBtns } from './diffStudyBtns';
import { getSoundsBnts, stopSound } from './sounds';
import { renderWords } from './WordlistCard';
import WordlistStore from './WordlistStore';

export const showNewGroup = async (e: Event, btnContainer: HTMLElement, wordsContainer: HTMLElement) => {
  Array.from(btnContainer.children).forEach((btn) => btn.classList.remove('active'));
  const button = e.target as HTMLButtonElement;
  button.classList.add('active');
  const buttonID = Number(button.id);
  WordlistStore.textbookGroup = buttonID;
  WordlistStore.textbookPage = MIN_PAGE;
  wordsContainer.innerHTML = await renderWords(buttonID, WordlistStore.textbookPage);
  getSoundsBnts();
  stopSound();

  if (authState.isAuthenticated) {
    await checkActiveBtns();
    await checkPage();
    await checkUsedWords();
  }
};
