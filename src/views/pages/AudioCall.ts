import { IComponent } from '../../helpers/interfaces';

const AudioCall: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
                <h1>Аудиовызов</h1>
            </section>
          `;
    return view;
  },
  after_render: async () => {},
};

export default AudioCall;