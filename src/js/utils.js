// === UTILITY FUNCTIONS ===
// ฟังก์ชันช่วยเหลือสำหรับการทำงานต่างๆ ในระบบ

// === FORMAT UTILITIES ===

/**
 * จัดรูปแบบราคาเงิน
 * @param {number} amount - จำนวนเงิน
 * @param {string} currency - สัญลักษณ์สกุลเงิน
 * @returns {string} - ราคาที่จัดรูปแบบแล้ว
 */
function formatPrice(amount, currency = '฿') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        return `${currency}0`;
    }
    
    return `${currency}${amount.toLocaleString('th-TH', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`;
}

/**
 * จัดรูปแบบวันที่
 * @param {Date|string} date - วันที่
 * @returns {string} - วันที่ที่จัดรูปแบบแล้ว
 */
function formatDate(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return 'ไม่ระบุวันที่';
    }
    
    return d.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * จัดรูปแบบเวลา
 * @param {Date|string} date - วันที่และเวลา
 * @returns {string} - เวลาที่จัดรูปแบบแล้ว
 */
function formatTime(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        return 'ไม่ระบุเวลา';
    }
    
    return d.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * จัดรูปแบบน้ำหนัก
 * @param {number} grams - น้ำหนักในกรัม
 * @returns {string} - น้ำหนักที่จัดรูปแบบแล้ว
 */
function formatWeight(grams) {
    if (typeof grams !== 'number' || isNaN(grams)) {
        return '0g';
    }
    
    if (grams >= 1000) {
        return `${(grams / 1000).toFixed(1)}kg`;
    }
    
    return `${grams}g`;
}

// === VALIDATION UTILITIES ===

/**
 * ตรวจสอบอีเมล
 * @param {string} email - อีเมลที่ต้องการตรวจสอบ
 * @returns {boolean} - ผลการตรวจสอบ
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * ตรวจสอบเบอร์โทรศัพท์ไทย
 * @param {string} phone - เบอร์โทรศัพท์
 * @returns {boolean} - ผลการตรวจสอบ
 */
function isValidThaiPhone(phone) {
    const phoneRegex = /^(\+66|66|0)?[689]\d{8}$/;
    return phoneRegex.test(phone.replace(/[-\s]/g, ''));
}

/**
 * ตรวจสอบข้อความว่าง
 * @param {string} text - ข้อความ
 * @returns {boolean} - ผลการตรวจสอบ
 */
function isEmpty(text) {
    return !text || text.trim().length === 0;
}

/**
 * ตรวจสอบความยาวข้อความ
 * @param {string} text - ข้อความ
 * @param {number} min - ความยาวขั้นต่ำ
 * @param {number} max - ความยาวสูงสุด
 * @returns {boolean} - ผลการตรวจสอบ
 */
function isValidLength(text, min = 1, max = 255) {
    if (!text) return min === 0;
    return text.length >= min && text.length <= max;
}

/**
 * ตรวจสอบตัวเลข
 * @param {any} value - ค่าที่ต้องการตรวจสอบ
 * @param {number} min - ค่าขั้นต่ำ
 * @param {number} max - ค่าสูงสุด
 * @returns {boolean} - ผลการตรวจสอบ
 */
function isValidNumber(value, min = -Infinity, max = Infinity) {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
}

// === DOM UTILITIES ===

/**
 * หา element โดย ID
 * @param {string} id - ID ของ element
 * @returns {Element|null} - element ที่พบ
 */
function $(id) {
    return document.getElementById(id);
}

/**
 * หา elements โดย selector
 * @param {string} selector - CSS selector
 * @param {Element} parent - element แม่ (ถ้าไม่ระบุจะใช้ document)
 * @returns {NodeList} - รายการ elements ที่พบ
 */
function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * สร้าง element ใหม่
 * @param {string} tag - ชื่อ tag
 * @param {Object} attributes - คุณสมบัติต่างๆ
 * @param {string} content - เนื้อหาภายใน
 * @returns {Element} - element ที่สร้างขึ้น
 */
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.keys(attributes).forEach(key => {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key === 'dataset') {
            Object.keys(attributes[key]).forEach(dataKey => {
                element.dataset[dataKey] = attributes[key][dataKey];
            });
        } else {
            element.setAttribute(key, attributes[key]);
        }
    });
    
    if (content) {
        element.innerHTML = content;
    }
    
    return element;
}

/**
 * เพิ่ม/ลบ CSS class
 * @param {Element} element - element
 * @param {string} className - ชื่อ class
 * @param {boolean} add - เพิ่ม (true) หรือ ลบ (false)
 */
function toggleClass(element, className, add) {
    if (!element) return;
    
    if (add === undefined) {
        element.classList.toggle(className);
    } else if (add) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

/**
 * ตรวจสอบว่า element มี class หรือไม่
 * @param {Element} element - element
 * @param {string} className - ชื่อ class
 * @returns {boolean} - ผลการตรวจสอบ
 */
function hasClass(element, className) {
    return element && element.classList.contains(className);
}

// === ANIMATION UTILITIES ===

/**
 * เลื่อนไปยัง element อย่างนุ่มนวล
 * @param {Element|string} target - element หรือ selector
 * @param {number} offset - ระยะชดเชย
 * @param {number} duration - ระยะเวลา (ms)
 */
function smoothScrollTo(target, offset = 0, duration = 500) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    
    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

/**
 * แสดง element ด้วย fade in effect
 * @param {Element} element - element
 * @param {number} duration - ระยะเวลา (ms)
 */
function fadeIn(element, duration = 300) {
    if (!element) return;
    
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

/**
 * ซ่อน element ด้วย fade out effect
 * @param {Element} element - element
 * @param {number} duration - ระยะเวลา (ms)
 */
function fadeOut(element, duration = 300) {
    if (!element) return;
    
    let start = null;
    const initialOpacity = parseFloat(getComputedStyle(element).opacity) || 1;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(initialOpacity - (progress / duration), 0);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

// === STORAGE UTILITIES ===

/**
 * บันทึกข้อมูลลง localStorage
 * @param {string} key - key สำหรับเก็บข้อมูล
 * @param {any} data - ข้อมูลที่ต้องการบันทึก
 * @returns {boolean} - ผลการบันทึก
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

/**
 * โหลดข้อมูลจาก localStorage
 * @param {string} key - key ของข้อมูล
 * @param {any} defaultValue - ค่าเริ่มต้นหากไม่พบข้อมูล
 * @returns {any} - ข้อมูลที่โหลดมา
 */
function loadFromStorage(key, defaultValue = null) {
    try {
        const stored = localStorage.getItem(key);
        if (stored === null) return defaultValue;
        return JSON.parse(stored);
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
}

/**
 * ลบข้อมูลจาก localStorage
 * @param {string} key - key ของข้อมูล
 * @returns {boolean} - ผลการลบ
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

// === STRING UTILITIES ===

/**
 * ทำให้ตัวอักษรแรกเป็นตัวใหญ่
 * @param {string} str - ข้อความ
 * @returns {string} - ข้อความที่ปรับแล้ว
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * ตัดข้อความให้สั้นลง
 * @param {string} str - ข้อความ
 * @param {number} length - ความยาวสูงสุด
 * @param {string} suffix - ข้อความต่อท้าย
 * @returns {string} - ข้อความที่ตัดแล้ว
 */
function truncate(str, length = 100, suffix = '...') {
    if (!str || str.length <= length) return str;
    return str.substring(0, length).trim() + suffix;
}

/**
 * ลบช่องว่างส่วนเกิน
 * @param {string} str - ข้อความ
 * @returns {string} - ข้อความที่ทำความสะอาดแล้ว
 */
function cleanText(str) {
    if (!str) return '';
    return str.replace(/\s+/g, ' ').trim();
}

/**
 * สร้าง slug จากข้อความ
 * @param {string} str - ข้อความ
 * @returns {string} - slug
 */
function slugify(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // ลบตัวอักษรพิเศษ
        .replace(/[\s_-]+/g, '-') // แทนที่ช่องว่างด้วย -
        .replace(/^-+|-+$/g, ''); // ลบ - ที่ต้นและท้าย
}

// === ARRAY UTILITIES ===

/**
 * สุ่มเรียงลำดับ array
 * @param {Array} array - array ที่ต้องการสุ่ม
 * @returns {Array} - array ที่สุ่มแล้ว
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * หาค่าที่ไม่ซ้ำใน array
 * @param {Array} array - array
 * @param {string} key - key สำหรับเปรียบเทียบ (ถ้าเป็น object)
 * @returns {Array} - array ที่ไม่มีค่าซ้ำ
 */
function uniqueArray(array, key = null) {
    if (!key) {
        return [...new Set(array)];
    }
    
    const seen = new Set();
    return array.filter(item => {
        const val = item[key];
        if (seen.has(val)) return false;
        seen.add(val);
        return true;
    });
}

/**
 * แบ่ง array เป็นชิ้นๆ
 * @param {Array} array - array
 * @param {number} size - ขนาดของแต่ละชิ้น
 * @returns {Array} - array ของ array
 */
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

// === TIME UTILITIES ===

/**
 * Debounce function
 * @param {Function} func - ฟังก์ชันที่ต้องการ debounce
 * @param {number} wait - เวลารอ (ms)
 * @returns {Function} - ฟังก์ชันที่ debounce แล้ว
 */
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

/**
 * Throttle function
 * @param {Function} func - ฟังก์ชันที่ต้องการ throttle
 * @param {number} limit - ขีดจำกัดเวลา (ms)
 * @returns {Function} - ฟังก์ชันที่ throttle แล้ว
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * รอเวลาที่กำหนด
 * @param {number} ms - เวลารอ (ms)
 * @returns {Promise} - Promise ที่จะ resolve หลังจากเวลาที่กำหนด
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// === MATH UTILITIES ===

/**
 * สุ่มตัวเลขในช่วง
 * @param {number} min - ค่าต่ำสุด
 * @param {number} max - ค่าสูงสุด
 * @returns {number} - ตัวเลขสุ่ม
 */
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * ปัดเศษทศนิยม
 * @param {number} num - ตัวเลข
 * @param {number} decimals - จำนวนทศนิยม
 * @returns {number} - ตัวเลขที่ปัดแล้ว
 */
function roundTo(num, decimals = 2) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * คำนวณเปอร์เซ็นต์
 * @param {number} value - ค่าปัจจุบัน
 * @param {number} total - ค่าทั้งหมด
 * @returns {number} - เปอร์เซ็นต์
 */
function percentage(value, total) {
    if (total === 0) return 0;
    return roundTo((value / total) * 100, 1);
}

// === DEVICE DETECTION ===

/**
 * ตรวจสอบว่าเป็นอุปกรณ์มือถือหรือไม่
 * @returns {boolean} - ผลการตรวจสอบ
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * ตรวจสอบว่าเป็น tablet หรือไม่
 * @returns {boolean} - ผลการตรวจสอบ
 */
function isTablet() {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
}

/**
 * ตรวจสอบว่าเป็น desktop หรือไม่
 * @returns {boolean} - ผลการตรวจสอบ
 */
function isDesktop() {
    return !isMobile() && !isTablet();
}

/**
 * ตรวจสอบขนาดหน้าจอ
 * @returns {Object} - ข้อมูลขนาดหน้าจอ
 */
function getScreenSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    let size = 'desktop';
    if (width < 481) size = 'mobile';
    else if (width < 769) size = 'tablet';
    else if (width < 1025) size = 'small-desktop';
    
    return { width, height, size };
}

// === ERROR HANDLING ===

/**
 * จัดการ error อย่างปลอดภัย
 * @param {Function} fn - ฟังก์ชันที่อาจเกิด error
 * @param {any} fallback - ค่าเริ่มต้นหาก error
 * @returns {any} - ผลลัพธ์หรือค่าเริ่มต้น
 */
function safeExecute(fn, fallback = null) {
    try {
        return fn();
    } catch (error) {
        console.error('Safe execute error:', error);
        return fallback;
    }
}

/**
 * แสดง error message
 * @param {Error|string} error - error object หรือข้อความ
 * @param {string} context - บริบทของ error
 */
function logError(error, context = '') {
    const message = error instanceof Error ? error.message : error;
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ${context}: ${message}`);
    
    // สามารถส่งไปยัง error tracking service ได้ที่นี่
    // เช่น Sentry, Bugsnag, etc.
}

// Export functions สำหรับใช้ในไฟล์อื่น
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPrice, formatDate, formatTime, formatWeight,
        isValidEmail, isValidThaiPhone, isEmpty, isValidLength, isValidNumber,
        $, $$, createElement, toggleClass, hasClass,
        smoothScrollTo, fadeIn, fadeOut,
        saveToStorage, loadFromStorage, removeFromStorage,
        capitalize, truncate, cleanText, slugify,
        shuffleArray, uniqueArray, chunkArray,
        debounce, throttle, delay,
        randomBetween, roundTo, percentage,
        isMobile, isTablet, isDesktop, getScreenSize,
        safeExecute, logError
    };
} else {
    // สร้าง global object สำหรับใช้ในเบราว์เซอร์
    window.Utils = {
        formatPrice, formatDate, formatTime, formatWeight,
        isValidEmail, isValidThaiPhone, isEmpty, isValidLength, isValidNumber,
        $, $$, createElement, toggleClass, hasClass,
        smoothScrollTo, fadeIn, fadeOut,
        saveToStorage, loadFromStorage, removeFromStorage,
        capitalize, truncate, cleanText, slugify,
        shuffleArray, uniqueArray, chunkArray,
        debounce, throttle, delay,
        randomBetween, roundTo, percentage,
        isMobile, isTablet, isDesktop, getScreenSize,
        safeExecute, logError
    };
}

console.log('🛠️ Utilities loaded successfully');
