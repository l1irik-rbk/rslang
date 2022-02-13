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

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
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

interface INewWord {
  difficulty: string;
  optional: IOptional;
}

interface IOptional {
  [key: string]: boolean;
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
