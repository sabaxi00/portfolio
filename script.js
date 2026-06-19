/* =========================================================
   SABARI ANANTH — PORTFOLIO
   script.js | Vanilla JavaScript | ES6+
   ========================================================= */

'use strict';

/* ────────────────────────────────────────────────────────
   1.  LOADER
   ──────────────────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    // Wait for loader bar animation (1.8s) then fade out
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 2000);
  });
})();


/* ────────────────────────────────────────────────────────
   2.  NAVBAR — scroll class + active section highlight
   ──────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  /* Scroll class */
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    highlightActiveNav();
    toggleBackToTop();
  }

  /* Highlight nav link matching the section in viewport */
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
  onScroll(); // run once on load
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

  /* Close on link click */
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close on outside click */
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

  const phrases = [
    'Developer',
    'Designer',
    'React Dev',
    'Problem Solver',
    'UI Craftsman',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  const TYPING_SPEED  = 90;
  const DELETING_SPEED = 55;
  const PAUSE_AFTER   = 1800;
  const PAUSE_BEFORE  = 400;

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
        setTimeout(() => {
          isDeleting = true;
          isPaused = false;
          requestAnimationFrame(tick);
        }, PAUSE_AFTER);
        return;
      }
    }

    requestAnimationFrame(tick);
  }

  let lastTime = 0;
  function tick(timestamp = 0) {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    if (timestamp - lastTime >= speed) {
      lastTime = timestamp;
      type();
    } else {
      requestAnimationFrame(tick);
    }
  }

  // Start after loader
  setTimeout(() => requestAnimationFrame(tick), 2200);
})();


/* ────────────────────────────────────────────────────────
   5.  SCROLL REVEAL (IntersectionObserver)
   ──────────────────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Animate skill bars when they appear
          const fill = entry.target.querySelector('.skill-fill');
          if (fill) entry.target.classList.add('visible'); // triggers CSS var transition

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach(el => observer.observe(el));
})();


/* ────────────────────────────────────────────────────────
   6.  SKILL BAR ANIMATION (triggered by reveal)
   ──────────────────────────────────────────────────────── */
(function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');
  if (!skillCards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

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

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

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

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    /* Basic validation */
    if (!name || !email || !subject || !message) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    /* Build mailto and open email client */
    const body = encodeURIComponent(
      `Hi Sabari,\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}\n${email}`
    );
    const mailtoLink = `mailto:sabariananth@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoLink;

    /* Show success */
    showStatus('✓ Opening your email client...', 'success');

    /* Disable submit temporarily */
    submit.disabled = true;
    submit.querySelector('.btn-text').textContent = 'Sent!';

    setTimeout(() => {
      form.reset();
      submit.disabled = false;
      submit.querySelector('.btn-text').textContent = 'Send Message';
      clearStatus();
    }, 3000);
  });

  function showStatus(msg, type) {
    status.textContent = msg;
    status.className = 'form-status ' + type;
  }

  function clearStatus() {
    status.textContent = '';
    status.className = 'form-status';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();


/* ────────────────────────────────────────────────────────
   9.  SMOOTH SCROLL for anchor links
   ──────────────────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ────────────────────────────────────────────────────────
   10. PROJECT CARD — keyboard accessibility for hover overlay
   ──────────────────────────────────────────────────────── */
(function initProjectCards() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const overlay = card.querySelector('.project-overlay');
        if (overlay) {
          const firstLink = overlay.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      }
    });
  });
})();


/* ────────────────────────────────────────────────────────
   11. HERO PARALLAX — subtle mouse-tracking on hero image
   ──────────────────────────────────────────────────────── */
(function initParallax() {
  const frame = document.querySelector('.hero-image-frame');
  if (!frame) return;

  // Only run on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth  - 0.5) * 2; // -1 to 1
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

    const rotateX = yRatio * -4;
    const rotateY = xRatio *  4;

    frame.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    frame.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  });
})();


/* ────────────────────────────────────────────────────────
   12. CURSOR GLOW — subtle ambient glow following cursor
   ──────────────────────────────────────────────────────── */
(function initCursorGlow() {
  // Only on desktop
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    glow.style.left = currentX + 'px';
    glow.style.top  = currentY + 'px';
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
})();


/* ────────────────────────────────────────────────────────
   13. SECTION COUNTER — optional stat counters if added
   ──────────────────────────────────────────────────────── */
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}


/* ────────────────────────────────────────────────────────
   Init log
   ──────────────────────────────────────────────────────── */
console.log(
  '%cSabari Ananth — Portfolio%c\nhttps://github.com/sabariananth',
  'color:#fff;background:#111;font-size:14px;font-weight:bold;padding:6px 12px;border-radius:4px;',
  'color:#888;font-size:11px;'
);
