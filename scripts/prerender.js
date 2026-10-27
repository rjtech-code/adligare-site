// Writes one static HTML file per route (plus 404.html and sitemap.xml) into dist/,
// so crawlers and link previews get the full page and its own <head>.
// Runs after `vite build` and `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist'), ssr = path.resolve('dist-ssr')
const { render, ROUTES, SITE, headHtml } = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href)
const tpl = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const page = (url) => {
  const html = tpl
    .replace(/<title>[\s\S]*?<\/title>\s*<meta name="description"[^>]*>/, headHtml(url))
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`)
  if (!html.includes('<meta property="og:title"') || html.includes('<div id="root"></div>')) throw new Error('Prerender failed for ' + url)
  return html
}
const write = (file, html) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, html) }

// "/" -> index.html, "/meet-ai" -> meet-ai.html (served at /meet-ai via cleanUrls in vercel.json)
for (const r of ROUTES) write(path.join(dist, r === '/' ? 'index.html' : r.slice(1) + '.html'), page(r))
write(path.join(dist, '404.html'), page('/404'))

const today = new Date().toISOString().slice(0, 10)
write(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>${SITE}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`)

fs.rmSync(ssr, { recursive: true, force: true })
console.log(`Prerendered ${ROUTES.length} routes + 404.html and sitemap.xml`)
