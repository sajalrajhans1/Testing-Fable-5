// Central motion policy.
// Respects prefers-reduced-motion; ?motion=1 is a QA override for machines
// where the OS has animation effects disabled system-wide.
export const motionOK =
  typeof window !== 'undefined' &&
  (!window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    /[?&]motion=1/.test(window.location.search));

// Lenis singleton so nav anchors can route through smooth scroll.
let _lenis = null;
export const setLenis = l => { _lenis = l; };
export const getLenis = () => _lenis;

export const scrollToTarget = target => {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (_lenis) _lenis.scrollTo(el, { offset: -64, duration: 1.4 });
  else el.scrollIntoView({ behavior: motionOK ? 'smooth' : 'auto', block: 'start' });
};
