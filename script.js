/**
 * Custom JavaScript for 24 Carat Gold Gym
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const toggleIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon based on state
        if (navLinks.classList.contains('active')) {
            toggleIcon.classList.replace('ph-list', 'ph-x');
        } else {
            toggleIcon.classList.replace('ph-x', 'ph-list');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggleIcon.classList.replace('ph-x', 'ph-list');
        });
    });

    // 2. Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15, // trigger when 15% visible
        rootMargin: "0px 0px -50px 0px" // offset to trigger slightly before bottom
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            // Add active class to animate
            entry.target.classList.add('active');
            
            // Stop observing once animated
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Trigger initial reveal for elements in viewport on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // 4. Contact Form Submission (Simulated)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Show loading state
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate API request delay
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                formStatus.textContent = 'Thank you! Your message has been sent successfully. We will contact you soon.';
                formStatus.className = 'form-status success';
                
                // Reset button
                btn.textContent = originalText;
                btn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
});
