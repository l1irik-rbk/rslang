import { createDomNode } from '../../../helpers/utils';

export const CountDown = (container: HTMLElement, duration: number, onTime: () => void) => {
  const timeView = createDomNode(container, 'div', duration.toString());
  let timeValue = duration;

  const timeUpdate = () => {
    if (timeValue > 0) {
      timeValue -= 1;
      timeView.innerText = timeValue.toString();
      setTimeout(timeUpdate, 1000);
      return;
    }
    onTime();
  };

  setTimeout(timeUpdate, 1000);
};
