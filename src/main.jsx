import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=100089250671484';

const navItems = [
  ['About', 'about'],
  ['Programs', 'programs'],
  ['Teams', 'teams'],
  ['Updates', 'news'],
  ['Gallery', 'gallery'],
];

const teams = ['U7', 'U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15'];
const ASSET_BASE = import.meta.env.BASE_URL;

const achievements = [
  { year: '2024', title: 'CarCar Mayors Cup', detail: 'Kanlungan FC U7 Champions', mark: '01' },
  { year: 'Grassroots', title: 'Bogo City FC 1st Grassroots Community Football Tournament', detail: 'Kanlungan FC U7 Champions', mark: '02' },
  { year: 'Festival', title: 'Sandugo Football Festival', detail: 'First Runner-Up', mark: '03' },
];

const updates = [
  { type: 'Schedule', title: 'Weekend training', detail: 'Saturday + Sunday · Genesis Valley or Pino Football Pitch', time: 'Check before training', action: 'Ask about this weekend', intent: 'family' },
  { type: 'Results', title: 'U7 matchday notes', detail: 'Results and tournament updates are shared through the club’s official channels.', time: 'Official channel', action: 'Follow official updates', href: FACEBOOK_URL },
  { type: 'News', title: 'New players welcome', detail: 'Tell us a little about your child and we’ll help you find the right starting point.', time: 'Join the club', action: 'Start registration', intent: 'player' },
];

const mediaTiles = [
  { label: 'Team day', type: 'PHOTO', note: 'Official Facebook photo', src: `${ASSET_BASE}gallery/kanlungan-gallery-01.jpg`, alt: 'Kanlungan FC youth team gathered on a football pitch', href: 'https://www.facebook.com/photo.php?fbid=1074091725575840&set=pb.100089250671484.-2207520000&type=3' },
  { label: 'Tournament moments', type: 'PHOTO', note: 'Official Facebook photo', src: `${ASSET_BASE}gallery/kanlungan-gallery-02.jpg`, alt: 'Kanlungan FC youth players in blue kits at a football tournament', href: 'https://www.facebook.com/photo.php?fbid=1068187649499581&set=pb.100089250671484.-2207520000&type=3' },
  { label: 'Festival day', type: 'PHOTO', note: 'Official Facebook photo', src: `${ASSET_BASE}gallery/kanlungan-gallery-03.jpg`, alt: 'Kanlungan FC youth players in front of a Sandugo Football Festival backdrop', href: 'https://www.facebook.com/photo.php?fbid=1063370506647962&set=pb.100089250671484.-2207520000&type=3' },
  { label: 'Together on pitch', type: 'PHOTO', note: 'Official Facebook photo', src: `${ASSET_BASE}gallery/kanlungan-gallery-04.jpg`, alt: 'Kanlungan FC youth players gathered for a football festival photo', href: 'https://www.facebook.com/photo.php?fbid=1063370473314632&set=pb.100089250671484.-2207520000&type=3' },
  { label: 'Matchday energy', type: 'PHOTO', note: 'Official Facebook photo', src: `${ASSET_BASE}gallery/kanlungan-gallery-05.jpg`, alt: 'Kanlungan FC youth players on a football pitch', href: 'https://www.facebook.com/photo.php?fbid=1043973671920979&set=pb.100089250671484.-2207520000&type=3' },
  { label: 'The club together', type: 'PHOTO', note: 'Official Facebook photo', src: `${ASSET_BASE}gallery/kanlungan-gallery-06.jpg`, alt: 'Kanlungan FC football group photo in front of a tournament banner', href: 'https://www.facebook.com/photo.php?fbid=1038196055832074&set=pb.100089250671484.-2207520000&type=3' },
];

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };
  const paths = {
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    chevron: <path d="m7 9 5 5 5-5" />,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <path d="M7 3.5 10 5 8.5 8.5a14 14 0 0 0 7 7L19 14l1.5 3c.3.7 0 1.6-.7 2A5.5 5.5 0 0 1 17 20C9.8 18.5 5.5 14.2 4 7a5.5 5.5 0 0 1 1-2.8c.4-.7 1.3-1 2-.7Z" />,
    play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 5 4-5 4V8Z" fill="currentColor" stroke="none" /></>,
    external: <><path d="M14 5h5v5" /><path d="m19 5-8 8" /><path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function ClubMark({ compact = false }) {
  return (
    <div className={`club-mark ${compact ? 'club-mark--compact' : ''}`}>
      <img className="club-mark__image" src={`${ASSET_BASE}KanlunganCrest.svg`} alt="Kanlungan Football Club crest" />
    </div>
  );
}

function getRoute() {
  const raw = window.location.hash.replace(/^#/, '') || 'home';
  const [page = 'home', query = ''] = raw.split('?');
  return { page, params: new URLSearchParams(query) };
}

function Button({ children, href, onClick, variant = 'primary', className = '', type = 'button', disabled = false, target }) {
  const classes = `button button--${variant} ${className}`;
  if (href) return <a className={classes} href={href} onClick={onClick} target={target} rel={target === '_blank' ? 'noreferrer' : undefined}>{children}</a>;
  return <button className={classes} onClick={onClick} type={type} disabled={disabled}>{children}</button>;
}

function SectionHeading({ title, description, action }) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function SiteHeader({ onNavigate, activePage }) {
  const [open, setOpen] = useState(false);
  const navigate = (page) => { setOpen(false); onNavigate(page); };
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#home" onClick={() => navigate('home')} aria-label="Kanlungan Football Club home">
          <ClubMark compact />
          <span className="brand__name">Kanlungan<br /><strong>Football Club</strong></span>
        </a>
        <nav className={`main-nav ${open ? 'main-nav--open' : ''}`} aria-label="Main navigation">
          {navItems.map(([label, page]) => <a key={page} className={activePage === page ? 'active' : ''} href={`#${page}`} onClick={() => navigate(page)}>{label}</a>)}
          <Button href="#contact" onClick={() => navigate('contact')} className="nav-cta">Register <Icon name="arrow" size={16} /></Button>
        </nav>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}><Icon name={open ? 'close' : 'menu'} /></button>
      </div>
    </header>
  );
}

function Hero({ onNavigate }) {
  return (
    <section className="hero" id="home">
      <div className="shell hero__inner">
        <div className="hero__copy">
          <p className="hero__location"><span className="dot"></span> Consolacion, Cebu · Est. 2014</p>
          <h1>Chase progress,<br /><em>not perfection.</em></h1>
          <p className="hero__lead">A community football club helping young players grow with confidence, character, and a love for the game.</p>
          <div className="hero__actions">
            <Button href="#teams" onClick={() => onNavigate('teams')}>Find your team <Icon name="arrow" size={17} /></Button>
            <a className="text-link text-link--light" href={FACEBOOK_URL} target="_blank" rel="noreferrer">Follow the journey <Icon name="external" size={15} /></a>
          </div>
        </div>
        <div className="hero__field" aria-label="Kanlungan Football Club weekend academy briefing">
          <div className="hero__field-photo" aria-hidden="true"></div>
          <div className="hero__field-head"><span>Academy desk / 01</span><span>Consolacion, Cebu</span></div>
          <div className="hero__field-line hero__field-line--center"></div>
          <div className="hero__field-line hero__field-line--box"></div>
          <div className="hero__field-copy"><span>Weekend</span><strong>training</strong><p>Saturday + Sunday</p></div>
          <div className="hero__ball"><span>2</span><small>pitch<br />options</small></div>
          <div className="hero__caption"><span>Genesis Valley / Pino Football Pitch</span><span>Exact times shared<br />with families</span></div>
        </div>
      </div>
      <div className="shell hero__proof">
        <div><strong>2014</strong><span>Club founded</span></div>
        <div><strong>U7–U15</strong><span>Age groups</span></div>
        <div><strong>Weekends</strong><span>Training rhythm</span></div>
        <div className="hero__proof-note">A place to start.<br /><b>A community to stay.</b></div>
      </div>
    </section>
  );
}

function Intro({ onNavigate }) {
  return (
    <section className="section intro-section" id="about">
      <div className="shell intro-grid">
        <div className="intro-kicker">The Kanlungan way</div>
        <div className="intro-copy">
          <h2>Good football starts with a good place to grow.</h2>
          <p>Kanlungan means shelter. We’re building the kind of club where young players can learn the game, find their people, and keep showing up—one weekend at a time.</p>
          <Button variant="outline" href="#programs" onClick={() => onNavigate('programs')}>How we develop players <Icon name="arrow" size={16} /></Button>
        </div>
        <div className="intro-note"><span className="intro-note__mark">K</span><span>Family-first.<br />Progress-led.</span></div>
      </div>
    </section>
  );
}

function Programs({ onNavigate }) {
  const cards = [
    { index: '01', title: 'Grassroots development', text: 'A steady foundation of movement, ball mastery, teamwork, and joy for the youngest players.', label: 'Start here' },
    { index: '02', title: 'Camps & clinics', text: 'Focused sessions that give players a fresh challenge and families a new way to connect.', label: 'Explore sessions' },
    { index: '03', title: 'Tournament participation', text: 'Tournament days give players a chance to test what they’ve practiced and experience football together.', label: 'See achievements' },
  ];
  return (
    <section className="section section--ink" id="programs">
      <div className="shell">
        <SectionHeading title="Training continues beyond match day." description="Training for U7–U15, from first touches to tournament play." action={<span className="section-heading__aside">U7 <span>→</span> U15</span>} />
        <div className="program-grid">
          {cards.map(card => <article className="program-card" key={card.index}><span className="program-card__index">{card.index}</span><div><h3>{card.title}</h3><p>{card.text}</p><a href="#teams" onClick={() => onNavigate('teams')} className="card-link">{card.label} <Icon name="arrow" size={15} /></a></div></article>)}
        </div>
      </div>
    </section>
  );
}

function Teams({ onNavigate, full = false }) {
  return (
    <section className={`section teams-section ${full ? 'teams-section--full' : ''}`} id="teams">
      <div className="shell">
        <SectionHeading title="Find your age group." description="One club, nine starting points. Choose a starting point, then tell us where your player is today." action={!full && <Button variant="text" href="#teams" onClick={() => onNavigate('teams')}>View all teams <Icon name="arrow" size={15} /></Button>} />
        <div className="team-list">{teams.map((team, i) => <a className="team-row" href={`#contact?ageGroup=${team}`} onClick={() => onNavigate('contact', { ageGroup: team })} key={team}><span className="team-row__age">{team}</span><span className="team-row__copy">{i === 0 ? 'First touches and football joy' : i === teams.length - 1 ? 'Growing the complete player' : 'Developing skills and confidence'}</span><Icon name="arrow" size={18} /></a>)}</div>
        <p className="small-note">Age groups are shown for orientation. Final placement is confirmed with the club after registration.</p>
      </div>
    </section>
  );
}

function TrainingBand({ onNavigate }) {
  return (
    <section className="training-band" aria-label="Weekend training information">
      <div className="shell training-band__inner">
        <div className="training-band__label"><span className="sun-mark">✳</span><span>Weekend rhythm</span></div>
        <div className="training-band__main"><h2>Saturday + Sunday</h2><p>Genesis Valley or Pino Football Pitch, depending on availability.</p></div>
        <div className="training-band__action"><span>Exact times and pitch updates are shared with families.</span><a href="#contact?intent=family" onClick={() => onNavigate('contact', { intent: 'family' })}>Ask about this weekend <Icon name="arrow" size={15} /></a></div>
      </div>
    </section>
  );
}

function Achievements({ full = false }) {
  return (
    <section className={`section achievements-section ${full ? 'achievements-section--full' : ''}`} id="achievements">
      <div className="shell">
        <SectionHeading title="Confirmed results." description="Confirmed competition results from Kanlungan FC." action={!full && <span className="section-heading__aside">Archive / 2024–</span>} />
        <div className="achievement-list">{achievements.map(item => <article className="achievement-row" key={item.title}><span className="achievement-row__mark">{item.mark}</span><span className="achievement-row__year">{item.year}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div><span className="trophy-mark">✦</span></article>)}</div>
      </div>
    </section>
  );
}

function Updates({ onNavigate }) {
  return (
    <section className="section updates-section" id="news">
      <div className="shell">
        <SectionHeading title="Club updates." description="Training information, confirmed results, and club announcements." action={<Button variant="text" href="#news" onClick={() => onNavigate('news')}>All updates <Icon name="arrow" size={15} /></Button>} />
        <div className="update-grid">{updates.map((item, i) => <article className={`update-card update-card--${i}`} key={item.title}><div className="update-card__top"><span className="pill">{item.type}</span><span>{item.time}</span></div><h3>{item.title}</h3><p>{item.detail}</p>{item.href ? <a href={item.href} target="_blank" rel="noreferrer" className="card-link">{item.action} <Icon name="external" size={15} /></a> : <a href={`#contact${item.intent ? `?intent=${item.intent}` : ''}`} onClick={() => onNavigate('contact', { intent: item.intent })} className="card-link">{item.action} <Icon name="arrow" size={15} /></a>}</article>)}</div>
      </div>
    </section>
  );
}

function MediaWall({ full = false }) {
  return (
    <section className={`section media-section ${full ? 'media-section--full' : ''}`} id="gallery">
      <div className="shell">
        <SectionHeading title="From the club, in the moment." description="Public photos shared through the official Kanlungan FC Facebook profile. Open any frame to view the original post." action={<a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="social-handle">Facebook <Icon name="external" size={15} /></a>} />
        <div className="media-grid">{mediaTiles.map((tile, i) => <a className="media-tile" href={tile.href} target="_blank" rel="noreferrer" key={tile.label} aria-label={`${tile.label}, open original photo on official Facebook`}><img className="media-tile__image" src={tile.src} alt={tile.alt} loading="lazy" decoding="async" /><div className="media-tile__texture" aria-hidden="true"><span className="media-tile__number">0{i + 1}</span></div><div className="media-tile__caption"><span>{tile.type}</span><strong>{tile.label}</strong><small>{tile.note} <Icon name="external" size={12} /></small></div></a>)}</div>
        <div className="privacy-note"><span className="privacy-note__icon">◎</span><p><strong>Youth-photo privacy</strong> — Club media is shared through the official Facebook channel. Please follow the club’s consent and privacy practices when saving or resharing youth photos and videos.</p></div>
      </div>
    </section>
  );
}

function Sponsors({ onNavigate, full = false }) {
  return (
    <section className={`section sponsors-section ${full ? 'sponsors-section--full' : ''}`} id="sponsors">
      <div className="shell sponsors-grid">
        <div className="sponsors-copy"><h2>Support weekend football.</h2><p>Sponsors can support camps, clinics, tournament participation, or the weekend training rhythm.</p><Button href="#contact?intent=sponsor" onClick={() => onNavigate('contact', { intent: 'sponsor' })}>Start a partner inquiry <Icon name="arrow" size={16} /></Button></div>
        <div className="partner-board"><div className="partner-board__header"><span>Ways to partner</span><span>Open inquiry</span></div><div className="partner-board__logos partner-board__logos--benefits"><div><span>01</span><strong>Grassroots access</strong></div><div><span>02</span><strong>Player development</strong></div><div><span>03</span><strong>Weekend training</strong></div><div><span>04</span><strong>Community reach</strong></div></div><p>No official partner list is published yet. Confirmed sponsors and partners will be added here when relationships are formalized.</p></div>
      </div>
    </section>
  );
}

function InquiryForm({ mode = 'general' }) {
  const isSponsor = mode === 'sponsor';
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ organization: '', name: '', email: '', phone: '', message: '', consent: false });
  const [errors, setErrors] = useState({});
  const change = (key, value) => { setForm(current => ({ ...current, [key]: value })); setErrors(current => current[key] ? ({ ...current, [key]: '' }) : current); };
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (isSponsor && !form.organization.trim()) next.organization = 'Please add your organization name.';
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.phone.trim()) next.phone = 'Please add a phone number.';
    if (!form.message.trim()) next.message = 'Tell the club what you would like to discuss.';
    if (!form.consent) next.consent = 'Consent is required before sending.';
    setErrors(next);
    if (Object.keys(next).length) { const firstKey = Object.keys(next)[0]; const focusId = firstKey === 'message' ? `${mode}-message` : firstKey === 'consent' ? `${mode}-consent` : firstKey; setStatus('error'); window.requestAnimationFrame(() => document.getElementById(focusId)?.focus()); return; }
    setStatus('submitting');
    window.setTimeout(() => setStatus('success'), 450);
  };
  const reset = () => { setStatus('idle'); setForm({ organization: '', name: '', email: '', phone: '', message: '', consent: false }); setErrors({}); };
  const title = isSponsor ? 'Partner inquiry' : 'Family question';
  return <div className="form-wrap"><div className="form-wrap__header"><span>{title}</span><span className="required-note">* Required</span></div>{status === 'success' ? <div className="form-state form-state--success" role="status" aria-live="polite"><span className="form-state__icon"><Icon name="check" size={28} /></span><h3>Demo submission complete.</h3><p>Nothing was sent yet. This form is not connected to email or a backend. Email the club directly so a Coach can follow up.</p><div className="form-state__actions"><Button href="mailto:kanlunganfc2.0@gmail.com">Email the club <Icon name="mail" size={15} /></Button><Button variant="outline" onClick={reset}>Send another</Button></div></div> : <form onSubmit={submit} noValidate><p className="form-context">{isSponsor ? 'Tell us how you would like to support grassroots football in Consolacion.' : 'Ask about weekend training, schedules, results, or an existing family inquiry.'}</p><div className="form-grid">{isSponsor && <Field label="Organization" id="organization" name="organization" value={form.organization} onChange={change} error={errors.organization} required autoComplete="organization" maxLength={120} />}<Field label="Your name" id="name" name="name" value={form.name} onChange={change} error={errors.name} required autoComplete="name" maxLength={100} /><Field label="Email" id="email" name="email" type="email" value={form.email} onChange={change} error={errors.email} required autoComplete="email" maxLength={160} /><Field label="Phone number" id="phone" name="phone" type="tel" value={form.phone} onChange={change} error={errors.phone} required autoComplete="tel" maxLength={30} /></div><label className={`field field--wide ${errors.message ? 'field--error' : ''}`} htmlFor={`${mode}-message`}><span>Message <b>*</b></span><textarea id={`${mode}-message`} name="message" rows="5" value={form.message} onChange={e => change('message', e.target.value)} maxLength={700} required aria-invalid={!!errors.message} aria-describedby={errors.message ? `${mode}-message-error` : undefined} placeholder={isSponsor ? 'What would you like to explore together?' : 'What would you like to ask the club?'} />{errors.message && <small className="error-message" id={`${mode}-message-error`}>{errors.message}</small>}</label><label className={`consent ${errors.consent ? 'field-error' : ''}`}><input id={`${mode}-consent`} name="consent" type="checkbox" checked={form.consent} onChange={e => change('consent', e.target.checked)} required aria-invalid={!!errors.consent} /><span>I consent to Kanlungan Football Club using these details to respond. <small>We won’t publish personal information here.</small></span></label>{errors.consent && <p className="error-message" role="alert">{errors.consent}</p>}<div className="form-footer"><p className="integration-note">Frontend demo · connect this form to the club’s email service or backend before launch.</p>{status === 'submitting' ? <Button type="submit" disabled>Preparing message…</Button> : <Button type="submit">Prepare inquiry <Icon name="arrow" size={16} /></Button>}</div>{status === 'error' && <p className="form-alert" role="alert" aria-live="assertive">Please check the highlighted fields and try again.</p>}</form>}</div>;
}

function Contact({ onNavigate, initialAgeGroup = '', intent = 'player' }) {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ player: '', birthdate: '', ageGroup: initialAgeGroup, guardian: '', phone: '', email: '', program: '', message: '', consent: false });
  const [errors, setErrors] = useState({});
  const change = (key, value) => { setForm(current => ({ ...current, [key]: value })); setErrors(current => current[key] ? ({ ...current, [key]: '' }) : current); };
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.player.trim()) next.player = 'Please add the player’s name.';
    if (!form.birthdate) next.birthdate = 'Please add a birthdate.';
    if (!form.ageGroup) next.ageGroup = 'Choose an age group.';
    if (!form.guardian.trim()) next.guardian = 'Please add a parent or guardian name.';
    if (!form.phone.trim()) next.phone = 'Please add a phone number.';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.program) next.program = 'Choose a preferred program.';
    if (!form.consent) next.consent = 'Consent is required before sending.';
    setErrors(next);
    if (Object.keys(next).length) { const firstKey = Object.keys(next)[0]; const focusId = firstKey === 'consent' ? 'player-consent' : firstKey; setStatus('error'); window.requestAnimationFrame(() => document.getElementById(focusId)?.focus()); return; }
    setStatus('submitting');
    window.setTimeout(() => setStatus('success'), 450);
  };
  const reset = () => { setStatus('idle'); setForm({ player: '', birthdate: '', ageGroup: '', guardian: '', phone: '', email: '', program: '', message: '', consent: false }); setErrors({}); };
  const ageGroupHelp = form.ageGroup ? <>You selected <strong>{form.ageGroup}</strong>. “U” means “Under”; {form.ageGroup} identifies the under-{form.ageGroup.slice(1)} age group. Final placement is confirmed by the club after registration.</> : null;
  if (intent !== 'player') return <section className="section contact-section" id="contact"><div className="shell contact-grid"><div className="contact-intro"><p className="contact-intro__eyebrow">{intent === 'sponsor' ? 'Partner with the club' : 'Ask the club'}</p><h2>{intent === 'sponsor' ? <>Build the next<br /><em>starting point.</em></> : <>Let’s find the<br /><em>next step.</em></>}</h2><p>{intent === 'sponsor' ? 'Support grassroots football in Consolacion through a partnership built around young players and community access.' : 'Ask about weekend training, schedules, results, or an existing family inquiry.'}</p><div className="contact-details"><a href="tel:09542272602"><Icon name="phone" size={18} /><span>0954 227 2602</span></a><a href="mailto:kanlunganfc2.0@gmail.com"><Icon name="mail" size={18} /><span>kanlunganfc2.0@gmail.com</span></a></div></div><InquiryForm mode={intent} /></div></section>;
  return (
    <section className="section contact-section" id="contact">
      <div className="shell contact-grid">
        <div className="contact-intro"><p className="contact-intro__eyebrow">Start a conversation</p><h2>Register your<br /><em>player.</em></h2><p>Register interest, ask about a team, or talk to us about supporting youth football in Consolacion.</p><div className="contact-details"><a href="tel:09542272602"><Icon name="phone" size={18} /><span>0954 227 2602</span></a><a href="mailto:kanlunganfc2.0@gmail.com"><Icon name="mail" size={18} /><span>kanlunganfc2.0@gmail.com</span></a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><Icon name="external" size={18} /><span>Official Facebook profile</span></a></div><div className="contact-locations"><h3>Training locations</h3><a href="https://www.google.com/maps/search/?api=1&query=Genesis+Valley+Consolacion+Cebu" target="_blank" rel="noreferrer"><Icon name="pin" size={17} /><span>Genesis Valley <small>Get directions <Icon name="external" size={12} /></small></span></a><a href="https://www.google.com/maps/search/?api=1&query=Pino+Football+Pitch+Cebu" target="_blank" rel="noreferrer"><Icon name="pin" size={17} /><span>Pino Football Pitch <small>Get directions <Icon name="external" size={12} /></small></span></a></div></div>
        <div className="form-wrap"><div className="form-wrap__header"><span>Player registration</span><span className="required-note">* Required</span></div>{status === 'success' ? <div className="form-state form-state--success" role="status" aria-live="polite"><span className="form-state__icon"><Icon name="check" size={28} /></span><h3>Demo submission complete.</h3><p>Nothing was sent yet. This form is not connected to email or a backend. Email the club directly so a Coach can follow up.</p><div className="form-state__actions"><Button href="mailto:kanlunganfc2.0@gmail.com">Email the club <Icon name="mail" size={15} /></Button><Button variant="outline" onClick={reset}>Send another</Button></div></div> : <form onSubmit={submit} noValidate><p className="form-context">Share the basics and the club will help confirm the right next step.</p><div className="form-grid"><Field label="Player name" id="player" name="player" value={form.player} onChange={change} error={errors.player} required autoComplete="name" maxLength={100} /><Field label="Birthdate" id="birthdate" name="birthdate" type="date" value={form.birthdate} onChange={change} error={errors.birthdate} required /><Select label="Age group" id="ageGroup" name="ageGroup" value={form.ageGroup} onChange={change} error={errors.ageGroup} required options={teams.map(t => [t, t])} />{ageGroupHelp && <p className="age-group-note" role="status">{ageGroupHelp}</p>}<Field label="Parent / guardian name" id="guardian" name="guardian" value={form.guardian} onChange={change} error={errors.guardian} required autoComplete="name" maxLength={100} /><Field label="Phone number" id="phone" name="phone" type="tel" value={form.phone} onChange={change} error={errors.phone} required autoComplete="tel" maxLength={30} /><Field label="Email" id="email" name="email" type="email" value={form.email} onChange={change} error={errors.email} required autoComplete="email" maxLength={160} /><Select label="Preferred program" id="program" name="program" value={form.program} onChange={change} error={errors.program} required options={['Grassroots development', 'Camp or clinic', 'Not sure yet'].map(t => [t, t])} /></div><label className="field field--wide" htmlFor="player-message"><span>Message <small>Optional</small></span><textarea id="player-message" name="message" rows="4" value={form.message} onChange={e => change('message', e.target.value)} maxLength={700} placeholder="Anything you’d like the club to know?" /></label><label className={`consent ${errors.consent ? 'field-error' : ''}`}><input id="player-consent" name="consent" type="checkbox" checked={form.consent} onChange={e => change('consent', e.target.checked)} required aria-invalid={!!errors.consent} /><span>I consent to Kanlungan Football Club using these details to respond to this inquiry. <small>We won’t publish player information here.</small></span></label>{errors.consent && <p className="error-message" role="alert">{errors.consent}</p>}<div className="form-footer"><p className="integration-note">Frontend demo · connect this form to the club’s email service or backend before launch.</p>{status === 'submitting' ? <Button type="submit" disabled>Preparing registration…</Button> : <Button type="submit">Prepare registration <Icon name="arrow" size={16} /></Button>}</div>{status === 'error' && <p className="form-alert" role="alert" aria-live="assertive">Please check the highlighted fields and try again.</p>}</form>}</div>
      </div>
    </section>
  );
}

function Field({ label, id, name = id, value, onChange, error, type = 'text', required = false, autoComplete, maxLength }) {
  return <label className={`field ${error ? 'field--error' : ''}`} htmlFor={id}><span>{label} {required && <b>*</b>}</span><input id={id} name={name} type={type} value={value} onChange={e => onChange(id, e.target.value)} aria-invalid={!!error} aria-required={required} aria-describedby={error ? `${id}-error` : undefined} required={required} autoComplete={autoComplete} maxLength={maxLength} />{error && <small className="error-message" id={`${id}-error`}>{error}</small>}</label>;
}

function Select({ label, id, name = id, value, onChange, error, options, required = false }) {
  return <label className={`field ${error ? 'field--error' : ''}`} htmlFor={id}><span>{label} {required && <b>*</b>}</span><select id={id} name={name} value={value} onChange={e => onChange(id, e.target.value)} aria-invalid={!!error} aria-required={required} aria-describedby={error ? `${id}-error` : undefined} required={required}><option value="">Select one</option>{options.map(([key, text]) => <option key={key} value={key}>{text}</option>)}</select>{error && <small className="error-message" id={`${id}-error`}>{error}</small>}</label>;
}

function PageView({ page, onNavigate, routeParams }) {
  if (page === 'about') return <><PageHero title="About the club" detail="A home for young players in Consolacion, Cebu." /><Intro onNavigate={onNavigate} /><TrainingBand onNavigate={onNavigate} /><SiteFooter onNavigate={onNavigate} /></>;
  if (page === 'programs') return <><PageHero title="Programs" detail="Development pathways built around progress, play, and belonging." /><Programs onNavigate={onNavigate} /><TrainingBand onNavigate={onNavigate} /><Teams onNavigate={onNavigate} full /><SiteFooter onNavigate={onNavigate} /></>;
  if (page === 'teams') return <><PageHero title="Teams U7–U15" detail="Nine age groups. One club rhythm. A next step for every player." /><Teams onNavigate={onNavigate} full /><TrainingBand onNavigate={onNavigate} /><SiteFooter onNavigate={onNavigate} /></>;
  if (page === 'coaches') return <><PageHero title="Coaches" detail="Official coach profiles will be added when names are confirmed." /><section className="section empty-page"><div className="shell empty-page__inner"><span className="empty-page__stamp">Coming next</span><h2>Coach profiles are being prepared.</h2><p>Official names and profiles will be added here once confirmed by the club. Until then, our staff label remains simply: <strong>Coach</strong>.</p><Button href="#contact" onClick={() => onNavigate('contact')}>Ask the club a question <Icon name="arrow" size={16} /></Button></div></section><SiteFooter onNavigate={onNavigate} /></>;
  if (page === 'achievements') return <><PageHero title="Achievements" detail="Confirmed competition results from Kanlungan FC." /><Achievements full /><SiteFooter onNavigate={onNavigate} /></>;
  if (page === 'news') return <><PageHero title="News & announcements" detail="Club updates for families, players, and the community." /><Updates onNavigate={onNavigate} /><section className="section empty-page empty-page--short"><div className="shell empty-page__inner"><span className="empty-page__stamp">No new announcements</span><h2>Check the official channel for the latest.</h2><p>Schedules, results, and matchday notes will appear here when confirmed. Until then, follow the club’s official Facebook profile or ask the club directly.</p><Button variant="outline" href={FACEBOOK_URL} target="_blank">Follow official Facebook <Icon name="external" size={15} /></Button></div></section><SiteFooter onNavigate={onNavigate} /></>;
  if (page === 'gallery') return <><PageHero title="Gallery" detail="The people, places, and moments behind the badge." /><MediaWall full /><SiteFooter onNavigate={onNavigate} /></>;
  if (page === 'sponsors') return <><PageHero title="Sponsors & partners" detail="Support grassroots football for young players in Consolacion." /><Sponsors onNavigate={onNavigate} full /><SiteFooter onNavigate={onNavigate} /></>;
  if (page === 'contact') return <><PageHero title="Contact / Register" detail="Ask about a team, weekend training, or partnership." /><Contact onNavigate={onNavigate} initialAgeGroup={routeParams.get('ageGroup') || ''} intent={routeParams.get('intent') || 'player'} /><SiteFooter onNavigate={onNavigate} /></>;
  return <><Hero onNavigate={onNavigate} /><Intro onNavigate={onNavigate} /><Programs onNavigate={onNavigate} /><Teams onNavigate={onNavigate} /><TrainingBand onNavigate={onNavigate} /><Achievements /><Updates onNavigate={onNavigate} /><MediaWall /><Sponsors onNavigate={onNavigate} /><Contact onNavigate={onNavigate} /><SiteFooter onNavigate={onNavigate} /></>;
}

function PageHero({ title, detail }) {
  return <section className="page-hero"><div className="shell page-hero__inner"><p className="page-hero__label">Kanlungan Football Club / Consolacion, Cebu</p><h1>{title}</h1><p>{detail}</p></div></section>;
}

function SiteFooter({ onNavigate }) {
  return <footer className="site-footer"><div className="shell footer-grid"><div><a className="brand brand--footer" href="#home" onClick={() => onNavigate('home')}><ClubMark compact /><span className="brand__name">Kanlungan<br /><strong>Football Club</strong></span></a><p className="footer-tagline">Chase Progress, Not Perfection.</p></div><div className="footer-links"><div><span>Explore</span>{[['About','about'],['Programs','programs'],['Teams','teams'],['Updates','news'],['Gallery','gallery']].map(([label,page]) => <a key={page} href={`#${page}`} onClick={() => onNavigate(page)}>{label}</a>)}</div><div><span>Club</span>{[['Coaches','coaches'],['Achievements','achievements'],['Sponsors','sponsors'],['Contact / Register','contact']].map(([label,page]) => <a key={page} href={`#${page}`} onClick={() => onNavigate(page)}>{label}</a>)}</div><div><span>Connect</span><a href="tel:09542272602">0954 227 2602</a><a href="mailto:kanlunganfc2.0@gmail.com">kanlunganfc2.0@gmail.com</a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook <Icon name="external" size={13} /></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Kanlungan Football Club</span><span>Official crest</span></div></div></footer>;
}

function App() {
  const [route, setRoute] = useState(getRoute);
  const page = route.page;
  const pageTitle = useMemo(() => page === 'home' ? 'Kanlungan Football Club | Consolacion, Cebu' : `${page[0].toUpperCase()}${page.slice(1)} | Kanlungan Football Club`, [page]);
  useEffect(() => { document.title = pageTitle; const listener = () => { setRoute(getRoute()); window.scrollTo({ top: 0, behavior: 'smooth' }); }; window.addEventListener('hashchange', listener); return () => window.removeEventListener('hashchange', listener); }, [pageTitle]);
  useEffect(() => {
    let frame = 0;
    const updateParallax = () => {
      const photo = document.querySelector('.hero__field-photo');
      if (!photo) return;
      const hero = photo.closest('.hero');
      const bounds = hero?.getBoundingClientRect();
      const progress = bounds ? Math.max(-1, Math.min(1, -bounds.top / Math.max(bounds.height, 1))) : 0;
      document.documentElement.style.setProperty('--hero-photo-shift', `${Math.round(progress * 42)}px`);
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(updateParallax); };
    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); document.documentElement.style.removeProperty('--hero-photo-shift'); };
  }, []);
  const onNavigate = (next, params = {}) => { const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value)).toString(); const target = `#${next}${query ? `?${query}` : ''}`; if (window.location.hash !== target) window.location.hash = target; else window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <><SiteHeader onNavigate={onNavigate} activePage={page} /><main><PageView page={page} onNavigate={onNavigate} routeParams={route.params} /></main></>;
}

createRoot(document.getElementById('root')).render(<App />);
