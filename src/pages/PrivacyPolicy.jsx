import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

const sections = [
  {
    n: '01',
    title: 'Information we collect',
    body: `We collect information you provide directly — such as your name, email address, and project details — when you fill out our contact form or book a call. We may also collect basic analytics data (pages visited, time on site) through standard web analytics tools to understand how our site is used.`,
  },
  {
    n: '02',
    title: 'How we use your information',
    body: `We use your information solely to respond to your inquiries, deliver the services you have engaged us for, and occasionally send project updates or relevant news if you have opted in. We do not use your data for advertising or automated profiling.`,
  },
  {
    n: '03',
    title: 'Sharing your information',
    body: `We do not sell, rent, or share your personal information with third parties, except as necessary to deliver our services (e.g. sending an email through a hosted email provider) or as required by law.`,
  },
  {
    n: '04',
    title: 'Data retention',
    body: `We retain your information for as long as needed to fulfil the purpose it was collected for, or as required by applicable law. You may request deletion of your data at any time by contacting us.`,
  },
  {
    n: '05',
    title: 'Cookies',
    body: `Our site may use minimal cookies to support basic functionality and analytics. We do not use tracking cookies for advertising. You can disable cookies in your browser settings at any time.`,
  },
  {
    n: '06',
    title: 'Your rights',
    body: `You have the right to access, correct, or delete any personal information we hold about you. To exercise these rights, email us at figuredconsulting@gmail.com and we will respond within 5 business days.`,
  },
  {
    n: '07',
    title: 'Contact',
    body: `Questions about this policy? Reach us at figuredconsulting@gmail.com. We are a small team and we will respond personally.`,
  },
]

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy — Figured Consulting',
    description: 'Read our privacy policy to understand how Figured Consulting collects, uses, and protects your information.',
  })
  return (
    <>
      {/* ── PAGE HEADER ──────────────────────── */}
      <section className="page-header">
        <div className="container">
          <div className="label">Legal</div>
          <h1 className="page-header-title">Privacy Policy</h1>
          <p className="page-header-sub">Last updated March 2026.</p>
        </div>
      </section>

      <hr className="rule" />

      {/* ── INTRO ────────────────────────────── */}
      <section style={{ padding: '64px 0 0' }}>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 22,
              lineHeight: 1.65,
              fontWeight: 400,
              marginBottom: 20,
            }}>
              Figured Consulting is a boutique website design and AI automation studio.
              We take your privacy seriously and keep data collection to the minimum
              necessary to do our work.
            </p>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              This policy applies to figureconsulting.co and any services delivered under the Figured Consulting name.
            </p>
          </div>
        </div>
      </section>

      {/* ── POLICY SECTIONS ──────────────────── */}
      <section style={{ padding: '48px 0 80px' }}>
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            {sections.map(s => (
              <div key={s.n} style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 6 }}>
                  <span className="label">{s.n}</span>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 17,
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                  }}>
                    {s.title}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, paddingLeft: 36 }}>{s.body}</p>
              </div>
            ))}

            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                &copy; 2026 Figured Consulting. This policy may be updated occasionally.
              </p>
              <Link to="/contact" className="hero-cta" style={{ fontSize: 13, padding: '10px 24px' }}>
                Get in touch &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
