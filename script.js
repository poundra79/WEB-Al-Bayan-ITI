// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

//active nav bar
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('.nav-link');
  let currentId = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentId = section.id;
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentId) {
      link.classList.add('active');
    }
  });
});



// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

//button
document.getElementById('btnKeuangan').addEventListener('click', function() {
    window.location.href = '../included/infaq.html#laporan_keuangan';
});


// Set current date
function setCurrentDate() {
    const currentDate = document.getElementById('currentDate');
    const now = new Date();
    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    const dateString = now.toLocaleDateString('id-ID', options);
    currentDate.textContent = dateString;
}

// Smooth scrolling for navigation links
function smoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
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

// Add scroll effect to header
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(to right, #f97316)';
            header.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'linear-gradient(to right, #f97316)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Animate elements on scroll
function animateOnScroll() {
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
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe prayer cards
    const prayerCards = document.querySelectorAll('.prayer-card');
    prayerCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Update prayer times based on current time
function updatePrayerTimes() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    const prayerTimes = [
        { name: 'Subuh', time: 4 * 60 + 45 }, // 04:45
        { name: 'Dzuhur', time: 12 * 60 + 10 }, // 12:10
        { name: 'Ashar', time: 15 * 60 + 25 }, // 15:25
        { name: 'Maghrib', time: 18 * 60 + 5 }, // 18:05
        { name: 'Isha', time: 19 * 60 + 20 } // 19:20
    ];
    
    const prayerCards = document.querySelectorAll('.prayer-card');
    
    // Remove all active classes first
    prayerCards.forEach(card => {
        card.classList.remove('active');
        const badge = card.querySelector('.next-badge');
        if (badge) {
            badge.remove();
        }
    });
    
    // Find next prayer
    let nextPrayerIndex = -1;
    for (let i = 0; i < prayerTimes.length; i++) {
        if (currentTime < prayerTimes[i].time) {
            nextPrayerIndex = i;
            break;
        }
    }
    
    // If no prayer found for today, next is Subuh tomorrow
    if (nextPrayerIndex === -1) {
        nextPrayerIndex = 0;
    }
    
    // Add active class and badge to next prayer
    if (prayerCards[nextPrayerIndex]) {
        prayerCards[nextPrayerIndex].classList.add('active');
        const badge = document.createElement('span');
        badge.className = 'next-badge';
        badge.textContent = 'Selanjutnya';
        prayerCards[nextPrayerIndex].appendChild(badge);
    }
}

// Add click effects to buttons
function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
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

// Add ripple animation CSS
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    smoothScroll();
    handleHeaderScroll();
    animateOnScroll();
    updatePrayerTimes();
    addButtonEffects();
    addRippleAnimation();
    
    // Update prayer times every minute
    setInterval(updatePrayerTimes, 60000);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 1024) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});