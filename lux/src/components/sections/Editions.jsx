import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Tilt from '../ui/Tilt';
import { motionOK } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const EDITIONS = [
  {
    name: 'Cacao Noir',
    note: 'Single-origin Ecuadorian cacao, seventy percent. Bitter, warm, unhurried.',
    accent: '#C29A78',
    wash: '#120D0B'
  },
  {
    name: 'Vanille Blanche',
    note: 'Madagascar bourbon vanilla, split and steeped whole.',
    accent: '#D8CFBA',
    wash: '#14120D'
  },
  {
    name: 'Matcha Impérial',
    note: 'Stone-milled ceremonial matcha from Uji, shaded twenty days.',
    accent: '#A9BC9C',
    wash: '#0D110D'
  }
];

function EditionVessel({ vesselRef }) {
  return (
    <div className="vessel" aria-hidden="true" ref={vesselRef} style={{ '--vessel-accent': EDITIONS[0].accent }}>
      <div className="vessel-cap" />
      <div className="vessel-body">
        <span className="vessel-monogram">A</span>
        <span className="vessel-wordmark">ARGENT</span>
        <span className="vessel-rule" />
        <span className="grid text-center">
          {EDITIONS.map((e, i) => (
            <span key={e.name} className="ed-vlabel vessel-edition col-start-1 row-start-1" style={{ opacity: i === 0 ? 1 : 0 }}>
              {e.name}
            </span>
          ))}
        </span>
        <span className="vessel-grams">25 G PLANT PROTEIN</span>
      </div>
      <div className="vessel-shadow" />
    </div>
  );
}

export default function Editions() {
  const scope = useRef(null);
  const vesselRef = useRef(null);
  const spinRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!motionOK || !scope.current) return;
    const ctx = gsap.context(() => {
      const names = gsap.utils.toArray('.ed-name');
      const notes = gsap.utils.toArray('.ed-note');
      const vlabels = gsap.utils.toArray('.ed-vlabel');

      gsap.set(names, { opacity: i => (i === 0 ? 1 : 0), y: i => (i === 0 ? 0 : 44) });
      gsap.set(notes, { opacity: i => (i === 0 ? 1 : 0), y: i => (i === 0 ? 0 : 22) });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: scope.current,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      for (let i = 1; i < EDITIONS.length; i++) {
        const at = `ed${i}`;
        tl.addLabel(at, '+=0.6');
        tl.to(scope.current, { backgroundColor: EDITIONS[i].wash, duration: 1 }, at);
        tl.to(vesselRef.current, { '--vessel-accent': EDITIONS[i].accent, duration: 1 }, at);
        tl.to(glowRef.current, { backgroundColor: EDITIONS[i].accent, duration: 1 }, at);
        tl.to(names[i - 1], { opacity: 0, y: -44, duration: 0.5 }, at);
        tl.fromTo(names[i], { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.5, immediateRender: false }, `${at}+=0.4`);
        tl.to(notes[i - 1], { opacity: 0, y: -22, duration: 0.4 }, at);
        tl.fromTo(notes[i], { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.4, immediateRender: false }, `${at}+=0.45`);
        // vessel turns through edge-on while the label swaps behind the spin
        tl.to(spinRef.current, { rotationY: 90, duration: 0.35, ease: 'power1.in' }, at);
        tl.to(vlabels[i - 1], { opacity: 0, duration: 0.06 }, `${at}+=0.32`);
        tl.to(vlabels[i], { opacity: 1, duration: 0.06 }, `${at}+=0.36`);
        tl.fromTo(
          spinRef.current,
          { rotationY: -90 },
          { rotationY: 0, duration: 0.35, ease: 'power1.out', immediateRender: false },
          `${at}+=0.35`
        );
      }
      tl.to({}, { duration: 0.6 });
    }, scope);
    return () => ctx.revert();
  }, []);

  /* Static fallback: all three editions, plainly */
  if (!motionOK) {
    return (
      <section id="editions" className="section-pad border-t hairline">
        <p className="eyebrow mb-14">The Editions</p>
        <div className="mx-auto w-full max-w-[1100px] flex flex-col gap-14">
          {EDITIONS.map(e => (
            <article key={e.name} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-baseline border-b hairline pb-10 last:border-b-0">
              <h3 className="font-serif italic font-medium text-[clamp(2.2rem,5vw,3.6rem)] leading-none" style={{ color: e.accent }}>
                {e.name}
              </h3>
              <p className="text-silver measure">{e.note}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={scope}
      id="editions"
      className="relative border-t hairline"
      style={{ backgroundColor: EDITIONS[0].wash }}
    >
      <div className="h-[100dvh] flex flex-col px-5 md:px-12 pt-24 pb-10 overflow-clip">
        <p className="eyebrow">The Editions</p>
        <div className="flex-1 mx-auto w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-[1.25fr_auto_0.85fr] items-center gap-8 lg:gap-16">
          <div className="grid text-center lg:text-left order-2 lg:order-1">
            {EDITIONS.map(e => (
              <h3
                key={e.name}
                className="ed-name col-start-1 row-start-1 font-serif italic font-medium leading-[0.95] text-[clamp(2.8rem,6.5vw,6rem)]"
                style={{ color: e.accent }}
              >
                {e.name}
              </h3>
            ))}
          </div>
          <div className="relative justify-self-center order-1 lg:order-2">
            <div
              ref={glowRef}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] aspect-square rounded-full opacity-15 blur-3xl"
              style={{ backgroundColor: EDITIONS[0].accent }}
            />
            <Tilt amplitude={5}>
              <div ref={spinRef} className="[transform-style:preserve-3d] will-change-transform">
                <EditionVessel vesselRef={vesselRef} />
              </div>
            </Tilt>
          </div>
          <div className="grid order-3 text-center lg:text-left">
            {EDITIONS.map(e => (
              <p key={e.name} className="ed-note col-start-1 row-start-1 text-silver text-[clamp(0.95rem,1.2vw,1.1rem)] max-w-[30ch] mx-auto lg:mx-0">
                {e.note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
