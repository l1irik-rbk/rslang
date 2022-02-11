import { renderBtns } from './../components/textbook/renderBtns';
import { renderWords } from '../components/textbook/WordlistCard';
import { IComponent, IWord } from './../../helpers/interfaces';
import wordlistStore from '../components/textbook/WordlistStore';
import { ERROR_RATE } from '../../helpers/constants';
import { getWords } from '../../api/words.api';
import { API_URL } from '../../api/config';

const Textbook: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
              <h1>Электронный учебник</h1>
              <div class="d-flex justify-content-between">
                <div id="btn_container" class="btn-container d-grid gap-2 d-md-block">
                  ${renderBtns(wordlistStore.textbookGroup)}
                </div>
                <nav id="nav_container" aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li class="page-item">
                      <button type="button" class="btn prev-btn rounded-0 page-link"><span aria-hidden="true">&laquo;</span></button>
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
    const pageBtn = document.querySelector('.page-btn') as HTMLButtonElement;

    getSoundsBnts();

    btnContainer.addEventListener('click', showNewGroup.bind(null, btnContainer, wordsContainer));
    prevBtn.addEventListener('click', showPrevPage.bind(null, wordsContainer, pageBtn));
    nextBtn.addEventListener('click', showNextPage.bind(null, wordsContainer, pageBtn));
  },
};

const showNewGroup = async (btnContainer: HTMLElement, wordsContainer: HTMLElement, e: Event) => {
  Array.from(btnContainer.children).forEach((btn) => btn.classList.remove('active'));
  const button = e.target as HTMLButtonElement;
  const buttonID = Number(button.id);
  button.classList.add('active');
  wordlistStore.textbookGroup = buttonID;
  wordsContainer.innerHTML = await renderWords(buttonID, wordlistStore.textbookPage);
  getSoundsBnts();
  stopSound();
  console.log(wordlistStore);
};

const showPrevPage = async (wordsContainer: HTMLElement, pageBtn: HTMLButtonElement) => {
  wordlistStore.textbookPage--;
  wordsContainer.innerHTML = await renderWords(wordlistStore.textbookGroup, wordlistStore.textbookPage);
  pageBtn.innerHTML = `${wordlistStore.textbookPage + ERROR_RATE}`;
  getSoundsBnts();
  stopSound();
  console.log(wordlistStore);
};

const showNextPage = async (wordsContainer: HTMLElement, pageBtn: HTMLButtonElement) => {
  wordlistStore.textbookPage++;
  wordsContainer.innerHTML = await renderWords(wordlistStore.textbookGroup, wordlistStore.textbookPage);
  pageBtn.innerHTML = `${wordlistStore.textbookPage + ERROR_RATE}`;
  getSoundsBnts();
  stopSound();
  console.log(wordlistStore);
};

const getSoundsBnts = () => {
  const soundsBtns = document.querySelectorAll('.audio');
  soundsBtns.forEach((soundBtn, index) => soundBtn.addEventListener('click', playSound.bind(null, index)));
};

const playSound = async (index: number) => {
  stopSound();
  const words: IWord[] = await getWords(wordlistStore.textbookGroup, wordlistStore.textbookPage);
  const audioWordLink: string = words[index].audio;
  const audioMeaningLink: string = words[index].audioMeaning;
  const audioExampleLink: string = words[index].audioExample;
  const tracks = [audioWordLink, audioMeaningLink, audioExampleLink];

  const audio = new Audio();
  wordlistStore.isPlaying = audio;
  let current = 0;
  audio.volume = 0.1;
  audio.src = `${API_URL}/${tracks[current]}`;

  audio.addEventListener('ended', () => {
    current++;
    if (current === tracks.length) return;
    audio.src = `${API_URL}/${tracks[current]}`;
    audio.play();
  });
  audio.play();
};

const stopSound = () => (wordlistStore.isPlaying ? wordlistStore.isPlaying.pause() : '');

export default Textbook;
