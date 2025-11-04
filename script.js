// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Search Functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
    // Add your search modal or functionality here
    alert('فتح البحث');
});

// Wishlist Functionality
const wishlistBtn = document.querySelector('.wishlist-btn');
wishlistBtn.addEventListener('click', () => {
    // Add your wishlist functionality here
    alert('المفضلة');
});

// Cart Functionality
const cartBtn = document.querySelector('.cart-btn');
const cartBadge = cartBtn.querySelector('.badge');
let cartCount = 0;

cartBtn.addEventListener('click', () => {
    // Add your cart functionality here
    alert('السلة: ' + cartCount + ' عناصر');
});

// Update cart count (example function)
function updateCartCount(count) {
    cartCount = count;
    cartBadge.textContent = cartCount;
    
    if (cartCount > 0) {
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
}

// User Account Functionality
const userBtn = document.querySelector('.user-btn');
userBtn.addEventListener('click', () => {
    // Add your user account functionality here
    alert('حساب المستخدم');
});

// Sticky Header on Scroll
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Add smooth transition to header
header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// Dropdown Menu Functionality for Mobile
const dropdownLinks = document.querySelectorAll('.dropdown > a');

dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = link.parentElement;
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            // Toggle dropdown
            dropdownMenu.style.position = 'static';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
            
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                // Close other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
                dropdownMenu.style.display = 'block';
            }
        }
    });
});

// Active Link Highlight
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Initialize cart badge visibility
updateCartCount(0);

console.log('Sofrah Header Loaded Successfully!');




























































const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const restaurantImg = document.querySelector('.restaurant-img');


const images = [
    'assets/hero1.png',
    'assets/hero2.png',
    'assets/hero3.png',
];

let currentImageIndex = 0;


leftArrow.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
    animateArrow(leftArrow);
});

rightArrow.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
    animateArrow(rightArrow);
});


function updateImage() {
    restaurantImg.style.opacity = '0';
    restaurantImg.style.height='auto'
    restaurantImg.style.width='100%'
    setTimeout(() => {
        restaurantImg.src = images[currentImageIndex];
        restaurantImg.style.opacity = '1';
    }, 300);
}


function animateArrow(arrow) {
    arrow.style.transform = 'translateY(-50%) scale(0.9)';
    setTimeout(() => {
        arrow.style.transform = 'translateY(-50%) scale(1)';
    }, 150);
}


const orderBtn = document.querySelector('.order-btn');

orderBtn.addEventListener('click', () => {
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    orderBtn.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
   
    alert('سيتم توجيهك إلى صفحة الطلب!');
    
});


let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    }, 5000); 
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}


startAutoSlide();


const imageContainer = document.querySelector('.image-container');
imageContainer.addEventListener('mouseenter', stopAutoSlide);
imageContainer.addEventListener('mouseleave', startAutoSlide);


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        leftArrow.click();
    } else if (e.key === 'ArrowRight') {
        rightArrow.click();
    }
});


window.addEventListener('load', () => {
    const textSection = document.querySelector('.text-section');
    const imageWrapper = document.querySelector('.restaurant-image-wrapper');
    
    textSection.style.opacity = '0';
    imageWrapper.style.opacity = '0';
    textSection.style.transform = 'translateY(-30px)';
    imageWrapper.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        textSection.style.transition = 'all 0.8s ease';
        imageWrapper.style.transition = 'all 0.8s ease';
        textSection.style.opacity = '1';
        imageWrapper.style.opacity = '1';
        textSection.style.transform = 'translateY(0)';
        imageWrapper.style.transform = 'translateY(0)';
    }, 100);
});

window.addEventListener('mousemove', (e) => {
    const leftDecoration = document.querySelector('.food-decoration.left');
    const rightDecoration = document.querySelector('.food-decoration.right');
    
    if (leftDecoration && rightDecoration) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        leftDecoration.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        rightDecoration.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
    }
});


let touchStartX = 0;
let touchEndX = 0;

imageContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

imageContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
       
        rightArrow.click();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
       
        leftArrow.click();
    }
}


const dimensionsBadge = document.querySelector('.dimensions');
dimensionsBadge.addEventListener('mouseenter', () => {
    dimensionsBadge.style.transform = 'scale(1.1) rotate(-2deg)';
});

dimensionsBadge.addEventListener('mouseleave', () => {
    dimensionsBadge.style.transform = 'scale(1) rotate(0deg)';
});


const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);


document.querySelectorAll('.text-section, .restaurant-image-wrapper').forEach(el => {
    observer.observe(el);
});


orderBtn.addEventListener('mousedown', () => {
    orderBtn.style.transform = 'translateY(-1px) scale(0.98)';
});

orderBtn.addEventListener('mouseup', () => {
    orderBtn.style.transform = 'translateY(-3px) scale(1)';
});


console.log('Restaurant Banner Script Loaded Successfully!');
console.log('Total Images:', images.length);
console.log('Auto-slide Interval: 5 seconds');