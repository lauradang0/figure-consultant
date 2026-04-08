import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

export const caseStudies = [
  {
    slug: 'novatech',
    client: 'E-commerce · Retail',
    title: 'NovaTech — Website Redesign',
    desc: 'Rebuilt their outdated storefront with a conversion-first design, cutting bounce rate and tripling monthly leads.',
    metrics: [
      { value: '+212%', label: 'Leads / mo' },
      { value: '-38%', label: 'Bounce rate' },
      { value: '3 wks', label: 'To launch' },
    ],
    tag: 'Website Redesign',
    // Files in /public are referenced from the site root (e.g. /joe-gym.jpg).
    thumbnail: '/joe-gym.jpg',
    thumbnailCaption: 'Joe Gym website snapshot',
    visual: 'bars',
    fullStory: {
      challenge: 'NovaTech had a 6-year-old website that was built on a rigid template. It looked outdated on mobile, had a confusing navigation structure, and was converting at under 1.2%. They were driving significant paid traffic but losing potential customers before they even saw the product.',
      solution: 'We rebuilt their entire web presence from scratch in 3 weeks. Starting with user research and heatmap analysis of the old site, we designed a conversion-first architecture with a clear value proposition above the fold, streamlined product pages, and a simplified checkout flow. We migrated to Next.js for performance and integrated with their existing Shopify backend.',
      results: 'Within 60 days of launch, monthly leads increased by 212%, bounce rate dropped by 38%, and their conversion rate went from 1.2% to 4.8%. The new site pays for itself every 3 weeks.',
      quote: '"Figure completely transformed how we show up online. Within 6 weeks of launch our inbound leads doubled. Best investment we\'ve made."',
      quotePerson: 'Jordan Lee, CEO — NovaTech',
    },
  },
  {
    slug: 'crestline-legal',
    client: 'Professional Services · Legal',
    title: 'Crestline Legal — AI Intake System',
    desc: 'Automated their entire client intake process — from lead capture to CRM entry — saving 15+ hours per week.',
    metrics: [
      { value: '15h', label: 'Saved / week' },
      { value: '94%', label: 'Accuracy' },
      { value: '2 wks', label: 'Deployed' },
    ],
    tag: 'AI Automations',
    thumbnail: '/case-studies/crestline-thumb.jpg',
    thumbnailCaption: 'Intake and routing workflow',
    visual: 'robot',
    fullStory: {
      challenge: 'Crestline Legal was spending 3+ hours every day manually processing new client inquiries — triaging emails, entering data into their CRM, scheduling consultations, and following up. This was pulling their senior staff away from billable work.',
      solution: 'We built a fully automated intake system: an AI-powered intake form that classifies inquiry type and urgency, routes to the right attorney, creates a CRM record, schedules a consultation via Calendly, and sends a personalized follow-up email — all without human intervention.',
      results: 'The system processes 100% of new inquiries without manual intervention. Staff now spend those 15+ hours on billable client work. Response time dropped from an average of 6 hours to under 4 minutes.',
      quote: '"The AI intake automation they built has saved my team 15+ hours a week. It just works — every time. Worth every penny and then some."',
      quotePerson: 'Marcus Reid, Partner — Crestline Legal',
    },
  },
  {
    slug: 'orbit-analytics',
    client: 'SaaS · B2B',
    title: 'Orbit Analytics — Full Transformation',
    desc: 'Redesigned the marketing site, built an AI demo-booking system, and set up full analytics — in under 4 weeks.',
    metrics: [
      { value: '+340%', label: 'Demo requests' },
      { value: '4 wks', label: 'Timeline' },
      { value: '8.1x', label: 'ROI (3mo)' },
    ],
    tag: 'Full Transformation',
    thumbnail: '/case-studies/orbit-thumb.jpg',
    thumbnailCaption: 'Marketing site and analytics',
    visual: 'lightning',
    fullStory: {
      challenge: 'Orbit Analytics had a compelling product but a website that didn\'t reflect it. Their demo request flow required 5 manual back-and-forth emails to schedule a single call. They had no analytics beyond basic page views, so they couldn\'t optimize anything.',
      solution: 'Full transformation: rebuilt their marketing site with a product-led narrative, built an AI demo booking system that qualifies leads and auto-schedules calls with the right sales rep, implemented full analytics with Mixpanel, and set up automated follow-up sequences for no-shows and leads who didn\'t convert.',
      results: 'Demo requests up 340%. Sales cycle shortened by 40%. In 3 months, they closed enough new ARR to 8.1x their investment in us.',
      quote: '"They delivered in 4 weeks what agencies quoted us 3 months for. The new site is stunning and our demo requests went through the roof."',
      quotePerson: 'Aisha Patel, Founder — Orbit Analytics',
    },
  },
]

function CaseCard({ c }) {
  const thumbnailStyle = c.thumbnail
    ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.4)), url(${c.thumbnail})` }
    : undefined

  return (
    <Link to={`/case-studies/${c.slug}`} className="case-card">
      <div className={`case-image${c.thumbnail ? ' has-thumbnail' : ''}`} style={thumbnailStyle}>
        <div className="case-image-inner">
          {c.thumbnail ? (
            <>
              <div className="case-image-chip">Case Snapshot</div>
              <div className="case-image-caption">{c.thumbnailCaption}</div>
            </>
          ) : c.visual === 'bars' ? (
            <>
              <div className="case-image-bars">
                <div className="case-image-bar" style={{ height: 30 }}></div>
                <div className="case-image-bar after" style={{ height: 55 }}></div>
              </div>
              <div className="case-image-caption">Before / After</div>
            </>
          ) : c.visual === 'robot' ? (
            <>
              <div className="case-image-icon">AI</div>
              <div className="case-image-caption">Workflow Diagram</div>
            </>
          ) : (
            <>
              <div className="case-image-icon">FT</div>
              <div className="case-image-caption">Full Transformation</div>
            </>
          )}
        </div>
      </div>
      <div className="case-body">
        <div className="case-client">{c.client}</div>
        <div className="case-title">{c.title}</div>
        <div className="case-desc">{c.desc}</div>
        <div className="case-metrics">
          {c.metrics.map(m => (
            <div key={m.label} className="case-metric">
              <div className="case-metric-value">{m.value}</div>
              <div className="case-metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="case-footer">
        <span className="case-tag">{c.tag}</span>
        <span>Read case study →</span>
      </div>
    </Link>
  )
}

export default function CaseStudies() {
  useSEO({
    title: 'Case Studies — Real Results | Figured Consulting',
    description: 'See how Figured Consulting has helped businesses grow with custom websites, AI tools, and digital transformation. Real outcomes, not vanity metrics.',
  })
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="section-label">Case Studies</div>
          <h1 className="page-hero-title">Real results for<br />real businesses</h1>
          <p className="page-hero-sub">Every project is different. Here's a look at some of the work we're most proud of.</p>
        </div>
      </section>

      <section className="cases-section">
        <div className="container">
          <div className="cases-grid">
            {caseStudies.map(c => <CaseCard key={c.slug} c={c} />)}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <h2 className="cta-band-title">Want results like these?</h2>
          <p className="cta-band-sub">Book a free 30-minute call. We'll show you exactly what we'd do for your business.</p>
          <div className="cta-band-btns">
            <Link to="/contact" className="btn-white">Book a Free Call →</Link>
            <Link to="/pricing" className="btn-ghost-white">See pricing</Link>
          </div>
        </div>
      </section>
    </>
  )
}
