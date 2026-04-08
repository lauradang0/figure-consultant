import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

const stats = [
  { value: '40+',   label: 'Projects delivered' },
  { value: '4 wks', label: 'Avg. time to launch' },
  { value: '98%',   label: 'Client satisfaction' },
  { value: '3 yrs', label: 'In business' },
]

const principles = [
  { n: '01', title: 'Move fast', desc: 'No 3-month timelines. Most projects go live in 3–4 weeks. Speed is our default.' },
  { n: '02', title: 'Stay focused', desc: 'Small, senior team. No juniors running your account. You talk to the people doing the work.' },
  { n: '03', title: 'Measure everything', desc: "If we can't measure it, we don't count it as a win. Every decision is backed by data." },
]

const testimonials = [
  {
    quote: '"Figure completely transformed how we show up online. Within 6 weeks of launch our inbound leads doubled. Best investment we\'ve made."',
    name: 'Jordan Lee',
    role: 'CEO, NovaTech',
  },
  {
    quote: '"The AI intake automation they built has saved my team 15+ hours a week. It just works — every time. Worth every penny and then some."',
    name: 'Marcus Reid',
    role: 'Partner, Crestline Legal',
  },
  {
    quote: '"They delivered in 4 weeks what agencies quoted us 3 months for. The new site is stunning and our demo requests went through the roof."',
    name: 'Aisha Patel',
    role: 'Founder, Orbit Analytics',
  },
]

export default function About() {
  useSEO({
    title: 'About — Figured Consulting',
    description: 'A boutique digital agency of engineers and designers who ship fast, communicate honestly, and charge for outcomes — not hours. 40+ projects delivered.',
  })
  return (
    <>
      {/* ── PAGE HEADER ──────────────────────── */}
      <section className="page-header">
        <div className="container">
          <div className="label">About</div>
          <h1 className="page-header-title">
            We're builders,<br />not account managers
          </h1>
          <p className="page-header-sub">
            A boutique digital agency run by engineers and designers who've worked
            at product companies — obsessed with shipping great work.
          </p>
        </div>
      </section>

      {/* ── STATS ────────────────────────────── */}
      <div className="container">
        <div className="about-stats-row">
          {stats.map(s => (
            <div key={s.label} className="about-stat">
              <div className="about-stat-value">{s.value}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <hr className="rule" />

      {/* ── BODY ─────────────────────────────── */}
      <section className="about-section">
        <div className="container">
          <div className="about-body-grid">
            <div>
              <div className="label" style={{ marginBottom: 36 }}>Who we are</div>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 24,
                lineHeight: 1.6,
                fontWeight: 400,
                marginBottom: 32,
              }}>
                Figured Consulting is a boutique digital agency run by engineers
                and designers who have worked at product companies.
              </p>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 20 }}>
                We don't have layers of middle management — just a small, focused
                team obsessed with shipping great work. We're not the right fit for
                everyone. But if you want fast execution, honest communication, and
                results you can measure — let's talk.
              </p>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
                Most agencies charge for hours. We charge for outcomes. That means
                we're incentivized to ship fast, ship right, and make sure what
                we build actually performs.
              </p>
            </div>
            <div>
              <div className="label" style={{ marginBottom: 36 }}>Principles</div>
              {principles.map(v => (
                <div key={v.n} style={{ borderTop: '1px solid var(--rule)', padding: '28px 0' }}>
                  <div className="label" style={{ marginBottom: 12 }}>{v.n}</div>
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 20,
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    marginBottom: 10,
                  }}>
                    {v.title}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── TESTIMONIALS ─────────────────────── */}
      <section className="testimonials-section">
        <div className="container">
          <div className="label" style={{ marginBottom: 56 }}>What clients say</div>
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-editorial">
              <div className="testimonial-author-col">
                <div className="testimonial-author-name">{t.name}</div>
                <div className="testimonial-author-role">{t.role}</div>
              </div>
              <div className="testimonial-text">{t.quote}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="rule" />

      {/* ── CTA ──────────────────────────────── */}
      <section className="section-cta">
        <div className="container">
          <div className="label" style={{ marginBottom: 36 }}>Ready?</div>
          <h2 className="section-cta-title">
            Ready to work together?
          </h2>
          <Link to="/contact" className="hero-cta">
            Book a free call →
          </Link>
        </div>
      </section>
    </>
  )
}
