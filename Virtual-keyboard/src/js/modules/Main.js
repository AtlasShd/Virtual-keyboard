import Welcome from './Welcome.js';
import Footer from './Footer.js';

export default class Main {
  constructor() {
    this.element = null;
  }

  createElement() {
    this.element = document.createElement('main');

    new Welcome().render(this.element);
    new Footer().render(this.element);

    return this.element;
  }

  render(parentElement) {
    if (!this.element) {
      this.createElement();
    }

    parentElement.append(this.element);

    return this.element;
  }
}
