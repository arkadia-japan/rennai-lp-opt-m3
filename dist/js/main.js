// ========================================
// Tracking & Analytics
// ========================================

/**
 * Initialize tracking tags (Google Analytics & Meta Pixel)
 */
function initializeTracking() {
    const gtmId = document.body.getAttribute('data-gtm-id');
    const fbPixelId = document.body.getAttribute('data-fb-pixel-id');

    // Initialize Google Analytics
    if (gtmId && gtmId !== 'GTM-XXXXXXX') {
        gtag('config', gtmId);
    }

    // Initialize Meta Pixel
    if (fbPixelId && fbPixelId !== 'XXXXXXXXXX') {
        fbq('init', fbPixelId);
        fbq('track', 'PageView');
    }
}

/**
 * Track custom events
 */
function trackEvent(eventName, eventData = {}) {
    // Google Analytics Event
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Meta Pixel Event
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }

    console.log('Event tracked:', eventName, eventData);
}

// ========================================
// URL Parameters
// ========================================

/**
 * Get URL parameters for hidden form fields
 */
function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const hiddenFields = ['campaign_id', 'ad_set', 'gclid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign'];
    const result = {};

    hiddenFields.forEach(field => {
        const value = params.get(field);
        if (value) {
            result[field] = value;
        }
    });

    return result;
}

// ========================================
// Form Validation
// ========================================

/**
 * Email validation using RFC-compliant regex
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display error message
 */
function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);

    if (errorElement) {
        errorElement.textContent = message;
    }
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

/**
 * Clear error message
 */
function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const inputElement = document.getElementById(fieldId);

    if (errorElement) {
        errorElement.textContent = '';
    }
    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

/**
 * Clear all errors
 */
function clearAllErrors() {
    ['email', 'consent'].forEach(clearError);
}

// ========================================
// Form Submission
// ========================================

let isSubmitting = false;

/**
 * Handle form submission
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    // Prevent double submission
    if (isSubmitting) {
        return;
    }

    clearAllErrors();

    const form = event.target;
    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const consent = document.getElementById('consent').checked;
    const submitButton = document.getElementById('submit-button');

    // Validation
    let hasError = false;

    if (!email) {
        showError('email', 'メールアドレスを入力してください');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError('email', '有効なメールアドレスを入力してください');
        hasError = true;
    }

    if (!consent) {
        showError('consent', 'プライバシーポリシーに同意してください');
        hasError = true;
    }

    if (hasError) {
        return;
    }

    // Prepare form data
    const formData = {
        email,
        name: name || '',
        ...getUrlParameters(),
        timestamp: new Date().toISOString()
    };

    // Update button state
    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    const originalText = submitButton.textContent;
    submitButton.textContent = '送信中...';

    try {
        // Track form submission event
        trackEvent('FormSubmit', {
            event_category: 'engagement',
            event_label: 'newsletter_signup'
        });

        // Submit to API
        const response = await fetch('https://example.com/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Submission failed');
        }

        // Track conversion
        trackEvent('Conversion', {
            event_category: 'conversion',
            event_label: 'newsletter_signup_success',
            value: 1
        });

        // Redirect to thank you page
        window.location.href = '/thanks.html';

    } catch (error) {
        console.error('Form submission error:', error);

        // Show error message
        showError('email', 'エラーが発生しました。しばらくしてからもう一度お試しください。');

        // Track error
        trackEvent('FormError', {
            event_category: 'error',
            event_label: 'newsletter_signup_error'
        });

        // Reset button state
        isSubmitting = false;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
    }
}

// ========================================
// CTA Button Tracking
// ========================================

/**
 * Track CTA button clicks
 */
function trackCtaClick(event) {
    const button = event.currentTarget;
    const location = button.getAttribute('data-location') || 'unknown';

    trackEvent('CTAClick', {
        event_category: 'engagement',
        event_label: `cta_${location}`
    });
}

// ========================================
// Fixed Footer
// ========================================

/**
 * Show/hide fixed footer on scroll
 */
function handleFixedFooter() {
    const fixedFooter = document.getElementById('fixed-footer');
    const formSection = document.getElementById('form');

    if (!fixedFooter || !formSection) return;

    const formSectionTop = formSection.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition < formSectionTop) {
        fixedFooter.classList.add('visible');
    } else {
        fixedFooter.classList.remove('visible');
    }
}

// ========================================
// Countdown Timer
// ========================================

/**
 * Initialize countdown timer
 */
function initializeCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (!hoursElement || !minutesElement || !secondsElement) return;

    // Set countdown end time (24 hours from now)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ========================================
// Smooth Scroll
// ========================================

/**
 * Handle smooth scroll to anchor links
 */
function handleSmoothScroll(event) {
    const href = event.currentTarget.getAttribute('href');

    if (href && href.startsWith('#')) {
        event.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// ========================================
// Initialize
// ========================================

/**
 * Initialize all functionality when DOM is ready
 */
function initialize() {
    // Initialize tracking
    initializeTracking();

    // Form submission
    const form = document.getElementById('subscription-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Clear errors on input
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('input', () => clearError('email'));
    }

    const consentCheckbox = document.getElementById('consent');
    if (consentCheckbox) {
        consentCheckbox.addEventListener('change', () => clearError('consent'));
    }

    // CTA button tracking
    const ctaButtons = document.querySelectorAll('[data-event="cta-click"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', trackCtaClick);
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // Fixed footer scroll behavior
    window.addEventListener('scroll', handleFixedFooter);
    handleFixedFooter(); // Check initial state

    // Initialize countdown timer
    initializeCountdown();

    // Track page load
    trackEvent('PageLoad', {
        event_category: 'engagement',
        event_label: 'landing_page_view'
    });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}