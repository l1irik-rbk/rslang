import { authState } from '../../pages/LogIn';
import { INavbar } from '../../../helpers/interfaces';
import { homeSvg } from './home-svg';
import './Navbar.scss';

let loginStateElement: null | HTMLElement;

const Navbar: INavbar = {
  render: async () => {
    const view = `
      <nav class="p-3 bg-dark text-white">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 menu">
              <li><a href="/#" class="nav-link px-2 text-secondary home-link">${homeSvg}</a></li>
              <li><a href="/#/textbook" class="nav-link px-2 text-white textbook-link">Учебник</a></li>
              <li><a href="/#/audiocall" class="nav-link px-2 text-white audiocall-link">Аудиовызов</a></li>
              <li><a href="/#/sprint" class="nav-link px-2 text-white sprint-link">Спринт</a></li>
              <li><a href="/#/stats" class="nav-link px-2 text-white">Статистика</a></li>
            </ul>
            <div class="text-end">
              <a  class="btn btn-outline-light me-2" href="/#/login" id="login-state"></a>
            </div>
          </div>
        </div>
      </nav>
    `;

    return view;
  },
  after_render: async () => {
    loginStateElement = document.getElementById('login-state');
    if (!loginStateElement) return;
    loginStateElement.innerText = authState.isAuthenticated ? 'Logout' : 'Login';
  },
  setLoginState: () => {
    if (loginStateElement) loginStateElement.innerText = 'Login';
  },
  setLogoutState: () => {
    if (loginStateElement) loginStateElement.innerText = 'Logout';
  },
};

export default Navbar;
