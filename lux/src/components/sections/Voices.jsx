import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionOK } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Voices() {
  const scope = useRef(null);

  useEffect(() => {
    if (!motionOK || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.voice-reveal', { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.16,
        scrollTrigger: { trigger: scope.current, start: 'top 72%', once: true }
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} className="section-pad border-t hairline bg-obsidian-2">
      <figure className="mx-auto max-w-[820px] text-center">
        <blockquote className="voice-reveal font-serif italic font-medium leading-[1.25] text-platinum text-[clamp(1.8rem,3.4vw,3.1rem)]">
          &ldquo;It drinks like something a good bar would serve you, not something a gym would sell you.&rdquo;
        </blockquote>
        <figcaption className="voice-reveal mt-9">
          <span className="block text-[0.95rem] font-500 text-platinum">Léonie Marchand</span>
          <span className="block mt-1 text-[0.85rem] text-smoke">Pastry chef, Paris</span>
        </figcaption>
      </figure>
    </section>
  );
}
