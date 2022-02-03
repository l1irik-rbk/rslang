import { IPage } from './../../helpers/interfaces';
const Book: IPage = {
  render: async () => {
    const view = `
            <section class="section">
                <h1>Электронный учебник</h1>
            </section>
          `;
    return view;
  },
  after_render: async () => {},
};

export default Book;
