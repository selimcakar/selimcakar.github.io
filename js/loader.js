export function initLoader() {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  let progress = 0;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) progress = 100;
      bar.style.width = progress + '%';

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('open');
          setTimeout(() => {
            loader.classList.add('done');
            document.body.classList.remove('loading');
            document.body.classList.add('ready');
            resolve();
          }, 1300);
        }, 400);
      }
    }, 250);
  });
}
