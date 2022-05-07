export default class Section {
  constructor(name, title, innerElement) {
    this.name = name;
    this.title = title;
    this.innerElement = innerElement;
  }

  createElement() {
    this.element = document.createElement('section');
    this.element.classList.add(this.name);
    this.element.setAttribute('id', this.name);

    const container = document.createElement('div');
    container.classList.add(`${this.name}__container`, 'container');
    this.element.append(container);

    if (this.title) {
      const title = document.createElement('h2');
      title.classList.add(`${this.name}__title`, 'title');
      title.innerHTML = this.title;
      container.append(title);
    }

    const body = document.createElement('div');
    body.classList.add(`${this.name}__body`);
    container.append(body);

    if (this.innerElement) {
      // body.append(this.innerElement);
      this.innerElement(body);
    }

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
