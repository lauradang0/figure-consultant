import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const PHRASES = [
  'automate the busywork',
  'grow with your business',
  'turn ideas into reality',
  'solve your biggest bottlenecks',
  'save you time and money',
  'put you ahead of competitors',
]

const homeFaqs = [
  {
    q: "How fast can you actually launch?",
    a: "Most projects go live within 2–4 weeks from your kickoff call. Starter and Growth builds typically land in 3 weeks. Custom projects with automation or AI integrations may take 5–6 weeks. You'll get a precise timeline in your proposal — no vague estimates.",
  },
  {
    q: "What's included in the build fee?",
    a: "Everything needed to go live: design, development, integrations, QA, and launch support. Hosting is separate and typically runs $20–50/month depending on your stack. No hidden fees, no surprise invoices after the fact.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. We offer a 50% upfront / 50% on launch split for all builds. If you need a different arrangement, bring it up on the call — we're flexible for the right fit.",
  },
  {
    q: "Can I start with a one-time build and add a retainer later?",
    a: "Absolutely. Most clients start with a one-time build, then move to a monthly retainer once they see the results. There's no pressure — add, pause, or cancel the retainer anytime with 14 days' notice.",
  },
]

const BADGES = [
  'Websites & landing pages',
  'E-commerce & payments',
  'AI-powered features',
  'Workflow automation',
  'Custom dashboards & tools',
]

const featuredWork = [
  {
    slug: 'joe-gym',
    client: 'Joe Gym',
    tag: 'Website Redesign',
    desc: 'Fitness studio needed a site that converts walk-ins and reduces front desk calls.',
    metric: { value: '+118%', label: 'Trial signups' },
    bg: '/joe-gym2.png',
    gif: '/joe-gym.gif',
  },
  {
    slug: 'nail-spa',
    client: 'Luxury Nail Spa',
    tag: 'Full Transformation',
    desc: 'Booking-first redesign for a high-end nail salon looking to reduce no-shows.',
    metric: { value: '3×', label: 'Online bookings' },
    bg: '/nail-spa.png',
    gif: '/nail-spa.gif',
  },
]

const testimonials = [
  {
    quote: "We finally have a website that helps our front desk instead of creating more calls and confusion.",
    name: "Joe Martinez",
    role: "Owner — Joe Gym",
  },
  {
    quote: "Appointments are smoother now and clients tell us the new site feels exactly like our salon.",
    name: "Linh Tran",
    role: "Manager — Luxury Nail Spa",
  },
  {
    quote: "I can send people to my site with confidence now. It explains exactly what I do and who I help.",
    name: "Laura Dang",
    role: "Founder — Laura Dang Consulting",
  },
]

function useTypewriter() {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]

    if (!isDeleting) {
      if (displayed.length < phrase.length) {
        const jitter = Math.random() * 80 - 40
        timeoutRef.current = setTimeout(() => {
          setDisplayed(phrase.slice(0, displayed.length + 1))
        }, 68 + jitter)
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true)
        }, 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(prev => prev.slice(0, -1))
        }, 32)
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(false)
          setPhraseIdx(i => (i + 1) % PHRASES.length)
        }, 400)
      }
    }

    return () => clearTimeout(timeoutRef.current)
  }, [displayed, phraseIdx, isDeleting])

  const isComplete = !isDeleting && displayed.length === PHRASES[phraseIdx].length
  return { displayed, announced: isComplete ? PHRASES[phraseIdx] : '' }
}

export default function Home() {
  const { displayed: typed, announced } = useTypewriter()
  const [openFaq, setOpenFaq] = useState(null)
  return (
    <>
      {/* ── HERO ─────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            We build digital products that{' '}
            <span className="hero-typed" aria-hidden="true">
              {typed}<span className="hero-cursor" aria-hidden="true" />
            </span>
            <span className="sr-only" aria-live="polite" aria-atomic="true">{announced}</span>
          </h1>
          <p className="hero-sub">
            Websites, software, and AI tools — built fast, built right.
            From first call to launch in weeks, not months.
          </p>
          <div className="hero-badges">
            {BADGES.map(badge => (
              <span key={badge} className="hero-badge">
                <span className="hero-badge-dot" />
                {badge}
              </span>
            ))}
          </div>
          <div className="hero-proof">
            <div className="hero-proof-item">
              <span className="hero-proof-stat">3x</span>
              <span className="hero-proof-label">Avg. conversion lift</span>
            </div>
            <div className="hero-proof-divider" />
            <div className="hero-proof-item">
              <span className="hero-proof-stat">2–4 wks</span>
              <span className="hero-proof-label">Typical delivery</span>
            </div>
            <div className="hero-proof-divider" />
            <div className="hero-proof-item">
              <span className="hero-proof-stat">50+</span>
              <span className="hero-proof-label">Projects shipped</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/contact" className="hero-cta-filled">Book a free discovery call →</Link>
            <Link to="/work" className="hero-secondary-link">See our work</Link>
          </div>
          <p className="hero-microcopy">Free 30-min call · No commitment · Fast turnaround</p>
        </div>
      </section>

      <hr className="rule" />

      {/* ── FEATURED WORK ────────────────────── */}
      <section style={{ padding: '52px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 36 }}>
            <div>
              <div className="label" style={{ marginBottom: 10 }}>Selected work</div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}>
                Results we're proud of
              </h2>
            </div>
            <Link to="/work" className="hero-secondary-link" style={{ flexShrink: 0 }}>
              See all work →
            </Link>
          </div>

          <div className="featured-work-grid">
            {featuredWork.map(w => (
              <Link
                key={w.slug}
                to={`/work/${w.slug}`}
                className="case-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {/* Image — always show GIF */}
                <div className="case-image has-thumbnail" style={{
                  backgroundImage: `url(${w.gif})`,
                  position: 'relative',
                  overflow: 'hidden',
                }} />

                {/* Body */}
                <div className="case-body">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                    <span className="case-client">{w.client}</span>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      flexShrink: 0,
                    }}>{w.tag}</span>
                  </div>
                  <p className="case-desc">{w.desc}</p>
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--rule)' }}>
                    <div className="case-metric-value">{w.metric.value}</div>
                    <div className="case-metric-label">{w.metric.label}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── PROCESS ──────────────────────────── */}
      <section style={{ padding: '52px 0' }}>
        <div className="container">
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

          <div className="process-grid">
            {[
              { title: 'Discovery Call',      desc: '30-min call to understand your goals, current challenges, and what success looks like.' },
              { title: 'Strategy & Proposal', desc: 'Custom roadmap and proposal delivered within 48 hours of the call.' },
              { title: 'Build & Iterate',     desc: 'We build fast, keep you in the loop at every stage, and refine based on your feedback.' },
              { title: 'Launch & Support',    desc: <>Go live with confidence. Ongoing support ensures everything keeps performing. <Link to="/pricing" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2 }}>Our monthly retainers keep things running.</Link></> },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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
                <div style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  marginBottom: 8,
                  color: 'var(--black)',
                }}>
                  {s.title}
                </div>
                <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── TESTIMONIALS ─────────────────────── */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div className="label" style={{ marginBottom: 36, textAlign: 'center' }}>What clients say</div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={t.name} className="testimonial-home-item">
                <blockquote style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 16,
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.75,
                  color: 'var(--black)',
                  margin: 0,
                }}>
                  "{t.quote}"
                </blockquote>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── LOGOS ────────────────────────────── */}
      <section className="logos-section">
        <div className="container">
          <p className="logos-label">Clients we've worked with</p>
          <div className="logos-row">
            {['Luxury Nail Spa', 'Joe Gym', 'Laura Dang Consulting', 'Francis Alcos'].map(name => (
              <span key={name} className="logo-name">{name}</span>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── FAQ ──────────────────────────────── */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div className="faq-layout">
            <div>
              <div className="label" style={{ marginBottom: 14 }}>FAQ</div>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 25,
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                marginBottom: 20,
              }}>
                Common questions
              </h2>
              <Link to="/pricing" style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                See all FAQs on pricing →
              </Link>
            </div>
            <div>
              {homeFaqs.map((f, i) => (
                <div key={f.q} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--rule)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '14px 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 15,
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: 'var(--black)',
                    }}>
                      {f.q}
                    </span>
                    <span aria-hidden="true" style={{
                      fontSize: 18,
                      fontWeight: 300,
                      color: 'var(--muted)',
                      flexShrink: 0,
                      lineHeight: 1,
                      display: 'block',
                      transition: 'transform 0.3s ease',
                      transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    }}>
                      +
                    </span>
                  </button>
                  <div style={{
                    overflow: 'hidden',
                    maxHeight: openFaq === i ? '300px' : '0',
                    transition: 'max-height 0.35s ease',
                  }}>
                    <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.8, paddingBottom: 14 }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── BOTTOM CTA ───────────────────────── */}
      <section className="section-cta">
        <div className="container">
          <div className="label" style={{ marginBottom: 36 }}>Start here</div>
          <h2 className="section-cta-title">
            Let's build something that<br />actually performs
          </h2>
          <Link to="/contact" className="hero-cta">
            Book a free call →
          </Link>
        </div>
      </section>
    </>
  )
}
