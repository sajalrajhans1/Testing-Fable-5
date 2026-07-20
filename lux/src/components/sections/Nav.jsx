import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionOK, scrollToTarget } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: '#editions', label: 'Editions' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#composition', label: 'Composition' }
];

export default function Nav() {
  const ref = useRef(null);

  useEffect(() => {
    if (!motionOK || !ref.current) return;
    const st = ScrollTrigger.create({
      start: 80,
      end: 'max',
      onToggle: self => ref.current?.classList.toggle('nav-scrolled', self.isActive)
    });
    return () => st.kill();
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <header
      ref={ref}
      className="fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-between gap-6 px-5 md:px-12 transition-colors duration-500"
    >
      <a
        href="#top"
        onClick={e => go(e, '#top')}
        className="font-sans text-sm font-semibold tracking-[0.5em] text-platinum no-underline"
        aria-label="ARGENT home"
      >
        ARGENT
      </a>
      <nav aria-label="Primary" className="hidden md:flex items-center gap-10">
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={e => go(e, l.href)}
            className="text-[0.82rem] font-400 tracking-[0.06em] text-silver no-underline transition-colors duration-300 hover:text-platinum"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <a href="#reserve" onClick={e => go(e, '#reserve')} className="btn-ghost-lux">
        Reserve
      </a>
    </header>
  );
}
