import { WordCardsAudioCall } from './../AudioCallApp/WordCards';
import { WordCards } from './../SprintApp/WordCards';
import { INewWord, IGetUserWords, IUserWord } from './../../../helpers/interfaces';
import { getUserWord } from './diffStudyBtns';
import { getUserWordAPI, updateUserWord } from '../../../api/UserWords.api';
import { authState } from '../../pages/LogIn';
import { SprintApp } from '../SprintApp/SprintApp';
import { AudioCallApp } from '../AudioCallApp/AudioCallApp';

export async function addCorretAnswer(this: WordCards | WordCardsAudioCall, res: boolean) {
  const wordID = !this.parent.startedFromBook
    ? this.parent.wordList[this.currWordIndex].id
    : (this.parent.wordList[this.currWordIndex]._id as string);

  const userWord: IGetUserWords = await getUserWordAPI(authState.userId, wordID);

  if (res) {
    (userWord.optional.rightAnswers as number)++;
    (userWord.optional.correctAnswersInARow as number)++;
  } else {
    (userWord.optional.wrongAnswers as number)++;
    (userWord.optional.correctAnswersInARow as number) = 0;
    userWord.optional.wasStudied = false;
  }

  if (userWord.optional.isNew) this.parent.newWordsCounter += 1;
  userWord.optional.isNew = false;

  const newUserWord = getUserWord(wordID);
  (newUserWord.word as INewWord).optional = userWord.optional;

  const updatedUserWord = checkStudiedWord(newUserWord, this.parent);

  await updateUserWord(updatedUserWord);
}

const checkStudiedWord = (newUserWord: IUserWord, parent: SprintApp | AudioCallApp) => {
  if (
    (newUserWord.word as INewWord).optional.isDiff &&
    (newUserWord.word as INewWord).optional.correctAnswersInARow >= 5
  ) {
    (newUserWord.word as INewWord).optional.isDiff = false;
    (newUserWord.word as INewWord).optional.wasStudied = true;
    parent.learnedWordsCounter += 1;
  } else if (
    !(newUserWord.word as INewWord).optional.isDiff &&
    !(newUserWord.word as INewWord).optional.wasStudied &&
    (newUserWord.word as INewWord).optional.correctAnswersInARow >= 3
  ) {
    (newUserWord.word as INewWord).optional.wasStudied = true;
    parent.learnedWordsCounter += 1;
  }

  return newUserWord;
};
