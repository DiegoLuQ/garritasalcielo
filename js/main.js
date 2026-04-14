document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll Animations (Intersection Observer)
    const fadeElems = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElems.forEach(el => observer.observe(el));

    // Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (mobileMenu) mobileMenu.classList.add('hidden');
            }
        });
    });

    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg');
            header.classList.add('py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('shadow-lg');
            header.classList.add('py-4');
            header.classList.remove('py-2');
        }
    });

    // WhatsApp Click Handler (Optional extra logging or tracking)
    const waButtons = document.querySelectorAll('.wa-btn');
    waButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('WhatsApp contact initiated');
        });
    });
});
