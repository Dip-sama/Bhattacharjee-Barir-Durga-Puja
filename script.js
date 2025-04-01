// Original DOM Elements code retained
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const visitorForm = document.getElementById('visitorForm');

// ============= COPY PROTECTION CODE START =============
// Disable right-click context menu
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable text selection
document.body.style.userSelect = 'none';
document.body.style.webkitUserSelect = 'none';
document.body.style.msUserSelect = 'none';
document.body.style.mozUserSelect = 'none';

// Disable dragging of images
document.querySelectorAll('img').forEach(img => {
    img.draggable = false;
    img.addEventListener('dragstart', event => event.preventDefault());
});

// Disable keyboard shortcuts for copy/paste/print/save
document.addEventListener('keydown', function(event) {
    // Prevent Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+P, Ctrl+Shift+I
    if (
        (event.ctrlKey && (
            event.key === 'c' || 
            event.key === 'x' || 
            event.key === 's' || 
            event.key === 'p' || 
            event.key === 'u' ||
            (event.shiftKey && event.key === 'i')
        )) ||
        // Prevent F12
        event.key === 'F12'
    ) {
        event.preventDefault();
        return false;
    }
});

// Disable copy/cut/paste events
document.addEventListener('copy', event => event.preventDefault());
document.addEventListener('cut', event => event.preventDefault());
document.addEventListener('paste', event => event.preventDefault());

// Show warning message when copy is attempted
document.addEventListener('selectstart', function(event) {
    // Allow selection for form elements
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return true;
    }
    
    event.preventDefault();
    
    // Optional: Show a toast notification
    showCopyProtectionToast('Content copying is disabled');
    
    return false;
});

// Create a toast notification function
function showCopyProtectionToast(message) {
    // Remove existing toast if present
    const existingToast = document.querySelector('.copy-protection-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'copy-protection-toast';
    toast.textContent = message;
    
    // Style the toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '10000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease-in-out';
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // Remove after 2 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2000);
}

// Protect source code viewing
// Add CSS to hide source via dev tools (limited effectiveness but adds a layer)
const protectionStyle = document.createElement('style');
protectionStyle.innerHTML = `
    /* Make content invisible when developer tools are open */
    @media (min-width: 0px) {
        body:not(.loaded) * {
            display: none !important;
        }
    }
`;
document.head.appendChild(protectionStyle);

// Additional source code protection
(function() {
    // Detect DevTools
    const devtools = {
        isOpen: false,
        orientation: undefined
    };
    
    // Function to check if DevTools is open
    const checkDevTools = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (
            !(heightThreshold && widthThreshold) && 
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || 
             widthThreshold || 
             heightThreshold)
        ) {
            if (!devtools.isOpen) {
                devtools.isOpen = true;
                // Optional: Take action when DevTools is opened
                document.body.innerHTML = '<div style="text-align:center;padding:50px;">Viewing source code is not allowed.</div>';
            }
        } else {
            devtools.isOpen = false;
        }
    };
    
    // Check periodically
    setInterval(checkDevTools, 1000);
})();
// ============= COPY PROTECTION CODE END =============

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Toggle hamburger animation
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        
        // Reset hamburger
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Gallery Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form Submission
if (visitorForm) {
    visitorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Form validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // This would normally send the data to a server
        // Here we'll just simulate a successful submission
        const formElements = visitorForm.elements;
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].type !== 'submit') {
                formElements[i].disabled = true;
            }
        }
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        successMessage.style.color = '#4CAF50';
        successMessage.style.padding = '15px';
        successMessage.style.marginTop = '20px';
        successMessage.style.backgroundColor = '#E8F5E9';
        successMessage.style.borderRadius = '5px';
        
        visitorForm.appendChild(successMessage);
        
        // Reset form after 3 seconds
        setTimeout(() => {
            visitorForm.reset();
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit') {
                    formElements[i].disabled = false;
                }
            }
            
            successMessage.remove();
        }, 3000);
    });
}

// Animate Elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Apply animation to these elements
document.querySelectorAll('.timeline-item, .event-item, .gallery-item, .about-image, .about-text, .heritage-block').forEach(element => {
    element.classList.add('animate-on-scroll');
    observer.observe(element);
});

// Apply CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Preload
window.addEventListener('load', () => {
    // Add a slight delay for smoother appearance after page fully loads
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
});

// Add loaded class for fade-in effect
const bodyStyle = document.createElement('style');
bodyStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(bodyStyle);
