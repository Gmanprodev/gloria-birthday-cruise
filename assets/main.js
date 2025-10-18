// Burger Menu Toggle
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });
}

// Countdown Timer Function
function updateCountdown(targetDate, elementId) {
    const countdownElement = document.getElementById(elementId);
    
    if (!countdownElement) return;

    const daysEl = countdownElement.querySelector('#days') || countdownElement.querySelector('[data-days]');
    const hoursEl = countdownElement.querySelector('#hours') || countdownElement.querySelector('[data-hours]');
    const minutesEl = countdownElement.querySelector('#minutes') || countdownElement.querySelector('[data-minutes]');
    const secondsEl = countdownElement.querySelector('#seconds') || countdownElement.querySelector('[data-seconds]');

    function update() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            if (daysEl) daysEl.textContent = '0';
            if (hoursEl) hoursEl.textContent = '0';
            if (minutesEl) minutesEl.textContent = '0';
            if (secondsEl) secondsEl.textContent = '0';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }

    update();
    setInterval(update, 1000);
}

// Initialize countdowns based on page
const departureDate = new Date('March 5, 2026 00:00:00').getTime();
const paymentDate = new Date('November 11, 2025 00:00:00').getTime();
const meetingDate = new Date('February 20, 2026 00:00:00').getTime();

// Main departure countdown (homepage)
if (document.getElementById('departureCountdown')) {
    updateCountdown(departureDate, 'departureCountdown');
}

// Multiple countdowns (countdown page)
if (document.getElementById('paymentCountdown')) {
    updateCountdown(paymentDate, 'paymentCountdown');
}
if (document.getElementById('meetingCountdown')) {
    updateCountdown(meetingDate, 'meetingCountdown');
}
if (document.getElementById('departureCountdown2')) {
    updateCountdown(departureDate, 'departureCountdown2');
}

// Scroll Animation for Itinerary Items
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all itinerary items
document.querySelectorAll('.itinerary-item').forEach(item => {
    observer.observe(item);
});

// Observe reminder items if they exist
document.querySelectorAll('.reminder-item').forEach(item => {
    observer.observe(item);
});