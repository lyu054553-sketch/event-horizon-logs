// THE EVENT HORIZON LOGS — Home Page Dynamic Effects
(function () {
  'use strict';

  // ── Star Particle Canvas ──
  function initStarfield() {
    const canvas = document.createElement('canvas');
    canvas.className = 'star-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:-3;pointer-events:none;';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let w, h, stars;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createStars(count) {
      return Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.0008 + 0.0003,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(time) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const twinkle = Math.sin(time * s.speed * 1000 + s.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199,211,224,${s.alpha * twinkle})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }

    resize();
    stars = createStars(Math.min(180, Math.floor(w * h / 6000)));
    window.addEventListener('resize', () => { resize(); stars = createStars(180); });
    requestAnimationFrame(draw);
  }

  // ── Identity Reveal Sequence ──
  function initIdentityReveal() {
    const bootLines = document.querySelectorAll('.identity-boot .boot-line');
    const nameEn = document.querySelector('.identity-name .name-en');
    const nameZh = document.querySelector('.identity-name .name-zh');
    const roleLine = document.querySelector('.identity-role .role-line');
    const tags = document.querySelector('.identity-tags');
    const siteTitle = document.querySelector('.home-title');

    if (!nameEn) return;

    // Set data-text for glitch effect
    nameEn.setAttribute('data-text', nameEn.textContent);

    // Boot sequence: show lines one by one
    bootLines.forEach((line, i) => {
      const delay = parseInt(line.dataset.delay) || i * 600;
      setTimeout(() => line.classList.add('visible'), delay + 300);
    });

    // After boot, reveal name
    const bootEnd = bootLines.length * 600 + 800;
    setTimeout(() => {
      nameEn.classList.add('revealed');
      nameEn.classList.add('glitch');
    }, bootEnd);

    // Then Chinese name
    setTimeout(() => {
      nameZh.classList.add('revealed');
    }, bootEnd + 500);

    // Then role
    setTimeout(() => {
      if (roleLine) roleLine.classList.add('revealed');
    }, bootEnd + 900);

    // Then tags
    setTimeout(() => {
      if (tags) tags.classList.add('revealed');
    }, bootEnd + 1200);

    // Then fade out boot sequence
    setTimeout(() => {
      const boot = document.querySelector('.identity-boot');
      if (boot) {
        boot.style.transition = 'opacity 1s ease';
        boot.style.opacity = '0';
        setTimeout(() => { boot.style.display = 'none'; }, 1000);
      }
    }, bootEnd + 2500);

    // Site title glitch
    if (siteTitle) {
      siteTitle.setAttribute('data-text', siteTitle.textContent);
      siteTitle.classList.add('glitch');
    }
  }

  // ── Terminal Card Auto-Type ──
  function initTerminalTyping() {
    const card = document.querySelector('.terminal-card');
    if (!card) return;

    const lines = card.querySelectorAll('.term-line');
    lines.forEach(l => { l.style.opacity = '0'; l.style.transform = 'translateY(4px)'; });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lines.forEach((line, idx) => {
            setTimeout(() => {
              line.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              line.style.opacity = '1';
              line.style.transform = 'translateY(0)';
            }, idx * 300 + 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(card);
  }

  // ── Mouse Parallax on Hero ──
  function initParallax() {
    const heroBg = document.querySelector('.home-hero-bg');
    const heroOverlay = document.querySelector('.home-hero-overlay');
    if (!heroBg) return;

    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
      cx += (mx - cx) * 0.04;
      cy += (my - cy) * 0.04;
      heroBg.style.transform = `translate(${cx * -8}px, ${cy * -6}px) scale(1.05)`;
      if (heroOverlay) {
        heroOverlay.style.transform = `translate(${cx * -3}px, ${cy * -2}px)`;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ── Staggered Card Entrance ──
  function initCardEntrance() {
    const cards = document.querySelectorAll('.home-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.97)';
      card.style.transition = `opacity 0.7s ease ${i * 0.15 + 0.3}s, transform 0.7s ease ${i * 0.15 + 0.3}s`;
    });

    setTimeout(() => {
      cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      });
    }, 100);
  }

  // ── Floating Particles (CSS) ──
  function initFloatingDust() {
    const container = document.querySelector('.home-hero');
    if (!container) return;

    for (let i = 0; i < 12; i++) {
      const dust = document.createElement('div');
      dust.className = 'dust-particle';
      const size = Math.random() * 2 + 1;
      const x = Math.random() * 100;
      const dur = Math.random() * 15 + 12;
      const delay = Math.random() * -20;
      const drift = Math.random() * 40 - 20;
      dust.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        background:rgba(199,211,224,${Math.random() * 0.15 + 0.05});
        border-radius:50%;
        left:${x}%;bottom:-5%;
        pointer-events:none;z-index:4;
        animation:dustFloat ${dur}s ${delay}s infinite linear;
        --drift:${drift}px;
      `;
      container.appendChild(dust);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes dustFloat {
        0% { transform: translate(0, 0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translate(var(--drift), -110vh); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── Nav Hover Glow Line ──
  function initNavGlow() {
    const nav = document.querySelector('.home-nav');
    if (!nav) return;

    const glow = document.createElement('div');
    glow.className = 'nav-glow-line';
    glow.style.cssText = `
      position:absolute;bottom:0;left:0;
      height:1px;width:0;
      background:linear-gradient(90deg,transparent,var(--accent),transparent);
      transition:all 0.35s ease;
      pointer-events:none;opacity:0;
    `;
    nav.style.position = 'relative';
    nav.appendChild(glow);

    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('mouseenter', () => {
        const r = a.getBoundingClientRect();
        const nr = nav.getBoundingClientRect();
        glow.style.left = (r.left - nr.left) + 'px';
        glow.style.width = r.width + 'px';
        glow.style.opacity = '0.7';
      });
      a.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
      });
    });
  }

  // ── Card Tilt on Hover ──
  function initCardTilt() {
    document.querySelectorAll('.home-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-4px) perspective(600px) rotateY(${x * 6}deg) rotateX(${y * -4}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.5s ease';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
    });
  }

  // ── Sync glitch data-text on language change ──
  document.addEventListener('langchange', () => {
    const title = document.querySelector('.home-title');
    if (title) title.setAttribute('data-text', title.textContent);
    const nameEn = document.querySelector('.identity-name .name-en');
    if (nameEn) nameEn.setAttribute('data-text', nameEn.textContent);
  });

  // ── Init All ──
  document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initIdentityReveal();
    initTerminalTyping();
    initParallax();
    initCardEntrance();
    initFloatingDust();
    initNavGlow();
    initCardTilt();
  });
})();
