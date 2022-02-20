import { IWord } from '../../../helpers/interfaces';

export interface IAudioCallList extends IWord {
  testAnswerList: string[];
  userAnswer: boolean;
}
