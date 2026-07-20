import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShinyText from '../reactbits/ShinyText';
import Magnetic from '../reactbits/Magnetic';
import { motionOK } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Reserve() {
  const scope = useRef(null);

  useEffect(() => {
    if (!motionOK || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.reserve-word', { scale: 0.9, opacity: 0.2 }, {
        scale: 1, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top 85%', end: 'center 55%', scrub: true }
      });
      gsap.fromTo('.reserve-fade', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: scope.current, start: 'center 70%', once: true }
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="reserve" className="section-pad border-t hairline text-center overflow-clip">
      <div className="reserve-word font-serif font-medium leading-none text-[clamp(5rem,17vw,15rem)]">
        <ShinyText
          text="Argent."
          disabled={!motionOK}
          speed={4.5}
          delay={1.2}
          color="#8E929C"
          shineColor="#FFFFFF"
          spread={110}
        />
      </div>
      <p className="reserve-fade mt-8 mx-auto max-w-[38ch] text-silver text-[clamp(1rem,1.25vw,1.15rem)]">
        Twelve pours per case, three editions. Allocations open quarterly.
      </p>
      <div className="reserve-fade mt-10 flex justify-center">
        <Magnetic intensity={0.35} range={110}>
          <a href="#top" className="btn-lux">Reserve</a>
        </Magnetic>
      </div>
    </section>
  );
}
