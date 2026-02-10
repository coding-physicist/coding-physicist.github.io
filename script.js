// ================================
// Modern Portfolio Interactive Features
// ================================

// ======= Custom Cursor =======
const cursor = {
    dot: document.querySelector('[data-cursor-dot]'),
    outline: document.querySelector('[data-cursor-outline]'),

    init() {
        document.addEventListener('mousemove', (e) => {
            this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            this.outline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.outline.style.transform += ' scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                this.outline.style.transform = this.outline.style.transform.replace(' scale(1.5)', '');
            });
        });
    }
};

// Initialize on desktop only
if (window.innerWidth >= 1024) {
    cursor.init();
}

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

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ======= Active Section Highlighting =======
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
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
}

window.addEventListener('scroll', highlightActiveSection);

// ======= Smooth Scrolling =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const targetPosition = target.offsetTop - 80;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ======= Intersection Observer for Animations =======
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
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
    fadeInObserver.observe(el);
});

// ======= Animated Counter for Stats =======
const statValues = document.querySelectorAll('.stat-value[data-target]');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
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

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statValues.forEach(stat => {
    statsObserver.observe(stat);
});

// ======= Skill Bar Animation =======
const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.style.getPropertyValue('--skill-level');
            entry.target.style.width = level;
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    bar.style.width = '0%';
    skillObserver.observe(bar);
});

// ======= Back to Top Button =======
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======= Copy Email to Clipboard =======
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');

        try {
            await navigator.clipboard.writeText(email);
            showNotification('Email copied to clipboard! ✓');
        } catch (err) {
            console.log('Could not copy email');
        }
    });
});

// ======= Notification System =======
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, var(--primary), var(--accent));
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-size: 0.9375rem;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ======= Parallax Effect for Hero Background =======
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            orb.style.transform = `translate(0, ${scrolled * speed}px)`;
        });
    }
});

// ======= Typing Effect for Hero Role =======
function typeEffect(element, text, speed = 100) {
    if (!element) return;

    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = typingElement.textContent;
        setTimeout(() => {
            typeEffect(typingElement, originalText, 80);
        }, 1000);
    }
});

// ======= Project Image Hover Effects =======
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const image = card.querySelector('.project-image');

    if (image) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            image.style.transform = '';
        });
    }
});

// ======= Debounce Function =======
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers for better performance
const debouncedHighlight = debounce(highlightActiveSection, 100);
window.addEventListener('scroll', debouncedHighlight);

// ======= Performance Optimization =======
// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    fadeElements.forEach(el => {
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// ======= Development Helper =======
console.log(`
%c✨ Portfolio Loaded Successfully ✨
%cDesigned for Materials Research Excellence
%c
Made with precision • Built for impact
`,
    'font-size: 20px; font-weight: bold; color: #5B9FF9;',
    'font-size: 14px; color: #9D7CE9;',
    'font-size: 12px; color: #888;'
);

// ======= Initialize Everything on Load =======
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial section highlight
    highlightActiveSection();

    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');

    // Log placeholder count for user reference
    const placeholderCount = document.querySelectorAll('[class*="placeholder"]').length +
        (document.body.innerHTML.match(/\[PLACEHOLDER/g) || []).length;

    if (placeholderCount > 0) {
        console.log(`📝 ${placeholderCount} placeholder(s) found. Update these with your information.`);
    }
});
