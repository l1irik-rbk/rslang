import { IComponent } from '../../helpers/interfaces';
import { AudioCallApp } from '../components/AudioCallApp/AudioCallApp';

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
    new AudioCallApp(container);
  },
};

export default AudioCall;
