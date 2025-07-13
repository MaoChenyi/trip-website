// 等待DOM加載完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 搜索標籤切換功能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const searchForms = document.querySelectorAll('.search-form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活動狀態
            tabButtons.forEach(btn => btn.classList.remove('active'));
            searchForms.forEach(form => form.classList.remove('active'));
            
            // 添加活動狀態到當前選中的標籤
            this.classList.add('active');
            document.getElementById(targetTab + '-form').classList.add('active');
        });
    });
    
    // 導航欄滾動效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滾動
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滾動
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 平滑滾動到錨點
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // 搜索按鈕點擊事件
    const searchButtons = document.querySelectorAll('.search-btn');
    searchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 顯示加載狀態
            const originalText = this.textContent;
            this.textContent = '搜尋中...';
            this.disabled = true;
            
            // 模擬搜索過程
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                // 顯示成功消息
                showNotification('搜索完成！正在為您查找最佳選項...', 'success');
            }, 2000);
        });
    });
    
    // 優惠卡片點擊事件
    const offerButtons = document.querySelectorAll('.btn-offer');
    offerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('正在跳轉到預訂頁面...', 'info');
        });
    });
    
    // 目的地卡片點擊事件
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const destination = this.querySelector('h3').textContent;
            showNotification(`正在搜索 ${destination} 的旅遊選項...`, 'info');
        });
    });
    
    // 登入和註冊按鈕事件
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showNotification('登入功能即將推出！', 'info');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            showNotification('註冊功能即將推出！', 'info');
        });
    }
    
    // 表單驗證
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                const errorMessage = this.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
    
    // 動畫效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 觀察需要動畫的元素
    const animatedElements = document.querySelectorAll('.destination-card, .offer-card, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 價格格式化
    function formatPrice(price) {
        return new Intl.NumberFormat('zh-HK', {
            style: 'currency',
            currency: 'HKD'
        }).format(price);
    }
    
    // 顯示通知消息
    function showNotification(message, type = 'info') {
        // 創建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // 添加樣式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // 添加到頁面
        document.body.appendChild(notification);
        
        // 顯示動畫
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 關閉按鈕事件
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // 自動關閉
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // 輸入驗證
    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // 移除現有錯誤
        input.classList.remove('error');
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // 驗證邏輯
        if (input.type === 'date') {
            if (value && new Date(value) < new Date()) {
                isValid = false;
                errorMessage = '日期不能是過去';
            }
        }
        
        if (input.placeholder && input.placeholder.includes('HKG') && value && value.length < 3) {
            isValid = false;
            errorMessage = '請輸入有效的機場代碼';
        }
        
        // 顯示錯誤
        if (!isValid) {
            input.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            errorElement.style.cssText = `
                color: #f44336;
                font-size: 0.8rem;
                margin-top: 0.25rem;
            `;
            input.parentNode.appendChild(errorElement);
        }
    }
    
    // 添加錯誤樣式到CSS
    const style = document.createElement('style');
    style.textContent = `
        .form-input.error {
            border-color: #f44336 !important;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 1rem;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // 初始化日期輸入的默認值
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    dateInputs.forEach((input, index) => {
        if (index % 2 === 0) {
            input.value = tomorrow;
        } else {
            input.value = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        }
    });
    
    // 多語言文本映射
    const translations = {
        zh: {
            nav: ["機票", "酒店", "旅遊套票", "租車", "景點門票", "旅遊保險"],
            login: "登入",
            register: "註冊",
            langBtn: "繁體中文｜English",
            heroTitle: "探索世界的美好",
            heroDesc: "預訂您的完美旅程，享受最優惠的價格",
            tabFlights: "機票",
            tabHotels: "酒店",
            tabPackages: "旅遊套票",
            flights: {
                from: "出發地",
                to: "目的地",
                depart: "出發日期",
                return: "回程日期",
                pax: "乘客",
                class: "艙等",
                search: "搜尋機票",
                options: ["1 成人", "2 成人", "3 成人"],
                classOptions: ["經濟艙", "商務艙", "頭等艙"]
            },
            hotels: {
                to: "目的地",
                checkin: "入住日期",
                checkout: "退房日期",
                rooms: "房間數",
                adults: "成人",
                children: "兒童",
                search: "搜尋酒店",
                roomOptions: ["1 間", "2 間", "3 間"],
                adultOptions: ["1", "2", "3"],
                childOptions: ["0", "1", "2"]
            },
            hotDest: "熱門目的地",
            destinations: [
                { city: "東京", country: "日本", price: "由 HK$ 2,500 起" },
                { city: "首爾", country: "韓國", price: "由 HK$ 2,200 起" },
                { city: "台北", country: "台灣", price: "由 HK$ 1,800 起" },
                { city: "曼谷", country: "泰國", price: "由 HK$ 1,500 起" }
            ],
            offers: "限時優惠",
            offerCards: [
                { badge: "限時優惠", title: "歐洲精選旅遊", desc: "巴黎、羅馬、巴塞隆拿 10日遊", original: "HK$ 15,000", discount: "HK$ 12,000", btn: "立即預訂" },
                { badge: "早鳥優惠", title: "韓國首爾自由行", desc: "機票+酒店 5日4夜", original: "HK$ 4,500", discount: "HK$ 3,800", btn: "立即預訂" }
            ],
            features: [
                { title: "安全可靠", desc: "24/7 客戶支援，確保您的旅程安全無憂" },
                { title: "最優價格", desc: "保證最優惠的價格，如有更便宜我們會退款差額" },
                { title: "隨時預訂", desc: "手機應用程式讓您隨時隨地輕鬆預訂" },
                { title: "會員獎勵", desc: "累積積分兌換免費機票和酒店住宿" }
            ],
            footer: {
                about: "關於我們", aboutLinks: ["公司簡介", "聯絡我們", "加入我們", "新聞中心"],
                service: "客戶服務", serviceLinks: ["幫助中心", "預訂查詢", "退款政策", "旅遊保險"],
                product: "旅遊產品", productLinks: ["機票", "酒店", "旅遊套票", "租車"],
                follow: "關注我們",
                copyright: "© 2024 旅遊網. 版權所有."
            }
        },
        en: {
            nav: ["Flights", "Hotels", "Packages", "Car Rental", "Attractions", "Insurance"],
            login: "Login",
            register: "Sign Up",
            langBtn: "English｜繁體中文",
            heroTitle: "Explore the Beauty of the World",
            heroDesc: "Book your perfect trip at the best price",
            tabFlights: "Flights",
            tabHotels: "Hotels",
            tabPackages: "Packages",
            flights: {
                from: "From",
                to: "To",
                depart: "Departure Date",
                return: "Return Date",
                pax: "Passengers",
                class: "Class",
                search: "Search Flights",
                options: ["1 Adult", "2 Adults", "3 Adults"],
                classOptions: ["Economy", "Business", "First"]
            },
            hotels: {
                to: "Destination",
                checkin: "Check-in Date",
                checkout: "Check-out Date",
                rooms: "Rooms",
                adults: "Adults",
                children: "Children",
                search: "Search Hotels",
                roomOptions: ["1 Room", "2 Rooms", "3 Rooms"],
                adultOptions: ["1", "2", "3"],
                childOptions: ["0", "1", "2"]
            },
            hotDest: "Popular Destinations",
            destinations: [
                { city: "Tokyo", country: "Japan", price: "From HK$ 2,500" },
                { city: "Seoul", country: "Korea", price: "From HK$ 2,200" },
                { city: "Taipei", country: "Taiwan", price: "From HK$ 1,800" },
                { city: "Bangkok", country: "Thailand", price: "From HK$ 1,500" }
            ],
            offers: "Special Offers",
            offerCards: [
                { badge: "Special", title: "Europe Tour", desc: "Paris, Rome, Barcelona 10 Days", original: "HK$ 15,000", discount: "HK$ 12,000", btn: "Book Now" },
                { badge: "Early Bird", title: "Seoul Free Trip", desc: "Flight+Hotel 5D4N", original: "HK$ 4,500", discount: "HK$ 3,800", btn: "Book Now" }
            ],
            features: [
                { title: "Safe & Reliable", desc: "24/7 customer support for a worry-free journey" },
                { title: "Best Price", desc: "Guaranteed best price or we refund the difference" },
                { title: "Book Anytime", desc: "Mobile app lets you book anytime, anywhere" },
                { title: "Member Rewards", desc: "Earn points for free flights and hotels" }
            ],
            footer: {
                about: "About Us", aboutLinks: ["About", "Contact", "Join Us", "News"],
                service: "Customer Service", serviceLinks: ["Help Center", "Booking Inquiry", "Refund Policy", "Insurance"],
                product: "Products", productLinks: ["Flights", "Hotels", "Packages", "Car Rental"],
                follow: "Follow Us",
                copyright: "© 2024 Trip Website. All rights reserved."
            }
        }
    };

    // 語言切換邏輯
    let lang = localStorage.getItem('lang') || 'zh';
    const langBtn = document.getElementById('lang-toggle');

    function applyLang() {
        const t = translations[lang];
        // 導航
        document.querySelectorAll('.nav-menu .nav-link').forEach((el, i) => { el.textContent = t.nav[i]; });
        document.querySelector('.btn-login').textContent = t.login;
        document.querySelector('.btn-register').textContent = t.register;
        langBtn.textContent = t.langBtn;
        // 英雄區
        document.querySelector('.hero-content h1').textContent = t.heroTitle;
        document.querySelector('.hero-content p').textContent = t.heroDesc;
        // 搜索標籤
        document.querySelectorAll('.tab-btn').forEach((el, i) => {
            if(i===0) el.innerHTML = '<i class="fas fa-plane"></i> ' + t.tabFlights;
            if(i===1) el.innerHTML = '<i class="fas fa-bed"></i> ' + t.tabHotels;
            if(i===2) el.innerHTML = '<i class="fas fa-suitcase"></i> ' + t.tabPackages;
        });
        // 機票表單
        const f = t.flights;
        const flightForm = document.getElementById('flights-form');
        if(flightForm) {
            flightForm.querySelectorAll('label')[0].textContent = f.from;
            flightForm.querySelectorAll('label')[1].textContent = f.to;
            flightForm.querySelectorAll('label')[2].textContent = f.depart;
            flightForm.querySelectorAll('label')[3].textContent = f.return;
            flightForm.querySelectorAll('label')[4].textContent = f.pax;
            flightForm.querySelectorAll('label')[5].textContent = f.class;
            flightForm.querySelector('.search-btn').textContent = f.search;
            // select options
            let sel1 = flightForm.querySelectorAll('select')[0];
            let sel2 = flightForm.querySelectorAll('select')[1];
            sel1.querySelectorAll('option').forEach((o,i)=>o.textContent=f.options[i]);
            sel2.querySelectorAll('option').forEach((o,i)=>o.textContent=f.classOptions[i]);
        }
        // 酒店表單
        const h = t.hotels;
        const hotelForm = document.getElementById('hotels-form');
        if(hotelForm) {
            hotelForm.querySelectorAll('label')[0].textContent = h.to;
            hotelForm.querySelectorAll('label')[1].textContent = h.checkin;
            hotelForm.querySelectorAll('label')[2].textContent = h.checkout;
            hotelForm.querySelectorAll('label')[3].textContent = h.rooms;
            hotelForm.querySelectorAll('label')[4].textContent = h.adults;
            hotelForm.querySelectorAll('label')[5].textContent = h.children;
            hotelForm.querySelector('.search-btn').textContent = h.search;
            // select options
            let sel1 = hotelForm.querySelectorAll('select')[0];
            let sel2 = hotelForm.querySelectorAll('select')[1];
            let sel3 = hotelForm.querySelectorAll('select')[2];
            sel1.querySelectorAll('option').forEach((o,i)=>o.textContent=h.roomOptions[i]);
            sel2.querySelectorAll('option').forEach((o,i)=>o.textContent=h.adultOptions[i]);
            sel3.querySelectorAll('option').forEach((o,i)=>o.textContent=h.childOptions[i]);
        }
        // 熱門目的地/優惠標題
        document.querySelector('.destinations h2').textContent = t.hotDest;
        document.querySelector('.offers h2').textContent = t.offers;
        // 熱門目的地
        document.querySelectorAll('.destination-card').forEach((card, i) => {
            card.querySelector('h3').textContent = t.destinations[i].city;
            card.querySelector('p').textContent = t.destinations[i].country;
            card.querySelector('.price').textContent = t.destinations[i].price;
        });
        // 優惠卡片
        document.querySelectorAll('.offer-card').forEach((card, i) => {
            card.querySelector('.offer-badge').textContent = t.offerCards[i].badge;
            card.querySelector('h3').textContent = t.offerCards[i].title;
            card.querySelector('p').textContent = t.offerCards[i].desc;
            card.querySelector('.original-price').textContent = t.offerCards[i].original;
            card.querySelector('.discount-price').textContent = t.offerCards[i].discount;
            card.querySelector('.btn-offer').textContent = t.offerCards[i].btn;
        });
        // 服務特色
        document.querySelectorAll('.feature-item').forEach((item, i) => {
            item.querySelector('h3').textContent = t.features[i].title;
            item.querySelector('p').textContent = t.features[i].desc;
        });
        // 頁腳
        const fs = document.querySelectorAll('.footer-section');
        if(fs.length>=4) {
            fs[0].querySelector('h4').textContent = t.footer.about;
            fs[0].querySelectorAll('ul li a').forEach((a,i)=>a.textContent=t.footer.aboutLinks[i]);
            fs[1].querySelector('h4').textContent = t.footer.service;
            fs[1].querySelectorAll('ul li a').forEach((a,i)=>a.textContent=t.footer.serviceLinks[i]);
            fs[2].querySelector('h4').textContent = t.footer.product;
            fs[2].querySelectorAll('ul li a').forEach((a,i)=>a.textContent=t.footer.productLinks[i]);
            fs[3].querySelector('h4').textContent = t.footer.follow;
        }
        document.querySelector('.footer-bottom p').textContent = t.footer.copyright;
    }

    applyLang();

    langBtn.addEventListener('click', function() {
        lang = lang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('lang', lang);
        applyLang();
    });
    
    console.log('旅遊網站已成功加載！');
}); 