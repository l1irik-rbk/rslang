import { IComponent } from '../../helpers/interfaces';
const LogIn: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
                <h1>Авторизация</h1>
            </section>
          `;
    return view;
  },

  after_render: async () => {},
};

export default LogIn;
