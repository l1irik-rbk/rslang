import WordlistStore from '../components/textbook/WordlistStore';
import { IComponent } from './../../helpers/interfaces';

const Error404: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `;
    return view;
  },
  after_render: async () => {
    WordlistStore.startedFromBook = false;
  },
};
export default Error404;
