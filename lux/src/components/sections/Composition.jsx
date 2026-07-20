import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from '../reactbits/CountUp';
import { motionOK } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 25, unit: 'g', label: 'Plant protein', line: 'Pea and rice, complete amino profile.' },
  { value: 0, unit: 'g', label: 'Added sugar', line: 'Sweetened by the edition, nothing else.' },
  { value: 140, unit: '', label: 'Calories', line: 'Per 330 ml pour, every edition.' }
];

export default function Composition() {
  const scope = useRef(null);

  useEffect(() => {
    if (!motionOK || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.comp-item', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.14,
        scrollTrigger: { trigger: scope.current, start: 'top 75%', once: true }
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="composition" className="section-pad border-t hairline">
      <div className="mx-auto w-full max-w-[1100px]">
        <p className="eyebrow text-center mb-16">Composition</p>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`comp-item flex flex-col items-center text-center px-8 py-10 md:py-2 ${
                i > 0 ? 'border-t md:border-t-0 md:border-l hairline' : ''
              }`}
            >
              <p className="font-serif font-medium leading-none text-platinum text-[clamp(4rem,7vw,6.5rem)]">
                {motionOK ? <CountUp to={s.value} duration={1.6} /> : s.value}
                {s.unit && <span className="text-[0.42em] align-baseline ml-1 text-silver">{s.unit}</span>}
              </p>
              <p className="mt-4 text-[0.95rem] font-500 tracking-[0.04em] text-platinum">{s.label}</p>
              <p className="mt-2 text-[0.88rem] text-smoke max-w-[24ch]">{s.line}</p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-center text-[0.9rem] text-smoke">
          Vegan. Gluten-free. Nothing artificial, in any edition.
        </p>
      </div>
    </section>
  );
}
