import Section from './Section.js';
import Keyboard from './Keyboard.js';

export default function createBody() {
  const body = document.querySelector('body');

  function createMainIn(element) {
    const main = document.createElement('main');

    element.prepend(main);

    return main;
  }
  const main = createMainIn(body);

  const keyboard = new Keyboard('keyboard').createElement();

  new Section('welcome', 'Virtual keyboard', keyboard).render(main);
}
