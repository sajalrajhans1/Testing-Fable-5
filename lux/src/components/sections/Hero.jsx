import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import LiquidChrome from '../reactbits/LiquidChrome';
import Magnetic from '../reactbits/Magnetic';
import { motionOK, scrollToTarget } from '../../lib/motion';

export default function Hero() {
  const scope = useRef(null);

  useEffect(() => {
    if (!motionOK || !scope.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.35 });
      tl.fromTo('.hero-line-inner', { yPercent: 112 }, { yPercent: 0, duration: 1.4, stagger: 0.14 })
        .fromTo('.hero-fade', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, '-=0.9');
    }, scope);
    return () => ctx.revert();
  }, []);

  const heroLineClass = motionOK ? 'block overflow-hidden pb-[0.08em] -mb-[0.08em]' : 'block';

  return (
    <section ref={scope} id="top" className="relative min-h-[100dvh] flex items-center justify-center overflow-clip">
      <div className="absolute inset-0" aria-hidden="true">
        {motionOK ? (
          <LiquidChrome baseColor={[0.045, 0.046, 0.052]} speed={0.06} amplitude={0.32} frequencyX={2.2} frequencyY={1.6} interactive={true} />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_50%_35%,#1B1C22_0%,#0A0A0C_70%)]" />
        )}
        {/* scrim: keeps the shader a texture, not a competitor */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,12,0.35)_0%,rgba(10,10,12,0.72)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-obsidian" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-5 pt-16 bg-[radial-gradient(ellipse_55%_60%_at_center,rgba(10,10,12,0.55)_0%,transparent_75%)]">
        <h1 className="font-serif font-medium leading-[1.02] text-platinum text-[clamp(3.4rem,9.5vw,8.5rem)]">
          <span className={heroLineClass}><span className="hero-line-inner block">Strength,</span></span>
          <span className={heroLineClass}><span className="hero-line-inner block italic">distilled.</span></span>
        </h1>
        <p className="hero-fade mt-7 max-w-[42ch] text-[clamp(1rem,1.3vw,1.15rem)] text-silver">
          A plant protein élixir in three editions. Twenty-five grams per pour, nothing it does not need.
        </p>
        <div className="hero-fade mt-10">
          <Magnetic intensity={0.35} range={110}>
            <a href="#reserve" onClick={e => { e.preventDefault(); scrollToTarget('#reserve'); }} className="btn-lux">
              Reserve
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
