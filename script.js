(() => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');
  const year = document.querySelector('[data-year]');
  const setMenuLabel = (isOpen) => {
    if (!navToggle) return;
    const label = navToggle.querySelector('.sr-only');
    if (label) label.textContent = isOpen ? 'Close menu' : 'Open menu';
    else navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };
  const sizeMenu = () => {
    if (!navMenu?.classList.contains('is-open')) return;
    const top = Number.parseFloat(getComputedStyle(navMenu).top) || 0;
    navMenu.style.maxHeight = Math.max(0, window.innerHeight - top - 12) + 'px';
  };

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  const closeMenu = () => {
    if (!navToggle || !navMenu) return;
    navMenu.classList.remove('is-open');
    navMenu.style.removeProperty('max-height');
    navToggle.setAttribute('aria-expanded', 'false');
    setMenuLabel(false);
  };

  const toggleMenu = () => {
    if (!navToggle || !navMenu) return;
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    setMenuLabel(isOpen);
    if (isOpen) sizeMenu();
    else navMenu.style.removeProperty('max-height');
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) closeMenu();
    else sizeMenu();
  }, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMenu);

    navMenu.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.classList.contains('is-open')) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (navMenu.contains(target) || navToggle.contains(target)) return;
      closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const returnFocus = navMenu.classList.contains('is-open') && navMenu.contains(document.activeElement);
        closeMenu();
        if (returnFocus) navToggle.focus();
      }
    });
  }
})();
