import { IComponent } from '../../helpers/interfaces';
import { SprintApp } from '../components/SprintApp/SprintApp';
import WordlistStore from '../components/textbook/WordlistStore';

const Sprint: IComponent = {
  render: async () => {
    const view = `
            <section class="section  d-flex justify-content-center">
              <div class="card text-dark bg-light" style="width: 60%;">
                <div class="card-body" id="container">
                </div>
              </div>
            </section>
          `;
    return view;
  },
  after_render: async () => {
    const container = document.getElementById('container');
    if (!container) return;
    new SprintApp(container, WordlistStore.startedFromBook, WordlistStore.textbookGroup, WordlistStore.textbookPage);
    WordlistStore.startedFromBook = false;
  },
};

export default Sprint;
