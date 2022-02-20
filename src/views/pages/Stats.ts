import { IComponent } from '../../helpers/interfaces';
import { createDomNode } from '../../helpers/utils';
import { ShortStats } from '../components/ShortStats/ShortStats';
import { authState } from './LogIn';
import WordlistStore from '../components/textbook/WordlistStore';

const Stats: IComponent = {
  render: async () => {
    const view = `
            <section class="section" id="stats-container">
            </section>
          `;
    return view;
  },
  after_render: async () => {
    const container = document.getElementById('stats-container');
    WordlistStore.startedFromBook = false;

    if (!container) return;
    if (!authState.isAuthenticated) {
      createDomNode(container, 'h3', 'Краткосрочная статистика');
      createDomNode(container, 'div', 'Для просмотра данного раздела необходима авторизация', 'alert', 'alert-danger');
      const signInLink = createDomNode(
        container,
        'a',
        'Sign In',
        'link-primary',
        'd-flex',
        'mt-3',
        'mb-5'
      ) as HTMLLinkElement;
      signInLink.href = '#/login';
      return;
    }
    ShortStats(container);
  },
};

export default Stats;
