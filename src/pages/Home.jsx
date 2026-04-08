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

const BADGES = [
  'Websites & landing pages',
  'E-commerce & payments',
  'AI-powered features',
  'Workflow automation',
  'Custom dashboards & tools',
]

const CARD_W = 456          // 440px card + 16px gap
const TOTAL_W = CARD_W * 4  // one full set (4 cards)

function onCardMouseMove(e) {
  if (e.buttons === 1) return // skip tilt while dragging
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top)  / rect.height
  const tiltX = (y - 0.5) * -10
  const tiltY = (x - 0.5) *  10
  card.style.transition = 'transform 0.08s linear'
  card.style.transform  = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03,1.03,1.03)`
  const shine = card.querySelector('.marquee-card-shine')
  if (shine) {
    shine.style.opacity    = '1'
    shine.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(255,255,255,0.18) 0%, transparent 65%)`
  }
}

function onCardMouseLeave(e) {
  const card = e.currentTarget
  card.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1)'
  card.style.transform  = ''
  const shine = card.querySelector('.marquee-card-shine')
  if (shine) shine.style.opacity = '0'
}

const featuredWork = [
  {
    slug: 'joe-gym',
    client: 'Joe Gym',
    tag: 'Website Redesign',
    desc: 'Fitness studio needed a site that converts walk-ins and reduces front desk calls.',
    metric: { value: '+118%', label: 'Trial signups' },
    bg: '/joe-gym2.png',
    gif: '/joe-gym.gif',
    url: 'joegym.co',
  },
  {
    slug: 'nail-spa',
    client: 'Luxury Nail Spa',
    tag: 'Full Transformation',
    desc: 'Booking-first redesign for a high-end nail salon looking to reduce no-shows.',
    metric: { value: '3×', label: 'Online bookings' },
    bg: '/nail-spa.png',
    gif: '/nail-spa.gif',
    url: 'luxurynailspa.com',
  },
  {
    slug: 'francis-alcos',
    client: 'Francis Alcos',
    tag: 'Portfolio Website',
    desc: 'Restructured a personal portfolio to highlight strongest projects and make inquiry paths more direct.',
    metric: { value: '+74%', label: 'Qualified inquiries' },
    bg: '/francis-alcos-portfolio.png',
    gif: '/francis-alcos-portfolio.gif',
    url: 'francisalcos.com',
  },
  {
    slug: 'laura-dang',
    client: 'Laura Dang',
    tag: 'Portfolio Refresh',
    desc: 'Updated messaging, service structure, and contact flow to better convert visitors into consultation calls.',
    metric: { value: '+67%', label: 'Consult calls' },
    bg: '/laura-dang-portfolio.png',
    gif: '/laura-dang-portfolio.gif',
    url: 'lauradang.com',
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
  const marqueeRef     = useRef(null)
  const offsetRef      = useRef(0)
  const pausedRef      = useRef(false)
  const animRef        = useRef(null)
  const dragStartX     = useRef(null)
  const dragStartOff   = useRef(0)
  const isDragging     = useRef(false)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (!lightbox) return
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  useEffect(() => {
    const el = marqueeRef.current
    if (!el) return
    const tick = () => {
      if (!pausedRef.current) {
        offsetRef.current += 0.7
        if (offsetRef.current >= TOTAL_W) offsetRef.current -= TOTAL_W
        el.style.transform = `translateX(-${offsetRef.current}px)`
      }
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const onPointerDown = (e) => {
    isDragging.current   = true
    pausedRef.current    = true
    dragStartX.current   = e.clientX
    dragStartOff.current = offsetRef.current
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!isDragging.current) return
    const delta = dragStartX.current - e.clientX
    offsetRef.current = ((dragStartOff.current + delta) % TOTAL_W + TOTAL_W) % TOTAL_W
    const el = marqueeRef.current
    if (el) el.style.transform = `translateX(-${offsetRef.current}px)`
  }

  const onPointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    pausedRef.current  = false
  }

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
      <section style={{ padding: '52px 0 0' }}>
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
            <Link to="/work" className="hero-secondary-link" style={{ flexShrink: 0 }}>See all work →</Link>
          </div>
        </div>

        <div
          className="marquee-outer"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div ref={marqueeRef} className="marquee-track">
            {[...featuredWork, ...featuredWork].map((w, i) => (
              <Link
                key={`${w.slug}-${i}`}
                to={`/work/${w.slug}`}
                className="marquee-card"
                style={{ textDecoration: 'none' }}
                onMouseMove={onCardMouseMove}
                onMouseLeave={onCardMouseLeave}
                onClick={(e) => {
                  e.preventDefault()
                  onCardMouseLeave(e)
                  setLightbox(w)
                }}
              >
                <div
                  className="marquee-card-inner"
                  style={{ backgroundImage: `url(${w.bg})` }}
                >
                  <div className="marquee-card-shine" />
                  <div className="marquee-card-overlay">
                    <div className="marquee-card-client">{w.client}</div>
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid var(--rule)',
          }}>
            {testimonials.map((t, i) => (
              <div key={t.name} style={{
                padding: '36px 36px 36px 0',
                paddingLeft: i === 0 ? 0 : 36,
                borderRight: i < testimonials.length - 1 ? '1px solid var(--rule)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 32,
              }}>
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
      {/* ── LIGHTBOX ─────────────────────────── */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
            <img src={lightbox.bg} alt={lightbox.client} className="lightbox-img" />
            <div className="lightbox-footer">
              <span className="lightbox-client">{lightbox.client}</span>
              <span className="lightbox-metric">{lightbox.metric.value}</span>
              <Link
                to={`/work/${lightbox.slug}`}
                className="lightbox-link"
                onClick={() => setLightbox(null)}
              >
                View project →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
