import { scrollToTarget } from '../../lib/motion';

const nav = [
  { href: '#editions', label: 'Editions' },
  { href: '#terroir', label: 'Terroir' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#allocation', label: 'Allocation' }
];
const social = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'Pinterest' }
];

export default function Footer() {
  return (
    <footer className="border-t hairline px-5 md:px-12 py-14">
      <div className="mx-auto w-full max-w-[1200px] flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <p className="font-sans text-sm font-semibold tracking-[0.5em] text-platinum">ARGENT</p>
          <div className="flex gap-16">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              {nav.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={e => { e.preventDefault(); scrollToTarget(l.href); }}
                  className="text-[0.88rem] text-silver no-underline transition-colors duration-300 hover:text-platinum"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <nav aria-label="Social" className="flex flex-col gap-3">
              {social.map(l => (
                <a key={l.label} href={l.href} className="text-[0.88rem] text-silver no-underline transition-colors duration-300 hover:text-platinum">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <p className="text-[0.78rem] text-smoke">
          Argent is a fictional brand concept. Nutrition values are illustrative. &copy; 2026 Maison Argent.
        </p>
      </div>
    </footer>
  );
}
