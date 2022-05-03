'use strict';

import testWebp from './modules/testWebp.js';
import createBody from './modules/createBody.js';
import addKeyEvents from './modules/addKeyEvents.js';

testWebp();
createBody();
addKeyEvents();

window.addEventListener('load', () => {
	document.querySelector('#transition-none').removeAttribute('id');
});