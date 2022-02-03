import { IComponent } from '../../helpers/interfaces';

const Sprint: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
                <h1>Спринт</h1>
            </section>
          `;
    return view;
  },
  after_render: async () => {},
};

export default Sprint;
