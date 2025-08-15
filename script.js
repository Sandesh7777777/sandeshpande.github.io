// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Fade-in effect on scroll using Intersection Observer for performance
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});
sections.forEach(section => {
    observer.observe(section);
});

// Dynamic navbar shadow on scroll (debounced for performance)
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;
let ticking = false;
function updateNavbarShadow() {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.style.transition = 'box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)';
        navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    ticking = false;
}
window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(updateNavbarShadow);
        ticking = true;
    }
});
window.addEventListener('load', updateNavbarShadow);

// Hover and focus animation on project cards (accessibility)
document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('tabindex', '0'); // Make focusable
    card.addEventListener('mouseenter', () => {
        card.classList.add('card-hover');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('card-hover');
    });
    card.addEventListener('focus', () => {
        card.classList.add('card-hover');
    });
    card.addEventListener('blur', () => {
        card.classList.remove('card-hover');
    });
});

// Optional: Gentle parallax effect for sections (premium feel)
window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
        const speed = parseFloat(el.dataset.parallaxSpeed) || 0.2;
        el.style.transform = `translateY(${window.scrollY * speed}px)`;
    });
});
