import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTestimonials from '../reactbits/AnimatedTestimonials';
import { motionOK } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

function Medallion({ initials, accent }) {
  return (
    <div className="h-full w-full rounded-[3px] border border-[rgba(232,233,237,0.14)] bg-[linear-gradient(150deg,#131318,#0B0B0E)] flex flex-col items-center justify-center gap-6 overflow-hidden relative">
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full opacity-[0.1] blur-3xl"
        style={{ backgroundColor: accent }}
      />
      <span className="font-serif font-medium leading-none text-[clamp(4.5rem,7vw,6.5rem)]" style={{ color: accent }}>
        {initials}
      </span>
      <span aria-hidden="true" className="h-px w-16 bg-[rgba(232,233,237,0.2)]" />
    </div>
  );
}

const VOICES = [
  {
    quote: 'It drinks like something a good bar would serve you, not something a gym would sell you.',
    name: 'Léonie Marchand',
    designation: 'Pastry chef, Paris',
    visual: <Medallion initials="LM" accent="#C29A78" />
  },
  {
    quote: 'Twenty-five grams my athletes ask for by name. The matcha case empties first, every time.',
    name: 'Tomas Lindqvist',
    designation: 'Rowing coach, Oslo',
    visual: <Medallion initials="TL" accent="#A9BC9C" />
  },
  {
    quote: 'The first protein I can take before a performance. It sits light and finishes like a dessert course.',
    name: 'Amara Diallo',
    designation: 'Principal dancer, London',
    visual: <Medallion initials="AD" accent="#D8CFBA" />
  },
  {
    quote: 'Cacao Noir has an actual finish. I poured it blind for colleagues and nobody guessed it was protein.',
    name: 'Kenji Watanabe',
    designation: 'Sommelier, Kyoto',
    visual: <Medallion initials="KW" accent="#C29A78" />
  }
];

export default function Voices() {
  const scope = useRef(null);

  useEffect(() => {
    if (!motionOK || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.voice-reveal', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.14,
        scrollTrigger: { trigger: scope.current, start: 'top 72%', once: true }
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="section-pad border-t hairline">
      <h2 className="voice-reveal text-center font-serif font-medium leading-[1.05] text-[clamp(2.4rem,4.6vw,4.2rem)] mb-14">
        Kept in <span className="italic">good company.</span>
      </h2>
      <div className="voice-reveal">
        <AnimatedTestimonials testimonials={VOICES} autoplay={motionOK} animate={motionOK} />
      </div>
    </section>
  );
}
