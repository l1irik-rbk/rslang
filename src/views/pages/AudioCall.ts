import { IComponent } from '../../helpers/interfaces';
import WordlistStore from '../components/textbook/WordlistStore';

const AudioCall: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
                <h1>Аудиовызов</h1>
            </section>
          `;
    return view;
  },
  after_render: async () => {
    WordlistStore.startedFromBook = false;
  },
};

export default AudioCall;
