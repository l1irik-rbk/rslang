import { IComponent } from './../../helpers/interfaces';

const Home: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
                <h1>Home</h1>
                <ul>
                <li>описание возможностей и преимуществ приложения</li>
                <li>раздел "О команде" с фото или аватарками и ссылками на гитхабы всех участников команды, описанием вклада в разработку приложения каждого из них. При желании данный раздел можно вынести в отдельную страницу</li>
                </ul>
            </section>
        `;
    return view;
  },
  after_render: async () => {},
};

export default Home;
