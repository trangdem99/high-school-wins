import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Toast type
interface Toast {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export default function ComponentsPage() {
  // Form state
  const [formValues, setFormValues] = useState({
    teamName: '',
    state: '',
    sport: 'football',
    bio: '',
    newsletter: true,
    terms: false,
    classification: '6A',
    searchQuery: '',
    isPrivate: false,
  });

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [showLargeModal, setShowLargeModal] = useState(false);

  // Accordion state
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  // Toast state
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const addToast = useCallback((type: Toast['type'], title: string, message: string) => {
    const id = ++toastId.current;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Loading overlay demo
  const [showLoading, setShowLoading] = useState(false);

  const handleLoadingDemo = () => {
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 2500);
  };

  return (
    <>
      <Head>
        <title>UI Components | High School Wins Archive</title>
      </Head>

      <div className="catalog-page" style={{ maxWidth: '960px', margin: '0 auto', padding: 'var(--space-xl) var(--space-lg)' }}>
        <article className="article-header" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
          <h1 className="page-title">UI Components</h1>
          <p className="page-subtitle" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>
            Design system reference &mdash; forms, buttons, modals, accordions, spinners &amp; toasts
          </p>
        </article>

        {/* ============================================
            SECTION O: FORM INPUT COMPONENTS
           ============================================ */}
        <section className="component-section">
          <h2 className="component-section-title">Form Input Components</h2>

          {/* Text Input */}
          <div className="form-group">
            <label className="form-label">
              Team Name <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter team name..."
              value={formValues.teamName}
              onChange={e => setFormValues(v => ({ ...v, teamName: e.target.value }))}
            />
            <span className="form-hint">Official school team name</span>
          </div>

          {/* Form Row - Two columns */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Texas"
                value={formValues.state}
                onChange={e => setFormValues(v => ({ ...v, state: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Sport</label>
              <select
                className="form-select"
                value={formValues.sport}
                onChange={e => setFormValues(v => ({ ...v, sport: e.target.value }))}
              >
                <option value="football">Football</option>
                <option value="basketball">Basketball</option>
                <option value="baseball">Baseball</option>
                <option value="soccer">Soccer</option>
              </select>
            </div>
          </div>

          {/* Textarea */}
          <div className="form-group">
            <label className="form-label">Bio / Notes</label>
            <textarea
              className="form-textarea"
              placeholder="Write a short description..."
              rows={4}
              value={formValues.bio}
              onChange={e => setFormValues(v => ({ ...v, bio: e.target.value }))}
            />
          </div>

          {/* Disabled Input */}
          <div className="form-group">
            <label className="form-label">Disabled Field</label>
            <input
              type="text"
              className="form-input"
              value="Cannot edit this"
              disabled
            />
          </div>

          {/* Error State */}
          <div className="form-group has-error">
            <label className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="team@school.edu"
              defaultValue="invalid-email"
            />
            <span className="form-error">Please enter a valid email address</span>
          </div>

          {/* Input with Addon */}
          <div className="form-group">
            <label className="form-label">Search with Addon</label>
            <div className="form-input-group">
              <span className="form-input-addon">🔍</span>
              <input
                type="text"
                className="form-input"
                placeholder="Search teams..."
                value={formValues.searchQuery}
                onChange={e => setFormValues(v => ({ ...v, searchQuery: e.target.value }))}
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="form-group">
            <label className="form-label">Checkboxes</label>
            <label className="form-check">
              <input
                type="checkbox"
                checked={formValues.newsletter}
                onChange={e => setFormValues(v => ({ ...v, newsletter: e.target.checked }))}
              />
              <span className="form-check-label">Subscribe to newsletter</span>
            </label>
            <label className="form-check">
              <input
                type="checkbox"
                checked={formValues.terms}
                onChange={e => setFormValues(v => ({ ...v, terms: e.target.checked }))}
              />
              <span className="form-check-label">I agree to the terms</span>
            </label>
            <label className="form-check">
              <input type="checkbox" disabled />
              <span className="form-check-label">Disabled option</span>
            </label>
          </div>

          {/* Radio Buttons */}
          <div className="form-group">
            <label className="form-label">Classification</label>
            {['6A', '5A', '4A', '3A'].map(cls => (
              <label className="form-check" key={cls}>
                <input
                  type="radio"
                  name="classification"
                  value={cls}
                  checked={formValues.classification === cls}
                  onChange={e => setFormValues(v => ({ ...v, classification: e.target.value }))}
                />
                <span className="form-check-label">Class {cls}</span>
              </label>
            ))}
          </div>

          {/* Toggle Switch */}
          <div className="form-group">
            <label className="form-label">Toggle Switch</label>
            <label className="form-toggle">
              <input
                type="checkbox"
                checked={formValues.isPrivate}
                onChange={e => setFormValues(v => ({ ...v, isPrivate: e.target.checked }))}
              />
              <span>Private Profile</span>
            </label>
          </div>
        </section>

        {/* ============================================
            SECTION P: BUTTON COMPONENTS
           ============================================ */}
        <section className="component-section">
          <h2 className="component-section-title">Button Components</h2>

          <div className="button-group" style={{ marginBottom: 'var(--space-lg)' }}>
            <button className="compare-button">Primary Button</button>
            <button className="back-button">Secondary Button</button>
            <button className="game-log-button">Outline Button</button>
          </div>

          <div className="button-group" style={{ marginBottom: 'var(--space-lg)' }}>
            <button className="compare-button" disabled>Disabled Primary</button>
            <button className="back-button" disabled>Disabled Secondary</button>
          </div>

          <div className="button-group">
            <button className="compare-button" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>Small</button>
            <button className="compare-button">Default</button>
            <button className="compare-button" style={{ fontSize: '1rem', padding: '0.8rem 1.6rem' }}>Large</button>
          </div>
        </section>

        {/* ============================================
            SECTION Q: MODAL COMPONENTS
           ============================================ */}
        <section className="component-section">
          <h2 className="component-section-title">Modal Components</h2>

          <div className="button-group">
            <button className="compare-button" onClick={() => setShowModal(true)}>
              Open Default Modal
            </button>
            <button className="back-button" onClick={() => setShowSmallModal(true)}>
              Open Small Modal
            </button>
            <button className="game-log-button" onClick={() => setShowLargeModal(true)}>
              Open Large Modal
            </button>
          </div>

          {/* Default Modal */}
          <div
            className={`modal-overlay ${showModal ? 'active' : ''}`}
            onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <div className="modal">
              <div className="modal-header">
                <span className="modal-title">Default Modal</span>
                <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <p>This is a standard modal dialog. It can contain any content — forms, text, tables, or interactive elements.</p>
                <p style={{ marginTop: 'var(--space-md)' }}>Click the overlay or the &times; button to close.</p>
              </div>
              <div className="modal-footer">
                <button className="back-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="compare-button" onClick={() => setShowModal(false)}>Confirm</button>
              </div>
            </div>
          </div>

          {/* Small Modal */}
          <div
            className={`modal-overlay ${showSmallModal ? 'active' : ''}`}
            onClick={e => { if (e.target === e.currentTarget) setShowSmallModal(false); }}
          >
            <div className="modal modal-sm">
              <div className="modal-header">
                <span className="modal-title">Small Modal</span>
                <button className="modal-close" onClick={() => setShowSmallModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <p>A compact modal for confirmations or short messages.</p>
              </div>
              <div className="modal-footer">
                <button className="compare-button" onClick={() => setShowSmallModal(false)}>OK</button>
              </div>
            </div>
          </div>

          {/* Large Modal */}
          <div
            className={`modal-overlay ${showLargeModal ? 'active' : ''}`}
            onClick={e => { if (e.target === e.currentTarget) setShowLargeModal(false); }}
          >
            <div className="modal modal-lg">
              <div className="modal-header">
                <span className="modal-title">Large Modal</span>
                <button className="modal-close" onClick={() => setShowLargeModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <p>A wider modal for displaying detailed content like tables, multi-column forms, or comparison data.</p>
                <div style={{ marginTop: 'var(--space-lg)' }}>
                  <table className="game-table" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Team</th>
                        <th>Record</th>
                        <th>Win %</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Southlake Carroll</td><td>903-254-48</td><td>.770</td></tr>
                      <tr><td>Allen</td><td>604-213-3</td><td>.737</td></tr>
                      <tr><td>Lake Travis</td><td>434-179-4</td><td>.706</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button className="back-button" onClick={() => setShowLargeModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================
            SECTION R: ACCORDION COMPONENTS
           ============================================ */}
        <section className="component-section">
          <h2 className="component-section-title">Accordion Components</h2>

          <div className="accordion">
            {[
              {
                title: 'What is this archive?',
                body: 'The High School Wins Archive is a comprehensive database tracking all-time win records for high school athletic programs across the United States. We compile historical data from state athletic associations, newspapers, and school records.',
              },
              {
                title: 'How are records calculated?',
                body: 'Win-loss records include all varsity games played. Forfeits are counted based on the official state association ruling. Ties (when applicable) are tracked separately. Playoff and championship games are included in the totals.',
              },
              {
                title: 'Can I submit corrections?',
                body: 'Yes! If you have documentation showing a different record, please submit a correction request. We require at least two independent sources for any record change.',
              },
              {
                title: 'How often is data updated?',
                body: 'Records are updated at the end of each season once state associations publish final results. In-season updates may be applied for active tracking of milestone games.',
              },
            ].map((item, index) => (
              <div
                className={`accordion-item ${activeAccordion === index ? 'active' : ''}`}
                key={index}
              >
                <button
                  className="accordion-trigger"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  <span>{item.title}</span>
                  <span className="accordion-icon">▼</span>
                </button>
                <div className="accordion-content">
                  <div className="accordion-body">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================
            SECTION S: SPINNERS & LOADING
           ============================================ */}
        <section className="component-section">
          <h2 className="component-section-title">Spinners &amp; Loading</h2>

          {/* Spinner sizes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="spinner spinner-sm" />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginTop: 'var(--space-sm)', color: 'var(--color-text-light)' }}>SM</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="spinner" />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginTop: 'var(--space-sm)', color: 'var(--color-text-light)' }}>DEFAULT</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="spinner spinner-lg" />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginTop: 'var(--space-sm)', color: 'var(--color-text-light)' }}>LG</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="spinner spinner-xl" />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginTop: 'var(--space-sm)', color: 'var(--color-text-light)' }}>XL</div>
            </div>
          </div>

          {/* Dot spinner */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: 'var(--space-sm)', letterSpacing: '0.5px' }}>Dot Spinner</p>
            <div className="spinner-dots">
              <span /><span /><span />
            </div>
          </div>

          {/* Inline loading */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: 'var(--space-sm)', letterSpacing: '0.5px' }}>Inline Loading</p>
            <div className="loading-inline">
              <div className="spinner spinner-sm" />
              <span>Loading records...</span>
            </div>
          </div>

          {/* Skeleton */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: 'var(--space-sm)', letterSpacing: '0.5px' }}>Skeleton Loading</p>
            <div style={{ background: 'var(--color-bg-card)', border: '2px solid var(--color-border-dashed)', padding: 'var(--space-lg)' }}>
              <div className="skeleton skeleton-heading" />
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-text" />
            </div>
          </div>

          {/* Loading overlay demo */}
          <div style={{ position: 'relative', minHeight: '120px', background: 'var(--color-bg-card)', border: '2px solid var(--color-border-dashed)', padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>Content behind overlay</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: 'var(--space-sm)' }}>Click the button below to see the overlay effect.</p>
            <div className={`loading-overlay ${showLoading ? 'active' : ''}`}>
              <div className="spinner spinner-lg" />
              <span className="loading-text">Processing...</span>
            </div>
          </div>
          <button className="compare-button" onClick={handleLoadingDemo}>
            Show Loading Overlay (2.5s)
          </button>
        </section>

        {/* ============================================
            SECTION T: TOAST / NOTIFICATIONS
           ============================================ */}
        <section className="component-section">
          <h2 className="component-section-title">Toast / Notifications</h2>

          <div className="button-group">
            <button
              className="compare-button"
              style={{ background: 'var(--color-win)', borderColor: 'var(--color-win)' }}
              onClick={() => addToast('success', 'Success', 'Record updated successfully!')}
            >
              Success Toast
            </button>
            <button
              className="compare-button"
              style={{ background: 'var(--color-loss)', borderColor: 'var(--color-loss)' }}
              onClick={() => addToast('error', 'Error', 'Failed to save changes. Please try again.')}
            >
              Error Toast
            </button>
            <button
              className="compare-button"
              style={{ background: 'var(--color-playoff-badge)', borderColor: 'var(--color-playoff-badge)', color: 'var(--color-text)' }}
              onClick={() => addToast('warning', 'Warning', 'Some records may be incomplete for this season.')}
            >
              Warning Toast
            </button>
            <button
              className="compare-button"
              onClick={() => addToast('info', 'Info', 'New season data is now available for download.')}
            >
              Info Toast
            </button>
          </div>

          {/* Toast container */}
          <div className="toast-container">
            {toasts.map(toast => (
              <div
                key={toast.id}
                className={`toast toast-${toast.type} active`}
              >
                <div className="toast-header">
                  <span>{toast.title}</span>
                  <button
                    className="modal-close"
                    style={{ fontSize: '1rem' }}
                    onClick={() => removeToast(toast.id)}
                  >
                    &times;
                  </button>
                </div>
                <div className="toast-body">{toast.message}</div>
                <div className="toast-progress">
                  <div
                    className="toast-progress-bar"
                    style={{ animation: 'toast-countdown 4s linear forwards' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back to home */}
        <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-xl)', borderTop: '2px solid var(--color-border-dashed)' }}>
          <Link href="/" className="back-button">
            ← Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
