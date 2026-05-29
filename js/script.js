// ── Nav scroll (home에서만 시각적 효과; 다른 페이지엔 영향 없음) ──
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));
}

// ── Hamburger / Mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    hamburger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
  document.querySelectorAll('.mob-link').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Reveal observer (home) ──
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 60); });
  }, { threshold: 0.06 });
  revealEls.forEach(el => revealObs.observe(el));
}

// ── Skills page ──
const skillGroups = document.querySelectorAll('.skill-group');
if (skillGroups.length) {
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        e.target.querySelectorAll('.skill-fill').forEach(b => { b.style.width = b.dataset.w + '%'; });
      }
    });
  }, { threshold: 0.1 });
  skillGroups.forEach(g => skillObs.observe(g));
}

const tlItems = document.querySelectorAll('.tl-item');
if (tlItems.length) {
  const tlObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80); });
  }, { threshold: 0.08 });
  tlItems.forEach(t => tlObs.observe(t));
}

// ── Works page (filter + reveal) ──
const filterBtns = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      workItems.forEach(item => { item.style.display = (f === 'all' || (item.dataset.cat || '').includes(f)) ? '' : 'none'; });
    });
  });
}
if (workItems.length) {
  const workObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.05 });
  workItems.forEach(el => workObs.observe(el));
}

// ── Contact form (global: called from inline onclick) ──
function handleSubmit() {
  const n = document.getElementById('name').value.trim();
  const em = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  if (!n || !em || !msg) { alert('이름, 이메일, 메시지를 입력해 주세요.'); return; }
  document.getElementById('success').style.display = 'block';
  document.getElementById('submitBtn').style.display = 'none';
}
