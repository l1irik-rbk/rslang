import { IComponent } from '../../helpers/interfaces';

const Stats: IComponent = {
  render: async () => {
    const view = `
            <section class="section stats">
                <h1>Страница статистики</h1>
            </section>
          `;
    return view;
  },
  after_render: async () => {},
};

export default Stats;
