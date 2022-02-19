import { IComponent } from '../../helpers/interfaces';
import { SprintApp } from '../components/SprintApp/SprintApp';
import WordlistStore from '../components/textbook/WordlistStore';

const wordsGroup = 0;
const wordsPage = 0;

const Sprint: IComponent = {
  render: async () => {
    const view = `
            <section class="section" id="container">
            </section>
          `;
    return view;
  },
  after_render: async () => {
    const container = document.getElementById('container');
    if (!container) return;
    new SprintApp(container, WordlistStore.startedFromBook, wordsGroup, wordsPage);
  },
};

export default Sprint;
