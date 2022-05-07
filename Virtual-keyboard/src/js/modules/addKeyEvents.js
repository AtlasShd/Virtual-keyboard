'use strict';

export default function addKeyEvents() {
	const textarea = document.querySelector('#textarea');

	let downKeys = {};

	document.addEventListener('keydown', (e) => {
		e.preventDefault();
		let eventTarget = document.querySelector(`[data-endata="${e.code}"]`);

		if (!eventTarget) {
			return;
		}

		if (eventTarget.getAttribute('data-func') === 'false') {
			writeValue(e.key);
		} else {
			downKeys[e.code] = true;
			if (downKeys.ControlLeft === true && downKeys.AltLeft === true) {
			}
		}

		eventTarget.classList.add('active');

		document.addEventListener(
			'keyup',
			(e) => {
				eventTarget.classList.remove('active');
				downKeys[e.code] = false;
			},
			{ once: true }
		);
	});

	function writeValue(value) {
		const selStart = textarea.selectionStart,
			selEnd = textarea.selectionEnd;

		const text = textarea.value.substring(0, selStart) + value + textarea.value.substring(selEnd); //! e.key
		textarea.value = text;

		textarea.selectionEnd = (selStart == selEnd) ? (selEnd + 1) : (selStart + 1);
		textarea.selectionStart = textarea.selectionEnd;
	}
}
