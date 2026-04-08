import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

const sections = [
  {
    n: '01',
    title: 'Services',
    body: `Figured Consulting provides website design, development, and AI automation services. The scope of work for each engagement is defined in a separate proposal or agreement. We reserve the right to decline any project at our discretion.`,
  },
  {
    n: '02',
    title: 'Payment',
    body: `Payment terms are outlined in your project agreement. Work begins upon receipt of the agreed deposit. Late payments may result in paused work. All fees are non-refundable once work has commenced.`,
  },
  {
    n: '03',
    title: 'Intellectual property',
    body: `Upon full payment, you own the final deliverables. We retain the right to display the work in our portfolio unless you request otherwise in writing. Any third-party assets (fonts, stock images, plugins) remain subject to their own licenses.`,
  },
  {
    n: '04',
    title: 'Client responsibilities',
    body: `You are responsible for providing accurate content, timely feedback, and any credentials or access we need to do our work. Delays caused by missing client input may affect timelines and are not our liability.`,
  },
  {
    n: '05',
    title: 'Limitation of liability',
    body: `Figured Consulting is not liable for any indirect, incidental, or consequential damages arising from the use of our services or deliverables. Our total liability is limited to the amount paid for the specific project in question.`,
  },
  {
    n: '06',
    title: 'Termination',
    body: `Either party may terminate an engagement with written notice. You will be invoiced for all work completed up to the termination date. Deposits are non-refundable.`,
  },
  {
    n: '07',
    title: 'Contact',
    body: `Questions about these terms? Email us at figuredconsulting@gmail.com and we will respond promptly.`,
  },
]

export default function TermsOfService() {
  useSEO({
    title: 'Terms of Service — Figured Consulting',
    description: 'Read the terms and conditions governing use of Figured Consulting\'s services and website.',
  })
  return (
    <>
      {/* ── PAGE HEADER ──────────────────────── */}
      <section className="page-header">
        <div className="container">
          <div className="label">Legal</div>
          <h1 className="page-header-title">Terms of Service</h1>
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
              By engaging Figured Consulting you agree to the following terms.
              We have kept them straightforward and fair.
            </p>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.85 }}>
              These terms apply to all services provided by Figured Consulting, including website design, development, and AI automation work.
            </p>
          </div>
        </div>
      </section>

      {/* ── TERMS SECTIONS ───────────────────── */}
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
                &copy; 2026 Figured Consulting. These terms may be updated occasionally.
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
