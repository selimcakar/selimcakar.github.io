const TYPING_SPEED = {
  name: 80,
  title: 70,
  pauseBetween: 400,
};

function typeText(element, text, speed, useHTML = false) {
  let i = 0;
  const cursorHTML = '<span class="hero__cursor"></span>';

  return new Promise((resolve) => {
    function step() {
      if (i <= text.length) {
        if (useHTML) {
          element.innerHTML = text.slice(0, i) + cursorHTML;
        } else {
          element.textContent = text.slice(0, i);
        }
        i++;
        setTimeout(step, speed);
      } else {
        resolve();
      }
    }
    step();
  });
}

export async function initTyping() {
  const nameEl = document.getElementById('heroName');
  const titleEl = document.getElementById('heroTitle');

  await typeText(nameEl, 'Selim Cakar', TYPING_SPEED.name);
  await new Promise(r => setTimeout(r, TYPING_SPEED.pauseBetween));
  await typeText(titleEl, 'Building quality-driven software systems', TYPING_SPEED.title, true);
}
