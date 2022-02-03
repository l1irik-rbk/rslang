import { IComponent } from './../../helpers/interfaces';

const Bottombar: IComponent = {
  render: async () => {
    const view = `
        <footer class="footer">
            <div class="">
                <p>
                footer со ссылками на гитхабы авторов приложения, год создания приложения, логотип курса со ссылкой на курс. footer отображается на всех страницах приложения за исключением мини-игр
                </p>
            </div>
        </footer>
        `;
    return view;
  },
  after_render: async () => {},
};

export default Bottombar;
