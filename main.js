gsap.registerPlugin(ScrollTrigger);

/* ─── LOADER ─── */
const loaderBar  = document.getElementById('loader-bar');
const loader     = document.getElementById('loader');
const loaderName = document.querySelector('.loader-name');

let progress = 0;
const loaderAnim = setInterval(() => {
  progress += Math.random() * 18;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderAnim);
    loaderBar.style.width = '100%';
    setTimeout(launchSite, 400);
  }
  loaderBar.style.width = progress + '%';
}, 80);

gsap.to(loaderName, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });

function launchSite() {
  const tl = gsap.timeline();
  tl.to(loaderName, { opacity: 0, y: -20, duration: 0.5 })
    .to(loader, { scaleY: 0, transformOrigin: 'top', duration: 0.8, ease: 'power3.inOut' }, '-=0.2')
    .call(animateHero, [], '-=0.1');
}

/* ─── HERO ANIMATION ─── */
function animateHero() {
  const tl = gsap.timeline();
  tl.from('.hero-eyebrow span', { y: '100%', duration: 0.8, ease: 'power3.out' })
    .from('.hero-name .word', {
      y: '110%', duration: 1, stagger: 0.12, ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-aside > *', {
      opacity: 0, y: 20, duration: 0.7, stagger: 0.15, ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-bottom > *', {
      opacity: 0, y: 10, duration: 0.5, stagger: 0.1, ease: 'power2.out'
    }, '-=0.4')
    .from('#main-nav > *', {
      opacity: 0, y: -10, duration: 0.5, stagger: 0.1, ease: 'power2.out'
    }, '-=0.8');
}

/* ─── CUSTOM CURSOR ─── */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

// Smooth lagging ring
(function raf() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(raf);
})();

// Cursor hover states
document.querySelectorAll('a, button, .exp-row, .project-item, .lead-card, .skill-chip').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ─── MAGNETIC BUTTON ─── */
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    gsap.to(el, { x: dx * 0.3, y: dy * 0.3, duration: 0.4, ease: 'power2.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  });
});

/* ─── SCROLL PROGRESS BAR ─── */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
});

/* ─── SCROLL-TRIGGERED ANIMATIONS ─── */

// Section labels
gsap.utils.toArray('.section-label').forEach(el => {
  gsap.from(el, {
    opacity: 0, x: -30, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

// About headline
gsap.utils.toArray('.about-headline').forEach(el => {
  gsap.from(el, {
    opacity: 0, y: 40, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 80%' }
  });
});

// About body paragraphs
gsap.utils.toArray('.about-body p').forEach((p, i) => {
  gsap.from(p, {
    opacity: 0, y: 20, duration: 0.7, delay: i * 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: p, start: 'top 88%' }
  });
});

// Stat cards
gsap.utils.toArray('.about-stat').forEach((s, i) => {
  gsap.from(s, {
    opacity: 0, scale: 0.97, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: s, start: 'top 88%' }
  });
});

// Skill chips
gsap.from('.skill-chip', {
  opacity: 0, y: 10, duration: 0.4, stagger: 0.04, ease: 'power2.out',
  scrollTrigger: { trigger: '.skills-row', start: 'top 88%' }
});

// Experience rows
gsap.utils.toArray('.exp-row').forEach(row => {
  gsap.from(row, {
    opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: row, start: 'top 85%' }
  });
});

// Project items
gsap.utils.toArray('.project-item').forEach(item => {
  gsap.from(item, {
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: item, start: 'top 85%' }
  });
});

// Leadership cards
gsap.from('.lead-card', {
  opacity: 0, y: 50, duration: 0.8, stagger: 0.12, ease: 'power3.out',
  scrollTrigger: { trigger: '.lead-grid', start: 'top 80%' }
});

// Contact section
gsap.from('.contact-headline', {
  opacity: 0, y: 60, duration: 1.2, ease: 'power3.out',
  scrollTrigger: { trigger: '.contact-headline', start: 'top 85%' }
});
gsap.from('.contact-sub, .contact-cta, .contact-links-row', {
  opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power2.out',
  scrollTrigger: { trigger: '.contact-sub', start: 'top 88%' }
});

/* ─── PARALLAX — HERO NAME ON SCROLL ─── */
gsap.to('.hero-name', {
  yPercent: -15,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

/* ─── LEADERSHIP SECTION FADE IN ─── */
gsap.from('#leadership', {
  opacity: 0, duration: 0.5,
  scrollTrigger: { trigger: '#leadership', start: 'top 90%' }
});

/* ─── NAV CURTAIN TRANSITIONS (anchor link click) ─── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const curtain = document.getElementById('curtain');
    const tl = gsap.timeline();
    tl.to(curtain, { scaleY: 1, transformOrigin: 'bottom', duration: 0.5, ease: 'power3.inOut' })
      .call(() => { target.scrollIntoView(); })
      .to(curtain, { scaleY: 0, transformOrigin: 'top', duration: 0.6, ease: 'power3.inOut', delay: 0.05 });
  });
});

/* ─── NAV BACKGROUND ON SCROLL ─── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.style.mixBlendMode   = 'normal';
    nav.style.background     = 'rgba(240,235,227,0.92)';
    nav.style.backdropFilter = 'blur(12px)';
    nav.style.borderBottom   = '1px solid rgba(0,0,0,0.08)';
  } else {
    nav.style.background     = 'transparent';
    nav.style.backdropFilter = 'none';
    nav.style.borderBottom   = 'none';
    nav.style.mixBlendMode   = 'multiply';
  }
});
