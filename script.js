// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const backToTopBtn = document.getElementById('back-to-top');
const skillLevels = document.querySelectorAll('.skill-level');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const yearEl = document.getElementById('year');

// Set current year
yearEl.textContent = new Date().getFullYear();

// Mobile Menu Toggle
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        nav.classList.add('open');
        document.body.style.overflow = 'hidden';
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
        menuOpen = false;
    }
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
        menuOpen = false;
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
}

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Add shadow to header on scroll
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }
    
    // Animate skill bars when in viewport
    animateOnScroll();
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formDataObj = Object.fromEntries(formData.entries());
    
    // Simulate form submission (replace with actual form submission)
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Reset form after submission
    contactForm.reset();
    
    // For demo purposes, reset the form after 5 seconds
    setTimeout(() => {
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
    }, 5000);
});

// Animate elements when they come into view
function animateOnScroll() {
    // Animate skill bars
    skillLevels.forEach(skill => {
        const skillPosition = skill.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillPosition < screenPosition) {
            const width = skill.getAttribute('style').split(':')[1].trim();
            skill.style.width = width;
        }
    });
}

// Initialize skill bars with 0 width
window.addEventListener('load', () => {
    skillLevels.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = '0%';
        
        // Force reflow
        void skill.offsetWidth;
        
        // Set the width back after a short delay
        setTimeout(() => {
            skill.style.width = width;
        }, 300);
    });
    
    // Initial animation check
    animateOnScroll();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add page loader
document.body.insertAdjacentHTML('afterbegin', `
    <div class="page-loader">
        <div class="loader"></div>
    </div>
    <div class="scroll-indicator"></div>
`);

// Hide loader when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.page-loader').classList.add('fade-out');
    }, 500);
    
    // Initialize animations
    initAnimations();
});

// Scroll indicator
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    document.querySelector('.scroll-indicator').style.width = scrollPercent + '%';
});

// Initialize animations with Intersection Observer
function initAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(el => el.classList.add('animate-fadeInUp'));
    document.querySelectorAll('.about-img').forEach(el => el.classList.add('animate-fadeInLeft'));
    document.querySelectorAll('.about-text').forEach(el => el.classList.add('animate-fadeInRight'));
    document.querySelectorAll('.skill-card').forEach(el => el.classList.add('animate-fadeInUp'));
    document.querySelectorAll('.project-card').forEach(el => el.classList.add('animate-scaleIn'));
    document.querySelectorAll('.contact-info').forEach(el => el.classList.add('animate-fadeInLeft'));
    document.querySelectorAll('.contact-form').forEach(el => el.classList.add('animate-fadeInRight'));
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements
    document.querySelectorAll('.animate-fadeInUp, .animate-fadeInLeft, .animate-fadeInRight, .animate-scaleIn').forEach(el => {
        observer.observe(el);
    });
    
    // Make profile image visible
    setTimeout(() => {
        document.querySelector('.profile-img').style.opacity = '1';
    }, 1000);
}

// Add animated counter for skills
function animateCounter(el, target) {
    let count = 0;
    const speed = 2000 / target; // Adjust speed based on target value
    
    const counter = setInterval(() => {
        count++;
        el.textContent = count + '%';
        
        if (count >= target) {
            clearInterval(counter);
        }
    }, speed);
}

// Animate skill percentages when they come into view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillLevel = entry.target;
            const percentage = parseInt(skillLevel.style.width);
            const percentageSpan = skillLevel.querySelector('span');
            
            animateCounter(percentageSpan, percentage);
            skillObserver.unobserve(skillLevel);
        }
    });
}, { threshold: 0.5 });

// Observe skill levels
document.querySelectorAll('.skill-level').forEach(el => {
    skillObserver.observe(el);
});

// Add hover animation to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('.project-img img');
        img.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.project-img img');
        img.style.transform = 'scale(1)';
    });
});

// Add typing animation to contact form inputs
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.querySelector('label').style.color = 'var(--primary-color)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.querySelector('label').style.color = '';
    });
});

// Add animation to form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate button
    const button = contactForm.querySelector('button');
    button.innerHTML = '<span class="btn-text">Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        contactForm.style.opacity = '0';
        setTimeout(() => {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            formSuccess.style.opacity = '0';
            
            setTimeout(() => {
                formSuccess.style.opacity = '1';
            }, 100);
        }, 300);
    }, 1500);
    
    // Reset form after submission
    contactForm.reset();
    
    // For demo purposes, reset the form after 5 seconds
    setTimeout(() => {
        formSuccess.style.opacity = '0';
        
        setTimeout(() => {
            formSuccess.style.display = 'none';
            contactForm.style.display = 'block';
            
            setTimeout(() => {
                contactForm.style.opacity = '1';
                button.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
                button.disabled = false;
            }, 100);
        }, 300);
    }, 5000);
});