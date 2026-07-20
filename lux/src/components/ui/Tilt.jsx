// Gentle mouse-tilt wrapper for the vessel. Motion springs only, no re-renders.
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { motionOK } from '../../lib/motion';

const spring = { stiffness: 80, damping: 18, mass: 0.6 };

export default function Tilt({ children, amplitude = 6, className = '' }) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);

  const finePointer =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!motionOK || !finePointer) {
    return <div className={className}>{children}</div>;
  }

  const onMove = e => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * amplitude * 2);
    rotateX.set(-py * amplitude * 2);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div ref={ref} className={`[perspective:1100px] ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div className="[transform-style:preserve-3d] will-change-transform" style={{ rotateX, rotateY }}>
        {children}
      </motion.div>
    </div>
  );
}
