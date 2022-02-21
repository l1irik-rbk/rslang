import { authState } from '../../pages/LogIn';
import { INavbar } from './../../../helpers/interfaces';
import { homeSvg } from './home-svg';
import './Navbar.scss';

let loginStateElement: null | HTMLElement;

const Navbar: INavbar = {
  render: async (url) => {
    const links = [
      { url: '', href: '/#', class: 'nav-link px-2 text-white home-link', content: homeSvg },
      { url: 'textbook', href: '/#/textbook', class: 'nav-link px-2 text-white', content: 'Учебник' },
      { url: 'audiocall', href: '/#/audiocall', class: 'nav-link px-2 text-white', content: 'Аудиовызов' },
      { url: 'sprint', href: '/#/sprint', class: 'nav-link px-2 text-white', content: 'Спринт' },
      { url: 'stats', href: '/#/stats', class: 'nav-link px-2 text-white', content: 'Статистика' },
    ];
    let view = `
      <nav class="p-3 bg-dark text-white">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 menu">`;
    links.forEach(
      (e) =>
        (view += `<li><a href='${e.href}' class='${e.class} ${e.url === url ? 'active' : ''}'>${e.content}</a></li>`)
    );
    view += `</ul>
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
