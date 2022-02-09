import { IComponent } from '../../helpers/interfaces';
import { renderWords } from '../components/wordlist/WordlistCard';
import wordlistStore from '../components/wordlist/WordlistStore';

const Wordlist: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
                <h1>Список слов</h1>
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li class="page-item page-link page-number">1</li>
                    <li class="page-item">
                      <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 card-group">
                  ${await renderWords()}
                </div>
            </section>
          `;
    return view;
  },
  after_render: async () => {
    console.log(wordlistStore.carsPage);
  },
};

export default Wordlist;
