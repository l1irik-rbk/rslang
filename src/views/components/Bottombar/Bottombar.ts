import { IComponent } from '../../../helpers/interfaces';
import { rsschoolSvg } from './rsschool-svg';
import { githubSvg } from './github-svg';
import './Bottombar.scss';

const Bottombar: IComponent = {
  render: async () => {
    const view = `
          <div class="footer py-3 bg-light">
            <div class="container d-flex footer-inner">
              <ul class="d-flex justify-content-between align-items-center">
                <li><a href="https://rs.school/js/">${rsschoolSvg}</a></li>
                <li>© 2022</li>
              </ul>
              <ul class="d-flex justify-content-between align-items-center github-links__inner">
                <li><a href="https://github.com/l1irik-rbk">l1irik-rbk<span>${githubSvg}</span></a></li>
                <li><a href="https://github.com/kchrgn">kchrgn<span>${githubSvg}</span></a></li>
                <li><a href="https://github.com/KusakinVova">KusakinVova<span>${githubSvg}</span></a></li>
              </ul>
            </div>
          </div>
        `;
    return view;
  },
  after_render: async () => {},
};

export default Bottombar;
