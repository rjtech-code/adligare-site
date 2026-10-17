import { useEffect, useState } from 'react'
import {
  Video, Clock, Repeat, Timer, Hand, Captions, Mic, ScreenShare, FileDown, LayoutDashboard,
  ListChecks, MailWarning, Crown, ShieldCheck, EyeOff, Lock, Server, GraduationCap, Building2,
  Briefcase, Landmark, Check, X, ArrowRight, Download, Puzzle, Link2, CalendarPlus, Users, MonitorPlay, Wrench,
} from 'lucide-react'
import { LINKS, L, Head, Faq, Cta } from './ui.jsx'

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// ── Live tracker mock (hero) ────────────────────────────────────────────────
const FEED = [
  ['10:00', 'Meeting started', 'sys'], ['10:01', 'Priya Verma joined', 'in'], ['10:02', 'Aarav Mehta joined', 'in'],
  ['10:03', 'Neha Sharma joined', 'in'], ['10:09', 'Rohit Jain joined (late)', 'late'], ['10:12', 'Neha Sharma raised a hand', 'hand'],
  ['10:18', 'Aarav Mehta left', 'out'], ['10:21', 'Aarav Mehta rejoined (3m away)', 'in'],
]
function LiveFeed() {
  const [n, setN] = useState(reduced() ? FEED.length : 3)
  useEffect(() => {
    if (reduced()) return
    const t = setInterval(() => setN((s) => (s >= FEED.length ? 3 : s + 1)), 1500)
    return () => clearInterval(t)
  }, [])
  const shown = FEED.slice(0, n)
  const present = shown.filter((f) => f[2] === 'in' || f[2] === 'late').length - shown.filter((f) => f[2] === 'out').length
  return <div className="roster mfeed" aria-label="Example of Meet-AI tracking a meeting">
    <header>Weekly review · meet.google.com/abc-defg-hij <span className="live"><i />Tracking live</span></header>
    <ol>{shown.map(([t, e, k]) => <li key={t + e} className={'ev ' + k}><time>{t}</time>{e}</li>)}</ol>
    <div className="sum"><div><b>{Math.max(present, 0)}</b>Present</div><div><b>{shown.filter((f) => f[2] === 'late').length}</b>Late</div><div><b>{shown.filter((f) => f[2] === 'hand').length}</b>Hand raises</div></div>
  </div>
}

// ── Report preview (tabs mirror the real report pages) ──────────────────────
const REPORT = [
  ['Summary', () => <div className="rp-stats">{[['5', 'Participants'], ['4', 'Still present'], ['1', 'Left early'], ['2', 'Hand raises'], ['52m', 'Avg. time'], ['60m', 'Meeting length']].map(([v, l]) => <div key={l}><b>{v}</b>{l}</div>)}</div>],
  ['Participants', () => <table><thead><tr><th>Name</th><th>Joined</th><th>Left</th><th>Time</th><th>Left #</th><th>Status</th></tr></thead><tbody>
    {[['Priya Verma', '10:01', '—', '59 min', 0, 'Present', 'p'], ['Aarav Mehta', '10:02', '—', '55 min', 1, 'Present', 'p'], ['Neha Sharma', '10:03', '—', '57 min', 0, 'Present', 'p'], ['Rohit Jain', '10:09', '10:40', '31 min', 1, 'Left', 'a'], ['Karan Singh', '10:15', '10:15', '0.6 min', 1, 'Brief join', 'l']].map(([a, b, c, d, e, f, k]) => <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td><td><em className={'tag ' + k}>{f}</em></td></tr>)}</tbody></table>],
  ['Timeline & transcript', () => <div className="rp-split"><ul className="rp-tl">{[['10:12', 'Neha Sharma', 'Hand raise'], ['10:18', 'Aarav Mehta', 'Leave'], ['10:21', 'Aarav Mehta', 'Join'], ['10:40', 'Rohit Jain', 'Leave']].map(([t, n, e]) => <li key={t}><time>{t}</time><b>{n}</b><span>{e}</span></li>)}</ul>
    <div className="rp-tx">{[['Priya Verma', 'Let us start with last week’s numbers.'], ['Neha Sharma', 'I have a question about the March targets.'], ['Aarav Mehta', 'I will share the sheet after the call.']].map(([s, t]) => <p key={s}><b>{s}</b>{t}</p>)}</div></div>],
  ['List comparison', () => <table><thead><tr><th>Expected</th><th>Matched as</th><th>Match</th><th>Status</th></tr></thead><tbody>
    {[['Rahul Sharma', 'Rahul S.', '86%', 'On time', 'p'], ['Anita Kumari', 'anita kumari', '100%', 'On time', 'p'], ['Suresh Meena', 'Suresh Meena', '100%', 'Late', 'l'], ['Pooja Rathore', '—', '—', 'Absent', 'a']].map(([a, b, c, d, k]) => <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td><td><em className={'tag ' + k}>{d}</em></td></tr>)}</tbody></table>],
  ['Host analytics', () => <div className="rp-stats">{[['1', 'Joined 5+ min late'], ['1', 'Stayed under 2 min'], ['3', 'Never left'], ['Aarav', 'Most time away'], ['Neha', 'Most hand raises'], ['Host', 'Only you see this']].map(([v, l]) => <div key={l}><b>{v}</b>{l}</div>)}</div>],
]
function ReportPreview() {
  const [tab, setTab] = useState(0)
  const Body = REPORT[tab][1]
  return <div className="rp">
    <div className="rp-bar" role="tablist" aria-label="Report pages">{REPORT.map(([t], i) => <button key={t} role="tab" aria-selected={tab === i} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}>{t}</button>)}</div>
    <div className="rp-body" role="tabpanel"><div className="rp-head"><b>MEET<span>-AI</span></b><small>Weekly review · 17 Oct 2026 · 10:00 – 11:00</small></div><Body /></div>
  </div>
}

// ── Page sections ───────────────────────────────────────────────────────────
const SECTIONS = [['features', 'Features'], ['how', 'How it works'], ['reports', 'Reports'], ['lists', 'Lists & alerts'], ['privacy', 'Privacy'], ['who', 'Who it’s for'], ['faq', 'FAQ']]
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' })

function SectionNav() {
  const [on, setOn] = useState('features')
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setOn(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el)); return () => io.disconnect()
  }, [])
  return <div className="snav"><div className="wrap">{SECTIONS.map(([id, t]) => <button key={id} className={on === id ? 'on' : ''} onClick={() => go(id)}>{t}</button>)}</div></div>
}

const FEATURE_GROUPS = [
  ['Attendance', [
    [Clock, 'Join and leave times', 'First join, last leave and total minutes for every participant, time-stamped automatically.'],
    [Repeat, 'Leave and rejoin tracking', 'Each time someone drops out you see when they left, when they came back and how long they were away.'],
    [Timer, 'Late and brief joins', 'Flags anyone who joined late or stayed less than a minute, so a quick drop-in is not counted as attendance.'],
    [ScreenShare, 'One person, one row', 'Screen-share tiles, camera labels and Meet buttons are filtered out, so presenting never creates a duplicate participant.'],
  ]],
  ['Engagement', [
    [Hand, 'Hand raises', 'Every raised hand is logged with the time and a running count per person.'],
    [Captions, 'Caption transcript', 'Captions are switched on automatically and saved as a clean, speaker-wise transcript of the meeting.'],
    [Mic, 'Speaking time', 'An estimate of how long each person spoke, based on their captioned words.'],
  ]],
  ['Reports and data', [
    [FileDown, 'Automatic report', 'The moment the meeting ends, a multi-page report downloads, ready to print or save as PDF.'],
    [LayoutDashboard, 'Dashboard sync', 'Every meeting is saved to your Meet-AI account. Re-download the PDF any time.'],
  ]],
  ['Automation', [
    [ListChecks, 'Participant lists', 'Save who should attend. Display names are matched even when they differ slightly.'],
    [MailWarning, 'Absent alerts', 'At the late cutoff, expected members who have not joined get an email reminder.'],
    [Crown, 'Host analytics', 'If you host the meeting, your report gets an extra host-only page with deeper insights.'],
  ]],
]

const STEPS = [
  [Puzzle, 'Install the extension', 'Add Meet-AI to Chrome (also works in Edge and Brave).'],
  [Link2, 'Connect your account', 'Click Connect in the extension and approve it on your dashboard. No password is typed into the extension.'],
  [CalendarPlus, 'Schedule (optional)', 'Add the meeting link and a participant list to get list matching, late cutoff and absent alerts.'],
  [MonitorPlay, 'Join the meeting', 'Tracking starts on its own once you are in the call. A small “MeetTrack live” badge confirms it.'],
  [FileDown, 'Get the report', 'When the call ends, the report downloads and is saved to your dashboard.'],
]

const COMPARE = [
  ['Who joined, and exactly when', 'Teacher or host notes it by hand', 'Recorded automatically, with timestamps'],
  ['People who leave and come back', 'Usually missed', 'Every leave and rejoin, with time away'],
  ['Late joiners and brief drop-ins', 'Hard to judge fairly', 'Flagged in the report'],
  ['Hand raises and who spoke', 'Not recorded', 'Logged, with a caption transcript'],
  ['Expected vs actual attendees', 'Compared manually', 'Matched against your list, with match %'],
  ['Telling absent members', 'Phone calls or messages', 'Automatic email at the cutoff'],
  ['Time spent after the meeting', '15–30 minutes', 'None. The report is already there'],
]

const MEET_FAQ = [
  ['Does Meet-AI record audio or video?', 'No. It reads only what is already shown on your screen: the participant list and tiles, raised hands and captions. Nothing is recorded.'],
  ['Do I need to be the host?', 'No. Anyone in the meeting can use it. If you are the host, your report gets an extra Host Analytics page.'],
  ['Which meetings does it track?', 'Any Google Meet or Zoom web call you join in Chrome while the extension is on. Meetings you have scheduled in your dashboard additionally get participant-list matching and absent alerts. Turn the extension off in Chrome when you do not want a meeting tracked.'],
  ['Do other participants need to install anything?', 'No. Only the person who wants the report needs the extension. Please let participants know that attendance is being recorded.'],
  ['Why is the transcript empty?', 'Meet-AI turns captions on for you. If the meeting language is not supported by Meet captions, or captions are blocked by your organisation, no transcript can be captured.'],
  ['Someone shared their screen. Will they appear twice?', 'No. Presentation tiles, “(Presenting)” labels and camera labels are removed, so each person stays one row in the report.'],
  ['What if a display name is different from my list?', 'Names are matched with a similarity score, so “Rahul S.” still matches “Rahul Sharma”. Very different names show up as unrecognised attendees for you to review.'],
  ['Does it work on Zoom?', 'Yes, in the Zoom web client (zoom.us/wc). Zoom support is in beta; Google Meet has the most complete support.'],
  ['Where is my data stored?', 'In your own Meet-AI account. We do not sell your data. See our Privacy Policy for details.'],
  ['Which browsers are supported?', 'Chrome on a laptop or desktop. Chromium browsers such as Edge and Brave also work. Mobile apps are not supported.'],
]

const AUDIENCE = [
  [GraduationCap, 'Schools and colleges', 'Online classes with accurate attendance, late marks and participation, without a roll call.'],
  [Building2, 'Coaching institutes', 'Batch-wise lists, absent alerts to students, and a report for every session.'],
  [Landmark, 'Government and SHG trainings', 'Proof of attendance for virtual trainings and reviews, with time-stamped reports.'],
  [Briefcase, 'Companies and teams', 'Stand-ups and reviews with attendance, hand raises and a transcript of what was said.'],
]

export const MeetAI = () => <>
  <header className="hero mhero"><div className="wrap">
    <div>
      <span className="eyebrow"><Video size={15} />Chrome extension for Google Meet and Zoom</span>
      <h1>Meeting attendance, <span className="grad">on autopilot.</span></h1>
      <p className="lead">Meet-AI records who joined your meeting, when they joined, how long they stayed, who raised a hand and what was said. When the call ends, the full report is ready.</p>
      <div className="row"><a className="btn main" href={LINKS.meetExt}><Download size={16} />Get the extension</a><L to="/meet-ai/setup" className="btn">Setup guide <ArrowRight size={16} /></L></div>
      <ul className="chips"><li><EyeOff size={14} />No audio or video recording</li><li><Users size={14} />Free up to 30 participants</li><li><Check size={14} />Nothing for participants to install</li></ul>
    </div>
    <LiveFeed />
  </div></header>

  <SectionNav />

  <section className="tight"><div className="wrap"><div className="kpis">
    {[['0', 'manual entries'], ['4× / sec', 'participant checks'], ['6', 'report pages'], ['2', 'platforms: Meet and Zoom web']].map(([v, l]) => <div key={l}><b>{v}</b>{l}</div>)}
  </div></div></section>

  <section id="features"><div className="wrap">
    <h2>Everything a register can’t do</h2><p className="sub">Twelve features across four areas, all running quietly in your browser while you focus on the meeting.</p>
    {FEATURE_GROUPS.map(([g, items]) => <div className="fgroup" key={g}><h3 className="ghead">{g}</h3><div className="g4">{items.map(([I, h, p]) => <div className="card" key={h}><I size={24} /><h3>{h}</h3><p>{p}</p></div>)}</div></div>)}
  </div></section>

  <section id="how" className="band"><div className="wrap">
    <h2>How it works</h2><p className="sub">Set up once in about five minutes. After that, every meeting is tracked without you doing anything.</p>
    <div className="flow">{STEPS.map(([I, h, p], i) => <div className="fstep" key={h}><div className="fnum"><I size={20} /></div><small>Step {i + 1}</small><h3>{h}</h3><p>{p}</p></div>)}</div>
    <div className="row" style={{ marginTop: 28 }}><L to="/meet-ai/setup" className="btn">Read the full setup guide <ArrowRight size={16} /></L></div>
  </div></section>

  <section id="reports"><div className="wrap">
    <h2>The report, page by page</h2><p className="sub">Click through the pages of a sample report. The Participant List page appears for scheduled meetings with a list, and Host Analytics only when you are the host.</p>
    <ReportPreview />
    <div className="g3" style={{ marginTop: 22 }}>
      <div className="card"><FileDown size={24} /><h3>Downloads automatically</h3><p>Saved to your computer as soon as the meeting ends. Open it and print to PDF.</p></div>
      <div className="card"><LayoutDashboard size={24} /><h3>Kept in your dashboard</h3><p>Every meeting is uploaded to your account, so you can download its PDF again later.</p></div>
      <div className="card"><Crown size={24} /><h3>Host-only insights</h3><p>Late joiners, brief visitors, most time away and hand-raise activity, visible only to the host.</p></div>
    </div>
  </div></section>

  <section id="lists" className="band"><div className="wrap split">
    <div>
      <h2>Know who missed it, before the meeting ends</h2>
      <p className="sub">Add the people who should attend as a participant list, set a late cutoff, and Meet-AI does the checking.</p>
      <ul className="ticks">
        <li><Check size={18} /><span><b>Smart name matching.</b> “Rahul S.” on Meet still matches “Rahul Sharma” on your list, with a match score you can see.</span></li>
        <li><Check size={18} /><span><b>On time, late or absent.</b> Everyone on the list gets a clear status based on your cutoff time.</span></li>
        <li><Check size={18} /><span><b>Absent alerts by email.</b> At the cutoff, members with an email address who have not joined get a reminder.</span></li>
        <li><Check size={18} /><span><b>Unrecognised attendees.</b> People who joined but are not on your list are shown separately.</span></li>
      </ul>
    </div>
    <div className="match card">
      <h3>Expected vs joined</h3>
      {[['Rahul Sharma', 'Rahul S.', 86, 'p', 'On time'], ['Anita Kumari', 'anita kumari', 100, 'p', 'On time'], ['Suresh Meena', 'Suresh Meena', 100, 'l', 'Late'], ['Pooja Rathore', null, 0, 'a', 'Absent · emailed']].map(([a, b, s, k, t]) => <div className="mrow" key={a}>
        <div><b>{a}</b><small>{b ? 'joined as “' + b + '”' : 'did not join'}</small></div>
        <div className="meter" aria-label={`Match ${s}%`}><i style={{ width: s + '%' }} /></div>
        <em className={'tag ' + k}>{t}</em>
      </div>)}
    </div>
  </div></section>

  <section><div className="wrap">
    <h2>Meet-AI vs a manual register</h2><p className="sub">What changes when attendance stops being a chore.</p>
    <div className="tw"><table className="cmp"><thead><tr><th></th><th>Manual register</th><th>Meet-AI</th></tr></thead><tbody>
      {COMPARE.map(([f, a, b]) => <tr key={f}><td>{f}</td><td><X size={15} className="no" />{a}</td><td><Check size={15} className="yes" />{b}</td></tr>)}
    </tbody></table></div>
  </div></section>

  <section id="privacy" className="band"><div className="wrap">
    <h2>Private by design</h2><p className="sub">Meet-AI only reads what you can already see on your screen.</p>
    <div className="g2">
      <div className="card"><h3 className="yesh"><Check size={18} />What it reads</h3><ul className="plain">{['Names in the participant list and video tiles', 'Raised-hand indicators', 'Captions shown on screen', 'Whether you are the host'].map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div className="card"><h3 className="noh"><X size={18} />What it never does</h3><ul className="plain">{['Record audio or video', 'Take screenshots of the meeting', 'Run on websites other than Google Meet and Zoom', 'Sell or share your data with advertisers'].map((x) => <li key={x}>{x}</li>)}</ul></div>
    </div>
    <div className="g3" style={{ marginTop: 18 }}>
      <div className="card"><Lock size={24} /><h3>Secure connection</h3><p>The extension links to your account through a one-time code that expires in five minutes.</p></div>
      <div className="card"><Server size={24} /><h3>Your workspace only</h3><p>Meeting data is saved in your account and visible only to you.</p></div>
      <div className="card"><ShieldCheck size={24} /><h3>Be transparent</h3><p>Tell participants attendance is recorded. Our Terms ask every user to do so.</p></div>
    </div>
  </div></section>

  <section id="who"><div className="wrap">
    <h2>Who it’s for</h2><p className="sub">Anyone who runs meetings online and needs to know who was really there.</p>
    <div className="g4">{AUDIENCE.map(([I, h, p]) => <div className="card" key={h}><I size={24} /><h3>{h}</h3><p>{p}</p></div>)}</div>
    <div className="pstrip">
      <div><b>Free</b><span>Up to 30 participants, first month free, basic reports</span></div>
      <div><b>Premium · ₹99/mo</b><span>30+ participants, advanced analytics, priority support</span></div>
      <div><b>Enterprise · ₹189/mo</b><span>Everything in Premium, for large meetings</span></div>
      <L to="/pricing" className="btn">Compare plans <ArrowRight size={16} /></L>
    </div>
  </div></section>

  <section id="faq" className="band"><div className="wrap faqw">
    <h2>Frequently asked questions</h2><br />
    <Faq items={MEET_FAQ} />
  </div></section>

  <Cta h="Try Meet-AI in your next meeting" p="Install in five minutes. Meetings up to 30 participants are free." />
</>

// ── Setup guide page ────────────────────────────────────────────────────────
const SETUP = [
  ['Create your Meet-AI account', ['Open the Meet-AI dashboard and sign up with your email, or continue with Google.', 'This is where all your meetings and reports are saved.']],
  ['Download the extension', ['Download the Meet-AI extension zip from this website or from Settings → Browser Extension in your dashboard.', 'Unzip it into a folder you will keep, for example Documents/Meet-AI. Do not delete this folder later.']],
  ['Add it to Chrome', ['Open chrome://extensions in the address bar.', 'Turn on Developer mode (top-right corner).', 'Click Load unpacked and select the unzipped Meet-AI folder.', 'Pin the Meet-AI icon from the puzzle-piece menu so it is always visible.']],
  ['Connect the extension to your account', ['Click the Meet-AI icon, then Connect.', 'A dashboard page opens. Click Connect there to approve.', 'The code is valid for five minutes. The extension shows your email once it is connected.']],
  ['Schedule a meeting (optional, recommended)', ['In the dashboard, create a meeting and paste its Google Meet or Zoom link.', 'Pick a participant list and set the late cutoff time.', 'This turns on list comparison, late marking and absent email alerts for that meeting.']],
  ['Join and let it run', ['Open the meeting in Chrome and join the call. Tracking starts on its own.', 'A “MeetTrack live” badge appears in the bottom-right corner, and captions are switched on for you.', 'Keep the tab open for the whole meeting.']],
  ['Get your report', ['When you leave or the host ends the call, the report downloads automatically.', 'It is also uploaded to your dashboard, where you can download the PDF again any time.']],
]

const TROUBLE = [
  ['The badge does not appear.', 'Make sure you have joined the call (not just the preview screen), the extension is enabled in chrome://extensions, and you refreshed the Meet tab after installing.'],
  ['The extension says it is not connected.', 'Click Connect again and approve within five minutes. If you signed out of the dashboard, sign in first.'],
  ['No participant list comparison in my report.', 'The meeting link in your dashboard must match the link you joined, for example meet.google.com/abc-defg-hij, and a list must be attached to the meeting.'],
  ['The transcript is empty.', 'Check that captions (CC) are on in the meeting and that your organisation allows them.'],
  ['The report did not download.', 'Chrome may have blocked multiple downloads. Allow downloads for meet.google.com, or download the PDF from your dashboard.'],
  ['I updated the extension and nothing changed.', 'Open chrome://extensions, click the reload icon on Meet-AI, then refresh your Meet tab.'],
]

export const MeetSetup = () => <>
  <Head t="Meet-AI setup guide" s="From install to your first report in about five minutes. Follow these steps once; after that, every meeting is tracked automatically." />
  <div className="wrap">
    <div className="g3 req">
      <div className="card"><MonitorPlay size={24} /><h3>You need</h3><p>Chrome, Edge or Brave on a laptop or desktop computer.</p></div>
      <div className="card"><Video size={24} /><h3>Works with</h3><p>Google Meet, and the Zoom web client (beta).</p></div>
      <div className="card"><Users size={24} /><h3>Who installs it</h3><p>Only you. Participants do not need to install anything.</p></div>
    </div>
    <ol className="guide">{SETUP.map(([h, ps], i) => <li key={h}><div className="gnum">{i + 1}</div><div><h3>{h}</h3><ul>{ps.map((p) => <li key={p}>{p}</li>)}</ul></div></li>)}</ol>
    <div className="row" style={{ margin: '8px 0 64px' }}><a className="btn main" href={LINKS.meetExt}><Download size={16} />Download the extension</a><a className="btn" href={LINKS.meetApp}>Open the dashboard</a></div>
    <h2><Wrench size={26} style={{ verticalAlign: '-3px', marginRight: 10, color: 'var(--cy)' }} />Troubleshooting</h2><br />
    <Faq items={TROUBLE} />
  </div>
  <Cta h="Stuck somewhere?" p="Write to us and we will help you set it up." />
</>

// ── Home page sections ──────────────────────────────────────────────────────
export const HomeMeetSpotlight = () => <section className="band"><div className="wrap split">
  <div>
    <span className="eyebrow"><Video size={15} />Meet-AI</span>
    <h2>Stop taking attendance. <span className="grad">Start reading reports.</span></h2>
    <p className="sub">Meet-AI sits quietly in Chrome during your Google Meet or Zoom call. When it ends, you get a complete attendance report automatically.</p>
    <ul className="ticks">
      <li><Check size={18} /><span>Join, leave and rejoin times for every participant</span></li>
      <li><Check size={18} /><span>Late joiners and brief drop-ins flagged</span></li>
      <li><Check size={18} /><span>Hand raises and a speaker-wise caption transcript</span></li>
      <li><Check size={18} /><span>Absent alerts by email for scheduled meetings</span></li>
    </ul>
    <div className="row"><L to="/meet-ai" className="btn main">See all features</L><L to="/meet-ai/setup" className="btn">How to install</L></div>
  </div>
  <ReportPreview />
</div></section>

export const HomeMeetFlow = () => <section><div className="wrap">
  <h2>From meeting to report in four steps</h2><p className="sub">Set it up once. Every meeting after that takes zero extra effort.</p>
  <div className="flow f4">{[STEPS[0], STEPS[1], STEPS[3], STEPS[4]].map(([I, h, p], i) => <div className="fstep" key={h}><div className="fnum"><I size={20} /></div><small>Step {i + 1}</small><h3>{h}</h3><p>{p}</p></div>)}</div>
</div></section>
