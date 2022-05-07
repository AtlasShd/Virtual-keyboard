import Key from './Key.js';
import keysJs from '../services/keys.js';

export default class Keyboard {
  constructor(name, input = null) {
    this.name = name;
    this.keys = {};
    this.input = input;
  }

  createElement() {
    const arrOfKeys = keysJs;

    this.element = document.createElement('div');
    this.element.classList.add(this.name);

    const createTextarea = (parent, name) => {
      const textareaDiv = document.createElement('div');
      textareaDiv.classList.add(`${name}__textarea`);
      parent.append(textareaDiv);

      const textarea = document.createElement('textarea');
      textarea.setAttribute('name', 'textarea');
      textarea.setAttribute('id', 'textarea');
      textareaDiv.append(textarea);

      return textarea;
    };

    if (!this.input) {
      this.input = createTextarea(this.element, this.name);
    }

    const keyboard = document.createElement('div');
    keyboard.classList.add(`${this.name}__keyboard`);
    this.element.append(keyboard);

    for (let i = 0; i < 5; i += 1) {
      const row = document.createElement('div');
      row.classList.add(`${this.name}__row`);
      keyboard.append(row);

      const oneRow = arrOfKeys[i];

      for (let j = 0; j < oneRow.length; j += 1) {
        const {
          name, value, functional, size, endata, color,
        } = oneRow[j];

        const key = new Key(this.name, name, value, functional, size, this.input, endata, color)
          .render(row);
        this.keys[name] = key;
      }
    }

    this.addEvents();

    return this.element;
  }

  addEvents() {
    const { keys, input } = this;

    const downKeys = {};

    const addEventNotFunc = (key) => {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      const text = input.value.substring(0, start) + key.innerHTML + input.value.substring(end);
      input.value = text;

      input.selectionEnd = start === end ? end + 1 : start + 1;
      input.selectionStart = input.selectionEnd;
    };

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      const key = document.querySelector(`[data-endata="${e.code}"]`);

      if (!key) {
        return;
      }

      if (key.dataset.func === 'false') {
        addEventNotFunc(key);
      } else {
        downKeys[e.code] = true;
        if (downKeys.ControlLeft === true && downKeys.AltLeft === true) {
          console.log(123);
        }
      }

      key.classList.add('active');
    });

    document.addEventListener('keyup', (e) => {
      e.preventDefault();

      const key = document.querySelector(`[data-endata="${e.code}"]`);

      key.classList.remove('active');
      downKeys[e.code] = false;
    });

    const keysOfKeys = Object.keys(keys);

    keysOfKeys.forEach((i) => {
      const key = keys[i];

      if (key.dataset.func === 'false') {
        key.addEventListener('click', () => {
          addEventNotFunc(key);

          input.focus();
        });
      } else {
        key.addEventListener('click', () => {
          console.log('That functional button');
        });
      }
    });
  }

  render(parentElement) {
    if (!this.element) {
      this.createElement();
    }

    parentElement.append(this.element);

    return this.element;
  }
}
