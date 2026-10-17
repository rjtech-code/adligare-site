import { useEffect, useState } from 'react'
import { Video, FileText, Globe, ShieldCheck, Wrench, MapPin, Mail, Phone, Send, Lock, Menu, X, Users, Bell, Eye, Target, Rocket, Handshake, Server } from 'lucide-react'

import { C, LINKS, L, Head, Cards, Cta, Faq } from './ui.jsx'
import { MeetAI, MeetSetup, HomeMeetSpotlight, HomeMeetFlow } from './MeetAI.jsx'
import { EDocs, HomeEdocsSpotlight, TranslateMock } from './EDocs.jsx'

const NAV = [['/meet-ai', 'Meet-AI'], ['/e-docs', 'E-Docs'], ['/services', 'Services'], ['/pricing', 'Pricing'], ['/roadmap', 'Roadmap'], ['/about', 'About']]

const Doc = ({ title, date, sections }) => <><Head t={title} s={`Last updated: ${date}`} /><div className="wrap doc">{sections.map(([h, ps]) => <div key={h}><h2>{h}</h2>{ps.map((x) => <p key={x}>{x}</p>)}</div>)}<div className="note">This is a general template, not legal advice. Please have a lawyer review it before you publish it.</div></div></>

const PEOPLE = [['Aarav Mehta', 'p', '10:02'], ['Neha Sharma', 'p', '10:03'], ['Rohit Jain', 'l', '10:14'], ['Priya Verma', 'p', '10:01'], ['Karan Singh', 'a', '—']]
const LAB = { p: 'Present', l: 'Late', a: 'Absent' }
function Roster() {
  const [n, setN] = useState(2)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(5)
    const t = setInterval(() => setN((s) => (s >= 5 ? 2 : s + 1)), 1700); return () => clearInterval(t)
  }, [])
  const l = PEOPLE.slice(0, n), c = (k) => l.filter((p) => p[1] === k).length
  return <div className="roster"><header>Weekly review meeting <span className="live"><i />Tracking live</span></header>
    {l.map(([a, s, t]) => <div className="person" key={a}><div className="av">{a[0]}</div>{a}<span><em className={`tag ${s}`} style={{ fontStyle: 'normal' }}>{LAB[s]}</em> {t}</span></div>)}
    <div className="sum"><div><b>{c('p')}</b>Present</div><div><b>{c('l')}</b>Late</div><div><b>{c('a')}</b>Absent</div></div></div>
}

const Home = () => <>
  <header className="hero duo"><div className="wrap">
    <div className="duo-top"><h1>Everyday tech work, <span className="grad">made easy.</span></h1>
      <p className="lead">Two products built by Adligare Tech in Bidasar, Rajasthan, for organisations across India.</p></div>
    <div className="duo-grid">
      <div className="half">
        <span className="eyebrow"><Video size={15} />Meet-AI</span>
        <h2>Meeting attendance, on autopilot.</h2>
        <p>Automatic attendance, hand raises and transcripts for Google Meet and Zoom.</p>
        <div className="row"><L to="/meet-ai" className="btn main">Explore Meet-AI</L><L to="/meet-ai/setup" className="btn">Setup guide</L></div>
        <Roster />
      </div>
      <div className="half">
        <span className="eyebrow"><FileText size={15} />E-Docs</span>
        <h2>Every PDF tool, in your language.</h2>
        <p>28 free PDF tools, with document translation into Hindi and 10 more languages.</p>
        <div className="row"><L to="/e-docs" className="btn main">Explore E-Docs</L><a className="btn" href={LINKS.edocsApp}>Open the app</a></div>
        <TranslateMock />
      </div>
    </div></div></header>
  <section><div className="wrap"><h2>Two products, one goal</h2><p className="sub">Less manual work, more trust. Both tools are built in-house by our team.</p>
    <div className="g2">
      <L to="/meet-ai" className="card link"><Video size={30} /><h3>Meet-AI</h3><p>Attendance for Google Meet and Zoom meetings, recorded automatically. No registers, no manual entry.</p></L>
      <L to="/e-docs" className="card link"><FileText size={30} /><h3>E-Docs</h3><p>28 free PDF tools, plus translation of PDF and Word files into Hindi and 10 more languages.</p></L>
    </div></div></section>
  <HomeMeetSpotlight />
  <HomeMeetFlow />
  <HomeEdocsSpotlight />
  <section className="band"><div className="wrap"><h2>Problems we solve</h2><p className="sub">Three everyday headaches for teams and institutions.</p>
    <Cards items={[[Users, 'Unreliable attendance', 'Manual tracking is slow and error-prone. Meet-AI does it for you, with timestamps.'], [FileText, 'Document chaos', 'Merging, compressing or converting a PDF usually means a different app each time. E-Docs puts it all in one.'], [Globe, 'Websites left unattended', 'Launching a site is only the start. Our maintenance plans keep it secure, updated and online.']]} /></div></section>
  <section><div className="wrap"><h2>Built on trust</h2><p className="sub">Three principles behind everything we ship.</p>
    <Cards items={[[Lock, 'Your data stays yours', 'E-Docs processes files inside your browser. Files are saved only if you sign in and choose to.'], [Server, 'No data selling', 'Meet-AI data stays in your own workspace and is never sold to third parties.'], [Handshake, 'Direct support', 'Talk straight to the founders when you need help.']]} /></div></section>
  <Cta h="Try Meet-AI with your team" p="Meetings up to 30 participants are free." /></>

const Services = () => <>
  <Head t="Website and maintenance services" s="Custom web portals and year-round maintenance for government and private organisations." />
  <div className="wrap"><Cards items={[[Globe, 'Web portals', 'A website or portal built around your needs, with server and domain included.'], [Wrench, 'Annual maintenance (AMC)', 'Site upkeep, content updates, bug fixes and technical support.'], [ShieldCheck, 'Security and backups', 'Security patches, regular backups and performance monitoring.']]} />
    <h2 style={{ marginTop: 56 }}>What an AMC covers</h2><br />
    <div className="card"><ul style={{ paddingLeft: 20, display: 'grid', gap: 6 }}>{['Website maintenance and full technical support', 'Content updates supplied and approved by the client', 'Bug identification, resolution and issue management', 'Security patches, updates and routine system maintenance', 'Regular data backups and ongoing performance monitoring', 'Major enhancements or extra services quoted separately and documented in a DPR (Detailed Project Report)'].map((x) => <li key={x}>{x}</li>)}</ul></div>
    <div className="proof"><b>Current project:</b> The Rajeevika Churu portal, digitalsakhichuru.in, is maintained by Adligare Tech under an AMC.</div></div>
  <Cta h="Need a website?" p="Tell us what you need and we will share cost and timeline." /></>

const Pricing = () => <>
  <Head t="Simple, transparent pricing" s="Plans designed for Indian teams. No hidden fees." />
  <div className="wrap"><div className="g3">
    {[['Free', '₹0', ['Up to 30 participants', 'First month free', 'Basic attendance reports', 'Standard alerts']], ['Premium', '₹99 / month', ['30+ participants', 'Advanced analytics dashboard', 'Priority support', 'Secure data storage']], ['Enterprise', '₹189 / month', ['Everything in Premium', 'Enterprise-grade security', 'Built for large meetings']]].map(([n, p, f]) => <div className="card" key={n}><h3>{n}</h3><div className="big">{p}</div><br /><ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>{f.map((x) => <li key={x}>✓ {x}</li>)}</ul></div>)}</div>
    <p className="sub" style={{ marginTop: 20 }}>Prices above are for Meet-AI. E-Docs is completely free. Website and AMC pricing depends on the project.</p>
    <h2>Pricing FAQ</h2><br /><Faq items={[['Is the first month really free?', 'Yes. The Free plan includes a free first month.'], ['Can I change plans anytime?', 'Yes. See our Refund Policy for the details.']]} /></div>
  <Cta /></>

const Roadmap = () => <>
  <Head t="Our vision and roadmap" s="We want everyday tech work to be effortless for every organisation." />
  <div className="wrap"><div className="g2"><div className="card"><Eye size={26} /><h3>Vision</h3><p>Reliable, affordable and easy digital infrastructure for every organisation in India.</p></div><div className="card"><Target size={26} /><h3>Mission</h3><p>Use responsible AI to automate and secure everyday work like attendance, documents and website upkeep.</p></div></div>
    <h2 style={{ marginTop: 56 }}>What's next</h2><p className="sub">These are our plans. Timelines may change.</p>
    <div className="tl">{[['Now', 'Meet-AI and E-Docs are live', 'Meet and Zoom attendance, dashboard and reports; 28 PDF tools and translation.'], ['Next', 'Expanding Meet-AI', 'More platforms, deeper analytics and features for larger organisations.'], ['Next', 'More in E-Docs', 'More languages and better editing tools.'], ['Goal', 'Growing our customer base', 'Onboarding premium users and organisations with large meetings.'], ['Goal', 'New products', 'New tools in web and automation.']].map(([w, h, p]) => <div key={h}><small>{w}</small><h3>{h}</h3><p>{p}</p></div>)}</div></div>
  <Cta h="Join us on the journey" p="Reach out for partnerships, investment or feedback." /></>

const About = () => <>
  <Head t="About Adligare Tech" s="An Indian software startup with its registered office in Bidasar, Churu, Rajasthan. Our mission: innovating tomorrow's digital infrastructure." />
  <div className="wrap"><h2>Our story</h2><p className="sub">We saw institutions marking online-meeting attendance by hand, hunting for separate apps to handle PDFs, and launching websites that were then left alone. So we built tools for exactly these everyday jobs.</p>
    <Cards items={[[ShieldCheck, 'Trust', 'Data security and honest communication.'], [Rocket, 'Simplicity', 'Tools you understand on the first try.'], [Handshake, 'Accountability', 'We do not just ship and leave. We maintain what we build.']]} />
    <h2 style={{ marginTop: 56 }}>Team</h2><br />
    <div className="team"><div className="member"><div className="av">MK</div><div><b>Manoj Kumar Sankla</b><br /><small>Founder</small></div></div><div className="member"><div className="av">MD</div><div><b>Mohit Darji</b><br /><small>Co-Founder and Developer</small></div></div></div></div>
  <Cta h="Come say hello" p="Send us an email or give us a call." /></>

const Security = () => <>
  <Head t="Security and data protection" s="Your data is yours. Here is how we handle it." />
  <div className="wrap"><Cards items={[[Lock, 'In-browser processing', 'E-Docs converts files inside your browser.'], [ShieldCheck, 'Secure sign-in', 'Passwords are hashed and sessions use signed tokens.'], [Eye, 'Limited access', 'Meet-AI runs only on Google Meet and Zoom web pages. It reads what is on screen and never records audio or video.'], [Server, 'Audit logs', 'Meet-AI keeps protected logs of every meeting.'], [Bell, 'Incident response', 'Investigate, remediate, find the root cause, then improve: a four-step process.'], [Mail, 'Report an issue', `Send any security concern to ${C.email}.`]]} /></div><Cta /></>

const Support = () => {
  const [sent, setSent] = useState(false)
  const go = (e) => { e.preventDefault(); const f = new FormData(e.target); location.href = `mailto:${C.email}?subject=${encodeURIComponent('Enquiry: ' + f.get('t'))}&body=${encodeURIComponent(`Name: ${f.get('n')}\nPhone: ${f.get('p')}\n\n${f.get('m')}`)}`; setSent(true) }
  return <><Head t="Contact and support" s="Questions, demos or partnerships? Write to us and we will get back to you soon." />
    <div className="wrap contact"><div className="info">
      <div><MapPin /><span><b>Registered office</b>Behind BDS School, Bidasar, Churu, Rajasthan 331501</span></div>
      <div><Phone /><span><b>Phone</b><a href={'tel:' + C.tel}>{C.phone}</a></span></div>
      <div><Mail /><span><b>Email</b><a href={'mailto:' + C.email}>{C.email}</a></span></div>
      <div><Globe /><span><b>Website</b>{C.web}</span></div></div>
      <form onSubmit={go}><input name="n" placeholder="Your name" required aria-label="Name" /><input name="p" type="tel" placeholder="Phone number" aria-label="Phone" />
        <select name="t" aria-label="Topic"><option>Meet-AI</option><option>E-Docs</option><option>Website or portal</option><option>Maintenance (AMC)</option><option>Partnership or investment</option></select>
        <textarea name="m" placeholder="How can we help?" required aria-label="Message" /><button className="btn main" type="submit"><Send size={16} />Send message</button>
        {sent && <p className="ok">Your email app should have opened. Press Send there.</p>}</form></div>
    <section><div className="wrap"><h2>Common questions</h2><br /><Faq items={[['I cannot log in to Meet-AI.', 'Check your email and password, or try signing in with Google.'], ['The extension prompt did not appear.', 'Make sure the meeting link (without the ?) matches the link saved in your dashboard.'], ['My E-Docs file was not saved.', 'You need to be signed in for files to be saved.']]} /></div></section></>
}

const Terms = () => <Doc title="Terms and Conditions" date="17 October 2026" sections={[
  ['1. Acceptance of terms', ['By using Meet-AI, E-Docs or this website, you agree to these terms. If you do not agree, please do not use our services.']],
  ['2. Our services', ['Meet-AI provides meeting attendance and analytics. E-Docs provides PDF and document tools. We may change or discontinue features.']],
  ['3. Your responsibilities', ['You are responsible for your account and password.', 'Use Meet-AI only on meetings where you have informed participants and have the right to track attendance.', 'Do not use the services for anything unlawful, harmful or that violates others\u2019 privacy.']],
  ['4. Pricing and payment', ['Prices are as listed on our Pricing page. We will give reasonable notice before any change.']],
  ['5. Intellectual property', ['The software, logo and design belong to Adligare Tech. Your own files and data remain yours.']],
  ['6. Limitation of liability', ['The services are provided "as is". To the extent permitted by law, we are not liable for indirect losses.']],
  ['7. Termination', ['We may suspend or close accounts that breach these terms. You may close your account at any time.']],
  ['8. Governing law', ['These terms are governed by Indian law. Disputes fall under the courts of Churu, Rajasthan.']],
  ['9. Contact', [`Questions: ${C.email}`]]]} />

const Privacy = () => <Doc title="Privacy Policy" date="17 October 2026" sections={[
  ['What we collect', ['Account details: name and email.', 'Meet-AI: for meetings you schedule, participant names, join and leave times, raised hands and captions.', 'E-Docs: files are processed in your browser. Output files are saved only if you sign in and choose to save.', 'Technical data: browser type and IP address, for security.']],
  ['How we use it', ['To run the service, send reports and alerts, keep it secure and improve it. We do not sell your data.']],
  ['Sharing', ['Only with essential service providers (such as hosting and email), or when required by law.']],
  ['Your rights', ['You may ask to access, correct or delete your information, as provided under India\u2019s Digital Personal Data Protection Act, 2023.']],
  ['Security and retention', ['We use reasonable safeguards. Data is kept as long as needed for the service or by law.']],
  ['Cookies', ['We use only essential cookies and sign-in tokens.']],
  ['Contact', [`Privacy questions: ${C.email}`]]]} />

const Refund = () => <Doc title="Refund and Cancellation Policy" date="17 October 2026" sections={[
  ['Free services', ['E-Docs and the Meet-AI Free plan are free, so refunds do not apply.']],
  ['Subscriptions', ['You can cancel Premium or Enterprise anytime. You will not be billed again, and service continues until the end of the paid period.']],
  ['Refunds', ['If a technical fault stops you from using the service, email us to request a refund. We will review and decide fairly.']],
  ['Websites and AMC', ['These are governed by the terms of your contract (AMC or DPR).']],
  ['Contact', [C.email]]]} />

const PAGES = { '/': Home, '/meet-ai': MeetAI, '/meet-ai/setup': MeetSetup, '/e-docs': EDocs, '/services': Services, '/pricing': Pricing, '/roadmap': Roadmap, '/about': About, '/security': Security, '/contact': Support, '/terms': Terms, '/privacy': Privacy, '/refund': Refund }

export default function App() {
  const get = () => location.hash.replace(/^#/, '') || '/'
  const [path, setPath] = useState(get()), [open, setOpen] = useState(false)
  useEffect(() => { const f = () => { setPath(get()); setOpen(false); scrollTo(0, 0) }; addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  const Page = PAGES[path] || (() => <><Head t="Page not found" s="That address does not exist." /><div className="wrap"><L to="/" className="btn main">Back to home</L></div></>)
  return <>
    <nav className="nav"><div className="wrap">
      <L to="/" className="brand"><img src="/adligare-logo.png" alt="" />Adligare Tech</L>
      <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={20} /> : <Menu size={20} />}</button>
      <div className={'links' + (open ? ' open' : '')}>{NAV.map(([p, t]) => <L key={p} to={p} className={path === p || path.startsWith(p + '/') ? 'on' : ''}>{t}</L>)}<L to="/contact" className="btn main">Contact us</L></div>
    </div></nav>
    <main><Page /></main>
    <footer><div className="wrap"><div className="fgrid">
      <div><div className="brand" style={{ marginBottom: 10 }}><img src="/adligare-logo.png" alt="" />Adligare Tech</div>Innovating tomorrow’s digital infrastructure.<br />Bidasar, Churu, Rajasthan 331501</div>
      <div><h4>Products</h4><L to="/meet-ai">Meet-AI</L><L to="/meet-ai/setup">Meet-AI setup guide</L><L to="/e-docs">E-Docs</L><L to="/pricing">Pricing</L></div>
      <div><h4>Company</h4><L to="/about">About</L><L to="/services">Services</L><L to="/roadmap">Roadmap</L><L to="/contact">Contact</L></div>
      <div><h4>Legal</h4><L to="/security">Security</L><L to="/terms">Terms and Conditions</L><L to="/privacy">Privacy Policy</L><L to="/refund">Refund Policy</L></div>
    </div><div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}><span>© {new Date().getFullYear()} Adligare Tech</span><span>{C.email} · {C.phone}</span></div></div></footer>
  </>
}
