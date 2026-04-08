# Progress Log

## Session: 2026-03-31

### Done
- Hero section typewriter effect — cycling phrases, inline cursor, badges, proof strip, CTAs, microcopy
- Fixed hero layout — all content visible above fold on desktop without scrolling
- Swapped "How it works" and "Trusted by fast-growing companies" sections
- Built full blog feature: `/blog` listing page, `/blog/:slug` detail page, nav link, footer link, routes
- Added blog CSS: grid, card, article, FAQ accordion, CTA block, responsive breakpoints
- Generated 126 SEO blog posts across 14 categories for ~125 business niches
- `npm run build` passes cleanly

## Session: 2026-04-07

### Done
- Added "Common questions" FAQ accordion to Home page — 4 objection-handling FAQs placed between the client logos and bottom CTA, reusing the `.faq-layout` grid and Pricing page accordion pattern; includes "See all FAQs on pricing →" link

### In Progress
- Nothing

### Next
- Review and test home page FAQ accordion in dev server

### Notes
- posts.js is ~606 KB which causes a Vite bundle size warning (non-breaking) — could be split later with dynamic imports if load time becomes an issue
- 126 total posts: 1 original AI automation + 125 niche-specific posts across 14 categories
- All posts follow the same shape: slug, seoTitle, metaDescription, category, date, readTime, h1, intro, 4 sections (each with h2 + body), 3 FAQ items, CTA
