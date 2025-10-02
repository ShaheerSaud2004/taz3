// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const statNumbers = document.querySelectorAll('.stat-number');
const heroButtons = document.querySelectorAll('.hero-buttons .btn');

// Formspree Configuration
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkgzkbny';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // initializeEmailJS(); // Commented out for Formspree
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimatedCounters();
    initializeFormValidation();
    initializeScrollAnimations();
    initializeButtonEffects();
    initializeParallaxEffects();
});

// Initialize Formspree (if needed for custom handling)
function initializeFormspree() {
    console.log('Formspree endpoint:', FORMSPREE_ENDPOINT);
}



// Navigation Functionality
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Navbar background opacity
        if (scrolled > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(88, 101, 242, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        // Update active navigation link
        updateActiveNavLink();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Animated Counters
function initializeAnimatedCounters() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format large numbers
        if (target >= 1000) {
            element.textContent = formatNumber(Math.floor(current));
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Form Validation and Submission
function initializeFormValidation() {
    if (!contactForm) return;

    const formFields = contactForm.querySelectorAll('input, select, textarea');
    
    // Real-time validation
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });

        field.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            submitForm();
        } else {
            showFormError('Please correct the errors below.');
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required.';
        isValid = false;
    }

    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
        }
    }

    // Name validation
    if (fieldName === 'name' && value) {
        if (value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long.';
            isValid = false;
        }
    }

    // Company validation
    if (fieldName === 'company' && value) {
        if (value.length < 2) {
            errorMessage = 'Company name must be at least 2 characters long.';
            isValid = false;
        }
    }

    // Message validation
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long.';
            isValid = false;
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    field.style.borderColor = '#7C8AFF';
    field.style.boxShadow = '0 0 10px rgba(124, 138, 255, 0.3)';
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    field.style.borderColor = 'rgba(88, 101, 242, 0.3)';
    field.style.boxShadow = 'none';
}

function showFormError(message) {
    // Create or update form error message
    let errorDiv = contactForm.querySelector('.form-general-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'form-general-error';
        errorDiv.style.cssText = `
            color: #7C8AFF;
            text-align: center;
            margin-bottom: 1rem;
            padding: 0.5rem;
            border: 1px solid #7C8AFF;
            border-radius: 5px;
            background: rgba(124, 138, 255, 0.1);
        `;
        contactForm.insertBefore(errorDiv, contactForm.firstChild);
    }
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function submitForm() {
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value,
        to_email: 'Tinkerllcnj@gmail.com'
    };

    // Send form using Formspree
    fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            console.log('SUCCESS! Form submitted');
            showSuccessMessage();
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.log('FAILED...', error);
        showFormError('Failed to send message. Please try again or contact us directly.');
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
    });
}

function showSuccessMessage() {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        color: #4ade80;
        text-align: center;
        margin-bottom: 1rem;
        padding: 1rem;
        border: 1px solid #4ade80;
        border-radius: 10px;
        background: rgba(74, 222, 128, 0.1);
        font-weight: 500;
    `;
    successDiv.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">✓</div>
        Thank you for your message! We'll get back to you within 24 hours.
    `;
    
    contactForm.insertBefore(successDiv, contactForm.firstChild);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 10000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .service-card, .portfolio-card, .stat-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                
                // Add stagger effect for cards in the same section
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Button Effects
function initializeButtonEffects() {
    // Hero buttons click handlers
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText === 'Make your logo into an air freshener now') {
                // Scroll to contact section
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            } else if (buttonText === 'View Portfolio') {
                // Scroll to portfolio section
                const portfolioSection = document.querySelector('#portfolio');
                if (portfolioSection) {
                    const offsetTop = portfolioSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Portfolio case study buttons
    const caseStudyButtons = document.querySelectorAll('.view-case-study');
    caseStudyButtons.forEach(button => {
        button.addEventListener('click', function() {
            showCaseStudyModal(this);
        });
    });

    // Add ripple effect to all buttons
    const allButtons = document.querySelectorAll('.btn, .view-case-study');
    allButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

function createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    `;

    // Add ripple animation keyframes if not already added
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showCaseStudyModal(button) {
    const card = button.closest('.portfolio-card');
    const title = card.querySelector('h3').textContent;
    const description = card.querySelector('p').textContent;

    // Create modal (simplified version - you might want to use a proper modal library)
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: rgba(42, 42, 42, 0.9);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(88, 101, 242, 0.3);
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        margin: 1rem;
        color: white;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    modalContent.innerHTML = `
        <h3 style="color: #5865F2; margin-bottom: 1rem; font-size: 1.5rem;">${title}</h3>
        <p style="line-height: 1.6; margin-bottom: 1.5rem; color: rgba(255, 255, 255, 0.8);">${description}</p>
        <p style="margin-bottom: 1.5rem; color: rgba(255, 255, 255, 0.6);">This is a preview of the case study. In a real implementation, this would show detailed project information, results, and images.</p>
        <button onclick="this.closest('.modal').remove()" style="
            background: linear-gradient(135deg, #5865F2, #7C8AFF);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: transform 0.2s ease;
        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Close</button>
    `;

    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Parallax Effects
function initializeParallaxEffects() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// Utility Functions
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

// Add smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = document.createElement('script');
    smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@1.4.10/dist/smoothscroll.min.js';
    document.head.appendChild(smoothScrollPolyfill);
}

// Performance optimization: Use passive event listeners where appropriate
const addPassiveEventListener = (element, event, handler) => {
    element.addEventListener(event, handler, { passive: true });
};

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Optimize scroll listeners
    const optimizedScrollHandler = debounce(function() {
        // Scroll-dependent operations here
    }, 16); // ~60fps

    addPassiveEventListener(window, 'scroll', optimizedScrollHandler);

    // Optimize resize listeners
    const optimizedResizeHandler = debounce(function() {
        // Resize-dependent operations here
    }, 250);

    window.addEventListener('resize', optimizedResizeHandler);
});

// Console welcome message
console.log(`
🎨 tINKer Website
Built with modern web technologies
- Responsive Design ✓
- Dark Theme ✓  
- Smooth Animations ✓
- Mobile Optimized ✓

For support: hello@tinker.com
`); 