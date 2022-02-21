export interface INavbar {
  render(url: string | null): Promise<string>;
  after_render(): Promise<void>;
  setLoginState: () => void;
  setLogoutState: () => void;
}
