import { Link } from 'react-router-dom'

export default function NotFound({
  backTo = '/',
  backLabel = 'Back to home',
  message = 'Page not found',
}) {
  return (
    <section style={{ padding: '120px 0', textAlign: 'center' }}>
      <div className="container">
        <div className="label" style={{ marginBottom: 24 }}>404</div>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}>
          {message}
        </h1>
        <p style={{
          fontSize: 15,
          color: 'var(--muted)',
          marginBottom: 40,
          maxWidth: 380,
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.7,
        }}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={backTo} className="hero-cta">← {backLabel}</Link>
          {backTo !== '/' && (
            <Link to="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--muted)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              Go to home
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
