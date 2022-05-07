import Keyboard from './Keyboard.js';
import Section from './Section.js';

export default class Welcome {
  constructor() {
    this.element = null;
  }

  createElement() {
    const keyboard = (body) => {
      body.append(new Keyboard('keyboard').createElement());
    };

    this.element = new Section('welcome', 'Virtual keyboard', keyboard).createElement();

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
