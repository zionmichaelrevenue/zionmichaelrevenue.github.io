(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-navigation');
  const setOpen = open => {
    navigation.classList.toggle('site-nav--open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) setOpen(false); });
  matchMedia('(min-width: 970px)').addEventListener('change', () => setOpen(false));
  const current = location.pathname;
  for (const link of navigation.querySelectorAll('a')) {
    const target = new URL(link.href).pathname;
    if (current === target || (target === '/services/' && (current.startsWith('/services/') || current === '/html/events.html')) || (target === '/html/publications.html' && current === '/html/resource.html')) link.setAttribute('aria-current', 'page');
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('video[autoplay]').forEach(video => { video.pause(); video.controls = true; });
})();
