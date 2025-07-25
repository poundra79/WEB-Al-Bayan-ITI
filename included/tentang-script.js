// Tentang Kami page specific JavaScript

// Animate statistics numbers when they come into view
function animateStatNumbers() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.dataset.target);
                animateCounter(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Set up stat counters
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, finalValue) {
    let currentValue = 0;
    const increment = finalValue / 60;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, stepTime);
}

// Add scroll reveal animation for timeline items
function addTimelineAnimation() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(item);
    });
}

// Add hover effects to facility cards
function addFacilityCardEffects() {
    const facilityCards = document.querySelectorAll('.fasilitas-card');
    
    facilityCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.fasilitas-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.fasilitas-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// Add parallax effect to hero section
// function addParallaxEffect() {
//     const heroImage = document.querySelector('.hero-about-image img');
    
//     if (heroImage) {
//         window.addEventListener('scroll', () => {
//             const scrolled = window.pageYOffset;
//             const rate = scrolled * -0.5;
            
//             if (scrolled < window.innerHeight) {
//                 heroImage.style.transform = `translateY(${rate}px)`;
//             }
//         });
//     }
// }

// Add floating animation to pengurus cards
function addPengurusAnimation() {
    const pengurusCards = document.querySelectorAll('.pengurus-card');
    
    pengurusCards.forEach((card, index) => {
        card.style.animation = `float 4s ease-in-out infinite ${index * 0.5}s`;
    });
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-8px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add scroll reveal animation for sections
function addScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all major sections
    const sections = document.querySelectorAll('.hero-about, .sejarah-section, .visi-misi-section, .fasilitas-section, .pengurus-section, .cta-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Add interactive hover effects to visi misi cards
function addVisiMisiEffects() {
    const visiCard = document.querySelector('.visi-card');
    const misiCard = document.querySelector('.misi-card');
    
    [visiCard, misiCard].forEach(card => {
        if (card) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-8px) scale(1)';
            });
        }
    });
}

// Add click effect to pengurus cards
function addPengurusClickEffect() {
    const pengurusCards = document.querySelectorAll('.pengurus-card');
    
    pengurusCards.forEach(card => {
        card.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(249, 115, 22, 0.3)';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add smooth scroll behavior for internal links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateStatNumbers();
    addTimelineAnimation();
    addFacilityCardEffects();
    addParallaxEffect();
    addPengurusAnimation();
    addScrollReveal();
    addVisiMisiEffects();
    addPengurusClickEffect();
    addSmoothScrolling();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add intersection observer for enhanced animations
function addEnhancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add specific animations based on element type
                if (element.classList.contains('fasilitas-card')) {
                    element.style.animation = 'slideInUp 0.8s ease forwards';
                } else if (element.classList.contains('pengurus-card')) {
                    element.style.animation = 'fadeInScale 0.8s ease forwards';
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe cards
    const cards = document.querySelectorAll('.fasilitas-card, .pengurus-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', addEnhancedAnimations);