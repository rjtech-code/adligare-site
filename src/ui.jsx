export const C = { email: 'adligaretech@gmail.com', phone: '+91 93519 40232', tel: '+919351940232', web: 'www.adligare.tech' }
// put your live product URLs here
export const LINKS = { meetApp: '/contact', meetExt: '/contact', edocsApp: '/contact' }

// Client-side navigation with real paths (App listens for popstate)
export const nav = (to) => { if (to !== location.pathname) history.pushState(null, '', to); dispatchEvent(new PopStateEvent('popstate')) }
export const L = ({ to, children, className = '' }) => <a href={to} className={className} onClick={(e) => { if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); nav(to) }}>{children}</a>
export const Head = ({ t, s }) => <div className="page-h wrap"><h1>{t}</h1>{s && <p>{s}</p>}</div>
export const Cards = ({ items, cols = 'g3' }) => <div className={cols}>{items.map(([I, h, p]) => <div className="card" key={h}><I size={26} /><h3>{h}</h3><p>{p}</p></div>)}</div>
export const Cta = ({ h = 'Ready to get started?', p = 'Want a demo or have a question? Drop us a line.' }) => <section><div className="wrap"><div className="cta"><h2>{h}</h2><p style={{ color: 'var(--mut)' }}>{p}</p><div className="row"><L to="/contact" className="btn main">Contact us</L><L to="/pricing" className="btn">View pricing</L></div></div></div></section>
export const Faq = ({ items }) => items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)
