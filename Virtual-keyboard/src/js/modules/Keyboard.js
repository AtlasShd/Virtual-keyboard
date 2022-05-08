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
    this.downKeys = {};
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

        const key = new Key(
          this.name,
          func,
          size,
          this.input,
          id,
          color,
          eng,
          engShift,
          rus,
          rusShift,
        ).render(row);
        this.keys[id] = key;
      }
    }

    this.addEvents();

    return this.element;
  }

  addEvents() {
    const { keys, input, downKeys } = this;
    const keysOfKeys = Object.keys(keys);

    const enterValue = (val) => {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      const text = input.value.substring(0, start) + val + input.value.substring(end);
      input.value = text;

      input.selectionEnd = start === end ? end + 1 : start + 1;
      input.selectionStart = input.selectionEnd;
    };

    const removeBackValue = () => {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      let text;
      if (start === end) {
        text = input.value.substring(0, start - 1) + input.value.substring(end);
      } else {
        text = input.value.substring(0, start) + input.value.substring(end);
      }
      input.value = text;

      input.selectionEnd = start === end ? end - 1 : start;
      input.selectionStart = input.selectionEnd;
    };

    const removeNextValue = () => {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      let text;
      if (start === end) {
        text = input.value.substring(0, start) + input.value.substring(end + 1);
      } else {
        text = input.value.substring(0, start) + input.value.substring(end);
      }
      input.value = text;

      input.selectionEnd = start === end ? end : start;
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

    keysOfKeys.forEach((i) => {
      const key = keys[i];

      if (key.dataset.func === 'false') {
        key.addEventListener('click', () => {
          enterValue(key.innerText);
          input.focus();
        });
      } else if (key.id === 'AltRight' || key.id === 'AltLeft' || key.id === 'ControlRight' || key.id === 'ControlLeft') {
        key.addEventListener('click', () => {
          downKeys[key.id] = true;
          if (downKeys.ControlLeft === true && downKeys.AltLeft === true) {
            this.lang = setLang(this.lang);
          }
          downKeys[key.id] = false;
        });
      } else if (key.id === 'CapsLock') {
        key.addEventListener('click', () => {
          this.capsLock = setShift(this.capsLock);
        });
      } else if (key.id === 'Space') {
        key.addEventListener('click', () => {
          enterValue(' ');
          input.focus();
        });
      } else if (key.id === 'Backspace') {
        key.addEventListener('click', () => {
          removeBackValue();
          input.focus();
        });
      } else if (key.id === 'Delete') {
        key.addEventListener('click', () => {
          removeNextValue();
          input.focus();
        });
      } else if (key.id === 'Tab') {
        key.addEventListener('click', () => {
          enterValue('\t');
          input.focus();
        });
      } else if (key.id === 'Enter') {
        key.addEventListener('click', () => {
          enterValue('\n');
          input.focus();
        });
      }
    });

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
        enterValue(key.innerText);
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
        } else if (keydown === 'Space') {
          enterValue(' ');
        } else if (keydown === 'Backspace') {
          removeBackValue();
        } else if (keydown === 'Delete') {
          removeNextValue();
        } else if (keydown === 'Tab') {
          enterValue('\t');
        } else if (keydown === 'Enter') {
          enterValue('\n');
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
  }

  render(parentElement) {
    if (!this.element) {
      this.createElement();
    }

    parentElement.append(this.element);

    return this.element;
  }
}
