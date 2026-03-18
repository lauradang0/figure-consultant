import { Link } from 'react-router-dom'
import { useState } from 'react'

const plans = [
  {
    index: '01',
    tier: 'Starter',
    price: '499',
    originalPrice: '999',
    priceLabel: 'one-time',
    desc: 'Best for early-stage businesses getting a professional presence online fast.',
    features: [
      'Up to 5 pages',
      'Mobile responsive',
      'Contact form',
      '2 rounds of revisions',
    ],
    cta: 'Get started →',
    ctaParam: 'starter',
  },
  {
    index: '02',
    tier: 'Growth',
    price: '1,250',
    originalPrice: '2,500',
    priceLabel: 'one-time',
    desc: 'Our most-chosen package. Built to convert visitors into leads from day one.',
    features: [
      'Up to 8 pages',
      'Custom design system',
      'SEO foundation',
      'CRM integration',
      'Unlimited revisions (14 days)',
    ],
    cta: 'Get started →',
    ctaParam: 'growth',
    highlight: true,
  },
  {
    index: '03',
    tier: 'Custom',
    price: "Let's talk",
    priceLabel: null,
    desc: 'Complete digital transformation with automation, AI, and ongoing strategy.',
    features: [
      'Unlimited pages',
      'Full automation stack',
      'AI integrations',
      'Monthly strategy calls',
      'Priority support',
    ],
    cta: 'Book a call →',
    ctaParam: 'custom',
    custom: true,
  },
]

const retainerPlans = [
  {
    index: '01',
    tier: 'Standard',
    price: '99',
    priceLabel: 'per month',
    desc: 'Keep your site live, secure, and running smoothly every month.',
    features: [
      'Hosting',
      'Bug fixes & security patches',
      'Monthly performance report',
      'Up to 2hr changes/mo',
    ],
    cta: 'Get started →',
    ctaParam: 'retainer-standard',
  },
  {
    index: '02',
    tier: 'Growth',
    price: '199',
    priceLabel: 'per month',
    desc: 'Everything in Standard plus proactive growth support and strategy.',
    features: [
      'Everything in Standard',
      'Up to 5hr changes/mo',
      'SEO monitoring',
      'Monthly strategy check-in',
    ],
    cta: 'Get started →',
    ctaParam: 'retainer-growth',
    highlight: true,
  },
  {
    index: '03',
    tier: 'Custom',
    price: "Let's talk",
    priceLabel: null,
    desc: 'Tailored retainer for clients needing AI workflows and custom integrations.',
    features: [
      'AI automation workflows',
      'Custom integrations',
      'Scoped per client',
    ],
    cta: 'Book a call →',
    ctaParam: 'custom',
    custom: true,
  },
]

const faqs = [
  {
    q: "What's included in the build fee?",
    a: "Design, development, integrations, QA, and launch are all included. Hosting is separate and typically runs $20–50/month depending on your needs.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects launch within 3–4 weeks from the kickoff call. Custom projects may take 5–6 weeks. We'll give you a precise timeline in your proposal.",
  },
  {
    q: "Can I cancel my monthly retainer?",
    a: "Yes. Monthly retainers are month-to-month with no long-term commitment. Cancel or pause anytime with 14 days' notice.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. For projects over $2,000 we offer 50% upfront / 50% on launch. We can also discuss monthly payment options for the right fit.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Absolutely. Our Starter plan is designed for founders who are just getting started and need a professional online presence without a massive investment.",
  },
]

function PricingGrid({ items }) {
  const defaultSelected = items.findIndex(p => p.highlight)
  const [selected, setSelected] = useState(defaultSelected >= 0 ? defaultSelected : 0)

  const formatAmount = (value) => Number(value).toLocaleString('en-US')
  const toNumber = (value) => Number(String(value).replace(/,/g, ''))

  return (
    <div className="pricing-3col-grid">
      {items.map((p, i) => {
        const isSelected = selected === i
        const isDiscounted = Boolean(p.originalPrice)
        return (
          <div
            key={p.tier}
            className={`pricing-card${isSelected ? ' pricing-card--highlight' : ''}`}
            onClick={() => setSelected(i)}
            style={{
              background: isSelected ? 'var(--black)' : (isDiscounted ? 'rgba(0,0,0,0.02)' : 'transparent'),
              padding: '36px 32px 32px',
              display: 'flex',
              flexDirection: 'column',
              borderRight: i < items.length - 1 ? '1px solid var(--rule)' : 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {isSelected && (
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: 3,
                background: '#fff',
              }} />
            )}
            {isDiscounted && (
              <div style={{
                position: 'absolute',
                top: 14,
                right: -34,
                transform: 'rotate(35deg)',
                background: isSelected ? '#fff' : 'var(--black)',
                color: isSelected ? 'var(--black)' : '#fff',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '5px 38px',
                zIndex: 2,
                boxShadow: '0 6px 12px rgba(0,0,0,0.22)',
              }}>
                50% OFF
              </div>
            )}
            {/* Label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              marginBottom: 16,
            }}>
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isSelected ? '#fff' : 'var(--muted)',
              }}>
                {p.highlight ? 'Most popular' : p.index}
              </span>
            </div>

            {/* Tier name */}
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 10,
              color: isSelected ? '#fff' : 'var(--black)',
            }}>
              {p.tier}
            </div>

            {/* Desc */}
            <p style={{
              fontSize: 12,
              lineHeight: 1.7,
              color: isSelected ? '#fff' : 'var(--muted)',
              marginBottom: 28,
            }}>
              {p.desc}
            </p>

            {/* Price */}
            {p.custom ? (
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: isSelected ? '#fff' : 'var(--black)',
                marginBottom: 28,
              }}>
                {p.price}
              </div>
            ) : (
              <>
                {p.originalPrice && (
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: isSelected ? '#fff' : 'var(--muted)',
                    marginBottom: 6,
                    textDecoration: 'line-through',
                    textDecorationColor: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--black)',
                    textDecorationThickness: 2,
                  }}>
                    <sup style={{ fontSize: 13, fontWeight: 400, verticalAlign: 'super', letterSpacing: 0 }}>$</sup>
                    {p.originalPrice}
                  </div>
                )}
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 48,
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: isSelected ? '#fff' : 'var(--black)',
                  marginBottom: 4,
                }}>
                  <sup style={{ fontSize: 22, fontWeight: 400, verticalAlign: 'super', letterSpacing: 0 }}>$</sup>
                  {p.price}
                </div>
                <div style={{
                  fontSize: 11,
                  color: isSelected ? '#fff' : 'var(--muted)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: 28,
                }}>
                  {p.priceLabel}
                </div>
                {p.originalPrice && (
                  <div style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: isSelected ? '#fff' : 'var(--black)',
                    background: isSelected ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${isSelected ? 'rgba(255,255,255,0.3)' : 'var(--rule)'}`,
                    width: 'fit-content',
                    padding: '4px 8px',
                    marginBottom: 24,
                  }}>
                    Save ${formatAmount(toNumber(p.originalPrice) - toNumber(p.price))}
                  </div>
                )}
              </>
            )}

            {/* Features */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto', flexGrow: 1 }}>
              {p.features.map(f => (
                <li key={f} style={{
                  fontSize: 12,
                  padding: '5px 0',
                  color: isSelected ? '#fff' : 'var(--black)',
                  display: 'flex',
                  gap: 8,
                  alignItems: 'flex-start',
                }}>
                  <span style={{
                    color: isSelected ? '#fff' : 'var(--black)',
                    flexShrink: 0,
                    marginTop: 1,
                  }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div style={{
              borderTop: `1px solid ${isSelected ? 'rgba(255,255,255,0.12)' : 'var(--rule)'}`,
              marginTop: 28,
              paddingTop: 24,
            }}>
              <Link
                to={`/contact?package=${p.ctaParam}`}
                onClick={e => e.stopPropagation()}
                style={{
                  display: 'inline-block',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  color: isSelected ? '#fff' : 'var(--black)',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${isSelected ? 'rgba(255,255,255,0.35)' : 'var(--black)'}`,
                  paddingBottom: 2,
                }}
              >
                {p.cta}
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(0)
  const [pricingTab, setPricingTab] = useState('onetime')
  const activePlans = pricingTab === 'onetime' ? plans : retainerPlans

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────── */}
      <section className="page-header">
        <div className="container">
          <div className="label">Pricing</div>
          <h1 className="page-header-title">
            Transparent,<br />no-surprise pricing
          </h1>
          <p className="page-header-sub">
            One-time build fee + optional monthly retainer.
            No hidden costs, no scope creep.
          </p>
        </div>
      </section>

      {/* ── PRICING SECTION WITH TOGGLE ──────── */}
      <section style={{ padding: '64px 0 80px' }}>
        <div className="container">

          {/* Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
            <div style={{
              display: 'inline-flex',
              border: '1px solid var(--black)',
              overflow: 'hidden',
            }}>
              {[
                { key: 'onetime',  label: 'One-time' },
                { key: 'retainer', label: 'Monthly retainer' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setPricingTab(tab.key)}
                  style={{
                    padding: '10px 28px',
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease, color 0.2s ease',
                    background: pricingTab === tab.key ? 'var(--black)' : 'transparent',
                    color: pricingTab === tab.key ? '#fff' : 'var(--black)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {pricingTab === 'onetime' && (
            <div style={{
              margin: '0 auto 24px',
              maxWidth: 760,
              border: '1px solid #000',
              background: 'linear-gradient(90deg, #000 0%, #1a1a1a 100%)',
              color: '#fff',
              textAlign: 'center',
              padding: '12px 16px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Limited Launch Sale: Discounted One-Time Builds
            </div>
          )}

          {/* Active plans */}
          <div className="page-fade" key={pricingTab}>
            <PricingGrid key={pricingTab} items={activePlans} />
          </div>

        </div>
      </section>

      <hr className="rule" />

      {/* ── FAQ — accordion ───────────────────── */}
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
              }}>
                Common questions
              </h2>
            </div>
            <div>
              {faqs.map((f, i) => (
                <div key={f.q} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--rule)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
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
                    <span style={{
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
              <div style={{ borderTop: '1px solid var(--rule)' }} />
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── CTA ──────────────────────────────── */}
      <section className="section-cta">
        <div className="container">
          <div className="label" style={{ marginBottom: 36 }}>Not sure which plan?</div>
          <h2 className="section-cta-title">
            Let's figure it out together
          </h2>
          <Link to="/contact" className="hero-cta">
            Book a free call →
          </Link>
        </div>
      </section>
    </>
  )
}
