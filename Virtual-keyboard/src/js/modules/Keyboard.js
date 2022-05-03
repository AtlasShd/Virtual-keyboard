import Key from './Key.js';
import keys from '../services/keys.json';

export default class Keyboard {
	constructor(name) {
		this.name = name;
	}

	createElement() {
		const arrOfKeys = keys;

		this.element = document.createElement('div');
		this.element.classList.add(this.name);

		const textareaDiv = document.createElement('div');
		textareaDiv.classList.add(`${this.name}__textarea`);
		this.element.append(textareaDiv);

		const textarea = document.createElement('textarea');
		textarea.setAttribute('name', 'textarea');
		textarea.setAttribute('id', 'textarea');
		textarea.setAttribute('cols', '30');
		textarea.setAttribute('rows', '2');
		textareaDiv.append(textarea);

		const keyboard = document.createElement('div');
		keyboard.classList.add(`${this.name}__keyboard`);
		this.element.append(keyboard);

		for (let i = 0; i < 5; i++) {
			const row = document.createElement('div');
			row.classList.add(`${this.name}__row`);
			keyboard.append(row);

			const oneRow = arrOfKeys[i];

			for (let j = 0; j < oneRow.length; j++) {
				const { name, value, functional, size } = oneRow[j];

				const key = new Key(this.name, name, value, functional, size).createElement();
				row.append(key);
			}
		}

		// this.element.innerHTML = `
		// 	<div class="${this.name}__textarea">
		// 		<textarea name="textarea" id="textarea" cols="30" rows="2"></textarea>
		// 	</div>
		// 	<div class="${this.name}__keyboard">
		// 		<div class="${this.name}__row">
		// 		</div>
		// 		<div class="${this.name}__row">
		// 		</div>
		// 		<div class="${this.name}__row">
		// 		</div>
		// 		<div class="${this.name}__row">
		// 		</div>
		// 		<div class="${this.name}__row">
		// 		</div>
		// 	</div>
		// `;

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