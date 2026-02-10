// ================================
// Modern Portfolio Interactive Features
// Light Theme Edition
// ================================

'use strict';

// ======= Navigation =======
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
    });
});

// Navbar scroll effect
const handleNavbarScroll = () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', handleNavbarScroll);

// ======= Active Section Highlighting =======
const sections = document.querySelectorAll('section[id]');

const highlightActiveSection = () => {
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightActiveSection);

// ======= Smooth Scrolling =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const targetPosition = target.offsetTop - 80;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ======= Intersection Observer for Fade-in Animations =======
const createFadeObserver = () => {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);
};

// Initialize fade-in animations
const fadeObserver = createFadeObserver();

const fadeElements = document.querySelectorAll(`
    .about-content,
    .stat-box,
    .timeline-item,
    .research-area,
    .project-card,
    .publication-item,
    .skill-category,
    .contact-card
`);

fadeElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
    fadeObserver.observe(el);
});

// ======= Animated Counter for Stats =======
const animateCounter = (element, target, duration = 2000) => {
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Observe stat values
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            if (!isNaN(target)) {
                animateCounter(entry.target, target);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value[data-target]').forEach(stat => {
    statsObserver.observe(stat);
});

// ======= Skill Bar Animation =======
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.style.getPropertyValue('--skill-level');
            if (level) {
                entry.target.style.width = level;
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = '0%';
    skillObserver.observe(bar);
});

// ======= Back to Top Button =======
const backToTopButton = document.getElementById('back-to-top');

const handleBackToTopVisibility = () => {
    if (window.pageYOffset > 500) {
        backToTopButton?.classList.add('visible');
    } else {
        backToTopButton?.classList.remove('visible');
    }
};

window.addEventListener('scroll', handleBackToTopVisibility);

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======= Email Copy to Clipboard =======
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');

        try {
            await navigator.clipboard.writeText(email);
            showNotification('Email copied to clipboard! ✓');
        } catch (err) {
            console.log('Could not copy email:', err);
        }
    });
});

// ======= Notification System =======
const showNotification = (message) => {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, hsl(220, 75%, 50%), hsl(280, 60%, 55%));
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-size: 0.9375rem;
        font-weight: 600;
        box-shadow: 0 8px 24px hsla(220, 40%, 20%, 0.2);
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    document.body.appendChild(notification);

    // Trigger animation
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// ======= Typing Effect for Hero Role =======
const typeEffect = (element, text, speed = 80) => {
    if (!element) return;

    let i = 0;
    element.textContent = '';

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
};

// ======= Debounce Helper =======
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Apply debouncing to scroll handlers
const debouncedHighlight = debounce(highlightActiveSection, 100);
window.addEventListener('scroll', debouncedHighlight);

// ======= Performance: Reduced Motion Support =======
const respectReducedMotion = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.scrollBehavior = 'auto';

        fadeElements.forEach(el => {
            el.style.transition = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
};

// ======= Initialize on Load =======
document.addEventListener('DOMContentLoaded', () => {
    // Respect user motion preferences
    respectReducedMotion();

    // Initial section highlight
    highlightActiveSection();

    // Typing effect for hero
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = typingElement.textContent;
        setTimeout(() => {
            typeEffect(typingElement, originalText, 80);
        }, 1000);
    }

    // Add loaded class for CSS transitions
    document.body.classList.add('loaded');

    // Log placeholder count for debugging
    const placeholderCount = document.querySelectorAll('[class*="placeholder"]').length +
        (document.body.innerHTML.match(/\[PLACEHOLDER/g) || []).length;

    if (placeholderCount > 0) {
        console.log(`📝 ${placeholderCount} placeholder(s) found. Update with your information.`);
    }

    console.log('%c✨ Portfolio Loaded Successfully', 'color: hsl(220, 75%, 50%); font-size: 16px; font-weight: bold;');
});
