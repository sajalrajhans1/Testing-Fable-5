import ScrollReveal from '../reactbits/ScrollReveal';
import { motionOK } from '../../lib/motion';

const STATEMENT =
  'We removed the sugar, the whey, the neon, and the noise. What remains is protein as it should have been all along: quiet, complete, and worth savoring.';

const textClass =
  'font-serif font-medium leading-[1.3] text-platinum text-[clamp(1.9rem,3.6vw,3.4rem)]';

export default function Philosophy() {
  return (
    <section id="philosophy" className="section-pad border-t hairline">
      <div className="mx-auto max-w-[900px] text-center">
        {motionOK ? (
          <ScrollReveal
            baseOpacity={0.08}
            baseRotation={1.5}
            blurStrength={3}
            textClassName={textClass}
            wordAnimationEnd="center 40%"
            rotationEnd="center 55%"
          >
            {STATEMENT}
          </ScrollReveal>
        ) : (
          <h2 className={textClass}>{STATEMENT}</h2>
        )}
      </div>
    </section>
  );
}
