const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// HERO SECTION ARROWS
const heroLeftArrow = document.querySelector('.banner-container .left-arrow');
const heroRightArrow = document.querySelector('.banner-container .right-arrow');
const restaurantImg = document.querySelector('.restaurant-img');

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
    alert('فتح البحث');
});

// Wishlist Functionality
const wishlistBtn = document.querySelector('.wishlist-btn');
wishlistBtn.addEventListener('click', () => {
    alert('المفضلة');
});

// Cart Functionality
const cartBtn = document.querySelector('.cart-btn');
const cartBadge = cartBtn.querySelector('.badge');
let cartCount = 0;

cartBtn.addEventListener('click', () => {
    alert('السلة: ' + cartCount + ' عناصر');
});

// Update cart count
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
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// Dropdown Menu Functionality for Mobile
const dropdownLinks = document.querySelectorAll('.dropdown > a');

dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = link.parentElement;
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            dropdownMenu.style.position = 'static';
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
            
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
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

updateCartCount(0);

console.log('Sofrah Header Loaded Successfully!');

// ============================================
// HERO SECTION IMAGE SLIDER
// ============================================
const images = [
    'assets/hero1.png',
    'assets/hero2.png',
    'assets/hero3.png',
];

let currentImageIndex = 0;

if (heroLeftArrow && heroRightArrow && restaurantImg) {
    heroLeftArrow.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
        animateHeroArrow(heroLeftArrow);
    });

    heroRightArrow.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
        animateHeroArrow(heroRightArrow);
    });

    function updateImage() {
        restaurantImg.style.opacity = '0';
        restaurantImg.style.height = 'auto';
        restaurantImg.style.width = '100%';
        setTimeout(() => {
            restaurantImg.src = images[currentImageIndex];
            restaurantImg.style.opacity = '1';
        }, 300);
    }

    function animateHeroArrow(arrow) {
        arrow.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            arrow.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    }

    // Auto slide for hero
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
    if (imageContainer) {
        imageContainer.addEventListener('mouseenter', stopAutoSlide);
        imageContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Keyboard navigation for hero
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            heroLeftArrow.click();
        } else if (e.key === 'ArrowRight') {
            heroRightArrow.click();
        }
    });

    // Touch swipe for hero
    let touchStartX = 0;
    let touchEndX = 0;

    if (imageContainer) {
        imageContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        imageContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleHeroSwipe();
        }, { passive: true });
    }

    function handleHeroSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            heroRightArrow.click();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            heroLeftArrow.click();
        }
    }
}

// Order button
const orderBtn = document.querySelector('.order-btn');
if (orderBtn) {
    orderBtn.addEventListener('click', () => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        orderBtn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        alert('سيتم توجيهك إلى صفحة الطلب!');
    });

    orderBtn.addEventListener('mousedown', () => {
        orderBtn.style.transform = 'translateY(-1px) scale(0.98)';
    });

    orderBtn.addEventListener('mouseup', () => {
        orderBtn.style.transform = 'translateY(-3px) scale(1)';
    });
}

// Page load animations
window.addEventListener('load', () => {
    const textSection = document.querySelector('.text-section');
    const imageWrapper = document.querySelector('.restaurant-image-wrapper');
    
    if (textSection && imageWrapper) {
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
    }
});

// Parallax effect
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

// Intersection Observer
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

console.log('Restaurant Banner Script Loaded Successfully!');

// ============================================
// MENU CATEGORIES CAROUSEL SECTION
// ============================================
const menuTrack = document.querySelector('.menu-categories-track');
const menuCards = document.querySelectorAll('.menu-category-card');

// MENU SECTION ARROWS 
const menuPrevBtn = document.querySelector('.menu-prev-btn');
const menuNextBtn = document.querySelector('.menu-next-btn');
const menuPaginationDots = document.querySelectorAll('.menu-pagination-dots .menu-pagination-dot');

if (menuTrack && menuCards.length) {
    let menuCurrentIndex = 0;
    let menuCardWidth = 0;
    let menuCardsPerView = 1;
    let menuMaxIndex = 0;

    function calculateMenuDimensions() {
        const container = document.querySelector('.menu-categories-container');
        if (!container || !menuCards[0]) return;

        const menuContainerWidth = container.clientWidth;
        const cs = getComputedStyle(menuCards[0]);
        const gapLeft = parseFloat(cs.marginLeft) || 0;
        const gapRight = parseFloat(cs.marginRight) || 0;
        const cardRect = menuCards[0].getBoundingClientRect();
        const cardW = cardRect.width;

        menuCardWidth = Math.round(cardW + gapLeft + gapRight);
        menuCardsPerView = Math.max(1, Math.floor(menuContainerWidth / menuCardWidth));
        menuMaxIndex = Math.max(0, menuCards.length - menuCardsPerView);

        menuCurrentIndex = Math.max(0, Math.min(menuCurrentIndex, menuMaxIndex));

        updateMenuCarousel(false);
    }

    function updateMenuCarousel(animate = true) {
        const menuOffset = menuCurrentIndex * menuCardWidth;
        menuTrack.style.transition = animate ? 'transform 350ms ease' : 'none';
        menuTrack.style.transform = `translateX(-${menuOffset}px)`;

        if (menuPrevBtn) menuPrevBtn.disabled = menuCurrentIndex === 0;
        if (menuNextBtn) menuNextBtn.disabled = menuCurrentIndex >= menuMaxIndex;

        updateMenuPaginationDots();
    }

    function updateMenuPaginationDots() {
        if (!menuPaginationDots || menuPaginationDots.length === 0) return;
        const menuTotalPages = Math.ceil(menuCards.length / menuCardsPerView) || 1;
        const menuCurrentPage = Math.floor(menuCurrentIndex / menuCardsPerView);

        menuPaginationDots.forEach((menuDot, menuIndex) => {
            if (menuIndex === menuCurrentPage) {
                menuDot.classList.add('active');
            } else {
                menuDot.classList.remove('active');
            }
        });
    }

    function pageStepForward() {
        menuCurrentIndex = Math.min(menuMaxIndex, menuCurrentIndex + menuCardsPerView);
        updateMenuCarousel();
    }

    function pageStepBackward() {
        menuCurrentIndex = Math.max(0, menuCurrentIndex - menuCardsPerView);
        updateMenuCarousel();
    }

    if (menuPrevBtn) {
        menuPrevBtn.addEventListener('click', () => {
            pageStepBackward();
            animateMenuButton(menuPrevBtn);
        });
    }

    if (menuNextBtn) {
        menuNextBtn.addEventListener('click', () => {
            pageStepForward();
            animateMenuButton(menuNextBtn);
        });
    }

    function animateMenuButton(menuButton) {
        if (!menuButton) return;
        menuButton.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            menuButton.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    }

    menuPaginationDots.forEach((menuDot, menuIndex) => {
        menuDot.addEventListener('click', () => {
            menuCurrentIndex = menuIndex * menuCardsPerView;
            if (menuCurrentIndex > menuMaxIndex) menuCurrentIndex = menuMaxIndex;
            updateMenuCarousel();
        });
    });

    menuCards.forEach((menuCard) => {
        menuCard.addEventListener('click', () => {
            const inner = menuCard.querySelector('.menu-card-inner');
            if (!inner) return;
            inner.style.transform = 'scale(0.95)';
            setTimeout(() => {
                inner.style.transform = '';
            }, 200);
        });
    });

    // Touch/Swipe for menu
    let menuTouchStartX = 0;
    let menuTouchEndX = 0;
    let menuIsDragging = false;

    menuTrack.addEventListener('touchstart', (e) => {
        menuTouchStartX = e.changedTouches[0].screenX;
        menuIsDragging = true;
        stopMenuAutoSlide();
    }, { passive: true });

    menuTrack.addEventListener('touchmove', (e) => {
        if (!menuIsDragging) return;
        menuTouchEndX = e.changedTouches[0].screenX;
    }, { passive: true });

    menuTrack.addEventListener('touchend', () => {
        if (!menuIsDragging) return;
        menuIsDragging = false;
        handleMenuSwipe();
        setTimeout(startMenuAutoSlide, 5000);
    });

    function handleMenuSwipe() {
        const menuSwipeThreshold = 50;
        const menuDiff = menuTouchStartX - menuTouchEndX;

        if (Math.abs(menuDiff) > menuSwipeThreshold) {
            if (menuDiff > 0) {
                pageStepForward();
            } else {
                pageStepBackward();
            }
        }
    }

    // Auto-slide for menu
    let menuAutoSlideInterval;
    const menuAutoSlideDelay = 4000;

    function startMenuAutoSlide() {
        stopMenuAutoSlide();
        menuAutoSlideInterval = setInterval(() => {
            if (menuCurrentIndex < menuMaxIndex) {
                pageStepForward();
            } else {
                menuCurrentIndex = 0;
                updateMenuCarousel();
            }
        }, menuAutoSlideDelay);
    }

    function stopMenuAutoSlide() {
        clearInterval(menuAutoSlideInterval);
    }

    const menuCarouselWrapper = document.querySelector('.menu-carousel-wrapper');
    if (menuCarouselWrapper) {
        menuCarouselWrapper.addEventListener('mouseenter', stopMenuAutoSlide);
        menuCarouselWrapper.addEventListener('mouseleave', startMenuAutoSlide);
    }

    let menuResizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(menuResizeTimeout);
        menuResizeTimeout = setTimeout(() => {
            calculateMenuDimensions();
        }, 200);
    });

    window.addEventListener('load', () => {
        calculateMenuDimensions();
        startMenuAutoSlide();

        menuCards.forEach((menuCard, menuIndex) => {
            menuCard.style.opacity = '0';
            menuCard.style.transform = 'translateY(30px)';
            setTimeout(() => {
                menuCard.style.transition = 'all 0.5s ease';
                menuCard.style.opacity = '1';
                menuCard.style.transform = 'translateY(0)';
            }, menuIndex * 100);
        });
    });
}

// Menu section animations
const menuObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const menuObserver = new IntersectionObserver((menuEntries) => {
    menuEntries.forEach(menuEntry => {
        if (menuEntry.isIntersecting) {
            menuEntry.target.classList.add('menu-animate-in');
            
            const menuAnimateCards = menuEntry.target.querySelectorAll('.menu-category-card');
            menuAnimateCards.forEach((menuCard, menuIndex) => {
                setTimeout(() => {
                    menuCard.style.opacity = '1';
                    menuCard.style.transform = 'translateY(0)';
                }, menuIndex * 50);
            });
        }
    });
}, menuObserverOptions);

const menuSection = document.querySelector('.menu-categories-section');
if (menuSection) {
    menuObserver.observe(menuSection);
}

// Menu card hover effects
menuCards.forEach(menuCard => {
    menuCard.addEventListener('mouseenter', () => {
        const menuRipple = document.createElement('span');
        menuRipple.classList.add('menu-ripple-effect');
        menuCard.appendChild(menuRipple);
        
        setTimeout(() => {
            menuRipple.remove();
        }, 600);
    });
});

// Lazy loading for menu images
const menuImages = document.querySelectorAll('.menu-category-image');
const menuImageObserver = new IntersectionObserver((menuEntries, menuObserver) => {
    menuEntries.forEach(menuEntry => {
        if (menuEntry.isIntersecting) {
            const menuImg = menuEntry.target;
            menuImg.classList.add('menu-loaded');
            menuObserver.unobserve(menuImg);
        }
    });
});

menuImages.forEach(menuImg => {
    menuImageObserver.observe(menuImg);
});

console.log('Menu Categories Carousel Initialized');
console.log(`Total Menu Categories: ${menuCards.length}`);




// ============================================
// EXCLUSIVE DEALS SECTION JAVASCRIPT
// ============================================

// Select all exclusive deal elements
const exclusiveDealCards = document.querySelectorAll('.exclusive-deal-card');
const exclusiveDealAddBtns = document.querySelectorAll('.exclusive-deal-add-btn');
const exclusiveDealSection = document.querySelector('.exclusive-deals-section');

// Cart state for exclusive deals
let exclusiveDealsCart = [];
let exclusiveDealsCartCount = 0;

// ============================================
// ADD TO CART FUNCTIONALITY
// ============================================
exclusiveDealAddBtns.forEach((exclusiveBtn, exclusiveIndex) => {
    exclusiveBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event
        
        // Get product details
        const exclusiveCard = exclusiveBtn.closest('.exclusive-deal-card');
        const exclusiveName = exclusiveCard.querySelector('.exclusive-deal-name').textContent;
        const exclusivePrice = exclusiveCard.querySelector('.exclusive-deal-amount').textContent;
        const exclusiveImage = exclusiveCard.querySelector('.exclusive-deal-image').src;
        
        // Create product object
        const exclusiveProduct = {
            id: `exclusive-deal-${exclusiveIndex}`,
            name: exclusiveName,
            price: parseFloat(exclusivePrice),
            image: exclusiveImage,
            quantity: 1
        };
        
        // Add to cart
        addExclusiveDealToCart(exclusiveProduct, exclusiveBtn);
        
        // Animate button
        animateExclusiveDealButton(exclusiveBtn);
        
        // Show notification
        showExclusiveDealNotification(exclusiveName);
    });
});

// Add product to cart
function addExclusiveDealToCart(exclusiveProduct, exclusiveBtn) {
    // Check if product already exists in cart
    const exclusiveExistingProduct = exclusiveDealsCart.find(
        item => item.id === exclusiveProduct.id
    );
    
    if (exclusiveExistingProduct) {
        exclusiveExistingProduct.quantity += 1;
    } else {
        exclusiveDealsCart.push(exclusiveProduct);
    }
    
    exclusiveDealsCartCount++;
    updateExclusiveDealsCartDisplay();
    
    // Change button state temporarily
    const exclusiveOriginalText = exclusiveBtn.innerHTML;
    exclusiveBtn.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
    exclusiveBtn.classList.add('added');
    
    setTimeout(() => {
        exclusiveBtn.innerHTML = exclusiveOriginalText;
        exclusiveBtn.classList.remove('added');
    }, 2000);
    
    console.log('Exclusive Deal Cart:', exclusiveDealsCart);
}

// Update cart display (can be connected to header cart)
function updateExclusiveDealsCartDisplay() {
    // Update cart badge if exists in header
    const exclusiveCartBadge = document.querySelector('.cart-btn .badge');
    if (exclusiveCartBadge) {
        exclusiveCartBadge.textContent = exclusiveDealsCartCount;
        exclusiveCartBadge.style.display = exclusiveDealsCartCount > 0 ? 'flex' : 'none';
    }
}

// ============================================
// BUTTON ANIMATION
// ============================================
function animateExclusiveDealButton(exclusiveBtn) {
    // Create ripple effect
    const exclusiveRipple = document.createElement('span');
    exclusiveRipple.classList.add('exclusive-deal-ripple');
    exclusiveBtn.appendChild(exclusiveRipple);
    
    setTimeout(() => {
        exclusiveRipple.remove();
    }, 600);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showExclusiveDealNotification(exclusiveProductName) {
    // Create notification element
    const exclusiveNotification = document.createElement('div');
    exclusiveNotification.className = 'exclusive-deal-notification';
    exclusiveNotification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>تمت إضافة "${exclusiveProductName}" إلى السلة</span>
    `;
    
    // Add styles
    Object.assign(exclusiveNotification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        boxShadow: '0 5px 20px rgba(39, 174, 96, 0.4)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        animation: 'exclusive-deal-slide-in 0.5s ease',
        direction: 'rtl'
    });
    
    document.body.appendChild(exclusiveNotification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        exclusiveNotification.style.animation = 'exclusive-deal-slide-out 0.5s ease';
        setTimeout(() => {
            exclusiveNotification.remove();
        }, 500);
    }, 3000);
}

// Add notification animations to CSS dynamically
const exclusiveDealNotificationStyles = document.createElement('style');
exclusiveDealNotificationStyles.textContent = `
    @keyframes exclusive-deal-slide-in {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes exclusive-deal-slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .exclusive-deal-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: 20px;
        height: 20px;
        animation: exclusive-deal-ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes exclusive-deal-ripple-animation {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(exclusiveDealNotificationStyles);

// ============================================
// CARD CLICK FUNCTIONALITY
// ============================================
exclusiveDealCards.forEach(exclusiveCard => {
    exclusiveCard.addEventListener('click', (e) => {
        // Don't trigger if clicking on button
        if (e.target.closest('.exclusive-deal-add-btn')) {
            return;
        }
        
        // Get product details
        const exclusiveName = exclusiveCard.querySelector('.exclusive-deal-name').textContent;
        
        // Open product details (placeholder - implement your own logic)
        console.log(`Opening details for: ${exclusiveName}`);
        
        // You can redirect to product page or open modal
        // window.location.href = `product-details.html?name=${encodeURIComponent(exclusiveName)}`;
    });
});

// ============================================
// SCROLL ANIMATION
// ============================================
const exclusiveDealObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const exclusiveDealObserver = new IntersectionObserver((exclusiveEntries) => {
    exclusiveEntries.forEach((exclusiveEntry, exclusiveIndex) => {
        if (exclusiveEntry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
                exclusiveEntry.target.classList.add('animate-in');
            }, exclusiveIndex * 100);
            
            exclusiveDealObserver.unobserve(exclusiveEntry.target);
        }
    });
}, exclusiveDealObserverOptions);

// Observe all cards
exclusiveDealCards.forEach(exclusiveCard => {
    exclusiveCard.style.opacity = '0';
    exclusiveDealObserver.observe(exclusiveCard);
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
const exclusiveDealImages = document.querySelectorAll('.exclusive-deal-image');

const exclusiveDealImageObserver = new IntersectionObserver((exclusiveEntries) => {
    exclusiveEntries.forEach(exclusiveEntry => {
        if (exclusiveEntry.isIntersecting) {
            const exclusiveImg = exclusiveEntry.target;
            
            // Add loaded class for animation
            exclusiveImg.classList.add('loaded');
            
            // If using data-src for lazy loading
            if (exclusiveImg.dataset.src) {
                exclusiveImg.src = exclusiveImg.dataset.src;
            }
            
            exclusiveDealImageObserver.unobserve(exclusiveImg);
        }
    });
});

exclusiveDealImages.forEach(exclusiveImg => {
    exclusiveDealImageObserver.observe(exclusiveImg);
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // Press 'A' to add first visible product to cart
    if (e.key === 'a' || e.key === 'A') {
        const exclusiveFirstVisibleCard = Array.from(exclusiveDealCards).find(
            card => isElementInViewport(card)
        );
        
        if (exclusiveFirstVisibleCard) {
            const exclusiveAddBtn = exclusiveFirstVisibleCard.querySelector('.exclusive-deal-add-btn');
            exclusiveAddBtn.click();
        }
    }
});

// Check if element is in viewport
function isElementInViewport(exclusiveEl) {
    const exclusiveRect = exclusiveEl.getBoundingClientRect();
    return (
        exclusiveRect.top >= 0 &&
        exclusiveRect.left >= 0 &&
        exclusiveRect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        exclusiveRect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// HOVER EFFECTS ENHANCEMENT
// ============================================
exclusiveDealCards.forEach(exclusiveCard => {
    exclusiveCard.addEventListener('mouseenter', () => {
        // Add extra glow effect
        exclusiveCard.style.boxShadow = '0 20px 50px rgba(231, 76, 60, 0.2)';
    });
    
    exclusiveCard.addEventListener('mouseleave', () => {
        exclusiveCard.style.boxShadow = '';
    });
});

// ============================================
// TOUCH SWIPE FOR MOBILE (Optional Enhancement)
// ============================================
let exclusiveDealTouchStartX = 0;
let exclusiveDealTouchEndX = 0;

exclusiveDealCards.forEach(exclusiveCard => {
    exclusiveCard.addEventListener('touchstart', (e) => {
        exclusiveDealTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    exclusiveCard.addEventListener('touchend', (e) => {
        exclusiveDealTouchEndX = e.changedTouches[0].screenX;
        handleExclusiveDealSwipe(exclusiveCard);
    }, { passive: true });
});

function handleExclusiveDealSwipe(exclusiveCard) {
    const exclusiveDiff = exclusiveDealTouchStartX - exclusiveDealTouchEndX;
    const exclusiveSwipeThreshold = 50;
    
    if (Math.abs(exclusiveDiff) > exclusiveSwipeThreshold) {
        if (exclusiveDiff > 0) {
            // Swiped left - could add to wishlist
            console.log('Swiped left on:', exclusiveCard.querySelector('.exclusive-deal-name').textContent);
        } else {
            // Swiped right - could share product
            console.log('Swiped right on:', exclusiveCard.querySelector('.exclusive-deal-name').textContent);
        }
    }
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
console.log('Exclusive Deals Section Initialized');
console.log(`Total Products: ${exclusiveDealCards.length}`);
console.log(`Cart Items: ${exclusiveDealsCartCount}`);

// Export functions for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addExclusiveDealToCart,
        exclusiveDealsCart,
        exclusiveDealsCartCount
    };

// ============================================
// TESTIMONIALS SECTION - JAVASCRIPT
// ============================================

// Testimonials Data Array
const testimonialsDataArray = [
    {
        text: "طلبت أونلاين من سفرة، وتوقعت يتأخر أو يوصل بارد… بالعكس، وصل بدري وحار كأني آكل داخل المطعم. البرجر خطير، اللحم عصاري والجبنة سايحة، والبطاطس مقرمشة مثل ما أحب. من جد يهتمّون بأدق التفاصيل",
        name: "فهد سالم",
        role: "مدير فني",
        avatar: "assets/test1.png"
    },
    {
        text: "خدمة ممتازة والطعام لذيذ جداً! التوصيل كان سريع والطلب وصل ساخن وطازج. أنصح الجميع بتجربة سفرة للحصول على أفضل تجربة طعام.",
        name: "محمود حربي",
        role: "مدير مالي",
        avatar: "assets/test2.png"
    },
    
];

// DOM Elements - All prefixed with "testimonials"
const testimonialsActiveText = document.getElementById('testimonialsActiveText');
const testimonialsActiveName = document.getElementById('testimonialsActiveName');
const testimonialsActiveRole = document.getElementById('testimonialsActiveRole');
const testimonialsDotsContainer = document.getElementById('testimonialsDots');
const testimonialsAllAvatars = document.querySelectorAll('.testimonials-avatar');
const testimonialsMainCard = document.querySelector('.testimonials-main-card');

// Current State
let testimonialsCurrentIndex = 0;
let testimonialsAutoSlideInterval;
const testimonialsAutoSlideDelay = 5000; // 5 seconds

// ============================================
// INITIALIZATION
// ============================================
function testimonialsInit() {
    testimonialsCreateNavigationDots();
    testimonialsSetupAvatarListeners();
    testimonialsUpdateTestimonial(0, false);
    testimonialsStartAutoSlide();
    
    console.log('Testimonials Section Initialized');
    console.log(`Total Testimonials: ${testimonialsDataArray.length}`);
}

// ============================================
// CREATE NAVIGATION DOTS
// ============================================
function testimonialsCreateNavigationDots() {
    if (!testimonialsDotsContainer) return;
    
    testimonialsDotsContainer.innerHTML = '';
    
    testimonialsDataArray.forEach((_, testimonialsIndex) => {
        const testimonialsDot = document.createElement('button');
        testimonialsDot.className = 'testimonials-dot-nav';
        testimonialsDot.setAttribute('aria-label', `الانتقال إلى الشهادة ${testimonialsIndex + 1}`);
        
        if (testimonialsIndex === 0) {
            testimonialsDot.classList.add('testimonials-dot-nav-active');
        }
        
        testimonialsDot.addEventListener('click', () => {
            testimonialsUpdateTestimonial(testimonialsIndex, true);
            testimonialsRestartAutoSlide();
        });
        
        testimonialsDotsContainer.appendChild(testimonialsDot);
    });
}

// ============================================
// SETUP AVATAR CLICK LISTENERS
// ============================================
function testimonialsSetupAvatarListeners() {
    testimonialsAllAvatars.forEach((testimonialsAvatar) => {
        testimonialsAvatar.addEventListener('click', () => {
            const testimonialsIndex = parseInt(testimonialsAvatar.getAttribute('data-testimonial-index'));
            testimonialsUpdateTestimonial(testimonialsIndex, true);
            testimonialsRestartAutoSlide();
        });
    });
}

// ============================================
// UPDATE TESTIMONIAL CONTENT
// ============================================
function testimonialsUpdateTestimonial(testimonialsNewIndex, testimonialsAnimate = true) {
    if (testimonialsNewIndex === testimonialsCurrentIndex && testimonialsAnimate) return;
    
    const testimonialsData = testimonialsDataArray[testimonialsNewIndex];
    
    if (testimonialsAnimate) {
        // Fade out animation
        testimonialsMainCard.style.opacity = '0';
        testimonialsMainCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Update content
            testimonialsUpdateContent(testimonialsData);
            
            // Fade in animation
            testimonialsMainCard.style.opacity = '1';
            testimonialsMainCard.style.transform = 'translateY(0)';
        }, 300);
    } else {
        testimonialsUpdateContent(testimonialsData);
    }
    
    // Update active states
    testimonialsUpdateActiveStates(testimonialsNewIndex);
    
    testimonialsCurrentIndex = testimonialsNewIndex;
}

// ============================================
// UPDATE TESTIMONIAL CONTENT
// ============================================
function testimonialsUpdateContent(testimonialsData) {
    if (testimonialsActiveText) {
        testimonialsActiveText.textContent = testimonialsData.text;
    }
    if (testimonialsActiveName) {
        testimonialsActiveName.textContent = testimonialsData.name;
    }
    if (testimonialsActiveRole) {
        testimonialsActiveRole.textContent = testimonialsData.role;
    }
}

// ============================================
// UPDATE ACTIVE STATES (AVATARS & DOTS)
// ============================================
function testimonialsUpdateActiveStates(testimonialsNewIndex) {
    // Update avatars
    testimonialsAllAvatars.forEach((testimonialsAvatar, testimonialsIdx) => {
        if (testimonialsIdx === testimonialsNewIndex) {
            testimonialsAvatar.classList.add('testimonials-avatar-active');
        } else {
            testimonialsAvatar.classList.remove('testimonials-avatar-active');
        }
    });
    
    // Update dots
    const testimonialsAllDots = testimonialsDotsContainer.querySelectorAll('.testimonials-dot-nav');
    testimonialsAllDots.forEach((testimonialsDot, testimonialsIdx) => {
        if (testimonialsIdx === testimonialsNewIndex) {
            testimonialsDot.classList.add('testimonials-dot-nav-active');
        } else {
            testimonialsDot.classList.remove('testimonials-dot-nav-active');
        }
    });
}

// ============================================
// AUTO-SLIDE FUNCTIONALITY
// ============================================
function testimonialsStartAutoSlide() {
    testimonialsStopAutoSlide();
    
    testimonialsAutoSlideInterval = setInterval(() => {
        let testimonialsNextIndex = testimonialsCurrentIndex + 1;
        
        if (testimonialsNextIndex >= testimonialsDataArray.length) {
            testimonialsNextIndex = 0;
        }
        
        testimonialsUpdateTestimonial(testimonialsNextIndex, true);
    }, testimonialsAutoSlideDelay);
}

function testimonialsStopAutoSlide() {
    if (testimonialsAutoSlideInterval) {
        clearInterval(testimonialsAutoSlideInterval);
    }
}

function testimonialsRestartAutoSlide() {
    testimonialsStopAutoSlide();
    testimonialsStartAutoSlide();
}

// ============================================
// PAUSE AUTO-SLIDE ON HOVER
// ============================================
if (testimonialsMainCard) {
    testimonialsMainCard.addEventListener('mouseenter', testimonialsStopAutoSlide);
    testimonialsMainCard.addEventListener('mouseleave', testimonialsStartAutoSlide);
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (testimonialsEvent) => {
    // Check if testimonials section is in viewport
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (!testimonialsSection) return;
    
    const testimonialsRect = testimonialsSection.getBoundingClientRect();
    const testimonialsIsInView = testimonialsRect.top < window.innerHeight && testimonialsRect.bottom > 0;
    
    if (!testimonialsIsInView) return;
    
    if (testimonialsEvent.key === 'ArrowRight') {
        let testimonialsPrevIndex = testimonialsCurrentIndex - 1;
        if (testimonialsPrevIndex < 0) {
            testimonialsPrevIndex = testimonialsDataArray.length - 1;
        }
        testimonialsUpdateTestimonial(testimonialsPrevIndex, true);
        testimonialsRestartAutoSlide();
    } else if (testimonialsEvent.key === 'ArrowLeft') {
        let testimonialsNextIndex = testimonialsCurrentIndex + 1;
        if (testimonialsNextIndex >= testimonialsDataArray.length) {
            testimonialsNextIndex = 0;
        }
        testimonialsUpdateTestimonial(testimonialsNextIndex, true);
        testimonialsRestartAutoSlide();
    }
});

// ============================================
// TOUCH/SWIPE SUPPORT FOR MOBILE
// ============================================
let testimonialsTouchStartX = 0;
let testimonialsTouchEndX = 0;

if (testimonialsMainCard) {
    testimonialsMainCard.addEventListener('touchstart', (testimonialsEvent) => {
        testimonialsTouchStartX = testimonialsEvent.changedTouches[0].screenX;
        testimonialsStopAutoSlide();
    }, { passive: true });

    testimonialsMainCard.addEventListener('touchend', (testimonialsEvent) => {
        testimonialsTouchEndX = testimonialsEvent.changedTouches[0].screenX;
        testimonialsHandleSwipe();
        testimonialsRestartAutoSlide();
    }, { passive: true });
}

function testimonialsHandleSwipe() {
    const testimonialsSwipeThreshold = 50;
    const testimonialsDiff = testimonialsTouchStartX - testimonialsTouchEndX;
    
    if (Math.abs(testimonialsDiff) > testimonialsSwipeThreshold) {
        if (testimonialsDiff > 0) {
            // Swipe left - next testimonial
            let testimonialsNextIndex = testimonialsCurrentIndex + 1;
            if (testimonialsNextIndex >= testimonialsDataArray.length) {
                testimonialsNextIndex = 0;
            }
            testimonialsUpdateTestimonial(testimonialsNextIndex, true);
        } else {
            // Swipe right - previous testimonial
            let testimonialsPrevIndex = testimonialsCurrentIndex - 1;
            if (testimonialsPrevIndex < 0) {
                testimonialsPrevIndex = testimonialsDataArray.length - 1;
            }
            testimonialsUpdateTestimonial(testimonialsPrevIndex, true);
        }
    }
}

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
const testimonialsObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const testimonialsScrollObserver = new IntersectionObserver((testimonialsEntries) => {
    testimonialsEntries.forEach((testimonialsEntry) => {
        if (testimonialsEntry.isIntersecting) {
            testimonialsEntry.target.style.opacity = '1';
            testimonialsEntry.target.style.transform = 'translateY(0)';
            testimonialsScrollObserver.unobserve(testimonialsEntry.target);
        }
    });
}, testimonialsObserverOptions);

// Observe elements for animation
const testimonialsAnimatedElements = document.querySelectorAll(
    '.testimonials-main-card, .testimonials-avatars-container, .testimonials-badge'
);

testimonialsAnimatedElements.forEach((testimonialsElement) => {
    testimonialsElement.style.opacity = '0';
    testimonialsElement.style.transform = 'translateY(30px)';
    testimonialsElement.style.transition = 'all 0.8s ease';
    testimonialsScrollObserver.observe(testimonialsElement);
});

// ============================================
// VISIBILITY CHANGE - PAUSE/RESUME AUTO-SLIDE
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        testimonialsStopAutoSlide();
    } else {
        testimonialsStartAutoSlide();
    }
});

// ============================================
// INITIALIZE ON DOM READY
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testimonialsInit);
} else {
    testimonialsInit();
}

// ============================================
// EXPORT FOR MODULE USE (Optional)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testimonialsDataArray,
        testimonialsUpdateTestimonial,
        testimonialsStartAutoSlide,
        testimonialsStopAutoSlide,
        testimonialsInit
    };
}






















































