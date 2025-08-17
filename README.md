# 🍎 Fruit Shop Website

เว็บไซต์ร้านขายผลไม้ออนไลน์ที่พัฒนาด้วย HTML, CSS และ JavaScript แบบ Responsive และใช้งานได้จริง

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 วัตถุประสงค์

โปรเจกต์นี้เป็นความคิดที่คิดมาตั้งแต่ปี 1 แต่ไม่เคยได้ทำ ตอนนี้จึงได้เวลามาทำให้เสร็จและใช้งานได้จริง โดยมีวัตถุประสงค์เพื่อ:
- 🔄 ฟื้นฟูความจำในการเขียนโค้ด
- 💻 ลองเขียนเว็บไซต์แบบจริงจัง
- 🎯 ใช้ AI ให้น้อยที่สุดเท่าที่จะทำได้ เพื่อฝึกทักษะการเขียนโค้ดด้วยตนเอง
- 🌐 สร้างเว็บไซต์ที่ responsive และใช้งานได้จริง
- 🛒 พัฒนาระบบ e-commerce แบบพื้นฐาน

## 🛠️ เทคโนโลยีที่ใช้

- **HTML5** - โครงสร้างหน้าเว็บ (Semantic HTML)
- **CSS3** - การออกแบบและจัดรูปแบบ (Flexbox, Grid, Animations)
- **JavaScript (ES6+)** - ความโต้ตอบและฟังก์ชันการทำงาน (Local Storage, DOM Manipulation)
- **Responsive Design** - รองรับการแสดงผลบนอุปกรณ์ทุกขนาด
- **Progressive Web App (PWA)** - รองรับการใช้งานแบบ offline

## 🌟 ฟีเจอร์พิเศษ

- 📱 **Responsive Design** - ใช้งานได้บนมือถือ แท็บเล็ต และคอมพิวเตอร์
- 🛒 **Shopping Cart** - ระบบตะกร้าสินค้าที่บันทึกข้อมูลใน Local Storage
- 🔍 **Search & Filter** - ค้นหาและกรองสินค้าแบบ Real-time
- 💰 **Price Calculator** - คำนวณราคารวมและส่วนลดอัตโนมัติ
- 📊 **Stock Management** - แสดงสถานะสินค้าคงเหลือ
- 🎨 **Modern UI/UX** - ออกแบบสวยงาม ใช้งานง่าย
- ⚡ **Fast Loading** - โหลดเร็ว ประสิทธิภาพสูง

## 📁 โครงสร้างโปรเจกต์

```
Fruit Shop/
├── test01/
│   ├── README.md          # เอกสารโปรเจกต์
│   └── src/               # โฟลเดอร์ source code
│       ├── index.html     # หน้าแรก
│       ├── index.css      # ไฟล์ CSS หลัก
│       ├── index.js       # ไฟล์ JavaScript หลัก
│       ├── products.html  # หน้ารายการสินค้า (จะเพิ่มในอนาคต)
│       ├── cart.html      # หน้าตะกร้าสินค้า (จะเพิ่มในอนาคต)
│       ├── checkout.html  # หน้าชำระเงิน (จะเพิ่มในอนาคต)
│       ├── css/           # โฟลเดอร์ CSS เพิ่มเติม
│       ├── js/            # โฟลเดอร์ JavaScript เพิ่มเติม
│       ├── images/        # รูปภาพสินค้าและโลโก้
│       └── data/          # ข้อมูลสินค้า (JSON files)
└── docs/                  # เอกสารเพิ่มเติม (จะเพิ่มในอนาคต)
```

## 🎯 ฟีเจอร์หลัก

### 🏠 หน้าแรก (Home Page)
- **Header Section**
  - โลโก้ร้านผลไม้
  - เมนูนำทาง (Home, Products, Cart, About)
  - ไอคอนตะกร้าสินค้าพร้อมจำนวนสินค้า
  - ช่องค้นหาสินค้า
- **Hero Section**
  - แบนเนอร์หลักพร้อมข้อความต้อนรับ
  - ปุ่ม Call-to-Action
- **Featured Products**
  - สินค้าแนะนำ/สินค้าขายดี
  - สไลด์โชว์ผลไม้สวยงาม
- **Categories Section**
  - หมวดหมู่ผลไม้ (ผลไม้สด, ผลไม้แห้ง, ผลไม้แปรรูป)
  - จำนวนสินค้าในแต่ละหมวดหมู่
- **Promotion Section**
  - โปรโมชันพิเศษ
  - ส่วนลดและข้อเสนอพิเศษ
- **Footer**
  - ข้อมูลติดต่อ
  - ลิงก์โซเชียลมีเดีย

## 🎯 ฟีเจอร์หลัก

### 🛒 หน้ารายการสินค้า (Products Page)
- **Filter & Search**
  - ตัวกรองสินค้าตามหมวดหมู่ (ผลไม้สด, ผลไม้แห้ง, ผลไม้แปรรูป)
  - กรองตามราคา (Price Range Slider)
  - กรองตามความพร้อมจำหน่าย (In Stock, Out of Stock)
  - ช่องค้นหาแบบ Real-time
- **Product Grid**
  - แสดงสินค้าแบบ Card Layout
  - รูปภาพสินค้าคุณภาพสูง
  - ชื่อสินค้า, ราคา, ส่วนลด
  - ปุ่ม "Add to Cart" พร้อม Animation
  - แสดงสถานะสินค้าคงเหลือ
- **Sorting Options**
  - เรียงตามราคา (ต่ำ-สูง, สูง-ต่ำ)
  - เรียงตามความนิยม
  - เรียงตามวันที่เพิ่มสินค้า

### 🛍️ หน้าตะกร้าสินค้า (Shopping Cart)
- **Cart Items Display**
  - รายการสินค้าในตะกร้า
  - ปรับจำนวนสินค้า (+/- buttons)
  - ลบสินค้าออกจากตะกร้า
- **Price Calculation**
  - ราคารวมแต่ละรายการ
  - ราคารวมทั้งหมด
  - ค่าจัดส่ง
  - ส่วนลด (ถ้ามี)
- **Checkout Process**
  - กรอกข้อมูลการจัดส่ง
  - เลือกวิธีการชำระเงิน
  - ยืนยันคำสั่งซื้อ

### 📱 Responsive Design
- **Mobile First Approach**
  - ออกแบบให้ทำงานดีบนมือถือก่อน
  - Navigation Menu แบบ Hamburger
  - Touch-friendly buttons และ UI elements
- **Tablet & Desktop**
  - เลย์เอาต์แบบ Multi-column
  - Hover effects และ animations
  - Keyboard navigation support

## 🚀 วิธีการติดตั้งและใช้งาน

### 📋 ความต้องการของระบบ (System Requirements)
- **เบราว์เซอร์**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **ระบบปฏิบัติการ**: Windows 10+, macOS 10.15+, Linux Ubuntu 18.04+
- **หน่วยความจำ**: อย่างน้อย 4GB RAM
- **พื้นที่จัดเก็บ**: อย่างน้อย 100MB

### 🔧 การติดตั้ง (Installation)

#### วิธีที่ 1: ดาวน์โหลดและเปิดไฟล์
```bash
# 1. Clone หรือดาวน์โหลดโปรเจกต์
git clone [repository-url]

# 2. เข้าไปในโฟลเดอร์โปรเจกต์
cd "Fruit shop/test01/src"

# 3. เปิดไฟล์ index.html ในเบราว์เซอร์
# - คลิกขวาที่ไฟล์ index.html
# - เลือก "Open with" > เบราว์เซอร์ที่ต้องการ
```

#### วิธีที่ 2: ใช้ Local Server (แนะนำ)
```bash
# ใช้ Python (หากมี Python ติดตั้งในเครื่อง)
cd "Fruit shop/test01/src"
python -m http.server 8000
# เปิดเบราว์เซอร์ไปที่ http://localhost:8000

# หรือใช้ Node.js
npx http-server
# เปิดเบราว์เซอร์ไปที่ http://localhost:8080
```

#### วิธีที่ 3: ใช้ VS Code Live Server Extension
1. เปิดโปรเจกต์ใน VS Code
2. ติดตั้ง "Live Server" extension
3. คลิกขวาที่ไฟล์ `index.html`
4. เลือก "Open with Live Server"

### 📖 คู่มือการใช้งาน (User Guide)

#### 🏠 หน้าแรก (Homepage)
1. **เปิดเว็บไซต์** - เข้าสู่หน้าแรกจะเห็นแบนเนอร์ต้อนรับ
2. **ดูสินค้าแนะนำ** - เลื่อนลงมาดูสินค้าขายดีและโปรโมชัน
3. **เลือกหมวดหมู่** - คลิกที่หมวดหมู่ผลไม้ที่สนใจ

#### 🛒 การช้อปปิ้ง
1. **ค้นหาสินค้า**
   - ใช้ช่องค้นหาด้านบน
   - หรือเข้าไปในหมวดหมู่สินค้า
2. **กรองสินค้า**
   - ใช้ตัวกรองด้านซ้าย (หมวดหมู่, ราคา, สถานะสินค้า)
   - เรียงลำดับตามที่ต้องการ
3. **เพิ่มสินค้าลงตะกร้า**
   - คลิกปุ่ม "Add to Cart"
   - ปรับจำนวนสินค้าตามต้องการ
4. **ตรวจสอบตะกร้า**
   - คลิกไอคอนตะกร้าด้านบน
   - ตรวจสอบรายการและราคา
5. **ชำระเงิน**
   - กรอกข้อมูลการจัดส่ง
   - เลือกวิธีการชำระเงิน
   - ยืนยันคำสั่งซื้อ

#### 📱 การใช้งานบนมือถือ
1. **เมนู** - คลิกไอคอน ☰ เพื่อเปิดเมนู
2. **การนำทาง** - ใช้นิ้วสไลด์เพื่อเลื่อนดูสินค้า
3. **ซูมภาพ** - แตะที่รูปภาพเพื่อดูรายละเอียด

### 🔧 การแก้ไขปัญหาเบื้องต้น (Troubleshooting)

#### ❌ ปัญหาที่พบบ่อย
1. **หน้าเว็บไม่แสดงผลถูกต้อง**
   - ลองรีเฟรช (F5 หรือ Ctrl+R)
   - ล้าง cache ของเบราว์เซอร์
   - ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต

2. **ตะกร้าสินค้าหายไป**
   - ตรวจสอบว่าเปิด JavaScript ในเบราว์เซอร์แล้ว
   - ล้าง Local Storage และเริ่มใหม่

3. **เว็บไซต์ช้า**
   - ปิดโปรแกรมอื่นๆ ที่ใช้หน่วยความจำ
   - ลองใช้เบราว์เซอร์อื่น

#### 📞 การติดต่อสำหรับความช่วยเหลือ
- **Email**: support@fruitshop.com
- **Line**: @fruitshop
- **Facebook**: FruitShop Thailand

## 📝 หมายเหตุการพัฒนา

โปรเจกต์นี้เป็นการฝึกฝนและพัฒนาทักษะการเขียนเว็บไซต์แบบพื้นฐาน โดยเน้นการใช้เทคโนโลยี Frontend เท่านั้น

### 🎯 วัตถุประสงค์ทางการศึกษา
- เรียนรู้ HTML5 Semantic Elements
- ฝึกใช้ CSS3 Modern Features (Grid, Flexbox, Animations)
- พัฒนาทักษะ JavaScript ES6+
- เข้าใจหลักการ Responsive Design
- ศึกษา UX/UI Design Principles

## 🎯 เป้าหมายการพัฒนา (Development Roadmap)

### 📝 Phase 1: Foundation (พื้นฐาน)
- [x] 📋 วางแผนโครงสร้างเว็บไซต์และฟีเจอร์
- [x] 📄 เขียนเอกสาร README ที่ครบถ้วน
- [ ] 🏗️ สร้างโครงสร้าง HTML5 semantic
- [ ] 🎨 ออกแบบ CSS Layout (Grid + Flexbox)
- [ ] 📱 ทำ Responsive Design สำหรับทุกอุปกรณ์

### 🎨 Phase 2: Design & UI (การออกแบบ)
- [ ] 🎭 สร้าง Design System (Colors, Typography, Spacing)
- [ ] 🖼️ เพิ่มรูปภาพและไอคอน
- [ ] ✨ เพิ่ม CSS Animations และ Transitions
- [ ] 🌙 เพิ่ม Dark Mode Toggle
- [ ] 🎯 ปรับปรุง UX/UI ให้ใช้งานง่าย

### ⚡ Phase 3: Functionality (ฟังก์ชันการทำงาน)
- [ ] 🛒 สร้างระบบตะกร้าสินค้า (Local Storage)
- [ ] 🔍 เพิ่มฟีเจอร์ค้นหาและกรองสินค้า
- [ ] 💰 ระบบคำนวณราคาและส่วนลด
- [ ] 📊 แสดงสถานะสินค้าคงเหลือ
- [ ] 🔄 เพิ่ม Loading States และ Error Handling

### 🚀 Phase 4: Advanced Features (ฟีเจอร์ขั้นสูง)
- [ ] 📱 เพิ่ม PWA Support (Service Worker)
- [ ] 🔔 ระบบแจ้งเตือน (Notifications)
- [ ] 💾 Offline Support พื้นฐาน
- [ ] 📈 Google Analytics Integration
- [ ] 🎯 SEO Optimization

### 🧪 Phase 5: Testing & Optimization (การทดสอบ)
- [ ] 🌐 ทดสอบ Cross-browser Compatibility
- [ ] 📱 ทดสอบบนอุปกรณ์จริง (Mobile, Tablet)
- [ ] ⚡ Performance Optimization
- [ ] ♿ Accessibility Testing (WCAG)
- [ ] 🐛 Bug Fixes และการปรับปรุง

### 📚 Phase 6: Documentation & Deployment (เอกสารและการเผยแพร่)
- [ ] 📖 เขียนเอกสารสำหรับ Developer
- [ ] 🎥 สร้าง Demo Video
- [ ] 🌍 Deploy ไปยัง GitHub Pages หรือ Netlify
- [ ] 📢 เผยแพร่และรับ Feedback

## 📊 ความคืบหน้าโปรเจกต์ (Project Progress)

```
📋 Planning & Documentation    ████████████████████  100%
🏗️ HTML Structure             ██░░░░░░░░░░░░░░░░░░   10%
🎨 CSS Styling                ░░░░░░░░░░░░░░░░░░░░    0%
⚡ JavaScript Functionality   ░░░░░░░░░░░░░░░░░░░░    0%
📱 Responsive Design          ░░░░░░░░░░░░░░░░░░░░    0%
🧪 Testing                   ░░░░░░░░░░░░░░░░░░░░    0%

Overall Progress: ████░░░░░░░░░░░░░░░░ 20%
```

## 💡 สิ่งที่ควรเพิ่มในระบบ (Recommended Features)

### 🚀 ฟีเจอร์พื้นฐานที่ควรมี (Essential Features)
- **🛒 Shopping Cart System** - ระบบตะกร้าสินค้าที่บันทึกใน Local Storage
- **🔍 Product Search** - ค้นหาสินค้าแบบ Real-time ด้วย JavaScript
- **🏷️ Product Categories** - หมวดหมู่สินค้า (ผลไม้สด, ผลไม้แห้ง, ผลไม้แปรรูป)
- **💰 Price Calculator** - คำนวณราคารวม ส่วนลด และค่าจัดส่ง
- **📱 Responsive Menu** - เมนูแบบ Hamburger สำหรับมือถือ
- **⚡ Product Quick View** - ดูข้อมูลสินค้าแบบ Modal/Popup
- **📊 Stock Status** - แสดงสถานะสินค้าคงเหลือ (In Stock, Low Stock, Out of Stock)

### 🎨 UI/UX Enhancements
- **🖼️ Image Gallery** - แสดงรูปสินค้าหลายมุม พร้อม Zoom
- **🎭 Loading States** - Animation ขณะโหลดข้อมูล
- **✨ Hover Effects** - เอฟเฟกต์เมื่อเมาส์วางบนสินค้า
- **🌈 Color Theme** - เปลี่ยนธีมสีของเว็บไซต์ (Light/Dark Mode)
- **🔔 Toast Notifications** - แจ้งเตือนเมื่อเพิ่มสินค้าลงตะกร้า
- **📏 Product Comparison** - เปรียบเทียบสินค้าแบบข้างๆ กัน
- **⭐ Rating Display** - แสดงดาวคะแนนสินค้า (แม้ยังไม่มีระบบรีวิว)

### 🛍️ E-commerce Features
- **🎫 Coupon System** - ระบบใส่โค้ดส่วนลด
- **📦 Product Variants** - ขนาดและน้ำหนักสินค้าต่างๆ (1กก., 2กก., 5กก.)
- **🚚 Shipping Calculator** - คำนวณค่าจัดส่งตามพื้นที่
- **💳 Multiple Payment Options** - แสดงตัวเลือกการชำระเงิน (โอนเงิน, บัตรเครดิต, COD)
- **📋 Order Summary** - สรุปคำสั่งซื้อก่อนยืนยัน
- **💌 Wishlist** - รายการสินค้าที่ต้องการ (บันทึกใน Local Storage)
- **🔄 Recently Viewed** - สินค้าที่เพิ่งดูล่าสุด

### 📱 Progressive Web App (PWA)
- **📲 App Installation** - ติดตั้งเป็นแอปบนมือถือได้
- **📴 Offline Support** - ใช้งานได้แม้ไม่มีอินเทอร์เน็ต (แคช HTML/CSS/JS)
- **🔔 Push Notifications** - แจ้งโปรโมชันใหม่ (จำลอง)
- **📱 Touch Gestures** - รองรับการใช้งานด้วยนิ้วบนมือถือ

### 🎯 User Experience
- **🔍 Advanced Search** - ค้นหาด้วยฟิลเตอร์ (ราคา, หมวดหมู่, คะแนน)
- **📈 Popular Products** - สินค้ายอดนิยมโดยใช้ข้อมูลจำลอง
- **🎁 Daily Deals** - โปรโมชันประจำวัน
- **📅 Seasonal Products** - สินค้าตามฤดูกาล
- **🍎 Product Recommendations** - แนะนำสินค้าที่เกี่ยวข้อง
- **📍 Store Locator** - แผนที่ร้านค้า (ใช้ Google Maps Embed)
- **📞 Contact Form** - ฟอร์มติดต่อพร้อม validation

### 🎮 Gamification & Fun
- **🎯 Daily Check-in** - เช็คอินรายวันรับแต้ม
- **🏆 Achievement System** - ระบบเหรียญรางวัลการซื้อ
- **🎲 Lucky Wheel** - วงล้อแจกของรางวัล
- **📊 Loyalty Points** - แต้มสะสมแลกของรางวัล
- **🎉 Birthday Special** - โปรโมชันวันเกิด
- **🔥 Flash Sale Timer** - นับถอยหลังเวลาโปรโมชัน

### 📊 Analytics & Data
- **📈 Sales Dashboard** - แดชบอร์ดยอดขาย (จำลอง)
- **👥 Visitor Counter** - นับจำนวนผู้เข้าชม
- **📊 Product Views** - สถิติการดูสินค้า
- **💹 Price History** - ประวัติราคาสินค้า
- **📋 Inventory Alert** - แจ้งเตือนสินค้าใกล้หมด

### 🔐 Security & Quality
- **✅ Form Validation** - ตรวจสอบข้อมูลฟอร์มแบบ Real-time
- **🛡️ Input Sanitization** - ป้องกัน XSS และ injection
- **🔒 Secure Checkout** - จำลองระบบชำระเงินที่ปลอดภัย
- **📱 2FA Simulation** - จำลองการยืนยันตัวตน 2 ขั้นตอน

### 🌍 Accessibility & SEO
- **♿ Screen Reader Support** - รองรับโปรแกรมอ่านหน้าจอ
- **⌨️ Keyboard Navigation** - ใช้งานด้วยคีย์บอร์ดได้ทั้งหมด
- **🔤 Font Size Control** - ปรับขนาดตัวอักษร
- **🎨 High Contrast Mode** - โหมดสีตัดกันสูง
- **🏷️ SEO Meta Tags** - เพิ่ม Meta tags สำหรับ SEO
- **📱 Social Media Preview** - การแสดงผลเมื่อแชร์โซเชียล

### 🎯 Extended Features (อนาคต)
- **🤖 Chatbot Support** - ระบบแชทบอทช่วยลูกค้า
- **⭐ Review System** - ระบบรีวิวและคะแนนสินค้า
- **📧 Newsletter** - ระบบสมัครรับข่าวสาร
- **🎁 Loyalty Program** - ระบบสะสมแต้มและคูปอง
- **📍 Store Locator** - แผนที่ร้านค้าใกล้เคียง
- **🚚 Delivery Tracking** - ติดตามการจัดส่งสินค้า
- **🔄 Auto-Reorder** - สั่งซื้อสินค้าซ้ำอัตโนมัติ
- **📱 QR Code Menu** - เมนูผ่าน QR Code
- **🎬 Product Videos** - วิดีโอแนะนำสินค้า
- **🌟 VIP Membership** - ระบบสมาชิก VIP

### 🛠️ Technical Improvements
- **🔄 State Management** - ใช้ Redux หรือ Context API
- **📦 Module Bundler** - เพิ่ม Webpack หรือ Vite
- **🧹 Code Quality** - ESLint, Prettier, Husky
- **🔧 Build Process** - Automated deployment pipeline
- **🗂️ File Organization** - แยกไฟล์ CSS และ JS ตามหน้าที่
- **⚡ Performance** - Image compression, Lazy loading, Code splitting
- **🧪 Testing** - Unit tests ด้วย Jest หรือ Vitest
- **📚 Documentation** - JSDoc comments และ API documentation

### 💾 Data Management
- **🗄️ Local Database** - ใช้ IndexedDB สำหรับข้อมูลขนาดใหญ่
- **🔄 Data Sync** - ซิงค์ข้อมูลระหว่าง tabs
- **📁 File Upload** - อัพโหลดรูปภาพสินค้า (ทดสอบ)
- **💾 Data Export** - ส่งออกข้อมูลเป็น CSV/JSON
- **🔐 Data Encryption** - เข้ารหัสข้อมูลสำคัญใน Local Storage

### 🎯 Business Logic
- **📊 Inventory Management** - จัดการสต็อกสินค้า
- **💵 Multi-Currency** - รองรับหลายสกุลเงิน
- **🌍 Multi-Language** - รองรับหลายภาษา (ไทย/อังกฤษ)
- **📈 Sales Analytics** - วิเคราะห์ยอดขาย
- **🎯 Marketing Tools** - เครื่องมือการตลาด (แบนเนอร์, โปรโมชัน)
- **📋 Order Management** - จัดการคำสั่งซื้อ
- **👥 Customer Management** - จัดการข้อมูลลูกค้า

### 🎨 Advanced Design
- **🌈 Theme Customization** - ปรับแต่งธีมได้
- **🎭 Animation Library** - ใช้ Framer Motion หรือ GSAP
- **🖼️ Image Processing** - ปรับแต่งรูปภาพ (ฟิลเตอร์, ครอป)
- **📱 Native App Feel** - UI/UX เหมือนแอปมือถือ
- **🎪 Parallax Effects** - เอฟเฟกต์ parallax scrolling
- **🔄 Skeleton Loading** - แสดง skeleton ขณะโหลด

## 🏆 การเรียนรู้และผลลัพธ์ที่คาดหวัง

### 📚 ทักษะที่จะได้รับ
- **Frontend Development** - HTML5, CSS3, JavaScript ES6+
- **Responsive Design** - Mobile-first approach
- **UX/UI Design** - User experience principles
- **Performance Optimization** - Web performance best practices
- **Testing** - Cross-browser and device testing
- **Git & Version Control** - Collaborative development

### 🎯 ผลลัพธ์ที่คาดหวัง
- เว็บไซต์ที่ใช้งานได้จริงและสมบูรณ์
- Portfolio project ที่น่าประทับใจ
- ความมั่นใจในการพัฒนาเว็บไซต์
- ประสบการณ์ในการทำงานแบบ Full-cycle development

---

## 📞 ข้อมูลติดต่อ (Contact Information)

- **📧 Email**: developer@fruitshop-project.com
- **💬 Discord**: FruitShop Dev Community
- **🐦 Twitter**: @FruitShopDev
- **📱 LINE**: @fruitshop-dev

---

*โปรเจกต์นี้พัฒนาด้วยใจรักในการเรียนรู้และความตั้งใจที่จะทำให้สำเร็จ* 🌟

**"From Idea to Reality - One Fruit at a Time"** 🍎✨