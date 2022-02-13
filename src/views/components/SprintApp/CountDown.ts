import { createDomNode } from '../../../helpers/utils';

export class CountDown {
  timeView: HTMLElement | undefined;
  duration: number;
  onTime: () => void;

  constructor(container: HTMLElement, duration: number) {
    this.timeView = createDomNode(container, 'h5', `Время: ${duration}`);
    this.duration = duration;
    this.onTime = () => undefined;
  }
  start() {
    let timeValue = this.duration;
    const timeUpdate = () => {
      if (timeValue > 0) {
        timeValue -= 1;
        if (this.timeView) {
          this.timeView.innerText = 'Время: ' + timeValue.toString();
          setTimeout(timeUpdate, 1000);
          return;
        }
      }
      this.onTime();
    };
    setTimeout(timeUpdate, 1000);
  }
  destroy() {
    this.timeView = undefined;
    this.onTime = () => undefined;
  }
}
