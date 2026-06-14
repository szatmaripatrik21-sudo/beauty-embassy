// One-off: rename English route slugs to Hungarian across src/.
// Ordered (longest/most-specific first) + case-sensitive so capitalized import
// paths like '@/pages/Treatments' are never touched.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs'
import { join } from 'path'

const ROOT = new URL('../src', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

const REPLACEMENTS = [
  ['/treatments/signature-rituals', '/kezelesek/signature-ritualek'],
  ['/treatments', '/kezelesek'],
  ['/about', '/rolunk'],
  ['/gallery', '/galeria'],
  ['/contact', '/kapcsolat'],
  ['/book', '/foglalas'],
]

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full)
  }
  return out
}

let totalFiles = 0
let totalHits = 0
for (const file of walk(ROOT)) {
  const before = readFileSync(file, 'utf8')
  let after = before
  let hits = 0
  for (const [from, to] of REPLACEMENTS) {
    const parts = after.split(from)
    if (parts.length > 1) {
      hits += parts.length - 1
      after = parts.join(to)
    }
  }
  if (after !== before) {
    writeFileSync(file, after)
    totalFiles++
    totalHits += hits
    console.log(`  ${hits.toString().padStart(2)}  ${file.replace(ROOT, 'src')}`)
  }
}
console.log(`\n${totalHits} replacements across ${totalFiles} files`)
