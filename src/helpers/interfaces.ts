export interface IRequest {
  [key: string]: null | string;
}

export interface IComponent {
  render(): Promise<string>;
  after_render(): Promise<void>;
}

export interface IRouter {
  [key: string]: IComponent;
}

export interface INavbar extends IComponent {
  setLoginState: () => void;
  setLogoutState: () => void;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IBtnText {
  [key: string]: string;
}

export interface IWordlistStore {
  textbookPage: number;
  textbookGroup: number;
  isPlaying: HTMLAudioElement;
}

export interface IUserWord {
  id: string;
  wordId: string;
  word?: INewWord;
}

export interface INewWord {
  difficulty: string;
  optional: IOptional;
}

interface IOptional {
  [key: string]: boolean | number;
}

export interface IGetUserWords extends IUserWord {
  difficulty: string;
  optional: IOptional;
}

export interface IAggregated {
  paginatedResults: IAggregatedWord[];
  totalCount: ICount[];
}

interface ICount {
  count: number;
}

export interface IAggregatedWord extends IWord {
  _id: string;
  userWord: INewWord;
}

export interface IWord {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export interface ISprintPair extends IWord {
  testedAnswer: string;
  isTruePair: boolean;
  userAnswer: boolean;
}
