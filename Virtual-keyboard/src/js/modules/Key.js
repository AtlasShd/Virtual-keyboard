export default class Key {
	constructor(name, buttonName, value, functional, size, textarea, endata, color) {
		this.name = name;
		this.buttonName = buttonName;
		this.value = value;
		this.functional = functional;
		this.size = size;
		this.textarea = textarea;
		this.endata = endata;
		this.color = color;
	}

	createElement() {
		const textarea = this.textarea,
			value = this.value;

		this.element = document.createElement('div');
		this.element.classList.add(
			`${this.name}__key`,
			`${this.name}__${this.size}-key`,
			`${this.name}__${this.color}-key`
		);
		this.element.setAttribute('id', this.buttonName);
		this.element.setAttribute('data-endata', this.endata);
		this.element.setAttribute('data-func', this.functional);
		this.element.innerHTML = this.value;

		if (!this.functional) {
			this.element.addEventListener('click', () => {
				const selStart = textarea.selectionStart,
					selEnd = textarea.selectionEnd;

				const text = textarea.value.substring(0, selStart) + value + textarea.value.substring(selEnd);
				textarea.value = text;

				textarea.focus();

				textarea.selectionEnd = (selStart == selEnd) ? (selEnd + 1) : (selStart + 1);
				textarea.selectionStart = textarea.selectionEnd;
			});
		} else {
			this.element.addEventListener('click', (e) => {
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
