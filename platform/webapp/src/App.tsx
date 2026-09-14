import { NavLink, Route, Routes } from 'react-router-dom';
import { CompositionHome } from './views/CompositionHome';
import { ScoringWorkbench } from './views/ScoringWorkbench';
import { PermittingQueue } from './views/PermittingQueue';
import { EngagementLedger } from './views/EngagementLedger';
import { ExperienceDesk } from './views/ExperienceDesk';
import { ClaimsDesk } from './views/ClaimsDesk';
import { ReinsuranceDesk } from './views/ReinsuranceDesk';

const nav = [
  { to: '/', label: 'Composition', end: true },
  { to: '/scoring', label: 'Scoring & UW' },
  { to: '/permitting', label: 'Permitting & queue' },
  { to: '/engagement', label: 'Engagement ledger' },
  { to: '/experience', label: 'Experience' },
  { to: '/claims', label: 'Auto claims' },
  { to: '/reinsurance', label: 'Reinsurance' },
];

export function App() {
  return (
    <div className="app-shell">
      <aside className="nav">
        <h1 className="brand">
          Loadline
          <span className="plimsoll" aria-hidden="true" />
        </h1>
        <p className="lead" style={{ fontSize: '0.85rem', marginTop: '0.75rem' }}>
          Price = expected claims + risk loading + expense loading
        </p>
        <ul>
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/" element={<CompositionHome />} />
          <Route path="/scoring" element={<ScoringWorkbench />} />
          <Route path="/permitting" element={<PermittingQueue />} />
          <Route path="/engagement" element={<EngagementLedger />} />
          <Route path="/experience" element={<ExperienceDesk />} />
          <Route path="/claims" element={<ClaimsDesk />} />
          <Route path="/reinsurance" element={<ReinsuranceDesk />} />
        </Routes>
      </main>
    </div>
  );
}
