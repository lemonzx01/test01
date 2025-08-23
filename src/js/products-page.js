// === PRODUCTS PAGE JAVASCRIPT ===

// Global Variables for Products Page
let cart = Utils.loadFromStorage('fruitCart', []);
let currentPage = 1;
let itemsPerPage = 12;
let currentFilters = {};
let allProducts = [];

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    initializeProductsPage();
});

async function initializeProductsPage() {
    try {
        showLoading();
        
        // Load data
        await dataManager.loadData();
        dataManager.loadFromLocalStorage();
        
        // Get all products
        allProducts = dataManager.products;
        
        // Setup components
        setupEventListeners();
        setupFilters();
        updateCartCount();
        loadAllProducts();
        
        hideLoading();
        console.log('✅ Products page initialized');
    } catch (error) {
        console.error('❌ Products page initialization failed:', error);
        hideLoading();
        showToast('เกิดข้อผิดพลาดในการโหลดข้อมูล', 'error');
    }
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    // Search functionality
    const searchInput = Utils.$('searchInput');
    if (searchInput) {
        const debouncedSearch = Utils.debounce(handleSearch, 300);
        searchInput.addEventListener('input', debouncedSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    const searchBtn = Utils.$('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Cart functionality
    const cartBtn = Utils.$('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCartModal);
    }
    
    // Mobile menu
    const mobileMenuToggle = Utils.$('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Modal close
    const cartModal = Utils.$('cartModal');
    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

function setupFilters() {
    const filterBar = createAdvancedFilterBar();
    const productsSection = Utils.$('allProducts');
    if (productsSection) {
        productsSection.insertAdjacentHTML('beforebegin', filterBar);
        
        // Add event listeners
        Utils.$('categoryFilter')?.addEventListener('change', applyFilters);
        Utils.$('sortFilter')?.addEventListener('change', applyFilters);
        Utils.$('stockFilter')?.addEventListener('change', applyFilters);
        Utils.$('priceMinFilter')?.addEventListener('input', Utils.debounce(applyFilters, 500));
        Utils.$('priceMaxFilter')?.addEventListener('input', Utils.debounce(applyFilters, 500));
    }
}

function createAdvancedFilterBar() {
    const stats = dataManager.getProductStats();
    
    return `
        <div class="filter-bar">
            <div class="filter-row">
                <div class="filter-group">
                    <label class="filter-label">หมวดหมู่:</label>
                    <select class="filter-select" id="categoryFilter">
                        <option value="">ทั้งหมด (${allProducts.length})</option>
                        ${dataManager.categories.map(cat => {
                            const count = dataManager.getProductsByCategory(cat.id).length;
                            return `<option value="${cat.id}">${cat.name} (${count})</option>`;
                        }).join('')}
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
                        <option value="stock_desc">มีสินค้าเยอะ</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label class="filter-label">สถานะ:</label>
                    <select class="filter-select" id="stockFilter">
                        <option value="">ทั้งหมด</option>
                        <option value="in_stock">มีสินค้า (${stats.inStockProducts})</option>
                        <option value="low_stock">เหลือน้อย (${stats.lowStockProducts})</option>
                        <option value="out_stock">หมดแล้ว (${stats.outOfStockProducts})</option>
                    </select>
                </div>
            </div>
            
            <div class="filter-row">
                <div class="filter-group price-range">
                    <label class="filter-label">ช่วงราคา:</label>
                    <div class="price-inputs">
                        <input type="number" class="price-input" id="priceMinFilter" 
                               placeholder="ต่ำสุด" min="0" max="${stats.priceRange.max}">
                        <span class="price-separator">-</span>
                        <input type="number" class="price-input" id="priceMaxFilter" 
                               placeholder="สูงสุด" min="0" max="${stats.priceRange.max}">
                        <span class="price-currency">บาท</span>
                    </div>
                </div>
                
                <div class="filter-group">
                    <label class="filter-label">แสดงผล:</label>
                    <select class="filter-select" id="itemsPerPageFilter">
                        <option value="12">12 รายการ</option>
                        <option value="24">24 รายการ</option>
                        <option value="48">48 รายการ</option>
                        <option value="all">ทั้งหมด</option>
                    </select>
                </div>
                
                <button class="clear-filters" onclick="clearAllFilters()">
                    🗑️ ล้างตัวกรอง
                </button>
                
                <div class="results-count" id="resultsCount">
                    แสดง ${allProducts.length} รายการ
                </div>
            </div>
        </div>
    `;
}

// === PRODUCT LOADING ===
function loadAllProducts() {
    displayProductsPage(allProducts);
}

function applyFilters() {
    const categoryFilter = Utils.$('categoryFilter')?.value;
    const sortFilter = Utils.$('sortFilter')?.value;
    const stockFilter = Utils.$('stockFilter')?.value;
    const priceMin = parseFloat(Utils.$('priceMinFilter')?.value) || undefined;
    const priceMax = parseFloat(Utils.$('priceMaxFilter')?.value) || undefined;
    const itemsPerPageValue = Utils.$('itemsPerPageFilter')?.value;
    
    // Update items per page
    if (itemsPerPageValue === 'all') {
        itemsPerPage = allProducts.length;
    } else {
        itemsPerPage = parseInt(itemsPerPageValue) || 12;
    }
    
    currentFilters = {
        category: categoryFilter || undefined,
        sortBy: sortFilter || undefined,
        inStock: stockFilter === 'in_stock' ? true : undefined,
        minPrice: priceMin,
        maxPrice: priceMax
    };
    
    // Apply stock filter manually
    let filteredProducts = dataManager.searchProducts('', currentFilters);
    
    if (stockFilter === 'low_stock') {
        filteredProducts = filteredProducts.filter(p => p.stock > 0 && p.stock <= 5);
    } else if (stockFilter === 'out_stock') {
        filteredProducts = filteredProducts.filter(p => p.stock === 0);
    }
    
    currentPage = 1; // Reset to first page
    displayProductsPage(filteredProducts);
    
    // Update results count
    updateResultsCount(filteredProducts.length);
}

function handleSearch() {
    const searchInput = Utils.$('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.trim();
    let filteredProducts;
    
    if (query === '') {
        filteredProducts = dataManager.searchProducts('', currentFilters);
    } else {
        filteredProducts = dataManager.searchProducts(query, currentFilters);
    }
    
    currentPage = 1;
    displayProductsPage(filteredProducts);
    updateResultsCount(filteredProducts.length);
    
    if (query) {
        showToast(`พบสินค้า ${filteredProducts.length} รายการสำหรับ "${query}"`, 'info');
    }
}

function clearAllFilters() {
    // Clear all filter inputs
    if (Utils.$('categoryFilter')) Utils.$('categoryFilter').value = '';
    if (Utils.$('sortFilter')) Utils.$('sortFilter').value = '';
    if (Utils.$('stockFilter')) Utils.$('stockFilter').value = '';
    if (Utils.$('priceMinFilter')) Utils.$('priceMinFilter').value = '';
    if (Utils.$('priceMaxFilter')) Utils.$('priceMaxFilter').value = '';
    if (Utils.$('itemsPerPageFilter')) Utils.$('itemsPerPageFilter').value = '12';
    if (Utils.$('searchInput')) Utils.$('searchInput').value = '';
    
    // Reset variables
    currentFilters = {};
    currentPage = 1;
    itemsPerPage = 12;
    
    // Reload all products
    loadAllProducts();
    updateResultsCount(allProducts.length);
    
    showToast('ล้างตัวกรองทั้งหมดแล้ว', 'info');
}

function updateResultsCount(count) {
    const resultsCount = Utils.$('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `แสดง ${count} รายการ`;
    }
}

// === PRODUCT DISPLAY ===
function displayProductsPage(products) {
    const container = Utils.$('allProducts');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = createEmptyProductsMessage();
        createPagination(0, 0);
        return;
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    // Display products
    container.innerHTML = paginatedProducts.map(product => createProductCard(product)).join('');
    
    // Create pagination
    createPagination(products.length, totalPages);
    
    // Scroll to top of products
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createProductCard(product) {
    const discountPercentage = product.originalPrice 
        ? Utils.percentage(product.originalPrice - product.price, product.originalPrice)
        : 0;
    
    const nutritionInfo = product.nutritions ? `
        <div class="product-nutrition">
            <small>แคลอรี่: ${product.nutritions.calories || 'N/A'} kcal</small>
        </div>
    ` : '';
    
    return `
        <article class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <span class="product-emoji">${product.emoji}</span>
                <div class="product-badge ${getBadgeClass(product.badge)}">${product.badge}</div>
                ${discountPercentage > 0 ? `<div class="discount-badge">-${Math.round(discountPercentage)}%</div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${Utils.truncate(product.description, 100)}</p>
                ${nutritionInfo}
                <div class="product-details">
                    ${product.origin ? `<span class="origin">🌍 ${product.origin}</span>` : ''}
                    ${product.weight ? `<span class="weight">⚖️ ${product.weight}</span>` : ''}
                </div>
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
                        👁️ รายละเอียด
                    </button>
                </div>
            </div>
        </article>
    `;
}

function createEmptyProductsMessage() {
    return `
        <div class="no-results">
            <span class="no-results-icon">🔍</span>
            <h3>ไม่พบสินค้าที่ค้นหา</h3>
            <p>ลองเปลี่ยนเงื่อนไขการค้นหาหรือกรองใหม่</p>
            <button class="btn btn-primary" onclick="clearAllFilters()">
                ดูสินค้าทั้งหมด
            </button>
        </div>
    `;
}

// === PAGINATION ===
function createPagination(totalItems, totalPages) {
    const paginationContainer = Utils.$('pagination');
    if (!paginationContainer || totalPages <= 1) {
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="pagination-btn" onclick="changePage(${currentPage - 1})" 
                ${currentPage === 1 ? 'disabled' : ''}>
            ‹ ก่อนหน้า
        </button>
    `;
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="changePage(1)">1</button>
            ${startPage > 2 ? '<span class="pagination-dots">...</span>' : ''}
        `;
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                    onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }
    
    if (endPage < totalPages) {
        paginationHTML += `
            ${endPage < totalPages - 1 ? '<span class="pagination-dots">...</span>' : ''}
            <button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>
        `;
    }
    
    // Next button
    paginationHTML += `
        <button class="pagination-btn" onclick="changePage(${currentPage + 1})" 
                ${currentPage === totalPages ? 'disabled' : ''}>
            ถัดไป ›
        </button>
    `;
    
    // Page info
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    paginationHTML += `
        <div class="pagination-info">
            ${startItem}-${endItem} จาก ${totalItems} รายการ
        </div>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

function changePage(newPage) {
    const totalPages = Math.ceil(Utils.$$('.product-card').length / itemsPerPage);
    if (newPage < 1 || newPage > totalPages) return;
    
    currentPage = newPage;
    applyFilters(); // Reapply current filters with new page
}

// === PRODUCT FUNCTIONS (Reuse from main page) ===
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
    
    if (dataManager.reduceProductStock(productId, 1)) {
        Utils.saveToStorage('fruitCart', cart);
        updateCartCount();
        showToast(`เพิ่ม ${product.name} ลงตะกร้าแล้ว! 🛒`, 'success');
        
        // Refresh current view
        applyFilters();
    } else {
        showToast('เกิดข้อผิดพลาดในการอัปเดตสต็อก', 'error');
    }
}

// === UTILITY FUNCTIONS (Reuse from main page) ===
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

function updateCartCount() {
    const cartCount = Utils.$('cartCount');
    if (!cartCount) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function showLoading() {
    const loading = Utils.$('loadingSpinner');
    if (loading) loading.classList.add('active');
}

function hideLoading() {
    const loading = Utils.$('loadingSpinner');
    if (loading) loading.classList.remove('active');
}

function showToast(message, type = 'success', duration = 3000) {
    const toast = Utils.$('toast');
    const toastMessage = Utils.$('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const colors = {
        success: 'var(--success-color)',
        error: 'var(--danger-color)', 
        warning: 'var(--warning-color)',
        info: 'var(--secondary-color)'
    };
    
    toastMessage.textContent = message;
    toast.style.background = colors[type] || colors.success;
    
    const toastIcon = toast.querySelector('.toast-icon');
    if (toastIcon) toastIcon.textContent = icons[type] || icons.success;
    
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), duration);
}

// Placeholder functions for features from main page
function quickViewProduct(productId) { 
    window.location.href = `index.html#product-${productId}`;
}
function openCartModal() { 
    window.location.href = 'cart.html';
}
function closeCartModal() { /* Modal functionality */ }
function toggleMobileMenu() { /* Mobile menu functionality */ }
function handleHeaderScroll() { /* Header scroll effect */ }

console.log('🛒 Products page loaded successfully!');
