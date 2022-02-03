export interface IRequest {
  resource: null | string;
}

export interface IPage {
  render(): Promise<string>;
  after_render(): Promise<void>;
}

export interface IRouter {
  [key: string]: IPage;
}
