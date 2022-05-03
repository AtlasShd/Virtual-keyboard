export default class Key {

	constructor(name, buttonName, value, functional, size, textarea, endata) {
		this.name = name;
		this.buttonName = buttonName;
		this.value = value;
		this.functional = functional;
		this.size = size;
		this.textarea = textarea;
		this.endata = endata;
	}

	createElement() {
		this.element = document.createElement('button');
		this.element.classList.add(
			`${this.name}__key`,
			`${this.name}__${this.functional}-key`,
			`${this.name}__${this.size}-key`
		);
		this.element.setAttribute('id', this.buttonName);
		this.element.setAttribute('data-endata', this.endata);
		this.element.setAttribute('data-func', this.functional);
		this.element.innerHTML = this.value;

		if (
			this.functional === 'not-func' ||
			this.value === '△' ||
			this.value === '◁' ||
			this.value === '▽' ||
			this.value === '▷') {
			this.element.addEventListener('click', () => {
				this.textarea.value = this.textarea.value + this.value;
			});
		} else {
			this.element.addEventListener('click', () => {

				console.log('That functional button');
			});
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