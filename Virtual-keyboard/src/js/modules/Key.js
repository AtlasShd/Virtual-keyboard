export default class Key {
  constructor(name, func, size, textarea, id, color, eng, engShift, rus, rusShift) {
    this.name = name;
    this.eng = eng;
    this.engShift = engShift;
    this.rus = rus;
    this.rusShift = rusShift;
    this.func = func;
    this.size = size;
    this.textarea = textarea;
    this.id = id;
    this.color = color;
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.classList.add(
      `${this.name}__key`,
      `${this.name}__${this.size}-key`,
      `${this.name}__${this.color}-key`,
    );
    this.element.setAttribute('id', this.id);
    this.element.setAttribute('data-func', this.func);
    this.element.setAttribute('data-eng', this.eng);
    this.element.setAttribute('data-engshift', this.engShift);
    this.element.setAttribute('data-rus', this.rus);
    this.element.setAttribute('data-russhift', this.rusShift);
    this.element.innerText = this.eng;

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
