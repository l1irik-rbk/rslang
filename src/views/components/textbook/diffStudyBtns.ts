import { createUserWord, getUserWordAPI, getUserWords, updateUserWord } from '../../../api/UserWords.api';
import { classes, firstPartID, MAX_GROUP, options } from '../../../helpers/constants';
import { authState } from '../../pages/LogIn';
import { IUserWord, IGetUserWords, INewWord } from './../../../helpers/interfaces';
import { checkPage } from './completePage';
import WordlistStore from './WordlistStore';

export const getDifficultBtns = (difficultBtns: NodeListOf<HTMLButtonElement>) => {
  difficultBtns.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      addNewWord(e, options.difficultBtn);
    })
  );
};

export const getStudyBtn = (studyBtns: NodeListOf<HTMLButtonElement>) => {
  studyBtns.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      addNewWord(e, options.studyBtns);
    })
  );
};

export const addNewWord = async (e: Event, option: string) => {
  const btn = e.target as HTMLButtonElement;
  const btnID = btn.id.split('-')[1];
  const btnClasses = option === options.difficultBtn ? classes.difficultBtn : classes.studyBtns;
  const btnOption = option === options.difficultBtn ? options.difficultBtn : options.studyBtns;
  const firstPart = option === options.difficultBtn ? firstPartID.studyBtns : firstPartID.difficultBtn;
  const card = document.getElementById(`col-${btnID}`) as HTMLElement;

  if (btn.classList.contains('btn-danger')) {
    deleteWord(btn, card, btnID, btnOption, btnClasses);
    return;
  } else if (btn.classList.contains('btn-success')) {
    deleteWord(btn, card, btnID, btnOption, btnClasses);
    return;
  }

  btn.classList.add(...btnClasses);

  const userWord: IGetUserWords = await getUserWordAPI(authState.userId, btnID);
  const updatedUserWord = getUserWord(btnID, btnOption, true);
  (updatedUserWord.word as INewWord).optional.rightAnswers = userWord.optional.rightAnswers;
  (updatedUserWord.word as INewWord).optional.wrongAnswers = userWord.optional.wrongAnswers;
  (updatedUserWord.word as INewWord).optional.correctAnswersInARow = userWord.optional.correctAnswersInARow;
  console.log(userWord)
  deleteBtnsClasses(btnID, firstPart);
  await createUserWord(updatedUserWord);
  await checkPage();
  if (WordlistStore.textbookGroup === MAX_GROUP) card.remove();
};

export const getUserWord = (btnID: string, option = '', bool = false) => {
  const userWord: IUserWord = {
    id: authState.userId,
    wordId: btnID,
    word: {
      difficulty: 'word',
      optional: { isDiff: false, wasStudied: false, rightAnswers: 0, wrongAnswers: 0, correctAnswersInARow: 0 },
    },
  };

  if (option && bool) (userWord.word as INewWord).optional[`${option}`] = bool;

  return userWord;
};

const deleteWord = async (
  btn: HTMLButtonElement,
  card: HTMLElement,
  btnID: string,
  option: string,
  btnClasses: string[]
) => {
  btn.classList.remove(...btnClasses);
  const userWord: IGetUserWords = await getUserWordAPI(authState.userId, btnID);
  const updatedUserWord = getUserWord(btnID, option, false);
  (updatedUserWord.word as INewWord).optional.rightAnswers = userWord.optional.rightAnswers;
  (updatedUserWord.word as INewWord).optional.wrongAnswers = userWord.optional.wrongAnswers;

  await updateUserWord(updatedUserWord);
  await checkPage();
  if (WordlistStore.textbookGroup === MAX_GROUP) card.remove();
};

const deleteBtnsClasses = (btnID: string, firstPart: string) => {
  const btn = document.getElementById(`${firstPart}-${btnID}`) as HTMLButtonElement;
  const btnClasses = firstPart === firstPartID.difficultBtn ? classes.difficultBtn : classes.studyBtns;
  btn.classList.remove(...btnClasses);
};

export const checkActiveBtns = async () => {
  const difficultBtns = document.querySelectorAll('.difficult-btn') as NodeListOf<HTMLButtonElement>;
  const studyBtns = document.querySelectorAll('.study-btn') as NodeListOf<HTMLButtonElement>;
  const userWords: IGetUserWords[] = await getUserWords(authState.userId);

  activateBtns(difficultBtns, userWords, options.difficultBtn, classes.difficultBtn);
  activateBtns(studyBtns, userWords, options.studyBtns, classes.studyBtns);

  getDifficultBtns(difficultBtns);
  getStudyBtn(studyBtns);
};

export const activateBtns = (
  btns: NodeListOf<HTMLButtonElement>,
  userWords: IGetUserWords[],
  option: string,
  classes: string[]
) => {
  Array.from(btns).forEach((btn) => {
    const btnID = btn.id.split('-')[1];
    userWords.find((word) => {
      if (word.wordId === btnID && word.optional[option]) {
        btn.classList.add(...classes);
      }
    });
  });
};
