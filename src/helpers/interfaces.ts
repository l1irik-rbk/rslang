export interface IRequest {
  resource: null | string;
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
