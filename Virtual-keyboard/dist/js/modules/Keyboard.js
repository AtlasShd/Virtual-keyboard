import Key from './Key.js';
import keysArray from '../services/keysArray.js';

export default class Keyboard {
  constructor(name, input = null) {
    this.name = name;
    this.keys = {};
    this.input = input;
    this.lang = window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'eng';
    this.capsLock = false;
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
          eng, engShift, rus, rusShift, func, size, id, color,
        } = oneRow[j];

        const key = new Key(this.name, func, size, this.input, id, color, eng, engShift, rus, rusShift)
          .render(row);
        this.keys[id] = key;
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

      const text = input.value.substring(0, start) + key.innerText + input.value.substring(end);
      input.value = text;

      input.selectionEnd = start === end ? end + 1 : start + 1;
      input.selectionStart = input.selectionEnd;
    };

    const setLang = (language) => {
      const secondLanguage = (language === 'eng') ? 'rus' : 'eng';

      let dataItem;

      if ((this.shift && !this.capsLock) || (this.shift && this.capsLock)) {
        dataItem = `data-${secondLanguage}shift`;
      } else {
        dataItem = `data-${secondLanguage}`;
      }

      keysOfKeys.forEach((i) => {
        const k = keys[i];

        if (k.dataset.func === 'true') {
          return;
        }

        let attribute;

        if (this.capsLock && !this.shift) {
          attribute = k.getAttribute(dataItem).toUpperCase();
        } else if (this.capsLock && this.shift) {
          attribute = k.getAttribute(dataItem).toLowerCase();
        } else {
          attribute = k.getAttribute(dataItem);
        }

        k.innerHTML = attribute;
      });

      window.localStorage.setItem('lang', secondLanguage);

      return secondLanguage;
    };
    if (this.lang === 'rus') {
      this.lang = setLang('eng');
    }

    const setCapsLock = (caps) => {
      keysOfKeys.forEach((j) => {
        const k = keys[j];

        if (k.dataset.func === 'true') {
          return;
        }

        if ((!caps && !this.shift) || (caps && this.shift)) {
          k.innerHTML = k.innerHTML.toUpperCase();
        } else {
          k.innerHTML = k.innerHTML.toLowerCase();
        }
      });

      return !caps;
    };

    const setShift = (shif) => {
      let dataItem;

      if ((this.capsLock && !shif) || (!this.capsLock && !shif)) {
        dataItem = `data-${this.lang}shift`;
      } else {
        dataItem = `data-${this.lang}`;
      }

      keysOfKeys.forEach((j) => {
        const k = keys[j];

        if (k.dataset.func === 'true') {
          return;
        }

        let attribute;

        if (this.capsLock && !shif) {
          attribute = k.getAttribute(dataItem).toLowerCase();
        } else if (this.capsLock && shif) {
          attribute = k.getAttribute(dataItem).toUpperCase();
        } else {
          attribute = k.getAttribute(dataItem);
        }

        k.innerHTML = attribute;
      });

      return !shif;
    };

    document.addEventListener('keydown', (e) => {
      e.preventDefault();

      const keydown = e.code;
      const key = document.querySelector(`#${keydown}`);

      if (!key) {
        return;
      }

      if ((keydown === 'ShiftLeft' || keydown === 'ShiftRight') && this.shift) {
        return;
      }

      if (key.dataset.func === 'false') {
        enterValue(key);
      } else {
        downKeys[keydown] = true;
        if (downKeys.ControlLeft === true && downKeys.AltLeft === true) {
          this.lang = setLang(this.lang);
        } else if (keydown === 'CapsLock') {
          this.capsLock = setCapsLock(this.capsLock);
        } else if (keydown === 'ShiftLeft' || keydown === 'ShiftRight') {
          if (!this.shift) {
            this.shift = setShift(this.shift);
          }
        } else {
          console.log(keydown, 1);
        }
      }

      key.classList.add('active');
    });

    document.addEventListener('keyup', (e) => {
      const keyup = e.code;

      if (keyup === 'CapsLock' && this.capsLock) {
        return;
      }

      if (keyup === 'ShiftLeft' || keyup === 'ShiftRight') {
        if (this.shift) {
          this.shift = setShift(this.shift);
        }
      }

      const key = document.querySelector(`#${keyup}`);

      key.classList.remove('active');
      downKeys[keyup] = false;
    });

    keysOfKeys.forEach((i) => {
      const key = keys[i];

      if (key.dataset.func === 'false') {
        key.addEventListener('click', () => {
          enterValue(key);

          input.focus();
        });
      } else if (key.id === 'CapsLock') {
        key.addEventListener('click', () => {
          this.capsLock = setShift(this.capsLock);
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
