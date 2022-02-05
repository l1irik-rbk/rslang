import { IComponent } from '../../../helpers/interfaces';

export interface INavbar extends IComponent {
  setLoginState: () => void;
  setLogoutState: () => void;
}
