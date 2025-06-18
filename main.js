// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 120, // Adjusted for new header height
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
const mainHeader = document.querySelector('.main-header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        mainHeader.style.padding = '10px 0';
        if (window.innerWidth > 768) {
            header.querySelector('.top-header').style.display = 'none';
        }
    } else {
        mainHeader.style.padding = '15px 0';
        if (window.innerWidth > 768) {
            header.querySelector('.top-header').style.display = 'block';
        }
    }

    lastScrollTop = scrollTop;
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
let counterObserver;

if ('IntersectionObserver' in window) {
    counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // Animation duration in milliseconds
                const step = Math.ceil(target / (duration / 20)); // Update every 20ms

                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = current;
                    }
                }, 20);

                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Form Submission
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const roomType = document.getElementById('roomType').value;
        const checkIn = document.getElementById('checkIn').value;
        const checkOut = document.getElementById('checkOut').value;
        const message = document.getElementById('message').value;

        // In a real application, you would send this data to a server
        // For this demo, we'll just show an alert
        alert(`Thank you for your booking request, ${name}!\n\nWe have received your request for a ${getRoomTypeName(roomType)} from ${formatDate(checkIn)} to ${formatDate(checkOut)}.\n\nWe will contact you shortly at ${email} or ${phone} to confirm your reservation.`);

        // Reset the form
        bookingForm.reset();
    });
}

// Helper function to get room type name
function getRoomTypeName(roomType) {
    switch (roomType) {
        case 'cozy':
            return 'Cozy Haven Room';
        case 'spacious':
            return 'Spacious Serenity Suite';
        case 'presidential':
            return 'Presidential Suite';
        default:
            return 'Room';
    }
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Set minimum date for check-in and check-out
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');

if (checkInInput && checkOutInput) {
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;

    // Update check-out min date when check-in changes
    checkInInput.addEventListener('change', function () {
        checkOutInput.min = this.value;

        // If check-out date is before check-in date, reset it
        if (checkOutInput.value && checkOutInput.value < this.value) {
            checkOutInput.value = this.value;
        }
    });
}

// Add this function at the end of the file
function openWhatsApp() {
    // The phone number to contact
    const phoneNumber = "+919007062180";

    // Optional: Create a default message
    const message = "Hello, I would like to book a room at Kingsukh Guest House.";

    // Create the WhatsApp URL with the phone number and encoded message
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');

    // Prevent default link behavior
    return false;
}

// Find all book now buttons and add the WhatsApp functionality
document.addEventListener('DOMContentLoaded', function () {
    // Get all "Book Now" buttons
    const bookButtons = document.querySelectorAll('.book-now-btn .btn, .room-details .btn');

    // Add click event listener to each button
    bookButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior
            openWhatsApp(); // Open WhatsApp
        });
    });
});