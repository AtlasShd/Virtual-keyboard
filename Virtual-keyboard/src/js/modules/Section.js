export default class Section {

	constructor(name, title, parentElement, innerElement = '') {
		this.name = name;
		this.title = title;
		this.parentElement = parentElement;
		this.innerElements = innerElement;
	}

	render() {
		this.element = document.createElement('section');
		this.element.classList.add(this.name);
		this.element.setAttribute('id', this.name);

		this.element.innerHTML = `
			<div class="${this.name}__container container">
				<h2 class="${this.name}__title title">${this.title}</h2>
				<div class="${this.name}__body">
					${this.innerElement}
				</div>
			</div>
		`;

		this.parentElement.append(this.element);
	}

}