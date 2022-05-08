import Keyboard from './Keyboard.js';
import Section from './Section.js';

export default class Welcome {
  constructor() {
    this.element = null;
  }

  createElement() {
    const keyboard = new Keyboard('keyboard').createElement();

    const keyboardFunc = (body) => {
      body.append(keyboard);
    };

    this.element = new Section('welcome', 'Virtual keyboard', keyboardFunc).createElement();

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
