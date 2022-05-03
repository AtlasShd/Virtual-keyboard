export default class Key {

	constructor(name, buttonName, value, functional, size) {
		this.name = name;
		this.buttonName = buttonName;
		this.value = value;
		this.functional = functional;
		this.size = size;
	}

	createElement() {
		this.element = document.createElement('button');
		this.element.classList.add(
			`${this.name}__key`,
			`${this.name}__${this.functional}-key`,
			`${this.name}__${this.size}-key`
		);
		this.element.setAttribute('id', this.buttonName);
		this.element.innerHTML = this.value;

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