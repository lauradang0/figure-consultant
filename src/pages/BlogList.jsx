import { useState } from 'react'
import { Link } from 'react-router-dom'
import { postsIndex as posts } from '../data/postsIndex'
import { useSEO } from '../hooks/useSEO'

const categories = ['All', ...Array.from(new Set(posts.map(p => p.category))).sort()]

export default function BlogList() {
  useSEO({
    title: 'Blog — Digital Growth Insights | Figured Consulting',
    description: 'Practical guides on websites, AI automations, and digital growth strategies for small and mid-sized businesses.',
  })
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
            <svg className="blog-search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
              <line x1="11.7" y1="11.7" x2="16.5" y2="16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              className="blog-search"
              type="text"
              placeholder="Search articles…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search articles"
            />
            {query && (
              <button
                className="blog-search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
          <div className="blog-filter-bar">
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
            <span className="blog-result-count">
              {visible.length} {visible.length === 1 ? 'article' : 'articles'}
            </span>
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
