'use strict';

// проверка поддержки webp браузером
export default function isWebp() {
	function testWebp(callback) {
		let webp = new Image();
		webp.onload = webp.onerror = function () {
			callback(webp.height == 2);
		};
		webp.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}

	//добавление класса webp, no-webp
	testWebp(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
