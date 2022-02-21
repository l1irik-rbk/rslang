import { createDomNode } from '../../../helpers/utils';

export const LevelSelector = (container: HTMLElement) => {
  const elem = createDomNode(container, 'div');
  createDomNode(elem, 'label', 'Уровень сложности', 'mb-1');
  const selector = createDomNode(elem, 'select', '', 'form-select', 'mb-3');
  selector.innerHTML = `
    <option value="0">1</option>
    <option value="1">2</option>
    <option value="2">3</option>
    <option value="3">4</option>
    <option value="4">5</option>
    <option value="5">6</option>
  `;
  return elem;
};
