import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    setLoading(true)
    setPost(null)
    setOpenFaq(null)
    import(`../data/posts/${slug}.js`)
      .then(mod => {
        setPost(mod.default)
        setLoading(false)
      })
      .catch(() => {
        setPost(null)
        setLoading(false)
      })
  }, [slug])

  useEffect(() => {
    if (!post) return

    document.title = post.seoTitle

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', post.metaDescription)

    return () => {
      document.title = 'Figured Consulting'
      if (meta) meta.setAttribute('content', '')
    }
  }, [post])

  if (loading) {
    return (
      <section style={{ padding: '120px 0', textAlign: 'center' }}>
        <div className="container">
          <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section style={{ padding: '120px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="label" style={{ marginBottom: 24 }}>Not found</div>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 32,
          }}>
            Post not found
          </h1>
          <Link to="/blog" className="hero-cta">← Back to blog</Link>
        </div>
      </section>
    )
  }

  return (
    <section style={{ padding: '80px 0 120px' }}>
      <div className="container">
        <div className="blog-article">

          {/* ── BACK LINK ──────────────────────── */}
          <Link to="/blog" className="case-detail-back">← All posts</Link>

          {/* ── ARTICLE HEADER ─────────────────── */}
          <div className="blog-article-meta">
            <span className="label">{post.category}</span>
            <span className="blog-card-date">{post.date} · {post.readTime}</span>
          </div>
          <h1 className="blog-article-h1">{post.h1}</h1>
          <p className="blog-article-intro">{post.intro}</p>

          <hr className="rule" style={{ margin: '48px 0' }} />

          {/* ── BODY SECTIONS ──────────────────── */}
          {post.sections.map((section, i) => (
            <div key={i} className="blog-section">
              <h2 className="blog-article-h2">{section.h2}</h2>
              {section.body.split('\n\n').map((para, j) => (
                <p key={j} className="blog-article-p">{para}</p>
              ))}
            </div>
          ))}

          {/* ── FAQ ────────────────────────────── */}
          {post.faq && post.faq.length > 0 && (
            <div className="blog-faq">
              <div className="label" style={{ marginBottom: 32 }}>Frequently asked questions</div>
              {post.faq.map((item, i) => (
                <div key={i} className="blog-faq-item">
                  <button
                    className="blog-faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{item.q}</span>
                    <span className="blog-faq-icon" aria-hidden="true">
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="blog-faq-answer">{item.a}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── END CTA ────────────────────────── */}
          <div className="blog-cta-block">
            <div className="label" style={{ marginBottom: 16 }}>Work with us</div>
            <h3 className="blog-cta-headline">{post.cta.headline}</h3>
            <p className="blog-cta-subtext">{post.cta.subtext}</p>
            <Link to="/contact" className="hero-cta">Book a free call →</Link>
          </div>

        </div>
      </div>
    </section>
  )
}
