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

    // WhatsApp Click Handler
    const waButtons = document.querySelectorAll('.wa-btn');
    waButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('WhatsApp contact initiated');
        });
    });

    // --- Walking Paws Scroll Animation ---
    const pawsContainer = document.getElementById('paws-container');
    let lastPawScroll = 0;
    const pawThreshold = 140; // Distance between steps
    let pawGaitSide = 'left';

    if (pawsContainer) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            const scrollDelta = currentScroll - lastPawScroll;
            
            // Only spawn when scrolling down
            if (scrollDelta > pawThreshold) {
                spawnRealisticGait(currentScroll);
                lastPawScroll = currentScroll;
            }
        });
    }

    function createPawUnit(x, y, footClass, isFront) {
        const paw = document.createElement('img');
        paw.src = 'img/garrita.webp';
        paw.className = `paw-print ${footClass}`;
        
        // Front paws are slightly larger than hind paws
        const size = isFront ? 38 : 32;
        paw.style.width = `${size}px`;
        
        paw.style.left = `${x}px`;
        paw.style.top = `${y}px`;
        
        pawsContainer.appendChild(paw);
        
        // Trigger fade in
        setTimeout(() => paw.classList.add('visible'), 10);
        
        // Cleanup after fade out
        setTimeout(() => {
            paw.style.opacity = '0';
            setTimeout(() => paw.remove(), 1000);
        }, 4000);
    }

    function spawnRealisticGait(currentScroll) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Side placement (right side)
        const sideMargin = viewportWidth > 768 ? 100 : 40;
        const xBase = viewportWidth - sideMargin;
        const spawnY = currentScroll + viewportHeight - 80;

        if (pawGaitSide === 'left') {
            // Sequence for Left side: Front then Hind
            createPawUnit(xBase - 30, spawnY, 'paw-left-foot', true);
            setTimeout(() => {
                createPawUnit(xBase - 28, spawnY + 25, 'paw-left-foot', false);
            }, 120);
            pawGaitSide = 'right';
        } else {
            // Sequence for Right side: Front then Hind
            createPawUnit(xBase + 10, spawnY, 'paw-right-foot', true);
            setTimeout(() => {
                createPawUnit(xBase + 12, spawnY + 25, 'paw-right-foot', false);
            }, 120);
            pawGaitSide = 'left';
        }
    }
});
