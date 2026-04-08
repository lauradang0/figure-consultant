import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

const services = [
  {
    icon: '🎨',
    tag: 'Website Redesign',
    name: 'High-Converting Website Redesign',
    desc: 'A complete rebuild of your web presence — designed to convert visitors into leads from day one. We handle everything from discovery and wireframing to design, development, and launch.',
    features: [
      'Custom design system & brand refresh',
      'Conversion-optimized page architecture',
      'SEO foundation + Core Web Vitals',
      'CMS integration (Webflow / Next.js)',
      'Mobile-first responsive design',
      'Analytics & tracking setup',
    ],
    price: 'From $3,500',
    featured: false,
    cta: 'Get a free estimate →',
  },
  {
    icon: '🤖',
    tag: 'AI Automations',
    name: 'AI-Powered Automations',
    desc: 'Replace manual workflows with intelligent automations that save hours every week and never sleep. From AI chatbots to lead routing, we build systems that scale with your business.',
    features: [
      'Lead qualification & routing',
      'AI chatbot & support agents',
      'CRM & calendar integrations',
      'Custom Make/Zapier workflows',
      'Email nurture sequences',
      'Reporting dashboards',
    ],
    price: 'From $2,000',
    featured: true,
    cta: 'Book a Call →',
  },
  {
    icon: '⚡',
    tag: 'Full Transformation',
    name: 'Full Digital Transformation',
    desc: 'The complete package — new website, automation stack, and ongoing strategic support, all in one engagement. Best for businesses ready to go all-in on digital growth.',
    features: [
      'Everything in Website Redesign',
      'Everything in AI Automations',
      'Monthly strategy & growth calls',
      'Priority support & iteration',
      'Quarterly performance reviews',
      'Custom integrations & tooling',
    ],
    price: 'From $6,500',
    featured: false,
    cta: 'Contact us →',
  },
]

const steps = [
  { num: 1, title: 'Discovery Call', desc: '30-min call to understand your goals, current challenges, and what success looks like.', active: true },
  { num: 2, title: 'Strategy & Proposal', desc: 'Custom roadmap and proposal delivered within 48 hours of the call.' },
  { num: 3, title: 'Build & Iterate', desc: 'We build fast, share progress daily, and refine based on your feedback.' },
  { num: 4, title: 'Launch & Support', desc: 'Go live with confidence. Ongoing support ensures everything keeps performing.' },
]

export default function Services() {
  useSEO({
    title: 'Services — Websites, AI Automations & Full Transformation | Figured Consulting',
    description: 'Three focused service tracks: high-converting website redesigns, AI-powered workflow automations, and full digital transformation packages. Delivered in weeks.',
  })
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-label">Services</div>
          <h1 className="page-hero-title">Built for businesses<br />ready to grow</h1>
          <p className="page-hero-sub">Three focused service tracks — each designed to deliver measurable ROI, not just deliverables.</p>
        </div>
      </section>

      {/* Full Services */}
      <section className="services-section">
        <div className="container">
          <div className="services-grid">
            {services.map(s => (
              <div key={s.name} className={`service-card${s.featured ? ' featured' : ''}`}>
                <div className="service-icon">{s.icon}</div>
                <div className="service-tag">{s.tag}</div>
                <div className="service-name">{s.name}</div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-features">
                  {s.features.map(f => (
                    <div key={f} className="service-feature">
                      <span className="feature-check">✓</span>{f}
                    </div>
                  ))}
                </div>
                <div className="service-cta">
                  <span className="service-price">{s.price}</span>
                  <Link
                    to="/contact"
                    className={s.featured ? 'btn-primary' : 'btn-secondary'}
                    style={{ padding: '7px 16px', fontSize: '13px' }}
                  >
                    {s.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded detail cards */}
      <section style={{ padding: '0 0 96px', background: 'var(--gray-50)' }}>
        <div className="container" style={{ paddingTop: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label">How each service works</div>
            <h2 className="section-title" style={{ marginTop: 12 }}>What you actually get</h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0', textAlign: 'center' }}>No vague deliverables. Here's exactly what's included in each track.</p>
          </div>

          <div className="service-expanded">
            <div className="service-expanded-content">
              <div className="service-tag">Website Redesign</div>
              <div className="service-expanded-title">From tired to top-converting in 3 weeks</div>
              <p className="service-expanded-desc">We start with a deep-dive into your business goals and customer journey, then design and build a site that turns visitors into leads. Every page is crafted with conversion psychology in mind — not just aesthetics.</p>
              <div className="service-features">
                <div className="service-feature"><span className="feature-check">✓</span>Week 1: Discovery, wireframes, and design mockups</div>
                <div className="service-feature"><span className="feature-check">✓</span>Week 2: Full development and CMS setup</div>
                <div className="service-feature"><span className="feature-check">✓</span>Week 3: QA, revisions, and launch</div>
              </div>
              <Link to="/contact" className="btn-primary" style={{ marginTop: 8, width: 'fit-content' }}>Start a project →</Link>
            </div>
            <div className="service-expanded-visual">🎨</div>
          </div>

          <div className="service-expanded">
            <div className="service-expanded-visual">🤖</div>
            <div className="service-expanded-content">
              <div className="service-tag">AI Automations</div>
              <div className="service-expanded-title">Automate the work that keeps you up at night</div>
              <p className="service-expanded-desc">We audit your current workflows, identify the highest-leverage automation opportunities, then build and deploy custom AI systems. Most clients save 10–20 hours per week within the first month.</p>
              <div className="service-features">
                <div className="service-feature"><span className="feature-check">✓</span>Week 1: Workflow audit and automation roadmap</div>
                <div className="service-feature"><span className="feature-check">✓</span>Week 2: Build, integrate, and test automations</div>
                <div className="service-feature"><span className="feature-check">✓</span>Week 3+: Deploy, monitor, and iterate</div>
              </div>
              <Link to="/contact" className="btn-primary" style={{ marginTop: 8, width: 'fit-content' }}>Book a Call →</Link>
            </div>
          </div>

          <div className="service-expanded">
            <div className="service-expanded-content">
              <div className="service-tag">Full Transformation</div>
              <div className="service-expanded-title">The complete digital overhaul</div>
              <p className="service-expanded-desc">For businesses ready to go all-in: we rebuild your website, automate your workflows, set up analytics, and stay on as your ongoing strategic partner. Think of us as your fractional tech team.</p>
              <div className="service-features">
                <div className="service-feature"><span className="feature-check">✓</span>Everything in both service tracks</div>
                <div className="service-feature"><span className="feature-check">✓</span>Monthly strategy calls with your founder</div>
                <div className="service-feature"><span className="feature-check">✓</span>Priority support with 24hr response SLA</div>
              </div>
              <Link to="/contact" className="btn-primary" style={{ marginTop: 8, width: 'fit-content' }}>Get a custom quote →</Link>
            </div>
            <div className="service-expanded-visual">⚡</div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="process-section">
        <div className="container">
          <div className="process-header">
            <div className="section-label">How it works</div>
            <h2 className="section-title" style={{ marginTop: 12 }}>From first call to launch in 4 weeks</h2>
            <p className="section-subtitle" style={{ margin: '12px auto 0', textAlign: 'center' }}>A structured process that keeps you in the loop without slowing us down.</p>
          </div>
          <div className="process-steps">
            {steps.map(s => (
              <div key={s.num} className={`process-step${s.active ? ' active' : ''}`}>
                <div className="process-num">{s.num}</div>
                <div className="process-title">{s.title}</div>
                <div className="process-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <h2 className="cta-band-title">Ready to get started?</h2>
          <p className="cta-band-sub">Book a free 30-minute discovery call. We'll map out a plan tailored to your business.</p>
          <div className="cta-band-btns">
            <Link to="/contact" className="btn-white">Book a Free Call →</Link>
            <Link to="/pricing" className="btn-ghost-white">See pricing</Link>
          </div>
        </div>
      </section>
    </>
  )
}
