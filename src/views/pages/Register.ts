import { IComponent } from './../../helpers/interfaces';

const Register: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
              <h1>Pегистрация</h1>
            </section>
          `;
    return view;
  },

  after_render: async () => {},
};

export default Register;
