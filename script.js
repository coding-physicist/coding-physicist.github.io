/* ============================================
   Thibaut.cool-style Portfolio JS
   Minimal — only what's needed
   ============================================ */

'use strict';

// ---- Nav scroll effect ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ---- Reveal on scroll ----
const revealElements = () => {
    document.querySelectorAll('.section-label, .work-card, .about-text, .about-stats, .about-skills, .contact, .stat').forEach(el => {
        el.classList.add('reveal');
    });

    document.querySelectorAll('.works-grid, .about-skills, .contact-socials').forEach(el => {
        el.classList.add('reveal-stagger');
    });
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements();
document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));

// ---- Animated counters ----
const animateValue = (el, target, duration = 1200) => {
    const start = performance.now();
    const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(tick);
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

document.querySelectorAll('.stat-value[data-target]').forEach(el => counterObserver.observe(el));

// ---- Copy email ----
const emailBtn = document.getElementById('copy-email');
if (emailBtn) {
    emailBtn.addEventListener('click', () => {
        const email = emailBtn.dataset.email;
        navigator.clipboard.writeText(email).then(() => {
            emailBtn.classList.add('copied');
            setTimeout(() => emailBtn.classList.remove('copied'), 2000);
        });
    });
}
