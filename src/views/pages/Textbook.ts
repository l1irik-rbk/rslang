import { renderBtns } from './../components/textbook/renderBtns';
import { renderWords } from '../components/textbook/WordlistCard';
import { IComponent } from './../../helpers/interfaces';
import wordlistStore from '../components/textbook/WordlistStore';
import { ERROR_RATE } from '../../helpers/constants';
import { getSoundsBnts } from '../components/textbook/sounds';
import { showNewGroup } from '../components/textbook/group';
import { activatePagesBtns, showNextPage, showPrevPage, updatePagesBtns } from '../components/textbook/pages';
import { authState } from './LogIn';
import { checkPage } from '../components/textbook/completePage';
import { checkActiveBtns } from '../components/textbook/diffStudyBtns';

const Textbook: IComponent = {
  render: async () => {
    const view = `
            <section class="section textbook-section">
              <h1>Электронный учебник</h1>
              <div class="d-flex justify-content-between">
                <div id="btn_container" class="btn-container d-grid gap-2 d-md-block">
                  ${renderBtns(wordlistStore.textbookGroup)}
                </div>
                <nav id="nav_container" aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li class="page-item">
                      <button type="button" class="btn prev-btn rounded-0 page-link" disabled><span aria-hidden="true">&laquo;</span></button>
                    </li>
                    <li class="page-item">
                      <button type="button" class="btn page-btn rounded-0 page-link" disabled>
                        ${wordlistStore.textbookPage + ERROR_RATE}
                      </button>
                    </li>
                    <li class="page-item">
                      <button type="button" class="btn next-btn rounded-0 page-link"><span aria-hidden="true">&raquo;</span></button>
                    </li>
                  </ul>
                </nav>
              </div>
              <div id="words_container" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 card-group">
                ${await renderWords(wordlistStore.textbookGroup, wordlistStore.textbookPage)}
              </div>
            </section>
            
          `;

    return view;
  },
  after_render: async () => {
    const btnContainer = document.getElementById('btn_container') as HTMLElement;
    const wordsContainer = document.getElementById('words_container') as HTMLElement;
    const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
    const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
    const pageNumber = document.querySelector('.page-btn') as HTMLButtonElement;

    if (authState.isAuthenticated) await checkActiveBtns();
    if (authState.isAuthenticated) await checkPage();
    activatePagesBtns(nextBtn, prevBtn);
    getSoundsBnts();

    btnContainer.addEventListener('click', (e) => {
      showNewGroup(e, btnContainer, wordsContainer);
      updatePagesBtns(nextBtn, prevBtn, pageNumber);
    });
    prevBtn.addEventListener('click', () => {
      showPrevPage(wordsContainer, pageNumber);
      activatePagesBtns(nextBtn, prevBtn);
    });
    nextBtn.addEventListener('click', () => {
      showNextPage(wordsContainer, pageNumber);
      activatePagesBtns(nextBtn, prevBtn);
    });
  },
};

export default Textbook;
