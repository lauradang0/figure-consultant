/**
 * Splits the monolithic posts.js (610KB) into:
 *   - src/data/postsIndex.js  — metadata only for BlogList cards
 *   - src/data/posts/{slug}.js — full content, one file per post
 */
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { writeFileSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

const { posts } = await import(join(rootDir, 'src/data/posts.js'))

// 1. Write postsIndex.js — only the fields BlogList actually needs
const index = posts.map(({ slug, h1, intro, category, date, readTime }) => ({
  slug, h1, intro, category, date, readTime,
}))

writeFileSync(
  join(rootDir, 'src/data/postsIndex.js'),
  `export const postsIndex = ${JSON.stringify(index, null, 2)}\n`,
)
console.log(`✓ postsIndex.js — ${index.length} entries`)

// 2. Write one file per post into src/data/posts/
const postsDir = join(rootDir, 'src/data/posts')
mkdirSync(postsDir, { recursive: true })

for (const post of posts) {
  writeFileSync(
    join(postsDir, `${post.slug}.js`),
    `export default ${JSON.stringify(post, null, 2)}\n`,
  )
}
console.log(`✓ src/data/posts/ — ${posts.length} individual files`)
