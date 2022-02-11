import { TEXTBOOK_BTNS_TEXT } from '../../../helpers/constants';
import { authState } from '../../pages/LogIn';

export const renderBtns = (textbookGroup: number): string =>
  Object.values(TEXTBOOK_BTNS_TEXT)
    .map((value, index) => getBtn(value, index, textbookGroup))
    .join('\n');

const getBtn = (text: string, id: number, textbookGroup: number): string => {
  const activeClass = id === textbookGroup ? 'active' : '';
  if (id !== 6 && !authState.isAuthenticated) {
    return `<button id="${id}" type="button" class="btn btn-outline-primary ${activeClass}">${text}</button>`;
  } else if (authState.isAuthenticated) {
    return `<button id="${id}" type="button" class="btn btn-outline-primary ${activeClass}">${text}</button>`;
  }
  return '';
};
