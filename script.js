// Enhanced Form Handling and Contact Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Newsletter Form Handling with Email Validation
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate newsletter subscription
                showNotification('🎉 सफलतापूर्वक सब्सक्राइब हो गया! जल्द ही अपडेट्स प्राप्त करें।', 'success');
                emailInput.value = '';
                
                // Store email in localStorage (optional)
                const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                if (!subscribers.includes(email)) {
                    subscribers.push(email);
                    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                }
            } else {
                showNotification('❌ कृपया एक वैध ईमेल पता दर्ज करें।', 'error');
            }
        });
    }
    
    // Contact Form Handling with Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#message');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            
            // Validate all fields
            if (!name || !email || !message) {
                showNotification('❌ कृपया सभी फ़ील्ड भरें।', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('❌ कृपया एक वैध ईमेल पता दर्ज करें।', 'error');
                return;
            }
            
            if (message.length < 10) {
                showNotification('❌ संदेश कम से कम 10 अक्षर का होना चाहिए।', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('📧 आपका संदेश भेजा जा रहा है...', 'info');
            
            // Simulate API call
            setTimeout(() => {
                showNotification('✅ आपका संदेश सफलतापूर्वक भेज दिया गया है! हम जल्द ही आपसे संपर्क करेंगे।', 'success');
                
                // Store contact form data (optional)
                const contactData = {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                };
                
                const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                contacts.push(contactData);
                localStorage.setItem('contactSubmissions', JSON.stringify(contacts));
                
                // Reset form
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
            }, 2000);
        });
    }
    
    // Email Validation Function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Enhanced Notification System
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Add icon based on type
        let icon = '';
        switch(type) {
            case 'success':
                icon = '✅';
                break;
            case 'error':
                icon = '❌';
                break;
            case 'info':
                icon = 'ℹ️';
                break;
            default:
                icon = '💬';
        }
        
        notification.innerHTML = `<span>${icon}</span> ${message}`;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 18px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            font-size: 0.95rem;
            z-index: 10000;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Set background color based on type
        switch(type) {
            case 'success':
                notification.style.background = 'linear-gradient(45deg, #4ade80, #22c55e)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(45deg, #f87171, #ef4444)';
                break;
            case 'info':
                notification.style.background = 'linear-gradient(45deg, #60a5fa, #3b82f6)';
                break;
            default:
                notification.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        }
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }
    
    // Add click handlers for contact information
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;
            const type = this.querySelector('h4').textContent;
            
            // Copy to clipboard functionality
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showNotification(`📋 ${type} कॉपी हो गया है!`, 'success');
                }).catch(() => {
                    showNotification(`📋 ${type}: ${text}`, 'info');
                });
            } else {
                showNotification(`📋 ${type}: ${text}`, 'info');
            }
        });
        
        // Add hover effect
        item.style.cursor = 'pointer';
        item.style.transition = 'transform 0.2s ease';
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add social media link handlers
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label');
            showNotification(`🔗 ${platform} पर जा रहे हैं...`, 'info');
            
            // Simulate social media navigation
            setTimeout(() => {
                showNotification(`📱 ${platform} लिंक खुल रहा है!`, 'success');
            }, 1000);
        });
    });
    
    // Add form input validation
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.type === 'email' && this.value.trim()) {
                if (!validateEmail(this.value.trim())) {
                    this.style.borderColor = '#ef4444';
                    showNotification('❌ कृपया एक वैध ईमेल पता दर्ज करें।', 'error');
                } else {
                    this.style.borderColor = '#22c55e';
                }
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === '#ef4444') {
                this.style.borderColor = '';
            }
        });
    });
});

// Shopping Cart Functionality
let cart = [];
let cartTotal = 0;

// Cart Elements
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotalElement = document.getElementById('cartTotal');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');

// Add to Cart Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseInt(this.getAttribute('data-price'));
            const image = this.getAttribute('data-image');
            
            addToCart(name, price, image);
            
            // Show success notification
            showNotification(`${name} को कार्ट में जोड़ा गया! 🛒`, 'success');
        });
    });
    
    // Cart icon click event
    cartIcon.addEventListener('click', function() {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close cart button
    closeCart.addEventListener('click', function() {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close cart when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            showNotification('चेकआउट प्रक्रिया शुरू हो रही है... 🛍️', 'success');
            // Here you would typically redirect to a checkout page
            setTimeout(() => {
                cartModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 2000);
        } else {
            showNotification('आपका कार्ट खाली है! कृपया कुछ उत्पाद जोड़ें।', 'error');
        }
    });
    
    // Banner CTA button
    const bannerCta = document.querySelector('.banner-cta');
    if (bannerCta) {
        bannerCta.addEventListener('click', function() {
            showNotification('🎉 Flash Sale में आपका स्वागत है! सभी प्रोडक्ट्स देखें।', 'success');
            // Scroll to products section
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

function addToCart(name, price, image) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateCartCount();
    updateCartTotal();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartCount();
    updateCartTotal();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartDisplay();
        updateCartCount();
        updateCartTotal();
    }
}

function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>आपका कार्ट खाली है</p>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add bounce animation
    cartCount.style.animation = 'none';
    setTimeout(() => {
        cartCount.style.animation = 'cartBounce 0.3s ease';
    }, 10);
}

function updateCartTotal() {
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `₹${cartTotal.toLocaleString()}`;
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Enhanced Countdown Timer for Flash Sale Banner
function updateCountdown() {
    // Set the end date (3 days from now) - flash sale duration
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    endDate.setHours(23, 59, 59, 999); // End at end of day
    
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update the countdown elements with animation
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement && hoursElement && minutesElement && secondsElement) {
        // Add animation class for number changes
        [daysElement, hoursElement, minutesElement, secondsElement].forEach(element => {
            element.style.transform = 'scale(1.1)';
            element.style.color = '#ffd700';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '#ffd700';
            }, 200);
        });
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Update urgency message based on time remaining
        const urgencyMessage = document.querySelector('.countdown-footer p');
        if (urgencyMessage) {
            if (days === 0 && hours < 6) {
                urgencyMessage.textContent = '🚨 LAST FEW HOURS! HURRY UP!';
                urgencyMessage.style.color = '#ff6b6b';
                urgencyMessage.style.animation = 'blink 0.5s ease-in-out infinite';
            } else if (days === 0 && hours < 12) {
                urgencyMessage.textContent = '⏰ LAST 12 HOURS! GRAB NOW!';
                urgencyMessage.style.color = '#ffd700';
            } else if (days === 0) {
                urgencyMessage.textContent = '⏰ LAST DAY! DON\'T MISS OUT!';
                urgencyMessage.style.color = '#ffd700';
            } else {
                urgencyMessage.textContent = '⏰ Hurry! Limited Stock Available';
                urgencyMessage.style.color = '#ffd700';
            }
        }
    }
    
    // If the countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        if (daysElement) daysElement.textContent = '00';
        if (hoursElement) hoursElement.textContent = '00';
        if (minutesElement) minutesElement.textContent = '00';
        if (secondsElement) secondsElement.textContent = '00';
        
        // Show offer expired message
        const urgencyMessage = document.querySelector('.countdown-footer p');
        if (urgencyMessage) {
            urgencyMessage.textContent = '❌ OFFER EXPIRED';
            urgencyMessage.style.color = '#ff6b6b';
            urgencyMessage.style.animation = 'none';
        }
    }
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// PERFORMANCE OPTIMIZATION: Cache DOM elements and use requestAnimationFrame
const navbar = document.querySelector('.navbar');
let ticking = false;

// Optimized scroll handler using requestAnimationFrame
function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.1)';
        navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.08)';
    }
    ticking = false;
}

// Throttled scroll event listener
function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}

// Use passive event listener for better performance
window.addEventListener('scroll', handleScroll, { passive: true });

// Enhanced Buy Now button functionality
document.querySelectorAll('.buy-now-btn').forEach(button => {
    button.addEventListener('click', () => {
        showNotification('उत्पाद कार्ट में जोड़ा गया! जल्द ही चेकआउट पेज पर जाएं।', 'success');
        
        // Simulate adding to cart
        setTimeout(() => {
            showNotification('कार्ट में 1 आइटम जोड़ा गया। कुल: ₹1,499', 'success');
        }, 1000);
    });
});

// Add click handlers for CTA buttons with Indian context
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', () => {
        showNotification('शॉपिंग पेज पर जा रहे हैं...', 'success');
        // In a real application, this would redirect to the shop page
        setTimeout(() => {
            showNotification('सभी उत्पादों पर 30% की छूट! अभी खरीदें।', 'success');
        }, 1000);
    });
});

// PERFORMANCE OPTIMIZATION: Intersection Observer for animations
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

// Observe elements for animation - only run once on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .feature-card, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// PERFORMANCE OPTIMIZATION: Optimized image loading
document.querySelectorAll('img').forEach(img => {
    // Use Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    imageObserver.observe(img);
});

// Enhanced form validation with Indian context - optimized
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', () => {
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            input.style.borderColor = '#e74c3c';
            showNotification('कृपया एक वैध ईमेल पता दर्ज करें।', 'error');
        } else {
            input.style.borderColor = '#27ae60';
        }
    });
});

// PERFORMANCE OPTIMIZATION: Optimized hover effects
document.querySelectorAll('.product-card').forEach(card => {
    let hoverTimeout;
    
    card.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        requestAnimationFrame(() => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.borderColor = '#667eea';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
            requestAnimationFrame(() => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.borderColor = 'transparent';
            });
        }, 50);
    });
});

// PERFORMANCE OPTIMIZATION: Remove expensive animations and effects
// Remove the tricolor effect and price animations that were causing lag
function addOptimizedAnimations() {
    // Only add lightweight animations
    document.querySelectorAll('.price').forEach(price => {
        price.addEventListener('mouseenter', () => {
            requestAnimationFrame(() => {
                price.style.transform = 'scale(1.05)';
                price.style.color = '#764ba2';
            });
        });
        
        price.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                price.style.transform = 'scale(1)';
                price.style.color = '#667eea';
            });
        });
    });
}

// Initialize optimized animations
document.addEventListener('DOMContentLoaded', addOptimizedAnimations);

// PERFORMANCE OPTIMIZATION: Optimized floating WhatsApp button
function createOptimizedFloatingButton() {
    const floatingBtn = document.createElement('div');
    floatingBtn.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
            z-index: 1000;
            transition: transform 0.3s ease;
            will-change: transform;
        " title="WhatsApp पर संपर्क करें">
            <i class="fab fa-whatsapp"></i>
        </div>
    `;
    
    floatingBtn.addEventListener('click', () => {
        showNotification('WhatsApp पर संपर्क कर रहे हैं...', 'success');
        // In real app, this would open WhatsApp
        setTimeout(() => {
            showNotification('WhatsApp: +91 98765 43210', 'success');
        }, 1000);
    });
    
    document.body.appendChild(floatingBtn);
}

// Create floating WhatsApp button
document.addEventListener('DOMContentLoaded', createOptimizedFloatingButton);

// PERFORMANCE OPTIMIZATION: Remove any remaining expensive operations
// Disable smooth scrolling on mobile for better performance
if (window.innerWidth <= 768) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// Clean up event listeners on page unload
window.addEventListener('beforeunload', () => {
    // Clear intervals
    clearInterval(countdownInterval);
    
    // Remove event listeners
    window.removeEventListener('scroll', handleScroll);
}); 