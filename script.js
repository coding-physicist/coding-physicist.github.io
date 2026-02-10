/* ============================================
   Portfolio — Minimal Interactive Features
   ============================================ */

'use strict';

// ---- Mouse spotlight effect ----
document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
});

// ---- Active section highlighting ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

const setActiveSection = () => {
    const scrollY = window.scrollY + 200;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', setActiveSection, { passive: true });

// ---- Smooth scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---- Animated counters ----
const animateValue = (el, target, duration = 1500) => {
    const start = performance.now();

    const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            if (!isNaN(target)) animateValue(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat__value[data-target]').forEach(el => {
    counterObserver.observe(el);
});

// ---- Fade in on scroll ----
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.section').forEach(el => {
    el.classList.add('fade-target');
    fadeObserver.observe(el);
});

// Add fade styles dynamically
const style = document.createElement('style');
style.textContent = `
  .fade-target {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-target.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// ---- Reduced motion support ----
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.fade-target').forEach(el => {
        el.classList.remove('fade-target');
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// ---- Initial state ----
setActiveSection();

console.log('%c✨ Portfolio loaded', 'color: #2dd4bf; font-weight: bold;');
