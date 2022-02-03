import { IPage } from '../../helpers/interfaces';

const Stats: IPage = {
  render: async () => {
    const view = `
            <section class="section">
                <h1>Страница статистики</h1>
            </section>
          `;
    return view;
  },
  after_render: async () => {},
};

export default Stats;
