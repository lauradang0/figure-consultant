import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="label hero-label">Now accepting Q2 2026 clients</div>
          <h1 className="hero-title">
            We <span className="accent">
              technify
              <svg
                aria-hidden="true"
                className="underline-svg"
                viewBox="0 0 400 14"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 2,10 C 40,4 90,13 155,8 C 220,3 275,12 335,7 C 365,4 388,9 398,8"
                  stroke="var(--green)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="underline-path"
                />
              </svg>
            </span><br />your business
          </h1>
          <p className="hero-sub">
            Websites and AI that turn visitors into revenue.
            Built fast, built right.
          </p>
          <Link to="/contact" className="hero-cta">
            Book a free discovery call →
          </Link>
        </div>
      </section>

      <hr className="rule" />

      {/* ── LOGOS ────────────────────────────── */}
      <section className="logos-section">
        <div className="container">
          <p className="logos-label">Trusted by fast-growing companies</p>
          <div className="logos-row">
            {['Luxury Nail Spa', 'Joe Gym Fitness', "Laura's Portfolio", "Francis's Portfolio"].map(name => (
              <span key={name} className="logo-name">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── PROCESS ──────────────────────────── */}
      <section style={{ padding: '52px 0' }}>
        <div className="container">
          {/* Header — centered */}
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="label" style={{ marginBottom: 14 }}>How it works</div>
            <h2 className="process-section-title" style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              marginBottom: 14,
            }}>
              From first call to launch in 4 weeks
            </h2>
            <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 440, margin: '0 auto', lineHeight: 1.65 }}>
              A structured process that keeps you in the loop without slowing us down.
            </p>
          </div>

          {/* Steps — 4 columns, no dividers, centered */}
          <div className="process-grid">
            {[
              { title: 'Discovery Call',      desc: '30-min call to understand your goals, current challenges, and what success looks like.' },
              { title: 'Strategy & Proposal', desc: 'Custom roadmap and proposal delivered within 48 hours of the call.' },
              { title: 'Build & Iterate',     desc: 'We build fast, share progress daily, and refine based on your feedback.' },
              { title: 'Launch & Support',    desc: 'Go live with confidence. Ongoing support ensures everything keeps performing.' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {/* Bubble */}
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                  background: i === 0 ? 'var(--black)' : 'transparent',
                  color: i === 0 ? '#fff' : 'var(--black)',
                  border: i === 0 ? 'none' : '1.5px solid rgba(0,0,0,0.15)',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                {/* Title */}
                <div style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  marginBottom: 8,
                  color: 'var(--black)',
                }}>
                  {s.title}
                </div>
                {/* Description */}
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── BOTTOM CTA ───────────────────────── */}
      <section className="section-cta">
        <div className="container">
          <div className="label" style={{ marginBottom: 36 }}>Start here</div>
          <h2 className="section-cta-title">
            Ready to level up your<br />digital presence?
          </h2>
          <Link to="/contact" className="hero-cta">
            Book a free call →
          </Link>
        </div>
      </section>
    </>
  )
}
