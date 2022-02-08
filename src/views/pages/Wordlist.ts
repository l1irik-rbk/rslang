import { IComponent } from '../../helpers/interfaces';

const Wordlist: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
                <h1>Wordlist</h1>
            </section>
          `;
    return view;
  },
  after_render: async () => {},
};

export default Wordlist;
