import { initLoader } from './loader.js';
import { initParticles } from './particles.js';
import { initTyping } from './typing.js';
import { initScrollReveal } from './scroll-reveal.js';

initParticles();
initScrollReveal();

initLoader().then(() => {
  setTimeout(initTyping, 300);
});
