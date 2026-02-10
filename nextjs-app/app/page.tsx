import Link from 'next/link';

const STATES = [
  { name: 'Iowa', slug: 'iowa', info: '1 Team Available', available: true },
  { name: 'Minnesota', slug: 'minnesota', info: '3 Teams Available', available: true },
  { name: 'Nebraska', slug: 'nebraska', info: 'Coming Soon', available: false },
];

const COMING_SOON = ['South Dakota', 'Wisconsin', 'Illinois', 'Missouri'];

/**
 * Section B: Home page - State selection
 */
export default function HomePage() {
  return (
    <div className="container">
      <div className="selection-card">
        <div className="selection-header">
          <h1>Select a State</h1>
          <p>Choose a state to browse high school sports archives</p>
        </div>

        <div className="state-grid">
          {STATES.map((state) =>
            state.available ? (
              <Link
                key={state.slug}
                href={`/state/${state.slug}`}
                className="state-card"
              >
                <div className="state-name">{state.name}</div>
                <div className="state-info">{state.info}</div>
              </Link>
            ) : (
              <div key={state.slug} className="state-card disabled">
                <div className="state-name">{state.name}</div>
                <div className="state-info">{state.info}</div>
              </div>
            )
          )}
        </div>

        <div className="coming-soon-section">
          <div className="coming-soon-header">More States Coming Soon</div>
          <div className="coming-soon-grid">
            {COMING_SOON.map((s) => (
              <span key={s} className="coming-soon-state">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
