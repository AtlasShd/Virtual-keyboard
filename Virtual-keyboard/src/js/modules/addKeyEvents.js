'use strict';

export default function addKeyEvents() {
	const textarea = document.querySelector('#textarea');

	document.addEventListener('keydown', function (e) {
		let eventTarget = document.querySelector(`[data-endata="${e.code}"]`);
		if (eventTarget.getAttribute('data-func') !== 'func') {
			e.preventDefault();
			textarea.value = textarea.value + e.key; //!e.key
		}

		eventTarget.classList.add('active');

		document.addEventListener('keyup', function (e) {
			eventTarget.classList.remove('active');
		}, { once: true });
	});
}