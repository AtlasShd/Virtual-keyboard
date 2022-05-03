'use strict';

import Section from './Section.js';
import Keyboard from './Keyboard.js';

export default function createBody() {
	const body = document.querySelector('body'),
		main = createMainIn(body);

	function createMainIn(body) {
		const main = document.createElement('main');

		body.prepend(main);

		return main;
	}

	const keyboard = new Keyboard('keyboard').createElement();

	const welcomeSection = new Section('welcome', 'Virtual keyboard', keyboard).render(main);
}
