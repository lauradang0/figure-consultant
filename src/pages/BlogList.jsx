import { useState } from 'react'
import { Link } from 'react-router-dom'
import { posts } from '../data/posts'

const categories = ['All', ...Array.from(new Set(posts.map(p => p.category))).sort()]

export default function BlogList() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')

  const visible = posts
    .filter(p => active === 'All' || p.category === active)
    .filter(p => {
      if (!query.trim()) return true
      const q = query.toLowerCase()
      return p.h1.toLowerCase().includes(q) || p.intro.toLowerCase().includes(q)
    })

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────── */}
      <section className="page-header">
        <div className="container">
          <div className="label">Blog</div>
          <h1 className="page-header-title">
            Insights on web,<br />AI, and growth
          </h1>
          <p className="page-header-sub">
            Practical guides for small business owners who want faster websites,
            smarter systems, and measurable results.
          </p>
        </div>
      </section>

      <hr className="rule" />

      {/* ── FILTERS: SEARCH + CATEGORIES ─────── */}
      <div className="blog-filters">
        <div className="container" style={{ maxWidth: 1320 }}>
          <div className="blog-search-wrap">
            <input
              className="blog-search"
              type="search"
              placeholder="Search articles…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="blog-filter-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`blog-filter-tab${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── POST GRID ────────────────────────── */}
      <section style={{ padding: '48px 0 120px' }}>
        <div className="container" style={{ maxWidth: 1320 }}>
          {visible.length === 0 && (
            <p className="blog-no-results">No articles match your search.</p>
          )}
          <div className="blog-grid">
            {visible.map(post => (
              <article key={post.slug} className="blog-card">
                <div className="blog-card-meta">
                  <span className="label">{post.category}</span>
                  <span className="blog-card-date">{post.date} · {post.readTime}</span>
                </div>
                <h2 className="blog-card-title">{post.h1}</h2>
                <p className="blog-card-excerpt">{post.intro}</p>
                <Link to={`/blog/${post.slug}`} className="blog-card-link">
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── BOTTOM CTA ───────────────────────── */}
      <section className="section-cta">
        <div className="container">
          <div className="label" style={{ marginBottom: 36 }}>Work with us</div>
          <h2 className="section-cta-title">
            Ready to build something<br />that actually performs?
          </h2>
          <Link to="/contact" className="hero-cta">
            Book a free call →
          </Link>
        </div>
      </section>
    </>
  )
}
