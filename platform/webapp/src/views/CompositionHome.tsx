export function CompositionHome() {
  return (
    <section>
      <p className="eyebrow">Pricing actuary home</p>
      <h1>Composition</h1>
      <p className="lead">
        Every production model and programme hangs from exactly one term of the premium. Out-of-envelope
        offers refuse — they are never clipped silently.
      </p>
      <div className="term-strip">
        <article className="term" style={{ ['--term-color' as string]: 'var(--claims)' }}>
          <h3>Expected claims</h3>
          <p>Engagement-backed mortality and morbidity basis.</p>
        </article>
        <article className="term" style={{ ['--term-color' as string]: 'var(--risk)' }}>
          <h3>Loading for risk</h3>
          <p>Touchpoint frequency must meet the assumption before release.</p>
        </article>
        <article className="term" style={{ ['--term-color' as string]: 'var(--expense)' }}>
          <h3>Loading for expense</h3>
          <p>Measured cost per policy and per claim — not projected STP.</p>
        </article>
      </div>
      <div className="kpi-row">
        <div className="kpi">
          <span>Technical vs commercial gap</span>
          <strong>Attributed only</strong>
        </div>
        <div className="kpi">
          <span>Envelope refusals (period)</span>
          <strong className="refuse">Gate hard-stop</strong>
        </div>
        <div className="kpi">
          <span>Validation queue depth</span>
          <strong>Ops risk</strong>
        </div>
      </div>
    </section>
  );
}
