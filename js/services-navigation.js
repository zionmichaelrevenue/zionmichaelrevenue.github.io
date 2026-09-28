(() => {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-navigation');
  if (!toggle || !navigation) return;
  const setOpen = open => {
    navigation.classList.toggle('site-nav--open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
})();
