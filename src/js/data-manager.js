// === DATA MANAGER ===
// จัดการข้อมูลสินค้า การ์ด และการตั้งค่าต่างๆ

class DataManager {
    constructor() {
        this.products = [];
        this.categories = [];
        this.promotions = [];
        this.settings = {};
        this.isDataLoaded = false;
    }

    // โหลดข้อมูลจากไฟล์ JSON
    async loadData() {
        try {
            const response = await fetch('./data/products.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            this.products = data.products || [];
            this.categories = data.categories || [];
            this.promotions = data.promotions || [];
            this.settings = data.settings || {};
            
            this.isDataLoaded = true;
            
            console.log('✅ Data loaded successfully:', {
                products: this.products.length,
                categories: this.categories.length,
                promotions: this.promotions.length
            });
            
            return true;
        } catch (error) {
            console.error('❌ Error loading data:', error);
            this.loadFallbackData();
            return false;
        }
    }

    // โหลดข้อมูลสำรองในกรณีที่โหลดจาก JSON ไม่สำเร็จ
    loadFallbackData() {
        console.log('🔄 Loading fallback data...');
        
        this.products = [
            {
                id: 1,
                name: 'แอปเปิ้ลแดงพรีเมียม',
                description: 'แอปเปิ้ลแดงหวานกรอบ นำเข้าจากนิวซีแลนด์',
                price: 120,
                originalPrice: 150,
                emoji: '🍎',
                category: 'fresh',
                stock: 25,
                badge: 'ขายดี'
            },
            {
                id: 2,
                name: 'ส้มโชกุน',
                description: 'ส้มโชกุนหวานฉ่ำ รสชาติเข้มข้น',
                price: 80,
                originalPrice: 100,
                emoji: '🍊',
                category: 'fresh',
                stock: 30,
                badge: 'ส่วนลด'
            },
            {
                id: 3,
                name: 'กล้วยหอมทอง',
                description: 'กล้วยหอมสุกงาม หวานหอมธรรมชาติ',
                price: 45,
                originalPrice: 60,
                emoji: '🍌',
                category: 'fresh',
                stock: 20,
                badge: 'ใหม่'
            },
            {
                id: 4,
                name: 'องุ่นเขียวไร้เมล็ด',
                description: 'องุ่นเขียวหวานกรอบ ไร้เมล็ด ล้างสะอาด',
                price: 200,
                originalPrice: 250,
                emoji: '🍇',
                category: 'fresh',
                stock: 15,
                badge: 'พรีเมียม'
            },
            {
                id: 5,
                name: 'มะม่วงแห้ง',
                description: 'มะม่วงแห้งหวานเข้มข้น ไม่ใส่สารกันเสีย',
                price: 90,
                originalPrice: 120,
                emoji: '🥭',
                category: 'dried',
                stock: 50,
                badge: 'ธรรมชาติ'
            },
            {
                id: 6,
                name: 'น้ำผลไม้รวม',
                description: 'น้ำผลไม้รวมสดใหม่ บีบใหม่ทุกวัน',
                price: 65,
                originalPrice: 80,
                emoji: '🥤',
                category: 'processed',
                stock: 40,
                badge: 'สด'
            }
        ];

        this.categories = [
            {
                id: 'fresh',
                name: 'ผลไม้สด',
                description: 'ผลไม้สดใหม่ เก็บเกี่ยวใหม่ทุกวัน',
                icon: '🍎',
                color: '#ff6b35'
            },
            {
                id: 'dried',
                name: 'ผลไม้แห้ง',
                description: 'ผลไม้แห้งคุณภาพ ไม่ใส่สารกันเสีย',
                icon: '🥭',
                color: '#ffa726'
            },
            {
                id: 'processed',
                name: 'ผลไม้แปรรูป',
                description: 'น้ำผลไม้ แยม และผลิตภัณฑ์จากผลไม้',
                icon: '🥤',
                color: '#4ecdc4'
            }
        ];

        this.promotions = [
            {
                id: 1,
                title: 'ส่วนลด 20% สำหรับลูกค้าใหม่',
                description: 'สมัครสมาชิกวันนี้ รับส่วนลดทันที',
                code: 'WELCOME20',
                discount: 20,
                type: 'percentage',
                minOrder: 200,
                active: true
            }
        ];

        this.settings = {
            currency: 'THB',
            currencySymbol: '฿',
            shippingFee: 50,
            freeShippingMinOrder: 500,
            contact: {
                phone: '02-123-4567',
                email: 'info@fruitshop.com',
                address: '123 ถนนผลไม้ เขตบางรัก กรุงเทพฯ 10500'
            }
        };

        this.isDataLoaded = true;
    }

    // ค้นหาสินค้า
    searchProducts(query, filters = {}) {
        let results = [...this.products];

        // กรองตามคำค้นหา
        if (query && query.trim()) {
            const searchTerm = query.toLowerCase().trim();
            results = results.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }

        // กรองตามหมวดหมู่
        if (filters.category) {
            results = results.filter(product => product.category === filters.category);
        }

        // กรองตามช่วงราคา
        if (filters.minPrice !== undefined) {
            results = results.filter(product => product.price >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            results = results.filter(product => product.price <= filters.maxPrice);
        }

        // กรองตามสถานะสินค้า
        if (filters.inStock !== undefined) {
            if (filters.inStock) {
                results = results.filter(product => product.stock > 0);
            }
        }

        // เรียงลำดับ
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price_asc':
                    results.sort((a, b) => a.price - b.price);
                    break;
                case 'price_desc':
                    results.sort((a, b) => b.price - a.price);
                    break;
                case 'name_asc':
                    results.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name_desc':
                    results.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'stock_desc':
                    results.sort((a, b) => b.stock - a.stock);
                    break;
                default:
                    // Default: sort by popularity (stock sold)
                    results.sort((a, b) => (b.originalPrice || b.price) - (a.originalPrice || a.price));
            }
        }

        return results;
    }

    // ค้นหาสินค้าตาม ID
    getProductById(id) {
        return this.products.find(product => product.id === parseInt(id));
    }

    // ค้นหาหมวดหมู่ตาม ID
    getCategoryById(id) {
        return this.categories.find(category => category.id === id);
    }

    // ดึงสินค้าตามหมวดหมู่
    getProductsByCategory(categoryId) {
        return this.products.filter(product => product.category === categoryId);
    }

    // ดึงสินค้าขายดี
    getFeaturedProducts(limit = 6) {
        return this.products
            .filter(product => product.stock > 0)
            .sort((a, b) => {
                // Sort by badge priority then by discount percentage
                const badgePriority = { 'ขายดี': 3, 'ใหม่': 2, 'ส่วนลด': 1 };
                const aPriority = badgePriority[a.badge] || 0;
                const bPriority = badgePriority[b.badge] || 0;
                
                if (aPriority !== bPriority) {
                    return bPriority - aPriority;
                }
                
                // Secondary sort by discount percentage
                const aDiscount = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
                const bDiscount = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
                
                return bDiscount - aDiscount;
            })
            .slice(0, limit);
    }

    // ดึงสินค้าในช่วงราคา
    getProductsInPriceRange(min, max) {
        return this.products.filter(product => 
            product.price >= min && product.price <= max
        );
    }

    // อัปเดตสต็อกสินค้า
    updateProductStock(productId, newStock) {
        const product = this.getProductById(productId);
        if (product) {
            product.stock = Math.max(0, newStock);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    // ลดสต็อกสินค้า
    reduceProductStock(productId, quantity = 1) {
        const product = this.getProductById(productId);
        if (product && product.stock >= quantity) {
            product.stock -= quantity;
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    // เพิ่มสต็อกสินค้า
    increaseProductStock(productId, quantity = 1) {
        const product = this.getProductById(productId);
        if (product) {
            product.stock += quantity;
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    // ดึงโปรโมชันที่ใช้งานได้
    getActivePromotions() {
        return this.promotions.filter(promo => 
            promo.active && (!promo.validUntil || new Date(promo.validUntil) > new Date())
        );
    }

    // ตรวจสอบโปรโมชัน
    validatePromoCode(code, orderTotal = 0) {
        const promo = this.promotions.find(p => 
            p.code === code && 
            p.active && 
            (!p.validUntil || new Date(p.validUntil) > new Date()) &&
            (!p.minOrder || orderTotal >= p.minOrder)
        );

        if (!promo) {
            return { valid: false, message: 'รหัสโปรโมชันไม่ถูกต้องหรือหมดอายุ' };
        }

        let discount = 0;
        let message = '';

        switch (promo.type) {
            case 'percentage':
                discount = (orderTotal * promo.discount) / 100;
                message = `ส่วนลด ${promo.discount}%`;
                break;
            case 'fixed':
                discount = promo.discount;
                message = `ส่วนลด ${this.settings.currencySymbol}${promo.discount}`;
                break;
            case 'free_shipping':
                // Handled separately in shipping calculation
                message = 'ฟรีค่าจัดส่ง';
                break;
        }

        return {
            valid: true,
            discount: Math.min(discount, orderTotal),
            message: message,
            promoData: promo
        };
    }

    // คำนวณค่าจัดส่ง
    calculateShipping(orderTotal, promoCode = null) {
        let shippingFee = this.settings.shippingFee || 50;

        // ฟรีค่าจัดส่งสำหรับคำสั่งซื้อขั้นต่ำ
        if (orderTotal >= (this.settings.freeShippingMinOrder || 500)) {
            shippingFee = 0;
        }

        // ตรวจสอบโปรโมชันฟรีค่าจัดส่ง
        if (promoCode) {
            const promo = this.validatePromoCode(promoCode, orderTotal);
            if (promo.valid && promo.promoData.type === 'free_shipping') {
                shippingFee = 0;
            }
        }

        return shippingFee;
    }

    // คำนวณราคารวม
    calculateOrderTotal(cartItems, promoCode = null) {
        const subtotal = cartItems.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
        );

        let discount = 0;
        let shippingFee = this.calculateShipping(subtotal, promoCode);

        if (promoCode) {
            const promoResult = this.validatePromoCode(promoCode, subtotal);
            if (promoResult.valid) {
                discount = promoResult.discount;
                if (promoResult.promoData.type === 'free_shipping') {
                    shippingFee = 0;
                }
            }
        }

        const total = subtotal - discount + shippingFee;

        return {
            subtotal: subtotal,
            discount: discount,
            shippingFee: shippingFee,
            total: Math.max(0, total),
            currency: this.settings.currencySymbol || '฿'
        };
    }

    // บันทึกข้อมูลลง localStorage
    saveToLocalStorage() {
        try {
            const dataToSave = {
                products: this.products,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('fruitShopData', JSON.stringify(dataToSave));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // โหลดข้อมูลจาก localStorage
    loadFromLocalStorage() {
        try {
            const savedData = localStorage.getItem('fruitShopData');
            if (savedData) {
                const data = JSON.parse(savedData);
                if (data.products && Array.isArray(data.products)) {
                    // Merge saved stock data with original product data
                    data.products.forEach(savedProduct => {
                        const originalProduct = this.products.find(p => p.id === savedProduct.id);
                        if (originalProduct) {
                            originalProduct.stock = savedProduct.stock;
                        }
                    });
                    console.log('📦 Product stock loaded from localStorage');
                    return true;
                }
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
        return false;
    }

    // รีเซ็ตข้อมูลสินค้า
    resetProductData() {
        this.loadFallbackData();
        localStorage.removeItem('fruitShopData');
        console.log('🔄 Product data reset to defaults');
    }

    // สถิติสินค้า
    getProductStats() {
        const totalProducts = this.products.length;
        const inStockProducts = this.products.filter(p => p.stock > 0).length;
        const lowStockProducts = this.products.filter(p => p.stock > 0 && p.stock <= 5).length;
        const outOfStockProducts = this.products.filter(p => p.stock === 0).length;
        
        const categoryCounts = {};
        this.categories.forEach(cat => {
            categoryCounts[cat.name] = this.products.filter(p => p.category === cat.id).length;
        });

        const priceRange = {
            min: Math.min(...this.products.map(p => p.price)),
            max: Math.max(...this.products.map(p => p.price)),
            average: this.products.reduce((sum, p) => sum + p.price, 0) / totalProducts
        };

        return {
            totalProducts,
            inStockProducts,
            lowStockProducts,
            outOfStockProducts,
            categoryCounts,
            priceRange,
            activePromotions: this.getActivePromotions().length
        };
    }

    // การแจ้งเตือน
    getNotifications() {
        const notifications = [];
        
        // แจ้งเตือนสินค้าใกล้หมด
        const lowStockProducts = this.products.filter(p => p.stock > 0 && p.stock <= 5);
        if (lowStockProducts.length > 0) {
            notifications.push({
                type: 'warning',
                title: 'สินค้าใกล้หมด',
                message: `มีสินค้า ${lowStockProducts.length} รายการที่เหลือน้อย`,
                products: lowStockProducts
            });
        }

        // แจ้งเตือนสินค้าหมด
        const outOfStockProducts = this.products.filter(p => p.stock === 0);
        if (outOfStockProducts.length > 0) {
            notifications.push({
                type: 'error',
                title: 'สินค้าหมด',
                message: `มีสินค้า ${outOfStockProducts.length} รายการที่หมดแล้ว`,
                products: outOfStockProducts
            });
        }

        // แจ้งเตือนโปรโมชันใกล้หมดอายุ
        const expiringSoonPromos = this.promotions.filter(p => {
            if (!p.validUntil) return false;
            const expiryDate = new Date(p.validUntil);
            const now = new Date();
            const daysUntilExpiry = (expiryDate - now) / (1000 * 60 * 60 * 24);
            return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
        });

        if (expiringSoonPromos.length > 0) {
            notifications.push({
                type: 'info',
                title: 'โปรโมชันใกล้หมดอายุ',
                message: `มีโปรโมชัน ${expiringSoonPromos.length} รายการใกล้หมดอายุ`,
                promotions: expiringSoonPromos
            });
        }

        return notifications;
    }
}

// สร้าง instance ของ DataManager
const dataManager = new DataManager();

// Export สำหรับใช้ในไฟล์อื่น
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
} else {
    window.DataManager = DataManager;
    window.dataManager = dataManager;
}

console.log('📊 Data Manager initialized');
