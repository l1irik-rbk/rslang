import { IAggregatedWord } from './../../../helpers/interfaces';
import { API_URL } from '../../../api/config';
import { getAggregatedWords } from '../../../api/userAggregatedWords';
import { getWords } from '../../../api/words.api';
import { authState } from '../../pages/LogIn';
import { renderAuthBtns } from './authBtns';
import WordlistStore from './WordlistStore';
import { MAX_GROUP } from '../../../helpers/constants';

export const renderWords = async (group: number, page: number) => {
  const words: IAggregatedWord[] =
    group !== MAX_GROUP
      ? await getWords(group, page)
      : (await getAggregatedWords(authState.userId, page))[0].paginatedResults;
  return words.map((word) => getWordCard(word)).join('');
};

export const getWordCard = (word: IAggregatedWord) => {
  const id: string = WordlistStore.textbookGroup !== 6 ? word.id : word._id;
  const html = `
    <div id="col-${id}" class="col card-wrapper">
      <div class="card shadow-sm h-100">
        <img src="${API_URL}/${word.image}" alt="image" width="100%" height="240">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="card-title">
              ${word.word}
              <small class="text-muted">${word.transcription}</small>
            </h5>
            <span class="audio" style="cursor: pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-soundwave" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </span>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <strong class="d-inline-block mb-2 text-success">${word.wordTranslate}</strong>
          </div>
          <ul class="list-group list-group-flush border-bottom border-primary">
            <li class="list-group-item">${word.textMeaning}</li>
            <li class="list-group-item">${word.textMeaningTranslate}</li>
          </ul>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${word.textExample}</li>
            <li class="list-group-item">${word.textExampleTranslate}</li>
          </ul>
          <div class="d-flex justify-content-between align-items-center">
            ${authState.isAuthenticated ? renderAuthBtns(id) : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  return html;
};
