// From 21st.dev: Aceternity "Animated Testimonials" by @manuarora700.
// Adapted for this project: TS -> JSX, next/image + tabler + cn removed,
// photo slot replaced by an arbitrary `visual` React node per testimonial.
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ArrowIcon = ({ flip = false }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={flip ? { transform: 'scaleX(-1)' } : undefined}
  >
    <path d="M5 12l14 0" />
    <path d="M13 18l6 -6" />
    <path d="M13 6l6 6" />
  </svg>
);

export const AnimatedTestimonials = ({ testimonials, autoplay = false, animate = true, className = '' }) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive(prev => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = index => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className={`mx-auto max-w-sm md:max-w-5xl px-4 md:px-8 ${className}`}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
        <div>
          <div className="relative h-72 md:h-80 w-full [perspective:1000px]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={animate ? { opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() } : false}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.6,
                    scale: isActive(index) ? 1 : 0.94,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) && animate ? [0, -60, 0] : 0
                  }}
                  exit={animate ? { opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() } : undefined}
                  transition={{ duration: animate ? 0.4 : 0, ease: 'easeInOut' }}
                  className="absolute inset-0 origin-bottom"
                >
                  {testimonial.visual}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-2">
          <motion.div
            key={active}
            initial={animate ? { y: 20, opacity: 0 } : false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <h3 className="text-[1.05rem] font-medium text-platinum">{testimonials[active].name}</h3>
            <p className="mt-1 text-[0.85rem] text-smoke">{testimonials[active].designation}</p>
            <p className="mt-8 font-serif italic font-medium leading-[1.35] text-silver text-[clamp(1.25rem,1.9vw,1.7rem)]">
              {testimonials[active].quote.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  initial={animate ? { filter: 'blur(8px)', opacity: 0, y: 5 } : false}
                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut', delay: animate ? 0.018 * index : 0 }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </p>
          </motion.div>
          <div className="flex gap-3 pt-10">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous voice"
              className="h-10 w-10 rounded-full border border-[rgba(232,233,237,0.22)] bg-[rgba(10,10,12,0.4)] text-platinum flex items-center justify-center cursor-pointer transition-colors duration-300 hover:border-[rgba(232,233,237,0.6)] active:scale-95"
            >
              <ArrowIcon flip />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next voice"
              className="h-10 w-10 rounded-full border border-[rgba(232,233,237,0.22)] bg-[rgba(10,10,12,0.4)] text-platinum flex items-center justify-center cursor-pointer transition-colors duration-300 hover:border-[rgba(232,233,237,0.6)] active:scale-95"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
