document.addEventListener('DOMContentLoaded', () => {
  initDots();
  initAnimations();
  initMobileMenu();
});

/* Create dots: 85% fewer, random positions, animated */
let dotsResizeHandler = null;
function initDots() {
  const container = document.getElementById('dots-container');
  if (!container) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Original grid would have ~(vw/20)*(vh/20) dots. 15% of that.
  const origCount = Math.floor((vw / 20) * (vh / 20));
  const dotCount = Math.max(12, Math.floor(origCount * 0.15));

  container.innerHTML = '';
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'floating-dot';
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 100 + '%';
    dot.style.animationDelay = Math.random() * 3 + 's';
    dot.style.animationDuration = (3 + Math.random() * 3) + 's';
    container.appendChild(dot);
  }

  if (!dotsResizeHandler) {
    let resizeTimer;
    dotsResizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initDots, 200);
    };
    window.addEventListener('resize', dotsResizeHandler);
  }
}

function animateEl(el, keyframes, options) {
  return el.animate(keyframes, {
    duration: (options.duration || 0.5) * 1000,
    delay: (options.delay || 0) * 1000,
    fill: 'forwards',
    easing: options.easing || 'ease-out'
  });
}

function initAnimations() {
  // Letter-by-letter animation for hero name + continuous float
  const heroLetters = document.querySelectorAll('#home .hero-name .letter');
  heroLetters.forEach((letter, i) => {
    if (letter.textContent.trim() === '') return;
    letter.style.opacity = '0';
    letter.style.display = 'inline-block';
    
    const fadeIn = animateEl(letter, [
      { opacity: 0, transform: 'translateY(15px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 0.5, delay: 0.5 + i * 0.05, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

    fadeIn.finished.then(() => {
      letter.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(-6px)' },
        { transform: 'translateY(0)' }
      ], {
        duration: (2.2 + (i % 3) * 0.4) * 1000,
        iterations: Infinity,
        easing: 'ease-in-out'
      });
    });
  });

  // Letter-by-letter for "Let's Connect"
  const contactLetters = document.querySelectorAll('#contact .contact-title .letter');
  contactLetters.forEach((letter, i) => {
    letter.style.opacity = '0';
    letter.style.display = 'inline-block';
    
    const fadeIn = animateEl(letter, [
      { opacity: 0, transform: 'translateY(12px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 0.4, delay: 0.2 + i * 0.04, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });

    fadeIn.finished.then(() => {
      letter.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(-3px)' },
        { transform: 'translateY(0)' }
      ], {
        duration: (2.5 + (i % 4) * 0.3) * 1000,
        iterations: Infinity,
        easing: 'ease-in-out'
      });
    });
  });

  // Fade-in for home section elements
  document.querySelectorAll('.fade-in').forEach((el) => {
    const delay = el.classList.contains('delay-2') ? 0.8 : 
      el.classList.contains('delay-3') ? 1 : 
      el.classList.contains('delay-4') ? 1.2 : 0.6;
    animateEl(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 0.6, delay });
  });

  // Progressive scroll: hero translates down (capped at hr), shrinks and fades
  const heroContent = document.querySelector('.hero-content');
  const firstSection = document.getElementById('home');
  const scrollRange = window.innerHeight * 0.8;
  const maxTranslateDown = window.innerHeight * 0.35; // Cap so hero never passes hr

  function updateHeroScroll() {
    if (!heroContent || !firstSection) return;
    const scrollY = window.scrollY;
    const progress = Math.min(1, Math.max(0, scrollY / scrollRange));
    // Translate down (positive Y) but capped - never passes hr
    const translateY = Math.min(progress * maxTranslateDown, maxTranslateDown);
    heroContent.style.opacity = String(1 - progress * 0.75);
    heroContent.style.transform = `translateY(${translateY}px) scale(${1 - progress * 0.45})`;
    firstSection.style.opacity = String(1 - progress);
  }

  updateHeroScroll();
  window.addEventListener('scroll', updateHeroScroll, { passive: true });

  // Section fade-in on scroll + staggered card animations
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';

        // Section wrapper fade-in
        section.animate([
          { opacity: 0, transform: 'translateY(30px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 700,
          fill: 'forwards',
          easing
        });
        section.classList.add('visible');

        // Staggered animations per section
        if (section.id === 'about') {
          initAboutStagger(section, easing);
        } else if (section.id === 'ai') {
          initStaggerCards(section.querySelectorAll('.ai-card'), 150, 25, easing);
        } else if (section.id === 'projects') {
          initStaggerCards(section.querySelectorAll('.project-card'), 120, 25, easing);
        }

        sectionObserver.unobserve(section);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.section-fade').forEach(el => sectionObserver.observe(el));
}

function initStaggerCards(cards, delayMs, translateY, easing) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 0.01 : 0.5;
  const staggerDelay = reducedMotion ? 0 : delayMs / 1000;
  cards.forEach((card, i) => {
    animateEl(card, [
      { opacity: 0, transform: `translateY(${translateY}px)` },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration, delay: i * staggerDelay, easing }).finished.then(() => {
      card.classList.add('staggered-visible');
    });
  });
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initAboutStagger(section, easing) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 0.01 : 0.5;
  const headingStagger = reducedMotion ? 0 : 0.08;
  const cardStagger = reducedMotion ? 0 : 0.1;
  const baseDelay = reducedMotion ? 0 : 0.25;

  // Heading: h2 first, then lines (staggered fade + scale)
  const headingWrapper = section.querySelector('.about-heading');
  if (headingWrapper) {
    const h2 = headingWrapper.querySelector('h2');
    const lines = headingWrapper.querySelectorAll('.section-heading-part:not(h2)');
    const headingOrder = [h2, ...lines].filter(Boolean);
    headingOrder.forEach((el, i) => {
      if (!el) return;
      animateEl(el, [
        { opacity: 0, transform: 'scale(0.95)' },
        { opacity: 1, transform: 'scale(1)' }
      ], { duration, delay: i * headingStagger, easing }).finished.then(() => {
        el.classList.add('staggered-visible');
      });
    });
  }

  // Stat cards: 100ms delay between each
  const statCards = section.querySelectorAll('.stat-card.stagger-card');
  statCards.forEach((card, i) => {
    animateEl(card, [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration, delay: baseDelay + i * cardStagger, easing }).finished.then(() => {
      card.classList.add('staggered-visible');
    });
  });

  // Tech cards: after stat cards, 100ms between each
  const techCards = section.querySelectorAll('.tech-card.stagger-card');
  techCards.forEach((card, i) => {
    const techBaseDelay = baseDelay + statCards.length * cardStagger + (reducedMotion ? 0 : 0.1);
    animateEl(card, [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration, delay: techBaseDelay + i * cardStagger, easing }).finished.then(() => {
      card.classList.add('staggered-visible');
    });
  });
}
