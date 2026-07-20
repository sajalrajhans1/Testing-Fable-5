import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Vessel from '../ui/Vessel';
import { motionOK } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Pour() {
  const scope = useRef(null);

  useEffect(() => {
    if (!motionOK || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.pour-reveal', { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: scope.current, start: 'top 72%', once: true }
      });
      // vessel drifts slower than the page: quiet depth
      gsap.fromTo('.pour-vessel', { y: 70 }, {
        y: -70, ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="section-pad border-t hairline">
      <div className="mx-auto w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-16 lg:gap-24">
        <div>
          <h2 className="pour-reveal font-serif font-medium leading-[1.05] text-[clamp(2.4rem,4.6vw,4.2rem)]">
            Poured, <span className="italic">not powdered.</span>
          </h2>
          <p className="pour-reveal mt-8 measure text-silver text-[clamp(1rem,1.25vw,1.15rem)]">
            Cold-filtered pea and rice protein, suspended in still spring water.
            A texture closer to silk than shake: no grit, no shaker, no sediment.
          </p>
          <p className="pour-reveal mt-6 measure text-silver text-[clamp(1rem,1.25vw,1.15rem)]">
            Each vessel is drawn from a single batch, numbered, and sealed the same morning it is poured.
          </p>
        </div>
        <div className="pour-vessel justify-self-center lg:justify-self-end">
          <Vessel edition="Cacao Noir" accent="var(--color-cacao)" />
        </div>
      </div>
    </section>
  );
}
