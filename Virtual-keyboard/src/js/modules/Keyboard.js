import Key from './Key.js';
import keysArray from '../services/keysArray.js';
import alphabet from '../services/alphabet.js';

export default class Keyboard {
  constructor(name, input = null) {
    this.name = name;
    this.keys = {};
    this.input = input;
    this.lang = window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'eng';
    this.shift = false;
  }

  createElement() {
    const arrOfKeys = keysArray;

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
    const keysOfKeys = Object.keys(keys);

    const downKeys = {};

    const enterValue = (key) => {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      const text = input.value.substring(0, start) + key.innerHTML + input.value.substring(end);
      input.value = text;

      input.selectionEnd = start === end ? end + 1 : start + 1;
      input.selectionStart = input.selectionEnd;
    };

    const setLang = (language) => {
      const secondLanguage = (language === 'eng') ? 'rus' : 'eng';

      keysOfKeys.forEach((i) => {
        const k = keys[i];
        if (k.dataset.func === 'false') {
          const indexOf = alphabet[language].indexOf(k.innerHTML.toLowerCase());

          let valueOf = alphabet[secondLanguage][indexOf];
          if (this.shift) {
            valueOf = valueOf.toUpperCase();
          }

          console.log(indexOf, valueOf);
          k.innerHTML = valueOf;
        }
      });
      window.localStorage.setItem('lang', secondLanguage);

      return secondLanguage;
    };
    if (this.lang === 'rus') {
      this.lang = setLang('eng');
    }

    const setShift = (shif) => {
      keysOfKeys.forEach((j) => {
        const k = keys[j];

        if (k.dataset.func === 'false') {
          if (shif) {
            k.innerHTML = k.innerHTML.toLowerCase();
          } else {
            k.innerHTML = k.innerHTML.toUpperCase();
          }
        }
      });

      return !shif;
    };

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      const key = document.querySelector(`[data-endata="${e.code}"]`);

      if (!key) {
        return;
      }

      if (key.dataset.func === 'false') {
        enterValue(key);
      } else {
        downKeys[e.code] = true;
        if (downKeys.ControlLeft === true && downKeys.AltLeft === true) {
          this.lang = setLang(this.lang);
        } else if (e.code === 'CapsLock') {
          this.shift = setShift(this.shift);
        }
      }

      key.classList.add('active');
    });

    document.addEventListener('keyup', (e) => {
      e.preventDefault();

      if (e.code === 'CapsLock' && this.shift) {
        return;
      }

      const key = document.querySelector(`[data-endata="${e.code}"]`);

      key.classList.remove('active');
      downKeys[e.code] = false;
    });

    keysOfKeys.forEach((i) => {
      const key = keys[i];

      if (key.dataset.func === 'false') {
        key.addEventListener('click', () => {
          enterValue(key);

          input.focus();
        });
      } else if (key.dataset.endata === 'CapsLock') {
        key.addEventListener('click', () => {
          this.shift = setShift(this.shift);
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
