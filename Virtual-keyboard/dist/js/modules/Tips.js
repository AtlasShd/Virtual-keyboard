import Section from './Section.js';

export default class Tips {
  constructor() {
    this.element = null;
  }

  createElement() {
    const tipsBody = document.createElement('div');
    tipsBody.classList.add('tips__tips');
    tipsBody.innerHTML = `
      <ul class="tips__list">
        <li class="tips__item">Разработка проходила на ОС Windows</li>
        <li class="tips__item">Полная поддержка Google Chrome последней версии(!)</li>
        <li class="tips__item">Кнопки для смены раскладки: left Alt + left Ctrl</li>
        <li class="tips__item">При нажатии на стрелки, согласно ТЗ, проиходит их печать</li>
      </ul>
    `;

    const tipsBodyFunc = (body) => {
      body.append(tipsBody);
    };

    this.element = new Section('tips', null, tipsBodyFunc).createElement();

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
