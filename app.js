// ========================================
// SANGALO REPAIR - INTERACTIVE FEATURES
// ========================================

// Configuration
const WHATSAPP_NUMBER = '254794216336'; // WhatsApp number in international format (Kenya)

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const orderModal = document.getElementById('orderModal');
const modalClose = document.getElementById('modalClose');
const orderForm = document.getElementById('orderForm');

// Order buttons
const orderBtnsNav = document.getElementById('orderBtnNav');
const orderBtnHero = document.getElementById('orderBtnHero');
const serviceOrderBtns = document.querySelectorAll('[data-service]');

// ========================================
// MOBILE MENU TOGGLE
// ========================================

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenuBtn.textContent = isOpen ? '✕' : '☰';
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    });
});

// ========================================
// MODAL FUNCTIONALITY
// ========================================

function openModal(serviceType = '') {
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Pre-select service if provided
    if (serviceType) {
        const serviceSelect = document.getElementById('serviceType');
        const serviceMap = {
            'repair': 'Screen Repair',
            'accessories': 'Phone Case',
            'software': 'Software Service'
        };

        if (serviceMap[serviceType]) {
            serviceSelect.value = serviceMap[serviceType];
        }
    }
}

function closeModal() {
    orderModal.classList.remove('active');
    document.body.style.overflow = '';
    orderForm.reset();
}

// Event listeners for opening modal
orderBtnsNav.addEventListener('click', () => openModal());
orderBtnHero.addEventListener('click', () => openModal());

serviceOrderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const serviceType = e.target.getAttribute('data-service');
        openModal(serviceType);
    });
});

// Event listeners for closing modal
modalClose.addEventListener('click', closeModal);

orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal.classList.contains('active')) {
        closeModal();
    }
});

// ========================================
// FORM SUBMISSION & WHATSAPP INTEGRATION
// ========================================

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById('customerName').value.trim(),
        phone: document.getElementById('phoneNumber').value.trim(),
        service: document.getElementById('serviceType').value,
        device: document.getElementById('deviceModel').value.trim(),
        info: document.getElementById('additionalInfo').value.trim()
    };

    // Validate required fields
    if (!formData.name || !formData.phone || !formData.service) {
        alert('Please fill in all required fields');
        return;
    }

    // Create WhatsApp message
    let message = `🛠️ *New Order from Sangalo Repair Website*\n\n`;
    message += `👤 *Name:* ${formData.name}\n`;
    message += `📱 *Phone:* ${formData.phone}\n`;
    message += `🔧 *Service:* ${formData.service}\n`;

    if (formData.device) {
        message += `📲 *Device:* ${formData.device}\n`;
    }

    if (formData.info) {
        message += `\n💬 *Additional Info:*\n${formData.info}`;
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');

    // Close modal and reset form
    setTimeout(() => {
        closeModal();
    }, 500);
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 0) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ========================================
// INITIALIZATION
// ========================================

// Trigger animations for elements already in view
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

console.log('🚀 Sangalo Repair - Website Loaded Successfully!');
