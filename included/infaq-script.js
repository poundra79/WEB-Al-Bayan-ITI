// Infaq page specific JavaScript

// Smooth scrolling for category cards
document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const targetSection = document.getElementById(`infaq-${category}`);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add highlight effect
                targetSection.style.background = 'linear-gradient(135deg, #fef3c7, #fed7aa)';
                setTimeout(() => {
                    targetSection.style.background = '';
                }, 2000);
            }
        });
    });
});

// Animate numbers when they come into view
function animateNumbers() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.dataset.value);
                animateCounter(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Set up counters
    const infaqMasjidAmount = document.getElementById('infaqMasjidAmount');
    const infaqPembangunanAmount = document.getElementById('infaqPembangunanAmount');
    
    if (infaqMasjidAmount) {
        infaqMasjidAmount.dataset.value = '15750000';
        observer.observe(infaqMasjidAmount);
    }
    
    if (infaqPembangunanAmount) {
        infaqPembangunanAmount.dataset.value = '285750000';
        observer.observe(infaqPembangunanAmount);
    }
}

function animateCounter(element, finalValue) {
    let currentValue = 0;
    const increment = finalValue / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
        }
        element.textContent = formatNumber(Math.floor(currentValue));
    }, stepTime);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Add hover effects to payment cards
function addPaymentCardEffects() {
    const paymentCards = document.querySelectorAll('.payment-card');
    
    paymentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-4px) scale(1)';
        });
    });
}

// Add click to copy functionality for account numbers
function addCopyFunctionality() {
    const accountNumbers = document.querySelectorAll('.info-item p');
    
    accountNumbers.forEach(element => {
        const text = element.textContent;
        if (text.includes('No. Rekening:')) {
            element.style.cursor = 'pointer';
            element.title = 'Klik untuk menyalin nomor rekening';
            
            element.addEventListener('click', () => {
                const accountNumber = text.match(/\d+/)[0];
                navigator.clipboard.writeText(accountNumber).then(() => {
                    showCopyNotification('Nomor rekening berhasil disalin!');
                });
            });
        }
    });
}

function showCopyNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Animate progress bar
function animateProgressBar() {
    const progressBar = document.querySelector('.progress-fill');
    if (progressBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressBar.style.width = '57.15%';
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressBar.style.width = '0%';
        observer.observe(progressBar);
    }
}

// Add floating animation to QR codes
function addQRAnimation() {
    const qrCodes = document.querySelectorAll('.qr-placeholder');
    
    qrCodes.forEach((qr, index) => {
        qr.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    animateNumbers();
    addPaymentCardEffects();
    addCopyFunctionality();
    addNotificationStyles();
    animateProgressBar();
    addQRAnimation();
});

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
    const sections = document.querySelectorAll('.infaq-section, .financial-report, .contact-info');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Initialize scroll reveal
document.addEventListener('DOMContentLoaded', addScrollReveal);