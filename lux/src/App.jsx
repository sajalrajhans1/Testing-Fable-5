import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motionOK, setLenis } from './lib/motion';

import Nav from './components/sections/Nav';
import Hero from './components/sections/Hero';
import Pour from './components/sections/Pour';
import Editions from './components/sections/Editions';
import Philosophy from './components/sections/Philosophy';
import Composition from './components/sections/Composition';
import Voices from './components/sections/Voices';
import Reserve from './components/sections/Reserve';
import Footer from './components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    if (!motionOK) return;
    const lenis = new Lenis({ lerp: 0.09 });
    setLenis(lenis);
    lenis.on('scroll', ScrollTrigger.update);
    const raf = time => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Pour />
        <Editions />
        <Philosophy />
        <Composition />
        <Voices />
        <Reserve />
      </main>
      <Footer />
    </>
  );
}
