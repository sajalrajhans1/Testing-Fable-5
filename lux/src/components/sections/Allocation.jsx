import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from '../reactbits/SpotlightCard';
import GlareHover from '../reactbits/GlareHover';
import { motionOK } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    name: 'The Case',
    price: '€68',
    cadence: 'one case',
    line: 'Twelve pours of a single edition, shipped within the week.',
    details: ['One edition of your choice', 'Twelve numbered vessels', 'Recyclable cold-pack']
  },
  {
    name: 'The Quarter',
    price: '€58',
    cadence: 'per case, quarterly',
    line: 'Four cases a year, first in line at every allocation.',
    details: ['All three editions', 'Priority allocation', 'Pause or skip anytime'],
    featured: true
  },
  {
    name: 'The Cellar',
    price: '€640',
    cadence: 'a year',
    line: 'The full vintage, numbered and set aside before release.',
    details: ['Every case, every edition', 'Engraved vessel set', 'First pour of new editions']
  }
];

function TierContent({ tier }) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col p-8 text-left">
      <p className="font-serif italic font-medium text-[1.35rem] text-platinum">{tier.name}</p>
      <p className="mt-6">
        <span className="font-serif font-medium leading-none text-platinum text-[clamp(2.6rem,3.2vw,3.2rem)]">{tier.price}</span>
        <span className="ml-2 text-[0.8rem] text-smoke">{tier.cadence}</span>
      </p>
      <p className="mt-4 text-[0.95rem] text-silver leading-relaxed">{tier.line}</p>
      <ul className="mt-auto pt-10 flex flex-col gap-3">
        {tier.details.map(d => (
          <li key={d} className="flex items-baseline gap-3 text-[0.9rem] text-silver">
            <span aria-hidden="true" className="h-px w-4 shrink-0 translate-y-[-3px] bg-[rgba(232,233,237,0.35)]" />
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Allocation() {
  const scope = useRef(null);

  useEffect(() => {
    if (!motionOK || !scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.alloc-reveal', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12,
        scrollTrigger: { trigger: scope.current, start: 'top 74%', once: true }
      });
    }, scope);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={scope} id="allocation" className="section-pad border-t hairline bg-obsidian-2">
      <div className="mx-auto w-full max-w-[1200px]">
        <h2 className="alloc-reveal text-center font-serif font-medium leading-[1.05] text-[clamp(2.4rem,4.6vw,4.2rem)]">
          Choose your <span className="italic">allocation.</span>
        </h2>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map(tier =>
            tier.featured ? (
              <div key={tier.name} className="alloc-reveal md:-mt-6 md:-mb-6">
                <GlareHover
                  width="100%"
                  height="100%"
                  background="linear-gradient(160deg, #16161C, #0D0D11)"
                  borderRadius="3px"
                  borderColor="rgba(232,233,237,0.4)"
                  glareColor="#E8E9ED"
                  glareOpacity={0.18}
                  glareAngle={-35}
                  glareSize={260}
                  transitionDuration={900}
                  className="min-h-[440px]"
                >
                  <TierContent tier={tier} />
                </GlareHover>
              </div>
            ) : (
              <SpotlightCard
                key={tier.name}
                spotlightColor="rgba(232, 233, 237, 0.08)"
                className="alloc-reveal min-h-[400px] rounded-[3px] border border-[rgba(232,233,237,0.12)] bg-[linear-gradient(160deg,#101014,#0B0B0E)]"
              >
                <TierContent tier={tier} />
              </SpotlightCard>
            )
          )}
        </div>
        <p className="alloc-reveal mt-12 text-center text-[0.9rem] text-smoke">
          Allocations open quarterly and close when the batch is spoken for.
        </p>
      </div>
    </section>
  );
}
