import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

const work = [
  {
    slug: 'joe-gym',
    client: 'Joe Gym',
    type: 'WEBSITE REDESIGN',
    tagline: 'Landing page redesign with stronger local lead capture',
    bg: '/joe-gym2.png',
    bgGif: '/joe-gym.gif',
  },
  {
    slug: 'nail-spa',
    client: 'Nail Spa',
    type: 'FULL TRANSFORMATION',
    tagline: 'Brand refresh and booking flow redesign',
    bg: '/nail-spa.png',
    bgGif: '/nail-spa.gif',
  },
  {
    slug: 'francis-alcos',
    client: 'Francis Alcos',
    type: 'WEBSITE REDESIGN',
    tagline: 'Personal portfolio with polished project storytelling',
    bg: '/francis-alcos-portfolio.png',
    bgGif: '/francis-alcos-portfolio.gif',
  },
  {
    slug: 'laura-dang',
    client: 'Laura Dang',
    type: 'WEBSITE REDESIGN',
    tagline: 'Portfolio refresh with clearer service positioning',
    bg: '/laura-dang-portfolio.png',
    bgGif: '/laura-dang-portfolio.gif',
  },
]

const cardHeights = Array(work.length).fill(500)

export default function Work() {
  useSEO({
    title: 'Our Work — Real Results for Real Businesses | Figured Consulting',
    description: 'See case studies from clients like Joe Gym and Luxury Nail Spa — websites and digital products that tripled bookings and doubled inbound leads.',
  })
  const [hoveredSlug, setHoveredSlug] = useState(null)
  const [gifVersionBySlug, setGifVersionBySlug] = useState({})

  const handleMouseEnter = (w) => {
    setHoveredSlug(w.slug)
    if (w.bgGif) {
      setGifVersionBySlug(prev => ({
        ...prev,
        [w.slug]: (prev[w.slug] ?? 0) + 1,
      }))
    }
  }

  const handleMouseLeave = (w) => {
    setHoveredSlug(current => (current === w.slug ? null : current))
  }

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────── */}
      <section className="page-header" style={{ paddingBottom: 52 }}>
        <div className="container">
          <div className="label">Our work</div>
          <h1 className="page-header-title">
            Real results for<br />real businesses
          </h1>
        </div>
      </section>

      <hr className="rule" />

      {/* ── EDITORIAL GRID ───────────────────── */}
      <section style={{ padding: 0 }}>
        <div className="work-editorial-grid">
          {work.map((w, i) => (
            <Link
              key={`${w.slug}-${i}`}
              to={`/work/${w.slug}`}
              className="work-grid-card"
              onMouseEnter={() => handleMouseEnter(w)}
              onMouseLeave={() => handleMouseLeave(w)}
              style={{
                display: 'block',
                position: 'relative',
                height: cardHeights[i],
                overflow: 'hidden',
                borderRight: i % 2 === 0 ? '1px solid var(--rule)' : 'none',
                borderBottom: '1px solid var(--rule)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {/* Background image / placeholder */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `center / cover no-repeat url('${w.bg}')`,
                transition: 'transform 0.3s ease',
              }}
              className="work-card-bg"
              />

              {/* Optional hover GIF preview */}
              {w.bgGif && (
                <img
                  key={`${w.slug}-${gifVersionBySlug[w.slug] ?? 0}`}
                  src={`${w.bgGif}?v=${gifVersionBySlug[w.slug] ?? 0}`}
                  alt=""
                  aria-hidden="true"
                  className="work-card-gif"
                  style={{
                    opacity: hoveredSlug === w.slug ? 1 : 0,
                  }}
                />
              )}

              {/* Bottom gradient overlay for text legibility */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 45%, transparent 70%)',
                zIndex: 1,
              }} />

              {/* Top-left label */}
              <div style={{
                position: 'absolute',
                top: 24,
                left: 24,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                }}>
                  {w.type}
                </span>
              </div>

              {/* Bottom-left text */}
              <div style={{
                position: 'absolute',
                bottom: 28,
                left: 28,
                right: 28,
                zIndex: 2,
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: 6,
                }}>
                  {w.client}
                </div>
                <div style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.65)',
                  fontFamily: 'var(--font-sans)',
                  lineHeight: 1.5,
                }}>
                  {w.tagline}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="rule" />

      {/* ── CTA ──────────────────────────────── */}
      <section className="section-cta">
        <div className="container">
          <div className="label" style={{ marginBottom: 36 }}>Work with us</div>
          <h2 className="section-cta-title">
            Want results like these?
          </h2>
          <Link to="/contact" className="hero-cta">
            Book a free call →
          </Link>
        </div>
      </section>
    </>
  )
}
