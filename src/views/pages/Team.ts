import { IComponent } from './../../helpers/interfaces';
import WordlistStore from '../components/textbook/WordlistStore';

const Team: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
              <h1>Наша команда</h1>
              
            </section>
        `;
    return view;
  },
  after_render: async () => {
    WordlistStore.startedFromBook = false;
  },
};

export default Team;
