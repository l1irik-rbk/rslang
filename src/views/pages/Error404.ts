import { IPage } from './../../helpers/interfaces';

const Error404: IPage = {
  render: async () => {
    const view = `
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `;
    return view;
  },
  after_render: async () => {},
};
export default Error404;
