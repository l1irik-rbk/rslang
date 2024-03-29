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
  startedFromBook: boolean;
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
  _id?: string;
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

export interface IAuth {
  isAuthenticated: boolean;
  userId: string;
  token: string;
}

export interface IMiniGameStatistic {
  newWords: number;
  rightWords: number;
  wrongWords: number;
  longestSeries: number;
  lastUpdate: string;
}

export interface IWordStatistic {
  newWords: number;
  rightWords: number;
  wrongWords: number;
  learnedWords: number;
  lastUpdate: string;
}

export interface IUserStatistic {
  learnedWords: number;
  optional: {
    sprintShortStat: IMiniGameStatistic;
    audioCallShortStat: IMiniGameStatistic;
    wordShortStat: IWordStatistic;
  };
}

export interface INavbar {
  render(url: string | null): Promise<string>;
  after_render(): Promise<void>;
  setLoginState: () => void;
  setLogoutState: () => void;
}

export interface IAudioCallList extends IWord {
  testAnswerList: string[];
  userAnswer: boolean;
}
