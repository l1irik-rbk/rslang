import { IComponent } from './../../helpers/interfaces';
import WordlistStore from '../components/textbook/WordlistStore';
import '../components/Team/Team.scss';
import { githubSvg } from '../components/Bottombar/github-svg';

const Team: IComponent = {
  render: async () => {
    const view = `
            <section class="section team">
              <h1>Наша команда</h1>
              <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                  <div class="card shadow-sm h-100">
                    <img src="./assets/users-8.svg" alt="member">
                    <div class="card-body">
                      <h4 class="card-title">Кирилл</h5>
                      <a href="https://github.com/l1irik-rbk">l1irik-rbk<span>${githubSvg}</span></a>
                      <small class="text-muted">Разработчик</small>
                      <ol>
                        <li>Главная страница приложения</li>
                        <li>Электронный учебник</li>
                        <li>Список слов</li>
                        <li>Прогресс изучения</li>
                        <li>Изученные слова</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card shadow-sm h-100">
                    <img src="./assets/users-1.svg" alt="member">        
                    <div class="card-body">
                      <h4 class="card-title">Андрей</h5>
                      <a href="https://github.com/kchrgn">kchrgn<span>${githubSvg}</span></a>
                      <small class="text-muted">Разработчик</small>
                      <ol>
                        <li>Авторизация</li>
                        <li>Мини-игра "Аудиовызов"</li>
                        <li>Страница статистики</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card shadow-sm h-100">
                    <img src="./assets/users-15.svg" alt="member">
                    <div class="card-body">
                      <h4 class="card-title">Владимир</h5>
                      <a href="https://github.com/KusakinVova">KusakinVova<span>${githubSvg}</span></a>
                      <small class="text-muted">Разработчик</small>
                      <ol>
                        <li>Мини-игра "Спринт"</li>
                        <li>Развертка базы данных и деплой бекенда</li>
                        <li>Настройка SASS</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        `;
    return view;
  },
  after_render: async () => {
    WordlistStore.startedFromBook = false;
  },
};

export default Team;
