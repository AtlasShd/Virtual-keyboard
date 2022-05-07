import testWebp from './modules/testWebp.js';
import createBody from './modules/createBody.js';

testWebp();
createBody();

window.addEventListener('load', () => {
  document.querySelector('#transition-none').removeAttribute('id');
});
