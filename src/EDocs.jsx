import { useEffect, useState } from 'react'
import {
  FileText, Languages, Combine, Scissors, Minimize2, RotateCw, ListOrdered, Wrench, Crop, Presentation, Sheet,
  FileType2, FileImage, FileSpreadsheet, Image, Code2, ScanLine, ShieldCheck, FileEdit, PenTool, Stamp, Hash, ScanText,
  GitCompareArrows, Lock, Unlock, EyeOff, Upload, Download, Check, X, ArrowRight, User, Database, History, KeyRound,
  Monitor, Trash2, LayoutDashboard, GraduationCap, Building2, Landmark, Briefcase, Globe, Smartphone,
} from 'lucide-react'
import { LINKS, L, Faq, Cta } from './ui.jsx'

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// Real screenshots of the E-Docs app live in public/edocs/
const Shot = ({ src, alt, url = 'e-docs', className = '' }) => <figure className={'shot ' + className}>
  <div className="shot-bar"><i /><i /><i /><span>{url}</span></div>
  <img src={`/edocs/${src}.webp`} alt={alt} loading="lazy" />
</figure>

// ── Data ────────────────────────────────────────────────────────────────────
export const LANGS = [['English', 'English'], ['हिन्दी', 'Hindi'], ['मराठी', 'Marathi'], ['ગુજરાતી', 'Gujarati'], ['বাংলা', 'Bengali'], ['தமிழ்', 'Tamil'], ['తెలుగు', 'Telugu'], ['ಕನ್ನಡ', 'Kannada'], ['മലയാളം', 'Malayalam'], ['ਪੰਜਾਬੀ', 'Punjabi'], ['اردو', 'Urdu']]

const TOOL_GROUPS = [
  ['Translate', Languages, [
    [Languages, 'Translate', 'Text, PDF, Word and TXT between Hindi, English and 9 more Indian languages.'],
  ]],
  ['Organise', Combine, [
    [Combine, 'Merge PDF', 'Combine several PDFs into one, in the order you choose.'],
    [Scissors, 'Split PDF', 'Pull out one page or a range as separate PDF files.'],
    [Minimize2, 'Compress PDF', 'Make a PDF smaller, with three compression levels.'],
    [RotateCw, 'Rotate PDF', 'Turn one page or all pages, permanently.'],
    [ListOrdered, 'Organize PDF', 'Reorder, delete and rotate pages visually.'],
    [Wrench, 'Repair PDF', 'Recover what can be saved from a damaged file.'],
    [Crop, 'Crop PDF', 'Trim margins or keep only part of each page.'],
  ]],
  ['Convert', FileType2, [
    [FileText, 'PDF to Word', 'Editable DOCX, with layout kept where possible.'],
    [Presentation, 'PDF to PowerPoint', 'Each page becomes a slide in a PPTX.'],
    [Sheet, 'PDF to Excel', 'Tables and text pulled into an XLSX sheet.'],
    [FileType2, 'Word to PDF', 'DOCX files turned into clean PDFs.'],
    [FileImage, 'PowerPoint to PDF', 'PPTX slideshows saved as PDF.'],
    [FileSpreadsheet, 'Excel to PDF', 'Spreadsheets laid out as PDF tables.'],
    [Image, 'PDF to JPG', 'Every page as an image, or extract embedded images.'],
    [FileImage, 'JPG to PDF', 'JPG, PNG and other images into one PDF.'],
    [Code2, 'HTML to PDF', 'Paste HTML or plain text and get a PDF.'],
    [ScanLine, 'Scan to PDF', 'Use your phone or laptop camera to scan pages.'],
    [ShieldCheck, 'PDF to PDF/A', 'Archival PDF/A format for long-term records.'],
  ]],
  ['Edit and sign', PenTool, [
    [FileEdit, 'Edit PDF', 'Add text, shapes and freehand notes.'],
    [PenTool, 'Sign PDF', 'Draw or type your signature and place it.'],
    [Stamp, 'Watermark', 'Stamp text or an image across pages.'],
    [Hash, 'Page Numbers', 'Add numbers with your choice of position and style.'],
    [ScanText, 'OCR PDF', 'Make scanned PDFs searchable and copyable.'],
    [GitCompareArrows, 'Compare PDF', 'See what changed between two versions, line by line.'],
  ]],
  ['Security', Lock, [
    [Lock, 'Protect PDF', 'Add a password to open the file.'],
    [Unlock, 'Unlock PDF', 'Remove a password you know from a PDF.'],
    [EyeOff, 'Redact PDF', 'Black out sensitive text permanently.'],
  ]],
]

const TOUR = [
  ['home', 'Home', 'e-docs', 'The command center: search any tool with Ctrl K, jump to popular tools, and see the tools you used recently.'],
  ['all-tools', 'All tools', 'e-docs/all-tools', 'All 28 tools on one screen, grouped by category and filterable.'],
  ['merge', 'Merge', 'e-docs/merge-pdf', 'Drop in files, reorder them with the arrows, and merge. The same simple flow works in every tool.'],
  ['compress', 'Compress', 'e-docs/compress-pdf', 'Pick a compression level and see the new file size before you download.'],
  ['sign', 'Sign', 'e-docs/sign-pdf', 'Draw or type a signature and place it anywhere on the page.'],
  ['mobile', 'Mobile', 'e-docs on a phone', 'Fully responsive. Every tool works on a phone browser, no app to install.'],
]

const STORED = [
  [User, 'Your account', 'Name, email and password. The password is stored only as a bcrypt hash, so nobody can read it, not even us.'],
  [Database, 'Your output files', 'After a tool finishes, the result file (for example the merged PDF) is saved to your account in our MongoDB database. Translated files you download are saved too. Up to 100 MB per file.'],
  [History, 'History entries', 'For each saved file: which tool made it, the file name, its size and the date and time.'],
  [KeyRound, 'Sign-in token', 'A signed token in your browser keeps you logged in for 30 days. Sign out to remove it.'],
]

const NOT_STORED = ['The original files you upload into a tool', 'Anything you do as a guest', 'The source text or file you translate (only the translated file you download is saved)', 'Files from the PDF to Word server converter (deleted right after conversion)']

const GUEST_VS = [
  ['Use all 28 tools and translation', true, true],
  ['Files processed in your browser', true, true],
  ['Output saved automatically after each run', false, true],
  ['“Your recent files” list on every tool page', false, true],
  ['Dashboard with files saved, storage used and most-used tools', false, true],
  ['Full history with search, tool filter, re-download and delete', false, true],
  ['Open your files again from another device', false, true],
]

const EDOCS_FAQ = [
  ['Is E-Docs really free?', 'Yes. All 28 tools, including translation, are free. There is no watermark and no limit on how many times you use a tool.'],
  ['Do I need an account?', 'No. Every tool works as a guest. Sign in only if you want your output files saved so you can download them again later.'],
  ['Are my files uploaded?', 'Most tools run entirely inside your browser, so the file never leaves your device. Two exceptions: translation sends the text (not the file) to an online translation service, and PDF to Word may use our server converter for better layout, which deletes the file right after. If you are signed in, the finished output file is saved to your account.'],
  ['Which languages can I translate?', 'English, Hindi, Marathi, Gujarati, Bengali, Tamil, Telugu, Kannada, Malayalam, Punjabi and Urdu, in any direction. The source language can be detected automatically.'],
  ['Can I translate a whole PDF or Word file?', 'Yes. Upload a PDF, DOCX or TXT and E-Docs reads the text, translates it and lets you download the result as TXT, Word or PDF. Up to 60,000 characters at a time.'],
  ['Is machine translation accurate?', 'It is good for everyday documents, but not perfect. Please have a person review legal, medical or official documents before you use them.'],
  ['Who can see my saved files?', 'You can. Site administrators can also see the list of saved files and remove them, for support and to keep the service safe. Guest files are never stored, so nobody can see them.'],
  ['How do I delete my saved files?', 'Open History, or the “Your recent files” panel on any tool page, and click the delete icon. The file is removed from our database.'],
  ['Does it work on mobile?', 'Yes. E-Docs works in any modern phone browser. Scan to PDF can use your phone camera.'],
  ['Can a scanned PDF be translated?', 'Run OCR PDF first to turn the scanned images into text, then translate the result.'],
]

const AUDIENCE = [
  [Landmark, 'Government offices', 'Turn English circulars into Hindi, merge annexures, and add page numbers before sending.'],
  [GraduationCap, 'Students and teachers', 'Compress assignments under upload limits, scan notes, and convert slides to PDF.'],
  [Building2, 'Small businesses', 'Sign quotations, watermark invoices and protect files with a password.'],
  [Briefcase, 'Professionals', 'Redact personal details, compare contract versions, and convert PDFs back to Word.'],
]

// ── Pieces ──────────────────────────────────────────────────────────────────
const SECTIONS = [['translate', 'Translation'], ['tools', 'All 28 tools'], ['tour', 'Screenshots'], ['account', 'Login and data'], ['privacy', 'Privacy'], ['faq', 'FAQ']]
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' })

function SectionNav() {
  const [on, setOn] = useState(SECTIONS[0][0])
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setOn(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el)); return () => io.disconnect()
  }, [])
  return <div className="snav"><div className="wrap">{SECTIONS.map(([id, t]) => <button key={id} className={on === id ? 'on' : ''} onClick={() => go(id)}>{t}</button>)}</div></div>
}

export const LangChips = () => <ul className="langs">{LANGS.map(([n, e]) => <li key={e} title={e}>{n}</li>)}</ul>

function Tour() {
  const [i, setI] = useState(0)
  const [src, t, url, cap] = TOUR[i]
  return <div className="tour">
    <div className="rp-bar" role="tablist" aria-label="E-Docs screens">{TOUR.map(([, name], k) => <button key={name} role="tab" aria-selected={i === k} className={i === k ? 'on' : ''} onClick={() => setI(k)}>{name}</button>)}</div>
    <div className={'tour-body' + (src === 'mobile' ? ' phone' : '')} role="tabpanel">
      <Shot src={src} alt={`E-Docs ${t} screen`} url={url} />
      <p>{cap}</p>
    </div>
  </div>
}

// Small animated translation mock, used on the home hero
const DEMO = [['Welcome to E-Docs', 'ई-डॉक्स में आपका स्वागत है', 'हिन्दी'], ['Welcome to E-Docs', 'ई-डॉक्समध्ये आपले स्वागत आहे', 'मराठी'], ['Welcome to E-Docs', 'ઈ-ડૉક્સમાં આપનું સ્વાગત છે', 'ગુજરાતી'], ['Welcome to E-Docs', 'ই-ডক্সে আপনাকে স্বাগতম', 'বাংলা'], ['Welcome to E-Docs', 'ஈ-டாக்ஸுக்கு வரவேற்கிறோம்', 'தமிழ்']]
export function TranslateMock() {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (reduced()) return
    const t = setInterval(() => setN((s) => (s + 1) % DEMO.length), 2200); return () => clearInterval(t)
  }, [])
  const [a, b, l] = DEMO[n]
  return <div className="roster tmock" aria-label="Example of E-Docs translating a sentence">
    <header><span><Languages size={16} style={{ verticalAlign: '-3px', marginRight: 6, color: 'var(--cy)' }} />Translate</span><span className="live"><i />11 languages</span></header>
    <div className="tm-row"><small>English</small><p>{a}</p></div>
    <div className="tm-arrow"><ArrowRight size={16} /></div>
    <div className="tm-row out"><small>{l}</small><p key={n}>{b}</p></div>
    <div className="tm-dl"><span>Download as</span><b>TXT</b><b>Word</b><b>PDF</b></div>
  </div>
}

// ── Full product page ───────────────────────────────────────────────────────
export const EDocs = () => <>
  <header className="hero mhero"><div className="wrap">
    <div>
      <span className="eyebrow"><FileText size={15} />Free online PDF toolkit</span>
      <h1>Every PDF tool, <span className="grad">in your language.</span></h1>
      <p className="lead">E-Docs puts 28 PDF tools in one place: merge, split, compress, convert, sign and protect. Its standout feature is translation: turn English documents into Hindi and 9 more Indian languages, and download them as Word or PDF.</p>
      <div className="row"><a className="btn main" href={LINKS.edocsApp}>Open E-Docs <ArrowRight size={16} /></a><button className="btn" onClick={() => go('translate')}><Languages size={16} />See translation</button></div>
      <ul className="chips"><li><Check size={14} />100% free, no watermark</li><li><Monitor size={14} />Files processed in your browser</li><li><Check size={14} />No sign-up needed</li></ul>
    </div>
    <Shot src="home" alt="E-Docs home screen showing PDF tools and the translate card" />
  </div></header>

  <SectionNav />

  <section className="tight"><div className="wrap"><div className="kpis">
    {[['28', 'PDF and document tools'], ['11', 'Indian languages'], ['₹0', 'free, every tool'], ['0', 'uploads needed as a guest']].map(([v, l]) => <div key={l}><b>{v}</b>{l}</div>)}
  </div></div></section>

  <section id="translate"><div className="wrap">
    <span className="eyebrow"><Languages size={15} />Our USP</span>
    <h2>Translate documents into <span className="grad">Hindi and Indian languages</span></h2>
    <p className="sub">Most PDF tools stop at English. E-Docs translates the whole document, keeps paragraphs in place, and gives you a file you can send straight away.</p>
    <div className="split top">
      <div>
        <ol className="tsteps">
          <li><Upload size={20} /><div><b>Paste text or upload a file</b><span>PDF, Word (DOCX) or TXT. E-Docs reads the text for you, up to 60,000 characters at a time.</span></div></li>
          <li><Languages size={20} /><div><b>Pick the languages</b><span>Leave “Detect language” on, or choose the source. One-click presets for English ⇄ Hindi, Marathi and Tamil.</span></div></li>
          <li><Download size={20} /><div><b>Download the result</b><span>Copy the text, or download it as TXT, Word or PDF, with proper fonts for each script.</span></div></li>
        </ol>
        <h3 className="ghead" style={{ marginTop: 26 }}>Supported languages, any direction</h3>
        <LangChips />
      </div>
      <Shot src="translate" alt="E-Docs Translate tool converting an English paragraph into Hindi" url="e-docs/translate" />
    </div>
    <div className="g3" style={{ marginTop: 28 }}>
      <div className="card"><FileText size={24} /><h3>Whole files, not just lines</h3><p>Upload a circular, letter or notice and get the full translated document back.</p></div>
      <div className="card"><Globe size={24} /><h3>Right script, right font</h3><p>Devanagari, Gujarati, Bengali, Tamil, Telugu, Kannada, Malayalam and Gurmukhi render correctly. Urdu is written right to left.</p></div>
      <div className="card"><KeyRound size={24} /><h3>No API key, no setup</h3><p>Open the tool and translate. Nothing to configure, nothing to pay.</p></div>
    </div>
    <p className="fine">Translation needs an internet connection and sends the text (not your file) to an online translation service. Machine translation can be imperfect, so review important documents.</p>
  </div></section>

  <section id="tools" className="band"><div className="wrap">
    <h2>All 28 tools</h2><p className="sub">Everything you usually need three or four different apps for, in five groups.</p>
    {TOOL_GROUPS.map(([g, GI, items]) => <div className="fgroup" key={g}>
      <h3 className="ghead"><GI size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />{g} <span className="cnt">{items.length}</span></h3>
      <div className="tools">{items.map(([I, h, p]) => <div className={'tool' + (h === 'Translate' ? ' star' : '')} key={h}><I size={20} /><div><b>{h}</b><span>{p}</span></div></div>)}</div>
    </div>)}
  </div></section>

  <section id="tour"><div className="wrap">
    <h2>Take a look inside</h2><p className="sub">Real screens from the E-Docs app. Click a tab to switch.</p>
    <Tour />
  </div></section>

  <section id="account" className="band"><div className="wrap">
    <h2>Log in to keep your files</h2>
    <p className="sub">As a guest nothing is saved. Sign in and every result is saved to your account automatically, so you can download it again from any device.</p>
    <div className="tw"><table className="cmp gv"><thead><tr><th></th><th>Guest</th><th>Signed in</th></tr></thead><tbody>
      {GUEST_VS.map(([f, g, s]) => <tr key={f}><td>{f}</td><td>{g ? <Check size={16} className="yes" /> : <X size={16} className="no" />}</td><td>{s ? <Check size={16} className="yes" /> : <X size={16} className="no" />}</td></tr>)}
    </tbody></table></div>

    <div className="split top" style={{ marginTop: 48 }}>
      <div>
        <h3 className="ghead">Your dashboard</h3>
        <p className="mut">See how many files you have saved, how much storage they use, your most-used tools and your latest files.</p>
        <Shot src="dashboard" alt="E-Docs dashboard with files saved, storage used and most used tools" url="e-docs/dashboard" />
      </div>
      <div>
        <h3 className="ghead">Recent files on every tool</h3>
        <p className="mut">Each tool page lists the files you made with it. Download again or delete with one click.</p>
        <Shot src="merge-history" alt="Merge PDF page with the 'Your recent files with this tool' panel" url="e-docs/merge-pdf" className="crop" />
      </div>
    </div>
    <div className="hist"><div><h3 className="ghead">Full history</h3><p className="mut">Search all your saved files, filter by tool, re-download any of them, and delete what you no longer need.</p></div><Shot src="history" alt="E-Docs history page listing saved files" url="e-docs/history" /></div>

    <h3 style={{ fontSize: 24, margin: '56px 0 8px' }}>What is stored when you log in</h3>
    <p className="sub" style={{ marginBottom: 24 }}>Exactly this, and nothing more.</p>
    <div className="g4">{STORED.map(([I, h, p]) => <div className="card" key={h}><I size={24} /><h3>{h}</h3><p>{p}</p></div>)}</div>
    <div className="g2" style={{ marginTop: 18 }}>
      <div className="card"><h3 className="noh"><X size={18} />Never stored</h3><ul className="plain">{NOT_STORED.map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div className="card"><h3 className="yesh"><Trash2 size={18} />You stay in control</h3><ul className="plain">{['Delete any saved file from History or a tool page; it is removed from the database', 'Sign out any time to remove the sign-in token from your browser', 'Site administrators can see and remove saved files for support and safety', 'Your recent tools and language choice are kept only in your own browser'].map((x) => <li key={x}>{x}</li>)}</ul></div>
    </div>
  </div></section>

  <section id="privacy"><div className="wrap">
    <h2>Private by default</h2><p className="sub">E-Docs is built so your documents stay with you.</p>
    <div className="g2">
      <div className="card"><h3 className="yesh"><Monitor size={18} />Runs on your device</h3><p>Merging, splitting, compressing, converting, signing, OCR, passwords and redaction all happen inside your browser. The file never leaves your computer or phone.</p></div>
      <div className="card"><h3 className="yesh"><Globe size={18} />Two clear exceptions</h3><p><b>Translate</b> sends only the text to a translation service. <b>PDF to Word</b> may send the file to our server for a better layout, and the file is deleted right after. If the server converter is not available, it runs in your browser instead.</p></div>
    </div>
    <div className="g3" style={{ marginTop: 18 }}>
      <div className="card"><Lock size={24} /><h3>Hashed passwords</h3><p>Account passwords are hashed with bcrypt before they are stored.</p></div>
      <div className="card"><ShieldCheck size={24} /><h3>Locked-down API</h3><p>Our server only answers requests coming from the E-Docs website.</p></div>
      <div className="card"><Smartphone size={24} /><h3>Any device</h3><p>Works in any modern browser on laptop or phone. Nothing to install.</p></div>
    </div>
  </div></section>

  <section className="band"><div className="wrap">
    <h2>Who it’s for</h2><p className="sub">Anyone who works with documents, especially in more than one language.</p>
    <div className="g4">{AUDIENCE.map(([I, h, p]) => <div className="card" key={h}><I size={24} /><h3>{h}</h3><p>{p}</p></div>)}</div>
  </div></section>

  <section id="faq"><div className="wrap faqw">
    <h2>Frequently asked questions</h2><br />
    <Faq items={EDOCS_FAQ} />
  </div></section>

  <Cta h="Translate your first document" p="Free, no sign-up needed. Log in only if you want your files saved." />
</>

// ── Home page section ───────────────────────────────────────────────────────
export const HomeEdocsSpotlight = () => <section><div className="wrap split">
  <Shot src="translate" alt="E-Docs Translate tool converting English into Hindi" url="e-docs/translate" />
  <div>
    <span className="eyebrow"><FileText size={15} />E-Docs</span>
    <h2>28 PDF tools, <span className="grad">plus translation in 11 languages.</span></h2>
    <p className="sub">Merge, compress, convert and sign PDFs for free. Then translate them from English into Hindi, Marathi, Tamil and more, and download the result as Word or PDF.</p>
    <ul className="ticks">
      <li><Check size={18} /><span><b>Translation is the headline.</b> Upload a PDF, Word or TXT file and get it back in another Indian language.</span></li>
      <li><Check size={18} /><span>Organise, convert, edit, sign and protect PDFs in one place</span></li>
      <li><Check size={18} /><span>Files are processed in your browser, no upload needed</span></li>
      <li><Check size={18} /><span>Log in to save your files and see your history on any device</span></li>
    </ul>
    <div className="row"><L to="/e-docs" className="btn main">See all features</L><a className="btn" href={LINKS.edocsApp}>Open E-Docs</a></div>
  </div>
</div></section>
