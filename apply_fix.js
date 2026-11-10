const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'public', 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Strip UTF-8 BOM if present
if (content.charCodeAt(0) === 0xFEFF) {
  content = content.substring(1);
  console.log('Stripped UTF-8 BOM.');
}

// 2. Add safety script in <head> if not already present
if (!content.includes('// Safety failsafe: guarantees portfolio always unlocks')) {
  const safetyScript = `<script>
// Safety failsafe: guarantees portfolio always unlocks within 2s even on slow networks or script interruptions
setTimeout(function() {
  var ld = document.getElementById('loader');
  if (ld && !document.body.classList.contains('ready')) {
    ld.classList.add('out');
    document.body.classList.add('ready');
    setTimeout(function() { try { ld.remove(); } catch(e){} }, 600);
    window.dispatchEvent(new Event('intro:ready'));
  }
}, 2200);
</script>
</head>`;
  content = content.replace('</head>', safetyScript);
  console.log('Added safety script before </head>.');
}

// 3. Replace INFO array and door info wiring
const oldInfoMarker = "  // what each door holds: shown beside the door on hover (desktop), under the swipe hint on phones\n  const INFO = [";
const oldInfoEnd = "  const dinfo = $('#dinfo'), wallEl = $('.doors__wall', sec), MOB = matchMedia('(max-width: 639.98px)');\n  units.forEach((u, i) => $('.doorway', u).setAttribute('aria-description', INFO[i][1] + ': ' + INFO[i][2].join(', ')));\n  const setInfo = i => { dinfo.querySelector('.dinfo__h').textContent = INFO[i][0]; dinfo.querySelector('.dinfo__t').textContent = INFO[i][1]; dinfo.querySelector('.dinfo__p').innerHTML = INFO[i][2].map(s => `<li>${s}</li>`).join(''); };";

const newInfoBlock = `  // what each door holds: shown beside the door on hover (desktop), under the swipe hint on phones
  const INFO = [
    ['SEO & Organic Growth', 'Precision technical audits & search dominance', ['Technical SEO audits & Core Web Vitals', 'Competitor keyword gap & intent mapping', 'Topical authority & schema silos', '+40% organic traffic growth', 'GA4 & Search Console intelligence']],
    ['B2B Lead Generation', 'High-converting outbound prospect pipelines', ['Targeted ICP & decision-maker databases', 'Apollo.io & LinkedIn Sales Navigator', 'Cold email sequences with A/B testing', '60-70% bounce reduction', 'CRM lead scoring & opportunity tracking']],
    ['AI Workflows & Bots', 'Next-gen automation & custom Python scripting', ['Cloudflare-bypass headless bots', 'Multi-profile session & cookie management', 'Zero-API-cost architecture', 'Claude 3.7 & GPT-4 prompt pipelines', 'Automated prospect extraction SOPs']],
    ['Snake Battle Royale Game', 'Interactive Web Game & Canvas Physics Engineering', ['Custom JavaScript canvas game engine', 'Dynamic food spawning & score tracking', 'Smooth 60 FPS snake motion & collision detection', 'Live playable web app at gameabubakar.netlify.app', 'Responsive touch & keyboard controls']],
    ['WordPress Content Ops', 'Enterprise product catalogues & SEO structure', ['Product taxonomy & custom fields management', 'Structured schema & FAQ rich snippets', 'Strategic internal link siloing', 'Fast page speed & mobile responsiveness', 'Scalable content calendar execution']],
    ['Brand Authority & Quora', 'High-intent community referral engines', ['High-traffic question mining with search intent', 'Thought leadership & brand storytelling', 'Strategic anchor linking & referral funnels', '80% brand visibility & reach growth', 'Reputation monitoring & trust elevation']],
    ['AL-EHSAN Welfare Eye Hospital', 'Front Desk Coordination & Healthcare Operations', ['150+ daily patient flow coordination', '98%+ patient appointment schedule precision', 'Cross-departmental triaging with ophthalmic teams', 'Compassionate de-escalation & patient assistance', 'Hospital records & registration management']],
  ];
  const dinfo = $('#dinfo'), wallEl = $('.doors__wall', sec), MOB = matchMedia('(max-width: 639.98px)');
  units.forEach((u, i) => {
    const item = INFO[i];
    if (item) {
      $('.doorway', u)?.setAttribute('aria-description', item[1] + ': ' + (item[2] || []).join(', '));
    }
  });
  const setInfo = i => {
    const item = INFO[i];
    if (!item) return;
    dinfo.querySelector('.dinfo__h').textContent = item[0] || '';
    dinfo.querySelector('.dinfo__t').textContent = item[1] || '';
    dinfo.querySelector('.dinfo__p').innerHTML = (item[2] || []).map(s => \`<li>\${s}</li>\`).join('');
  };`;

if (content.indexOf(oldInfoMarker) !== -1) {
  const p1 = content.indexOf(oldInfoMarker);
  const p2 = content.indexOf(oldInfoEnd, p1);
  if (p2 !== -1) {
    content = content.substring(0, p1) + newInfoBlock + content.substring(p2 + oldInfoEnd.length);
    console.log('Replaced INFO array and safe door descriptions.');
  } else {
    console.warn('Could not find oldInfoEnd exact match.');
  }
} else {
  console.warn('Could not find oldInfoMarker.');
}

// 4. Safe visible boundary checks
const oldBoundaries = `      const toRight = vi < 2 && visible[vi + 2];
      const a = toRight ? visible[vi + 1].getBoundingClientRect() : (visible[vi - 2] || visible[vi - 1]).getBoundingClientRect();
      const b = toRight ? visible[vi + 2].getBoundingClientRect() : visible[vi - 1].getBoundingClientRect();`;

const newBoundaries = `      const toRight = vi < 2 && visible[vi + 2];
      const a = toRight ? visible[vi + 1].getBoundingClientRect() : (visible[vi - 2] || visible[vi - 1] || visible[vi]).getBoundingClientRect();
      const b = toRight ? visible[vi + 2].getBoundingClientRect() : (visible[vi - 1] || visible[vi]).getBoundingClientRect();`;

if (content.includes(oldBoundaries)) {
  content = content.replace(oldBoundaries, newBoundaries);
  console.log('Updated boundary checks.');
}

// 5. Update mobile sizing and scrolling for 7 doors
const oldMobBlock = `  // phones: the wall stays pinned while you scroll; each stretch of scrolling (or a sideways swipe) moves one door along
  const mRow = $('.doors__row', sec);
  let mIdx = 0, mForce = -1, mShown = -1;
  const mSpan = () => Math.max(1, sec.offsetHeight - innerHeight);
  const mobY = i => sec.getBoundingClientRect().top + pageYOffset + (Math.min(3, Math.max(0, i)) / 3) * mSpan();
  const mDots = $('.doors__dots', sec);
  let mCur = 0, mRaf = 0, mLast = 0, mSettle = 0, swipeLock = 0;
  // scroll progress across the pinned wall → a door position that rests on each door and glides between them
  const mDwell = f => { const i = Math.floor(f), t = f - i, u = Math.min(1, Math.max(0, (t - .2) / .6)); return i + u * u * (3 - 2 * u); };
  const mProgress = () => Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / mSpan()));
  const mTarget = () => mForce >= 0 ? mForce : mDwell(mProgress() * 3);
  function mShow(i){
    if (i === mShown) return;
    mShown = i; setInfo(i);
    mDots?.querySelectorAll('i').forEach((d, k) => d.classList.toggle('on', k === Math.min(3, i)));
    dinfo.getAnimations().forEach(a => a.cancel());
    if (!reduced) dinfo.animate([{ opacity: 0, transform: 'translateY(.4rem)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: 'cubic-bezier(.16,1,.3,1)' });
  }`;

const newMobBlock = `  // phones: the wall stays pinned while you scroll; each stretch of scrolling (or a sideways swipe) moves one door along
  const mRow = $('.doors__row', sec);
  let mIdx = 0, mForce = -1, mShown = -1;
  const mSpan = () => Math.max(1, sec.offsetHeight - innerHeight);
  const TOTAL_DOORS = units.length || 7;
  const MAX_D = TOTAL_DOORS - 1;
  const mobY = i => sec.getBoundingClientRect().top + pageYOffset + (Math.min(MAX_D, Math.max(0, i)) / MAX_D) * mSpan();
  const mDots = $('.doors__dots', sec);
  let mCur = 0, mRaf = 0, mLast = 0, mSettle = 0, swipeLock = 0;
  // scroll progress across the pinned wall → a door position that rests on each door and glides between them
  const mDwell = f => { const i = Math.floor(f), t = f - i, u = Math.min(1, Math.max(0, (t - .2) / .6)); return i + u * u * (3 - 2 * u); };
  const mProgress = () => Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / mSpan()));
  const mTarget = () => mForce >= 0 ? mForce : mDwell(mProgress() * MAX_D);
  function mShow(i){
    if (i === mShown) return;
    mShown = i; setInfo(i);
    mDots?.querySelectorAll('i').forEach((d, k) => d.classList.toggle('on', k === Math.min(MAX_D, i)));
    dinfo.getAnimations().forEach(a => a.cancel());
    if (!reduced) dinfo.animate([{ opacity: 0, transform: 'translateY(.4rem)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: 'cubic-bezier(.16,1,.3,1)' });
  }`;

if (content.includes(oldMobBlock)) {
  content = content.replace(oldMobBlock, newMobBlock);
  console.log('Updated mobile door swiping math.');
}

// 6. Update mFromScroll, touchstart and touchend MAX_D
content = content.replace("const want = mobY(Math.round(mProgress() * 3));", "const want = mobY(Math.round(mProgress() * MAX_D));");
content = content.replace("i0 = Math.round(mProgress() * 3);", "i0 = Math.round(mProgress() * MAX_D);");
content = content.replace("const to = Math.min(3, Math.max(0, i0 + (dx < 0 ? 1 : -1)));", "const to = Math.min(MAX_D, Math.max(0, i0 + (dx < 0 ? 1 : -1)));");
console.log('Updated touch and scroll targets.');

// 7. Update SECRET logic & openDoor settle
const oldSecretBlock = `  // the Brand & Quora door sits at the end of the wall
  const SECRET = 4, secretUnit = units[SECRET];
  function reveal(on){
    sec.classList.toggle('reveal', on);
    if (on) secretUnit.removeAttribute('inert'); else secretUnit.setAttribute('inert', '');
  }
  window.openDoor = i => {
    if (busy || inWall) return;
    const top = MOB.matches ? mobY(Math.min(i, 3)) : sec.getBoundingClientRect().top + pageYOffset;
    const far = Math.abs(pageYOffset - top) > 4;
    if (far){ if (lenis) lenis.scrollTo(top, { duration: .9, easing: x => 1 - Math.pow(1 - x, 3) }); else scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' }); }
    const t0 = performance.now();
    warm(i);
    const settle = () => {
      if (Math.abs(pageYOffset - top) > 24 && performance.now() - t0 < 1500) return requestAnimationFrame(settle);   // open as the scroll lands, not after its tail
      if (!ready[i] && performance.now() - t0 < 4000) return requestAnimationFrame(settle);   // the room is still loading
      const row = $('.doors__row', sec), u = doorsState[i].u;
      let wait = 0;
      if (MOB.matches){
        const want = i === SECRET ? SECRET : i, before = mForce >= 0 ? mForce : mIdx;
        if (i === SECRET){ reveal(true); mForce = SECRET; } else mIdx = i;
        mApply();
        if (want !== before) wait = reduced ? 0 : 560;
      } else if (i === SECRET && !sec.classList.contains('reveal')){ reveal(true); wait = reduced ? 0 : 850; }
      setTimeout(() => enter(i), wait);
    };
    requestAnimationFrame(settle);
  };`;

const newSecretBlock = `  // All doors are standard interactive doors
  const SECRET = -1, secretUnit = null;
  function reveal(on){
    sec.classList.toggle('reveal', on);
  }
  window.openDoor = i => {
    if (busy || inWall) return;
    const top = MOB.matches ? mobY(Math.min(i, MAX_D)) : sec.getBoundingClientRect().top + pageYOffset;
    const far = Math.abs(pageYOffset - top) > 4;
    if (far){ if (lenis) lenis.scrollTo(top, { duration: .9, easing: x => 1 - Math.pow(1 - x, 3) }); else scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' }); }
    const t0 = performance.now();
    warm(i);
    const settle = () => {
      if (Math.abs(pageYOffset - top) > 24 && performance.now() - t0 < 1500) return requestAnimationFrame(settle);
      if (!ready[i] && performance.now() - t0 < 4000) return requestAnimationFrame(settle);
      setTimeout(() => enter(i), 0);
    };
    requestAnimationFrame(settle);
  };`;

if (content.includes(oldSecretBlock)) {
  content = content.replace(oldSecretBlock, newSecretBlock);
  console.log('Updated SECRET & openDoor block.');
}

// 8. Update PageLoader section
const oldLoaderStart = "/* ---------- PageLoader: the doors' colours stack up as the page loads, then slides apart to open it ---------- */";
const oldLoaderEnd = "  if (reduced){ num.textContent = '100'; paint(1); setTimeout(finish, 500); }\n  else requestAnimationFrame(t => { try { loadTick(t); } catch (e) { bailOut(); } });\n  } catch (e) { bailOut(); }\n}";

const newLoaderCode = `/* ---------- PageLoader: the doors' colours stack up as the page loads, then slides apart to open it ---------- */
const loader = $('#loader');
// back from a door's page (#works): skip the intro and stand in front of the doors again
// (#about and #contact come from the links in a room's navbar and footer)
if (['#works', '#about', '#contact'].includes(location.hash)){
  loader?.remove();
  document.body.classList.add('ready');
  const wantContact = location.hash === '#contact';
  requestAnimationFrame(() => {
    if (wantContact) setTimeout(() => openModal(), 400);
    const el = $(location.hash === '#about' ? '#about' : '#works');
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + pageYOffset);
    dispatchEvent(new Event('intro:ready'));
  });
} else {
  stopScroll();
  let introDone = false;
  const bailOut = () => {
    if (introDone) return; introDone = true;
    try { loader?.remove(); } catch (e) {}
    document.body.classList.add('ready'); startScroll(); dispatchEvent(new Event('intro:ready'));
  };
  window.__introBail = bailOut;
  setTimeout(bailOut, 2000);
  try {
    const num = $('#ldCount'), pills = [...(loader ? loader.querySelectorAll('.ld__pill') : [])];
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    let ready = .55;
    document.fonts?.ready.then(() => { ready = Math.max(ready, .85); });
    const loaded = () => { ready = 1; };
    if (document.readyState === 'complete') loaded(); else addEventListener('load', loaded, { once: true });
    setTimeout(loaded, 1000);
    const step = pills.length > 1 ? 1 / (pills.length - 1) : 0.14;
    const paint = p => {
      if (loader) loader.style.setProperty('--p', p.toFixed(3));
      pills.forEach((el, k) => el.classList.toggle('on', p >= k * step || p >= 1));
    };
    const FILL = 1000;
    let t0 = null, shown = 0;
    function loadTick(now){
      if (t0 === null) t0 = now;
      const want = Math.min(ease(Math.min(1, (now - t0) / FILL)), ready);
      shown += (want - shown) * .24; if (want - shown < .003) shown = want;
      paint(shown);
      if (num) num.textContent = String(Math.round(shown * 100)).padStart(3, '0');
      if (shown < .99) requestAnimationFrame(t => { try { loadTick(t); } catch (e) { bailOut(); } }); else setTimeout(finish, 240);
    }
    function finish(){
      if (loader) loader.classList.add('out');
      setTimeout(() => document.body.classList.add('ready'), 200);
      setTimeout(bailOut, 750);
    }
    if (reduced){ if (num) num.textContent = '100'; paint(1); setTimeout(finish, 300); }
    else requestAnimationFrame(t => { try { loadTick(t); } catch (e) { bailOut(); } });
  } catch (e) { bailOut(); }
}`;

const lIdx1 = content.indexOf(oldLoaderStart);
if (lIdx1 !== -1) {
  const lIdx2 = content.indexOf(oldLoaderEnd, lIdx1);
  if (lIdx2 !== -1) {
    content = content.substring(0, lIdx1) + newLoaderCode + content.substring(lIdx2 + oldLoaderEnd.length);
    console.log('Replaced PageLoader with resilient 1-second animation.');
  } else {
    console.warn('Could not find oldLoaderEnd.');
  }
} else {
  console.warn('Could not find oldLoaderStart.');
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully wrote updated index.html! File length:', content.length);
