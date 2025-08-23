// === FRUIT SHOP JAVASCRIPT ===

// Global Variables
let cart = Utils.loadFromStorage('fruitCart', []);
let currentPromoCode = null;

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Show loading
        showLoading();
        
        // Load data from DataManager
        await dataManager.loadData();
        
        // Load saved cart data and restore stock
        dataManager.loadFromLocalStorage();
        
        // Initialize components
        setupEventListeners();
        updateCartCount();
        loadFeaturedProducts();
        
        // Hide loading and show welcome message
        hideLoading();
        showToast('ยินดีต้อนรับสู่ Fruit Shop! 🍎', 'success');
        
        // Update category counts
        updateCategoryCounts();
        
        console.log('✅ App initialized successfully');
    } catch (error) {
        console.error('❌ App initialization failed:', error);
        hideLoading();
        showToast('เกิดข้อผิดพลาดในการโหลดข้อมูล', 'error');
    }
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        const debouncedSearch = Utils.debounce(handleSearch, 300);
        searchInput.addEventListener('input', debouncedSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Cart functionality
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCartModal);
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        updateThemeIcon(); // Set initial icon
    }
    
    // Close modal when clicking outside
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

// === PRODUCT FUNCTIONS ===
function loadFeaturedProducts() {
    const featuredProducts = dataManager.getFeaturedProducts(6);
    const container = Utils.$('featuredProducts');
    
    if (!container) return;
    
    if (featuredProducts.length === 0) {
        container.innerHTML = createEmptyProductsMessage();
        return;
    }
    
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const discountPercentage = product.originalPrice 
        ? Utils.percentage(product.originalPrice - product.price, product.originalPrice)
        : 0;
    
    return `
        <article class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <span class="product-emoji">${product.emoji}</span>
                <div class="product-badge ${getBadgeClass(product.badge)}">${product.badge}</div>
                ${discountPercentage > 0 ? `<div class="discount-badge">-${Math.round(discountPercentage)}%</div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${Utils.truncate(product.description, 80)}</p>
                <div class="product-price">
                    <span class="price-current">${Utils.formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="price-original">${Utils.formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <div class="product-stock">
                    <span class="stock-status ${getStockStatusClass(product.stock)}">
                        ${getStockStatusText(product.stock)}
                    </span>
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                        🛒 เพิ่มลงตะกร้า
                    </button>
                    <button class="btn-quick-view" onclick="quickViewProduct(${product.id})">
                        👁️ ดูรวดเร็ว
                    </button>
                </div>
            </div>
        </article>
    `;
}

function createEmptyProductsMessage() {
    return `
        <div class="no-results">
            <span class="no-results-icon">📦</span>
            <h3>ไม่พบสินค้า</h3>
            <p>ขณะนี้ยังไม่มีสินค้าในระบบ</p>
        </div>
    `;
}

function getBadgeClass(badge) {
    const badgeMap = {
        'ขายดี': 'bestseller',
        'ใหม่': 'new',
        'ส่วนลด': 'sale',
        'พรีเมียม': 'premium',
        'ธรรมชาติ': 'organic'
    };
    return badgeMap[badge] || '';
}

function getStockStatusClass(stock) {
    if (stock > 10) return 'in-stock';
    if (stock > 0) return 'low-stock';
    return 'out-stock';
}

function getStockStatusText(stock) {
    if (stock > 10) return '✅ มีสินค้า';
    if (stock > 0) return `⚠️ เหลือน้อย (${stock} ชิ้น)`;
    return '❌ สินค้าหมด';
}

function addToCart(productId) {
    const product = dataManager.getProductById(productId);
    if (!product || product.stock === 0) {
        showToast('ขออภัย สินค้าหมดแล้ว', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showToast('ขออภัย สินค้าไม่เพียงพอ', 'warning');
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }
    
    // Update product stock
    if (dataManager.reduceProductStock(productId, 1)) {
        Utils.saveToStorage('fruitCart', cart);
        updateCartCount();
        showToast(`เพิ่ม ${product.name} ลงตะกร้าแล้ว! 🛒`, 'success');
        
        // Update product display
        loadFeaturedProducts();
        
        // Track analytics
        trackAddToCart(product);
    } else {
        showToast('เกิดข้อผิดพลาดในการอัปเดตสต็อก', 'error');
    }
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex === -1) return;
    
    const item = cart[itemIndex];
    
    // Return stock to product
    dataManager.increaseProductStock(productId, item.quantity);
    
    cart.splice(itemIndex, 1);
    
    Utils.saveToStorage('fruitCart', cart);
    updateCartCount();
    updateCartModal();
    loadFeaturedProducts();
    
    showToast(`ลบ ${item.name} ออกจากตะกร้าแล้ว`, 'info');
}

function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (!item || !product) return;
    
    const difference = newQuantity - item.quantity;
    
    if (difference > 0 && product.stock < difference) {
        showToast('ขออภัย สินค้าไม่เพียงพอ', 'warning');
        return;
    }
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    product.stock -= difference;
    item.quantity = newQuantity;
    
    saveCartToStorage();
    updateCartCount();
    updateCartModal();
    loadFeaturedProducts();
}

function quickViewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create quick view modal content
    const modalBody = document.getElementById('cartModalBody');
    const modalTitle = document.querySelector('#cartModal .modal-title');
    
    if (modalTitle) modalTitle.textContent = 'รายละเอียดสินค้า';
    
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <span class="product-emoji" style="font-size: 6rem;">${product.emoji}</span>
                </div>
                <div class="quick-view-info">
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">${product.name}</h3>
                    <p style="margin-bottom: 1rem; color: var(--text-secondary);">${product.description}</p>
                    <div class="price-display" style="margin-bottom: 1rem;">
                        <span style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">฿${product.price}</span>
                        ${product.originalPrice ? `<span style="margin-left: 1rem; text-decoration: line-through; color: var(--text-light);">฿${product.originalPrice}</span>` : ''}
                    </div>
                    <div class="stock-info" style="margin-bottom: 1.5rem;">
                        <span class="stock-status ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-stock'}">
                            ${product.stock > 10 ? '✅ มีสินค้า' : product.stock > 0 ? '⚠️ เหลือน้อย (' + product.stock + ' ชิ้น)' : '❌ สินค้าหมด'}
                        </span>
                    </div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); closeCartModal();" ${product.stock === 0 ? 'disabled' : ''} style="width: 100%;">
                        🛒 เพิ่มลงตะกร้า
                    </button>
                </div>
            </div>
        `;
    }
    
    openCartModal();
}

// === CART FUNCTIONS ===
function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;
    
    updateCartModal();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset modal title
    const modalTitle = document.querySelector('#cartModal .modal-title');
    if (modalTitle) modalTitle.textContent = 'ตะกร้าสินค้า';
}

function updateCartModal() {
    const modalBody = document.getElementById('cartModalBody');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!modalBody || !cartTotal) return;
    
    if (cart.length === 0) {
        modalBody.innerHTML = `
            <div class="empty-cart" style="text-align: center; padding: 2rem;">
                <span style="font-size: 4rem;">🛒</span>
                <h3 style="margin: 1rem 0; color: var(--text-secondary);">ตะกร้าสินค้าว่าง</h3>
                <p style="color: var(--text-secondary);">เลือกซื้อสินค้าเพื่อเริ่มต้นช้อปปิ้ง</p>
                <button class="btn btn-primary" onclick="closeCartModal(); scrollToSection('products')" style="margin-top: 1rem;">
                    เลือกซื้อสินค้า
                </button>
            </div>
        `;
        cartTotal.textContent = 'ยอดรวม: ฿0';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    modalBody.innerHTML = cart.map(item => `
        <div class="cart-item" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--bg-secondary);">
            <span style="font-size: 2rem;">${item.emoji}</span>
            <div style="flex: 1;">
                <h4 style="margin-bottom: 0.5rem;">${item.name}</h4>
                <p style="color: var(--primary-color); font-weight: 600;">฿${item.price} × ${item.quantity}</p>
            </div>
            <div class="quantity-controls" style="display: flex; align-items: center; gap: 0.5rem;">
                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})" style="width: 32px; height: 32px; border: none; background: var(--bg-secondary); border-radius: 50%; cursor: pointer;">-</button>
                <span style="min-width: 2rem; text-align: center; font-weight: 600;">${item.quantity}</span>
                <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})" style="width: 32px; height: 32px; border: none; background: var(--bg-secondary); border-radius: 50%; cursor: pointer;">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: var(--danger-color); color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;">🗑️</button>
        </div>
    `).join('');
    
    cartTotal.textContent = `ยอดรวม: ฿${total.toLocaleString()}`;
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add animation when count changes
    cartCount.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartCount.style.transform = 'scale(1)';
    }, 200);
}

function saveCartToStorage() {
    localStorage.setItem('fruitCart', JSON.stringify(cart));
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('ตะกร้าสินค้าว่าง กรุณาเลือกสินค้าก่อน', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderSummary = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
    
    // Simulate checkout process
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Clear cart
        cart = [];
        saveCartToStorage();
        updateCartCount();
        closeCartModal();
        
        // Show success message
        showToast(`✅ สั่งซื้อเรียบร้อยแล้ว! ยอดรวม ฿${total.toLocaleString()}`, 'success', 5000);
        
        // Show order confirmation
        setTimeout(() => {
            alert(`🎉 ขขอบคุณสำหรับการสั่งซื้อ!\n\nรายการ: ${orderSummary}\nยอดรวม: ฿${total.toLocaleString()}\n\nเราจะจัดส่งสินค้าให้คุณภายใน 2-3 วันทำการ`);
        }, 1000);
        
        // Reload products to reset stock
        loadFeaturedProducts();
    }, 2000);
}

// === SEARCH FUNCTIONALITY ===
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        loadFeaturedProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    displaySearchResults(filteredProducts, query);
}

function displaySearchResults(results, query) {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <span style="font-size: 4rem;">🔍</span>
                <h3 style="margin: 1rem 0; color: var(--text-secondary);">ไม่พบสินค้า</h3>
                <p style="color: var(--text-secondary);">ไม่พบสินค้าที่ตรงกับ "${query}"</p>
                <button class="btn btn-primary" onclick="clearSearch()" style="margin-top: 1rem;">
                    ดูสินค้าทั้งหมด
                </button>
            </div>
        `;
        return;
    }
    
    // Use same product card template
    container.innerHTML = results.map(product => `
        <article class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <span class="product-emoji">${product.emoji}</span>
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="price-current">฿${product.price}</span>
                    ${product.originalPrice ? `<span class="price-original">฿${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-stock">
                    <span class="stock-status ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-stock'}">
                        ${product.stock > 10 ? '✅ มีสินค้า' : product.stock > 0 ? '⚠️ เหลือน้อย' : '❌ หมด'}
                    </span>
                </div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                        🛒 เพิ่มลงตะกร้า
                    </button>
                    <button class="btn-quick-view" onclick="quickViewProduct(${product.id})">
                        👁️ ดูรวดเร็ว
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    loadFeaturedProducts();
}

// === CATEGORY FUNCTIONS ===
function filterByCategory(category) {
    // Navigate to products page with category filter
    window.location.href = `products.html?category=${category}`;
}

function showAllProducts() {
    loadFeaturedProducts();
    
    // Reset section title
    const sectionTitle = document.querySelector('.featured-section .section-title');
    if (sectionTitle) {
        sectionTitle.textContent = 'สินค้าแนะนำ';
    }
    
    showToast('แสดงสินค้าทั้งหมด', 'info');
}

// === UI FUNCTIONS ===
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelectorAll('.hamburger');
    
    if (!navMenu) return;
    
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.forEach((line, index) => {
        line.style.transform = navMenu.classList.contains('active') 
            ? `rotate(${index === 0 ? '45' : index === 1 ? '0' : '-45'}deg) translate(${index === 1 ? '10' : '0'}px, ${index === 0 ? '6' : index === 2 ? '-6' : '0'}px)`
            : 'none';
        line.style.opacity = index === 1 && navMenu.classList.contains('active') ? '0' : '1';
    });
}

function handleHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function showPromoModal() {
    showToast('🎉 ขอบคุณสำหรับความสนใจ! ใช้รหัส WELCOME20 เพื่อรับส่วนลด 20%', 'success', 5000);
}

// === THEME SYSTEM ===
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply theme
    if (newTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
    }
    
    // Save preference
    Utils.saveToStorage('theme', newTheme);
    
    // Update icon with animation
    updateThemeIcon();
    
    // Show feedback
    const themeText = newTheme === 'dark' ? 'ธีมมืด' : 'ธีมสว่าง';
    showToast(`🎨 เปลี่ยนเป็น${themeText}แล้ว`, 'info', 2000);
    
    // Trigger theme change animation
    triggerThemeAnimation();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (!themeIcon) return;

    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isDark = currentTheme === 'dark';

    // Add transition effect
    themeIcon.style.transform = 'scale(0.8)';

    setTimeout(() => {
        themeIcon.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeIcon.style.transform = 'scale(1)';
    }, 150);
}

function initializeTheme() {
    // Get saved theme or use system preference
    const savedTheme = Utils.loadFromStorage('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    updateThemeIcon();
}

function triggerThemeAnimation() {
    const body = document.body;
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Remove transition after animation
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = Utils.loadFromStorage('theme');
    if (!savedTheme) { // Only auto-switch if user hasn't set a preference
        const newTheme = e.matches ? 'dark' : 'light';
        if (newTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        updateThemeIcon();
    }
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeScrollAnimations();
    initializeIntersectionObserver();
});

// === SCROLL ANIMATIONS ===
function initializeScrollAnimations() {
    // Add animate-on-scroll class to elements
    const elementsToAnimate = [
        '.section-header',
        '.product-card',
        '.category-card',
        '.hero-content'
    ];
    
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('animate-on-scroll');
        });
    });
}

function initializeIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// === ENHANCED UX INTERACTIONS ===
function enhanceUserExperience() {
    // Add loading states to buttons
    addButtonLoadingStates();
    
    // Add ripple effects
    addRippleEffects();
    
    // Enhance form interactions
    enhanceFormInteractions();
}

function addButtonLoadingStates() {
    const buttons = document.querySelectorAll('.btn, .btn-add-cart, .btn-quick-view');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.disabled) return;
            
            // Add loading state
            const originalText = this.textContent;
            this.style.position = 'relative';
            this.style.color = 'transparent';
            
            // Create spinner
            const spinner = document.createElement('div');
            spinner.className = 'button-spinner';
            spinner.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 16px;
                height: 16px;
                border: 2px solid currentColor;
                border-top: 2px solid transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            `;
            
            this.appendChild(spinner);
            
            // Remove loading state after a short delay
            setTimeout(() => {
                this.style.color = '';
                if (spinner.parentNode) {
                    spinner.remove();
                }
            }, 500);
        });
    });
}

function addRippleEffects() {
    const rippleElements = document.querySelectorAll('.btn, .product-card, .category-card');
    
    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

function enhanceFormInteractions() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        // Add floating label effect
        const container = searchInput.parentElement;
        
        searchInput.addEventListener('focus', () => {
            container.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', () => {
            if (!searchInput.value) {
                container.classList.remove('focused');
            }
        });
        
        // Add input validation feedback
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value;
            
            if (value.length > 0) {
                container.classList.add('has-value');
            } else {
                container.classList.remove('has-value');
            }
        });
    }
}

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .search-container.focused {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
    }
    
    .search-container.has-value .search-input {
        font-weight: 500;
    }
`;
document.head.appendChild(rippleStyle);

// Initialize enhanced UX on DOM load
document.addEventListener('DOMContentLoaded', () => {
    enhanceUserExperience();
});

// === UTILITY FUNCTIONS ===
function showLoading() {
    const loading = document.getElementById('loadingSpinner');
    if (loading) {
        loading.classList.add('active');
    }
}

function hideLoading() {
    const loading = document.getElementById('loadingSpinner');
    if (loading) {
        loading.classList.remove('active');
    }
}

function showToast(message, type = 'success', duration = 4000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    // Set message and icon based on type
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    // Remove all type classes first
    toast.classList.remove('success', 'error', 'warning', 'info');
    
    // Add new type class
    toast.classList.add(type);
    
    // Update content
    toastMessage.textContent = message;
    
    const toastIcon = toast.querySelector('.toast-icon');
    if (toastIcon) {
        toastIcon.textContent = icons[type] || icons.success;
    }
    
    // Clear any existing timeout
    if (toast.hideTimeout) {
        clearTimeout(toast.hideTimeout);
    }
    
    // Show toast with animation
    toast.classList.add('active');
    
    // Auto-hide after duration
    toast.hideTimeout = setTimeout(() => {
        toast.classList.remove('active');
    }, duration);
    
    // Add close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.onclick = () => {
            toast.classList.remove('active');
            if (toast.hideTimeout) {
                clearTimeout(toast.hideTimeout);
            }
        };
    }
}

// === PERFORMANCE OPTIMIZATIONS ===

// Debounce search function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
const debouncedSearch = debounce(handleSearch, 300);

// Update search event listener to use debounced version
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.removeEventListener('input', handleSearch);
        searchInput.addEventListener('input', debouncedSearch);
    }
});

// === ACCESSIBILITY IMPROVEMENTS ===

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('cartModal');
        if (modal && modal.classList.contains('active')) {
            closeCartModal();
        }
    }
    
    // Toggle mobile menu with keyboard
    if (e.key === 'Enter' && e.target.classList.contains('mobile-menu-toggle')) {
        toggleMobileMenu();
    }
});

// Focus management for modals
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    firstElement.focus();
}

// Apply focus trap to cart modal
const originalOpenCartModal = openCartModal;
openCartModal = function() {
    originalOpenCartModal();
    const modal = document.getElementById('cartModal');
    if (modal) {
        trapFocus(modal);
    }
};

// === ERROR HANDLING ===
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showToast('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'error');
});

// === ANALYTICS (Simulation) ===
function trackEvent(eventName, data = {}) {
    // Simulate analytics tracking
    console.log('Analytics Event:', eventName, data);
    
    // Store in localStorage for demo purposes
    const events = JSON.parse(localStorage.getItem('fruitShopAnalytics')) || [];
    events.push({
        event: eventName,
        data: data,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('fruitShopAnalytics', JSON.stringify(events.slice(-100))); // Keep last 100 events
}

// Track product views
const originalQuickViewProduct = quickViewProduct;
quickViewProduct = function(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        trackEvent('product_view', {
            productId: productId,
            productName: product.name,
            category: product.category
        });
    }
    originalQuickViewProduct(productId);
};

// Track add to cart
const originalAddToCart = addToCart;
addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        trackEvent('add_to_cart', {
            productId: productId,
            productName: product.name,
            price: product.price
        });
    }
    originalAddToCart(productId);
};

// Track search
const originalHandleSearch = handleSearch;
handleSearch = function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
        trackEvent('search', {
            query: searchInput.value.trim()
        });
    }
    originalHandleSearch();
};

// === PAGE VISIBILITY API ===
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        trackEvent('page_hidden');
    } else {
        trackEvent('page_visible');
    }
});

// === INIT MESSAGE ===
console.log('🍎 Fruit Shop JavaScript Loaded Successfully!');
console.log('Features: Shopping Cart, Search, Mobile Responsive, Accessibility, Analytics');

// === NEW HELPER FUNCTIONS ===

function updateCategoryCounts() {
    const categoryCards = Utils.$$('.category-card');
    categoryCards.forEach(card => {
        const categoryId = card.getAttribute('onclick')?.match(/filterByCategory\('(\w+)'\)/)?.[1];
        if (categoryId) {
            const products = dataManager.getProductsByCategory(categoryId);
            const countElement = card.querySelector('.category-count');
            if (countElement) {
                countElement.textContent = `${products.length} รายการ`;
            }
        }
    });
}

function trackAddToCart(product) {
    // Simulate analytics tracking
    if (window.gtag) {
        gtag('event', 'add_to_cart', {
            currency: 'THB',
            value: product.price,
            items: [{
                item_id: product.id,
                item_name: product.name,
                category: product.category,
                quantity: 1,
                price: product.price
            }]
        });
    }
    
    console.log('🛒 Add to cart tracked:', product.name);
}

function createFilterBar() {
    return `
        <div class="filter-bar">
            <div class="filter-group">
                <label class="filter-label">หมวดหมู่:</label>
                <select class="filter-select" id="categoryFilter">
                    <option value="">ทั้งหมด</option>
                    ${dataManager.categories.map(cat => 
                        `<option value="${cat.id}">${cat.name}</option>`
                    ).join('')}
                </select>
            </div>
            <div class="filter-group">
                <label class="filter-label">เรียงตาม:</label>
                <select class="filter-select" id="sortFilter">
                    <option value="">ความนิยม</option>
                    <option value="price_asc">ราคา: น้อย → มาก</option>
                    <option value="price_desc">ราคา: มาก → น้อย</option>
                    <option value="name_asc">ชื่อ: A → Z</option>
                    <option value="name_desc">ชื่อ: Z → A</option>
                </select>
            </div>
            <div class="filter-group">
                <label class="filter-label">สถานะ:</label>
                <select class="filter-select" id="stockFilter">
                    <option value="">ทั้งหมด</option>
                    <option value="in_stock">มีสินค้า</option>
                    <option value="low_stock">เหลือน้อย</option>
                </select>
            </div>
            <button class="clear-filters" onclick="clearAllFilters()">ล้างตัวกรอง</button>
        </div>
    `;
}

function setupFilters() {
    const filterBar = createFilterBar();
    const productsSection = Utils.$('featuredProducts');
    if (productsSection) {
        productsSection.insertAdjacentHTML('beforebegin', filterBar);
        
        // Add event listeners
        Utils.$('categoryFilter')?.addEventListener('change', applyFilters);
        Utils.$('sortFilter')?.addEventListener('change', applyFilters);
        Utils.$('stockFilter')?.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const categoryFilter = Utils.$('categoryFilter')?.value;
    const sortFilter = Utils.$('sortFilter')?.value;
    const stockFilter = Utils.$('stockFilter')?.value;
    
    const filters = {
        category: categoryFilter || undefined,
        sortBy: sortFilter || undefined,
        inStock: stockFilter === 'in_stock' ? true : undefined
    };
    
    const filteredProducts = dataManager.searchProducts('', filters);
    displayProducts(filteredProducts);
}

function clearAllFilters() {
    if (Utils.$('categoryFilter')) Utils.$('categoryFilter').value = '';
    if (Utils.$('sortFilter')) Utils.$('sortFilter').value = '';
    if (Utils.$('stockFilter')) Utils.$('stockFilter').value = '';
    
    loadFeaturedProducts();
    showToast('ล้างตัวกรองแล้ว', 'info');
}

function displayProducts(products) {
    const container = Utils.$('featuredProducts');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = createEmptyProductsMessage();
        return;
    }
    
    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

function showProductNotifications() {
    const notifications = dataManager.getNotifications();
    notifications.forEach(notification => {
        if (notification.type === 'warning' || notification.type === 'error') {
            console.warn(`📢 ${notification.title}: ${notification.message}`);
        }
    });
}

// Export functions for debugging (development only)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateCartCount,
        showToast,
        filterByCategory,
        updateCategoryCounts,
        trackAddToCart
    };
}
