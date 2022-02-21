import { gamesSvg, statsSvg, teamSvg, textbookSvg } from './svgItems';

export const getHomeCards = () => `
    <div class="col">
      <div class="card shadow-sm h-100">
        ${gamesSvg}
        <div class="card-body">
          <h5 class="card-title">Игры</h5>
          <p class="card-text">Вам доступны две увлекателельные игры для изучения и повторения слов.</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card shadow-sm h-100">
        ${textbookSvg}
        <div class="card-body">
          <h5 class="card-title">Учебник</h5>
          <p class="card-text">Всем пользователям доступен набор слов, которые сипользуются в мини играх. У авторизированных пользователей есть возможность видеть свой прогресс, изучения конкретного слова прямо на странице учебника. Также вы можете самостоятельно помечать сложные и изученные слова.</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card shadow-sm h-100">
        ${statsSvg}
        <div class="card-body">
          <h5 class="card-title">Статистика</h5>
          <p class="card-text">Авторизованные пользователи могут просматривать статистику за текущий день.</p>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card shadow-sm h-100">
        ${teamSvg}
        <div class="card-body">
          <h5 class="card-title">Команда</h5>
          <p class="card-text">Ну а куда без нас?!</p>
          <a href="/#/team">Наша команда тут!</a>
        </div>
      </div>
    </div>
`;
