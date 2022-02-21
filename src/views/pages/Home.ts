import WordlistStore from '../components/textbook/WordlistStore';
import { IComponent } from './../../helpers/interfaces';
import '../components/Home/Home.scss';
import { getHomeCards } from '../components/Home/Home-cards';

const Home: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
              <h1>RSLang</h1>
              <p class="home-text">Это приложение для изучения английского языка и увеличения словарного запаса в игровой форме!</p>
              <h2>Возможности и преимущества нашего приложения</h2>
              <div class="row row-cols-1 row-cols-md-2 g-4 benefits-inner">
                ${getHomeCards()}
              </div>
            </section>
        `;
    return view;
  },
  after_render: async () => {
    WordlistStore.startedFromBook = false;
  },
};

export default Home;
