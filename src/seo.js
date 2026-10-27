// Per-route SEO: titles, descriptions, canonical URLs and JSON-LD.
// Used at build time (scripts/prerender.js) and on client-side navigation.
import { C } from './ui.jsx'
import { MEET_FAQ } from './MeetAI.jsx'
import { EDOCS_FAQ } from './EDocs.jsx'

export const SITE = 'https://www.adligare.tech'
const BRAND = 'Adligare Tech'
const OG_IMAGE = SITE + '/og-image.png'

// [path, title, description, breadcrumb name]
const PAGES = [
  ['/', 'Adligare Tech | Meet-AI Attendance and E-Docs PDF Tools', 'Adligare Tech builds Meet-AI, automatic attendance for Google Meet and Zoom, and E-Docs, 28 free PDF tools with translation into Hindi and 10 more languages.'],
  ['/meet-ai', 'Meet-AI: Attendance Tracker for Google Meet and Zoom', 'Chrome extension that records who joined your Google Meet or Zoom call, when and for how long, plus hand raises and captions. Free up to 30 participants.', 'Meet-AI'],
  ['/meet-ai/setup', 'Meet-AI Setup Guide: Install the Chrome Extension', 'Install Meet-AI in Chrome, Edge or Brave, connect your account and get your first attendance report in about five minutes. Includes troubleshooting tips.', 'Setup guide'],
  ['/e-docs', 'E-Docs: Free PDF Tools and PDF Translation to Hindi', '28 free PDF tools to merge, split, compress, convert, sign and protect files, plus translation of PDF and Word documents into Hindi and 10 more languages.', 'E-Docs'],
  ['/services', 'Website Development and Maintenance (AMC) Services | Adligare Tech', 'Custom web portals and annual maintenance contracts (AMC) for government and private organisations: updates, bug fixes, security patches and backups.', 'Services'],
  ['/pricing', 'Meet-AI Pricing: Free, Premium and Enterprise Plans | Adligare Tech', 'Meet-AI is free up to 30 participants. Premium is ₹99/month and Enterprise ₹189/month. E-Docs is completely free. No hidden fees.', 'Pricing'],
  ['/roadmap', 'Vision and Roadmap | Adligare Tech', 'Our vision for reliable, affordable digital infrastructure in India, and what is next for Meet-AI, E-Docs and new products.', 'Roadmap'],
  ['/about', 'About Adligare Tech: Software Startup from Bidasar, Rajasthan', 'Adligare Tech is an Indian software startup in Bidasar, Churu, Rajasthan, building Meet-AI and E-Docs and maintaining websites for organisations.', 'About'],
  ['/security', 'Security and Data Protection | Adligare Tech', 'How Meet-AI and E-Docs protect your data: in-browser file processing, hashed passwords, limited access, audit logs and incident response.', 'Security'],
  ['/contact', 'Contact Adligare Tech: Support, Demos and Enquiries', `Questions, demos or partnerships? Email ${C.email} or call ${C.phone}. Registered office in Bidasar, Churu, Rajasthan 331501.`, 'Contact'],
  ['/terms', 'Terms and Conditions | Adligare Tech', 'Terms and conditions for using Meet-AI, E-Docs and the Adligare Tech website.', 'Terms and Conditions'],
  ['/privacy', 'Privacy Policy | Adligare Tech', 'What data Meet-AI and E-Docs collect, how it is used, and your rights under India’s Digital Personal Data Protection Act, 2023.', 'Privacy Policy'],
  ['/refund', 'Refund and Cancellation Policy | Adligare Tech', 'Refund and cancellation rules for Meet-AI subscriptions, free services and website or AMC contracts.', 'Refund Policy'],
]
const BY_PATH = Object.fromEntries(PAGES.map((p) => [p[0], p]))
export const ROUTES = PAGES.map((p) => p[0])

const ORG = {
  '@type': 'Organization', '@id': SITE + '/#org', name: BRAND, url: SITE + '/', logo: SITE + '/adligare-logo.png',
  email: C.email, telephone: C.tel,
  address: { '@type': 'PostalAddress', streetAddress: 'Behind BDS School', addressLocality: 'Bidasar', addressRegion: 'Rajasthan', postalCode: '331501', addressCountry: 'IN' },
  founder: [{ '@type': 'Person', name: 'Manoj Kumar Sankla' }, { '@type': 'Person', name: 'Mohit Darji' }],
}
const faq = (items) => ({ '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) })
const crumbs = (path) => {
  const parts = path.split('/').filter(Boolean).map((_, i, a) => '/' + a.slice(0, i + 1).join('/'))
  return { '@type': 'BreadcrumbList', itemListElement: [['/', 'Home'], ...parts.map((p) => [p, BY_PATH[p][3]])].map(([p, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE + (p === '/' ? '/' : p) })) }
}
const offer = (name, price) => ({ '@type': 'Offer', name, price, priceCurrency: 'INR' })

function schema(path) {
  if (path === '/') return [ORG, { '@type': 'WebSite', '@id': SITE + '/#website', name: BRAND, url: SITE + '/', publisher: { '@id': SITE + '/#org' } }]
  const g = [crumbs(path)]
  if (path === '/meet-ai') g.push({ '@type': 'SoftwareApplication', name: 'Meet-AI', applicationCategory: 'BusinessApplication', operatingSystem: 'Chrome, Edge, Brave (desktop)', description: BY_PATH[path][2], url: SITE + path, publisher: { '@id': SITE + '/#org' }, offers: [offer('Free', '0'), offer('Premium (monthly)', '99'), offer('Enterprise (monthly)', '189')] }, faq(MEET_FAQ))
  if (path === '/e-docs') g.push({ '@type': 'WebApplication', name: 'E-Docs', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any (web browser)', browserRequirements: 'Requires a modern web browser', description: BY_PATH[path][2], url: SITE + path, publisher: { '@id': SITE + '/#org' }, offers: offer('Free', '0') }, faq(EDOCS_FAQ))
  if (path === '/about' || path === '/contact') g.push(ORG)
  return g
}

// Everything that varies per route in <head>. Unknown paths get a noindex "not found" head.
export function head(path) {
  const p = BY_PATH[path]
  if (!p) return { title: 'Page not found | ' + BRAND, description: 'That address does not exist.', robots: 'noindex' }
  const url = SITE + (path === '/' ? '/' : path)
  return { title: p[1], description: p[2], url, ld: { '@context': 'https://schema.org', '@graph': schema(path) } }
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c')

// Head tags as an HTML string, for the prerendered pages
export function headHtml(path) {
  const h = head(path)
  return [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    h.robots && `<meta name="robots" content="${h.robots}" />`,
    h.url && `<link rel="canonical" href="${h.url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    h.url && `<meta property="og:url" content="${h.url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    h.ld && `<script type="application/ld+json" id="ld">${json(h.ld)}</script>`,
  ].filter(Boolean).join('\n    ')
}

// Keep <head> in sync after client-side navigation
const tag = (sel, make) => document.head.querySelector(sel) || document.head.appendChild(make())
const meta = (attr, key, content) => {
  const el = tag(`meta[${attr}="${key}"]`, () => document.createElement('meta'))
  el.setAttribute(attr, key); el.setAttribute('content', content)
}
export function applyHead(path) {
  const h = head(path)
  document.title = h.title
  meta('name', 'description', h.description)
  for (const k of ['title', 'description']) { meta('property', 'og:' + k, h[k]); meta('name', 'twitter:' + k, h[k]) }
  if (h.url) { meta('property', 'og:url', h.url); tag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' })).href = h.url }
  else document.head.querySelector('link[rel="canonical"]')?.remove()
  if (h.robots) meta('name', 'robots', h.robots); else document.head.querySelector('meta[name="robots"]')?.remove()
  const ld = tag('script#ld', () => Object.assign(document.createElement('script'), { id: 'ld', type: 'application/ld+json' }))
  if (h.ld) ld.textContent = json(h.ld); else ld.remove()
}
