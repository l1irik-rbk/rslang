import { MAX_GROUP, MIN_GROUP } from '../../../helpers/constants';
import wordlistStore from './WordlistStore';

export const setPageAndGroup = () => {
  localStorage.setItem('textbookPage', JSON.stringify(wordlistStore.textbookPage));
  localStorage.setItem(
    'textbookGroup',
    JSON.stringify(
      wordlistStore.textbookGroup === MAX_GROUP
        ? (wordlistStore.textbookGroup = MIN_GROUP)
        : wordlistStore.textbookGroup
    )
  );
};

export const getPageAndGroup = () => {
  if (localStorage.getItem('textbookPage')) {
    wordlistStore.textbookPage = JSON.parse(localStorage.getItem('textbookPage') || '');
  }

  if (localStorage.getItem('textbookGroup')) {
    wordlistStore.textbookGroup = JSON.parse(localStorage.getItem('textbookGroup') || '');
  }
};
