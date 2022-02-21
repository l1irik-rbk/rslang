import { IComponent } from '../../helpers/interfaces';
import { AudioCallApp } from '../components/AudioCallApp/AudioCallApp';
import WordlistStore from '../components/textbook/WordlistStore';

const AudioCall: IComponent = {
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
    new AudioCallApp(container, WordlistStore.startedFromBook, WordlistStore.textbookGroup, WordlistStore.textbookPage);
    WordlistStore.startedFromBook = false;
  },
};

export default AudioCall;
