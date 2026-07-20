// The ARGENT vessel, drawn in CSS. `editionRef` lets GSAP swap the edition line.
export default function Vessel({ edition = 'Cacao Noir', accent = 'var(--color-cacao)', editionRef, className = '' }) {
  return (
    <div className={`vessel ${className}`} aria-hidden="true" style={{ '--vessel-accent': accent }}>
      <div className="vessel-cap" />
      <div className="vessel-body">
        <span className="vessel-monogram">A</span>
        <span className="vessel-wordmark">ARGENT</span>
        <span className="vessel-rule" />
        <span className="vessel-edition" ref={editionRef}>{edition}</span>
        <span className="vessel-grams">25 G PLANT PROTEIN</span>
      </div>
      <div className="vessel-shadow" />
    </div>
  );
}
