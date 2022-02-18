import { IGetUserWords } from './../../../helpers/interfaces';
import { getUserWords } from '../../../api/UserWords.api';
import { authState } from '../../pages/LogIn';
import { typeOfAnswer } from '../../../helpers/constants';
import { renderProgress } from './renderProgress';

export const checkUsedWords = async () => {
  const userWords: IGetUserWords[] = await getUserWords(authState.userId);
  const cards = document.querySelectorAll('.card-group') as NodeListOf<HTMLElement>;

  changeMessage(userWords, cards);
  // cards.forEach((card) => {
  //   const cardID = card.id.split('-')[1];
  //   userWords.find((word) => {
  //     if (
  //       word.wordId === cardID &&
  //       (word.optional.correctAnswersInARow || word.optional.rightAnswers || word.optional.wrongAnswers)
  //     ) {
  //       (card.querySelector('.word-progress') as HTMLElement).innerHTML = renderProgress(word.wordId);
  //     }
  //   });
  // });

  const correctAnswers = document.querySelectorAll('.correct-answers') as NodeListOf<HTMLElement>;
  const wrongAnswers = document.querySelectorAll('.wrong-answers') as NodeListOf<HTMLElement>;
  const inARowAnswers = document.querySelectorAll('.row-answers') as NodeListOf<HTMLElement>;

  showAnswers(userWords, correctAnswers, typeOfAnswer.correctAnswers);
  showAnswers(userWords, wrongAnswers, typeOfAnswer.wrongAnswers);
  showAnswers(userWords, inARowAnswers, typeOfAnswer.inARowAnswers);
};

const changeMessage = (userWords: IGetUserWords[], cards: NodeListOf<HTMLElement>) => {
  cards.forEach((card) => {
    const cardID = card.id.split('-')[1];
    userWords.find((word) => {
      if (
        word.wordId === cardID &&
        (word.optional.correctAnswersInARow || word.optional.rightAnswers || word.optional.wrongAnswers)
      ) {
        (card.querySelector('.word-progress') as HTMLElement).innerHTML = renderProgress(word.wordId);
      }
    });
  });
};

const showAnswers = (userWords: IGetUserWords[], elements: NodeListOf<HTMLElement>, answerType: string) => {
  Array.from(elements).forEach((element) => {
    const elementID = element.id.split('-')[1];
    userWords.find((word) => {
      if (word.wordId === elementID) {
        element.innerText = `${word.optional[answerType]}`;
      }
    });
  });
};
