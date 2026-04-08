import { useParams, Link } from 'react-router-dom'
import NotFound from './NotFound'
import { useSEO } from '../hooks/useSEO'

export const caseStudies = [
  {
    slug: 'joe-gym',
    client: 'Joe Gym',
    industry: 'Fitness · Local Business',
    title: 'Website Redesign',
    desc: 'Reworked the gym site around class bookings and trial signups, making key actions obvious on mobile.',
    tag: 'WEBSITE REDESIGN',
    metrics: [
      { value: '+118%', label: 'Trial signups' },
      { value: '-41%', label: 'Bounce rate' },
      { value: '2.5 wks', label: 'To launch' },
    ],
    fullStory: {
      challenge: 'Joe Gym had a dated site with scattered information across multiple pages. Prospective members struggled to find class schedules, pricing, and a clear way to book a trial session from their phones.',
      solution: 'We rebuilt the information architecture around three high-intent actions: view classes, start a trial, and contact a trainer. We simplified navigation, tightened copy, and implemented a fast mobile-first layout focused on conversion.',
      results: 'Trial bookings increased by 118% in the first two months, and the average time to complete a signup dropped significantly. The new site became the top-performing lead channel for the gym.',
      quote: '"We finally have a website that helps our front desk instead of creating more calls and confusion."',
      quotePerson: 'Joe Martinez, Owner — Joe Gym',
    },
  },
  {
    slug: 'nail-spa',
    client: 'Nail Spa',
    industry: 'Beauty · Local Services',
    title: 'Full Transformation',
    desc: 'Combined a visual brand refresh, improved service pages, and streamlined online appointment booking.',
    tag: 'FULL TRANSFORMATION',
    metrics: [
      { value: '+86%', label: 'Online bookings' },
      { value: '+32%', label: 'Returning clients' },
      { value: '3 wks', label: 'To launch' },
    ],
    fullStory: {
      challenge: 'Nail Spa relied heavily on walk-ins and phone calls, and the old site did not reflect the quality of their work. Service menus were unclear and customers had trouble booking without calling.',
      solution: 'We redesigned the brand presentation, clarified service categories, and integrated a cleaner booking flow that reduced friction from homepage to confirmed appointment.',
      results: 'Online bookings increased 86% and repeat visits improved with stronger post-visit follow-up. Staff spent less time on phone scheduling during peak hours.',
      quote: '"Appointments are smoother now and clients tell us the new site feels exactly like our salon."',
      quotePerson: 'Linh Tran, Manager — Nail Spa',
    },
  },
  {
    slug: 'francis-alcos',
    client: 'Francis Alcos',
    industry: 'Personal Brand · Portfolio',
    title: 'Portfolio Website Redesign',
    desc: 'Restructured a personal portfolio to highlight strongest projects and make inquiry paths more direct.',
    tag: 'WEBSITE REDESIGN',
    metrics: [
      { value: '+74%', label: 'Qualified inquiries' },
      { value: '+53%', label: 'Project page views' },
      { value: '2 wks', label: 'To launch' },
    ],
    fullStory: {
      challenge: 'The previous portfolio had solid work but weak storytelling. Recruiters and clients had to dig to understand impact, stack, and outcomes for each project.',
      solution: 'We rebuilt the portfolio structure around concise case narratives, stronger visual hierarchy, and clearer calls to action for collaboration. We also improved loading performance and mobile readability.',
      results: 'Qualified inbound inquiries increased by 74% and project pages saw much deeper engagement. Visitors now spend more time on high-value case studies.',
      quote: '"The new portfolio finally communicates the level of work I wanted it to reflect."',
      quotePerson: 'Francis Alcos, Product Engineer',
    },
  },
  {
    slug: 'laura-dang',
    client: 'Laura Dang',
    industry: 'Consulting · Personal Brand',
    title: 'Portfolio Refresh',
    desc: 'Updated messaging, service structure, and contact flow to better convert visitors into consultation calls.',
    tag: 'WEBSITE REDESIGN',
    metrics: [
      { value: '+67%', label: 'Consult calls' },
      { value: '-35%', label: 'Drop-off rate' },
      { value: '10 days', label: 'To launch' },
    ],
    fullStory: {
      challenge: 'Laura needed her site to communicate expertise and offerings quickly, but the old layout buried key differentiators and made the contact path too long.',
      solution: 'We rewrote service positioning, redesigned the page flow around proof and outcomes, and reduced the contact funnel to a single focused CTA with better context.',
      results: 'Consultation calls increased 67% within six weeks and page drop-off reduced by 35%. The site now functions as a consistent lead engine.',
      quote: '"I can send people to my site with confidence now. It explains exactly what I do and who I help."',
      quotePerson: 'Laura Dang, Founder',
    },
  },
]

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const c = caseStudies.find(cs => cs.slug === slug)
  const others = caseStudies.filter(cs => cs.slug !== slug).slice(0, 2)
  useSEO({
    title: c ? `${c.client} — ${c.title} | Figured Consulting` : 'Case Study Not Found | Figured Consulting',
    description: c ? c.desc : '',
  })

  if (!c) {
    return <NotFound backTo="/work" backLabel="Back to all work" message="Case study not found" />
  }

  return (
    <>
      <section className="case-detail-section">
        <div className="container">
          <div className="case-detail-inner">
            <Link to="/work" className="case-detail-back">← All work</Link>

            <div className="case-detail-label">{c.tag}</div>
            <h1 className="case-detail-title">
              {c.client} —<br />{c.title}
            </h1>
            <p className="case-detail-desc">{c.desc}</p>

            <div className="case-detail-metrics">
              {c.metrics.map(m => (
                <div key={m.label} className="case-detail-metric">
                  <div className="case-detail-metric-value">{m.value}</div>
                  <div className="case-detail-metric-label">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="case-detail-body">
              <h3>The Challenge</h3>
              <p>{c.fullStory.challenge}</p>

              <h3>Our Solution</h3>
              <p>{c.fullStory.solution}</p>

              <div className="case-detail-quote">
                <p>{c.fullStory.quote}</p>
                <cite>— {c.fullStory.quotePerson}</cite>
              </div>

              <h3>The Results</h3>
              <p>{c.fullStory.results}</p>
            </div>

            <div style={{
              marginTop: 72,
              paddingTop: 48,
              borderTop: '1px solid var(--rule)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
            }}>
              <div>
                <div className="label" style={{ marginBottom: 10 }}>Want results like this?</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>
                  Book a free 30-minute call
                </div>
              </div>
              <Link to="/contact" className="hero-cta">Book a Free Call →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MORE WORK ────────────────────────── */}
      <hr className="rule" />
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="label" style={{ marginBottom: 48 }}>More work</div>
          <div className="more-work-grid">
            {others.map(cs => (
              <Link key={cs.slug} to={`/work/${cs.slug}`} className="more-work-entry">
                <div className="label" style={{ marginBottom: 14 }}>{cs.tag}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 6 }}>
                  {cs.client}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>{cs.industry}</div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{cs.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
