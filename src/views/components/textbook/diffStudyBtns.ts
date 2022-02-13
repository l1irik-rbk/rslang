import { createUserWord, getUserWords, updateUserWord } from '../../../api/UserWords.api';
import { classes, MAX_GROUP, options } from '../../../helpers/constants';
import { authState } from '../../pages/LogIn';
import { IUserWord, IGetUserWords } from './../../../helpers/interfaces';
import { checkPage } from './completePage';
import WordlistStore from './WordlistStore';

export const getDifficultBtns = (difficultBtns: NodeListOf<HTMLButtonElement>) => {
  difficultBtns.forEach((btn) => btn.addEventListener('click', addNewDifficultWord));
};

export const getStudyBtn = (studyBtns: NodeListOf<HTMLButtonElement>) => {
  studyBtns.forEach((btn) => btn.addEventListener('click', addNewStudyWord));
};

export const addNewDifficultWord = async (e: Event) => {
  const btn = e.target as HTMLButtonElement;

  if (btn.classList.contains('btn-danger')) {
    deleteDifficultWord(btn);
    return;
  }

  btn.classList.add(...classes.difficultBtn);
  const btnID = btn.id.split('-')[1];
  const optionStatus = true;

  const userWord: IUserWord = {
    id: authState.userId,
    wordId: btnID,
    word: { difficulty: 'word', optional: { [`${options.difficultBtn}`]: true, wasStudied: false } },
  };
  await createUserWord(userWord, options.difficultBtn, optionStatus);
  await checkPage();
};

export const addNewStudyWord = async (e: Event) => {
  const btn = e.target as HTMLButtonElement;
  btn.classList.add(...classes.studyBtns);
  const btnID = btn.id.split('-')[1];
  const optionStatus = false;

  const userWord: IUserWord = {
    id: authState.userId,
    wordId: btnID,
    word: { difficulty: 'word', optional: { isDiff: false, [`${options.studyBtns}`]: true } },
  };
  await createUserWord(userWord, options.studyBtns, optionStatus);
  await checkPage();
};

export const checkActiveBtns = async () => {
  const difficultBtns = document.querySelectorAll('.difficult-btn') as NodeListOf<HTMLButtonElement>;
  const studyBtns = document.querySelectorAll('.study-btn') as NodeListOf<HTMLButtonElement>;
  const userWords: IGetUserWords[] = await getUserWords(authState.userId);

  difficultBtns.forEach((btn) => {
    activateBtns(btn, userWords, options.difficultBtn, classes.difficultBtn);
  });

  studyBtns.forEach((btn) => {
    activateBtns(btn, userWords, options.studyBtns, classes.studyBtns);
  });

  getDifficultBtns(difficultBtns);
  getStudyBtn(studyBtns);
};

export const activateBtns = (btn: HTMLButtonElement, userWords: IGetUserWords[], option: string, classes: string[]) => {
  const btnID = btn.id.split('-')[1];
  userWords.find((word) => {
    if (word.wordId === btnID && word.optional[option]) {
      btn.classList.add(...classes);
    }
  });
};

export const deleteDifficultWord = async (btn: HTMLButtonElement) => {
  btn.classList.remove(...classes.difficultBtn);
  const btnID = btn.id.split('-')[1];
  const card = document.getElementById(`col-${btnID}`) as HTMLElement;
  const optionStatus = false;

  const userWord: IUserWord = {
    id: authState.userId,
    wordId: btnID,
  };

  await updateUserWord(userWord, options.difficultBtn, optionStatus);
  WordlistStore.textbookGroup === MAX_GROUP ? card.remove() : '';
};
