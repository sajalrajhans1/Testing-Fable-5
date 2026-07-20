import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltedCard from '../reactbits/TiltedCard';
import { motionOK } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const ORIGINS = [
  {
    edition: 'Cacao Noir',
    place: 'Los Ríos',
    country: 'Ecuador',
    note: 'Nacional cacao, fermented six days in cedar boxes before roasting.',
    accent: '#C29A78'
  },
  {
    edition: 'Vanille Blanche',
    place: 'Sambava',
    country: 'Madagascar',
    note: 'Bourbon vanilla, sun-cured through eight months of slow drying.',
    accent: '#D8CFBA'
  },
  {
    edition: 'Matcha Impérial',
    place: 'Uji',
    country: 'Japan',
    note: 'First-flush leaves shaded twenty days, then stone-milled to order.',
    accent: '#A9BC9C'
  }
];

function OriginCard({ origin }) {
  return (
    <div className="relative h-full w-full rounded-[3px] border border-[rgba(232,233,237,0.12)] bg-[linear-gradient(155deg,#111116,#0B0B0E)] p-8 flex flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-[0.12] blur-3xl"
        style={{ backgroundColor: origin.accent }}
      />
      <p className="font-serif italic text-[1.05rem]" style={{ color: origin.accent }}>
        {origin.edition}
      </p>
      <p className="mt-auto pt-16 font-serif font-medium leading-none text-platinum text-[clamp(2.6rem,3.4vw,3.4rem)] [transform:translateZ(28px)]">
        {origin.place}
      </p>
      <p className="mt-3 text-[0.72rem] font-medium tracking-[0.3em] uppercase text-smoke">{origin.country}</p>
      <p className="mt-5 text-[0.95rem] text-silver leading-relaxed">{origin.note}</p>
    </div>
  );
}

export default function Terroir() {
  const scope = useRef(null);

  useEffect(() => {
    if (!motionOK || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.terroir-reveal', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.14,
        scrollTrigger: { trigger: scope.current, start: 'top 74%', once: true }
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="terroir" className="section-pad border-t hairline">
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="eyebrow terroir-reveal">Provenance</p>
        <h2 className="terroir-reveal mt-6 font-serif font-medium leading-[1.05] text-[clamp(2.4rem,4.6vw,4.2rem)]">
          Sourced like <span className="italic">a vintage.</span>
        </h2>
        <p className="terroir-reveal mt-6 measure text-silver text-[clamp(1rem,1.25vw,1.15rem)]">
          One origin per edition, bought whole from growers we can name.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {ORIGINS.map((origin, i) =>
            motionOK ? (
              <TiltedCard
                key={origin.place}
                containerHeight="380px"
                rotateAmplitude={8}
                scaleOnHover={1.03}
                className={`terroir-reveal ${i === 1 ? 'md:mt-14' : ''}`}
              >
                <OriginCard origin={origin} />
              </TiltedCard>
            ) : (
              <div key={origin.place} className={`h-[380px] ${i === 1 ? 'md:mt-14' : ''}`}>
                <OriginCard origin={origin} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
