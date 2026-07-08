/* =========================================================
   SABARI ANANTH — PORTFOLIO
   script.js | Vanilla JavaScript | ES6+
   ========================================================= */

'use strict';

/* ────────────────────────────────────────────────────────
   1.  BOOT SEQUENCE LOADER
   ──────────────────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('loader');
  const bootLog = document.getElementById('boot-log');
  if (!loader || !bootLog) return;

  document.body.classList.add('loading');

  const bootLines = [
    "> INITIALIZING S/A.SYS PROTOCOL...",
    "> LOADING FRONTEND MODULES......... <span class='ok'>OK</span>",
    "> CALIBRATING ARC REACTOR CORE...... <span class='ok'>OK</span>",
    "> ESTABLISHING HUD OVERLAY.......... <span class='ok'>OK</span>",
    "> SYSTEMS NOMINAL. WELCOME BACK, SABARI."
  ];

  let i = 0;
  function typeBoot() {
    if (i < bootLines.length) {
      const line = document.createElement('div');
      line.innerHTML = bootLines[i];
      bootLog.appendChild(line);
      i++;
      setTimeout(typeBoot, 340);
    } else {
      const cursor = document.createElement('span');
      cursor.className = 'boot-cursor';
      cursor.innerHTML = '&nbsp;';
      bootLog.appendChild(cursor);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
      }, 500);
    }
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
  } else {
    window.addEventListener('load', () => setTimeout(typeBoot, 200));
  }
})();


/* ────────────────────────────────────────────────────────
   2.  NAVBAR — scroll class + active section highlight
   ──────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightActiveNav();
    toggleBackToTop();
  }

  function highlightActiveNav() {
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 120) currentId = sec.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ────────────────────────────────────────────────────────
   3.  HAMBURGER MENU
   ──────────────────────────────────────────────────────── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ────────────────────────────────────────────────────────
   4.  TYPING ANIMATION
   ──────────────────────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = ['Developer', 'Designer', 'React Dev', 'Problem Solver', 'UI Craftsman'];

  let phraseIndex = 0, charIndex = 0, isDeleting = false, isPaused = false;
  const TYPING_SPEED = 90, DELETING_SPEED = 55, PAUSE_AFTER = 1800, PAUSE_BEFORE = 400;

  function type() {
    if (isPaused) return;
    const phrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        isPaused = true;
        setTimeout(() => { isPaused = false; requestAnimationFrame(tick); }, PAUSE_BEFORE);
        return;
      }
    } else {
      charIndex++;
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        isPaused = true;
        setTimeout(() => { isDeleting = true; isPaused = false; requestAnimationFrame(tick); }, PAUSE_AFTER);
        return;
      }
    }
    requestAnimationFrame(tick);
  }

  let lastTime = 0;
  function tick(timestamp = 0) {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    if (timestamp - lastTime >= speed) { lastTime = timestamp; type(); }
    else requestAnimationFrame(tick);
  }

  setTimeout(() => requestAnimationFrame(tick), 2400);
})();


/* ────────────────────────────────────────────────────────
   5.  SCROLL REVEAL
   ──────────────────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
})();


/* ────────────────────────────────────────────────────────
   6.  SKILL BAR ANIMATION
   ──────────────────────────────────────────────────────── */
(function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');
  if (!skillCards.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.3 });
  skillCards.forEach(card => observer.observe(card));
})();


/* ────────────────────────────────────────────────────────
   7.  BACK TO TOP
   ──────────────────────────────────────────────────────── */
function toggleBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 400);
}
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', toggleBackToTop, { passive: true });
})();


/* ────────────────────────────────────────────────────────
   8.  CONTACT FORM — Gmail mailto integration
   ──────────────────────────────────────────────────────── */
(function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submit = document.getElementById('form-submit');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) { showStatus('Please fill in all fields.', 'error'); return; }
    if (!isValidEmail(email)) { showStatus('Please enter a valid email address.', 'error'); return; }

    const body = encodeURIComponent(`Hi Sabari,\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}\n${email}`);
    const mailtoLink = `mailto:sabariananth@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoLink;

    showStatus('✓ Opening your email client...', 'success');
    submit.disabled = true;
    submit.querySelector('.btn-text').textContent = 'Sent!';

    setTimeout(() => {
      form.reset();
      submit.disabled = false;
      submit.querySelector('.btn-text').textContent = 'Send Message';
      clearStatus();
    }, 3000);
  });

  function showStatus(msg, type) { status.textContent = msg; status.className = 'form-status ' + type; }
  function clearStatus() { status.textContent = ''; status.className = 'form-status'; }
  function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
})();


/* ────────────────────────────────────────────────────────
   9.  SMOOTH SCROLL
   ──────────────────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ────────────────────────────────────────────────────────
   10. PROJECT CARD KEYBOARD ACCESSIBILITY
   ──────────────────────────────────────────────────────── */
(function initProjectCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const overlay = card.querySelector('.project-overlay');
        if (overlay) { const firstLink = overlay.querySelector('a'); if (firstLink) firstLink.focus(); }
      }
    });
  });
})();


/* ────────────────────────────────────────────────────────
   11. HERO PARALLAX
   ──────────────────────────────────────────────────────── */
(function initParallax() {
  const frame = document.querySelector('.hero-image-frame');
  if (!frame) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;
    frame.style.transform = `perspective(800px) rotateX(${yRatio * -4}deg) rotateY(${xRatio * 4}deg)`;
  });
  document.addEventListener('mouseleave', () => {
    frame.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  });
})();


/* ────────────────────────────────────────────────────────
   12. CURSOR GLOW — reactor-cyan ambient glow
   ──────────────────────────────────────────────────────── */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'custom-cursor-glow';

  const cursorRing = document.createElement('div');
  cursorRing.className = 'custom-cursor-ring';

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';

  document.body.appendChild(glow);
  document.body.appendChild(cursorRing);
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.remove('custom-cursor-hidden');
    cursorRing.classList.remove('custom-cursor-hidden');
    glow.classList.remove('custom-cursor-hidden');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.add('custom-cursor-hidden');
    cursorRing.classList.add('custom-cursor-hidden');
    glow.classList.add('custom-cursor-hidden');
  });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .btn, .nav-link, .contact-link, input, textarea')) {
      cursor.classList.add('custom-cursor--active');
      cursorRing.classList.add('custom-cursor-ring--active');
      glow.classList.add('custom-cursor-glow--active');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .btn, .nav-link, .contact-link, input, textarea')) {
      cursor.classList.remove('custom-cursor--active');
      cursorRing.classList.remove('custom-cursor-ring--active');
      glow.classList.remove('custom-cursor-glow--active');
    }
  });

  function animateGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';
    cursorRing.style.left = currentX + 'px';
    cursorRing.style.top = currentY + 'px';
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();


/* ────────────────────────────────────────────────────────
   Init log
   ──────────────────────────────────────────────────────── */
console.log(
  '%cS/A.SYS ONLINE%c\nhttps://github.com/sabaxi00',
  'color:#ff4f44;background:#050a12;font-size:14px;font-weight:bold;padding:6px 12px;border-radius:2px;border:1px solid #ff4f44;',
  'color:#f2b84c;font-size:11px;'
);