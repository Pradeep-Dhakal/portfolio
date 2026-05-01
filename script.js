/* ============================================
   PRADIP DHAKAL - ePortfolio JavaScript
   ============================================ */

// === NAVBAR ===
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navLinks?.classList.remove('open');
  });
});

// Active nav link
(function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// === SCROLL ANIMATIONS ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in-up, .timeline-item, .reflection-section').forEach(el => {
  observer.observe(el);
});

// === SKILL BAR ANIMATIONS ===
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) {
        const pct = fill.dataset.pct;
        setTimeout(() => { fill.style.width = pct + '%'; }, 100);
      }
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar-wrap').forEach(el => skillObserver.observe(el));

// === CONTACT FORM VALIDATION ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', min: 2, msg: 'Please enter your full name (at least 2 characters).' },
      { id: 'email', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Please enter a valid email address.' },
      { id: 'subject', min: 3, msg: 'Please enter a subject.' },
      { id: 'message', min: 10, msg: 'Message should be at least 10 characters.' },
    ];

    fields.forEach(({ id, min, pattern, msg }) => {
      const group = document.getElementById(id)?.closest('.form-group');
      const val = document.getElementById(id)?.value.trim();
      const errEl = group?.querySelector('.field-error');

      let fail = false;
      if (min && val.length < min) fail = true;
      if (pattern && !pattern.test(val)) fail = true;

      if (fail) {
        group?.classList.add('error');
        if (errEl) errEl.textContent = msg;
        valid = false;
      } else {
        group?.classList.remove('error');
      }
    });

    if (valid) {
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }
  });

  // Live clear errors
  contactForm.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.closest('.form-group')?.classList.remove('error');
    });
  });
}

// === SCROLL INDICATOR FADE ===
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    scrollIndicator.style.opacity = window.scrollY > 80 ? '0' : '1';
  }, { passive: true });
}

// === COUNTER ANIMATION ===
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));
