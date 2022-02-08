import { CARD_STATE } from '../../helpers/constants';
import { renderCards } from '../components/textbook/card';
import { IComponent } from './../../helpers/interfaces';
import { authState } from './LogIn';

const Book: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
              <h1>Электронный учебник</h1>
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${Object.entries(CARD_STATE)
                  .map(([key, value]) => {
                    if (!authState.isAuthenticated && key !== 'cardDifficult') {
                      return renderCards(value);
                    } else if (authState.isAuthenticated) {
                      return renderCards(value);
                    }
                  })
                  .join('')}
              </div>
            </section>
          `;
    return view;
  },
  after_render: async () => {},
};

export default Book;
