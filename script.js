// Translation system
const translations = {
    ru: {
        name: 'nixiers',
        info: 'PRO / MAX LEVEL',
        info2: 'Full Stack Developer',
        bio: 'Профессиональная разработка веб-приложений и ботов для Discord и Telegram',
        subheader: 'ОБО МНЕ',
        description: 'Создаю современные веб-приложения и интеллектуальных ботов для вашего использования. Использую передовые технологии для достижения максимальной эффективности.',
        subheader2: 'НАВЫКИ',
        text1: 'Frontend',
        text2: 'Backend',
        text3: '5+ лет',
        text4: '50+ проектов',
        info3: 'HTML, CSS, JavaScript, React, Vue.js',
        info4: 'Node.js, Python, PHP, базы данных SQL и NoSQL',
        info5: 'Разработки веб-приложений различной сложности',
        info6: 'Успешно реализованных ботов для Discord и Telegram',
        second_subheader: 'ОПЫТ РАБОТЫ',
        services_title: 'МОИ УСЛУГИ',
        service1_title: 'Создание сайтов',
        service1_desc: 'Разработка уникальных сайтов под ваши нужды',
        service2_title: 'Discord боты',
        service2_desc: 'Создание ботов для Discord с любыми функциями',
        service3_title: 'Telegram боты',
        service3_desc: 'Разработка Telegram ботов для бизнеса и развлечений',
        order_btn: 'Заказать',
        goal: 'Цель',
        order_title: 'Заказ услуги',
        client_name: 'Ваше имя:',
        client_email: 'Email:',
        client_telegram: 'Telegram (@username):',
        project_desc: 'Описание проекта:',
        submit_order: 'Отправить заявку',
        success_order: 'Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
        error_order: 'Произошла ошибка при отправке заявки. Попробуйте еще раз.',
        success_order_local: 'Ваша заявка сохранена локально. Мы свяжемся с вами в ближайшее время.',
        bot_test_title: 'ТЕСТ TELEGRAM БОТА',
        bot_test_desc: 'Проверьте работу уведомлений Telegram бота',
        test_bot_btn: 'Отправить тестовое уведомление',
        bot_test_success: '✅ Тестовое уведомление успешно отправлено в Telegram!',
        bot_test_error: '❌ Ошибка отправки. Проверьте настройки бота в .env файле',
        bot_test_loading: '🔄 Отправка тестового уведомления...'
    },
    en: {
        name: 'nixiers',
        info: 'PRO / MAX LEVEL',
        info2: 'Full Stack Developer',
        bio: 'Professional development of web applications and bots for Discord and Telegram',
        subheader: 'ABOUT ME',
        description: 'I create modern web applications and intelligent bots for your use. I use advanced technologies to achieve maximum efficiency.',
        subheader2: 'SKILLS',
        text1: 'Frontend',
        text2: 'Backend',
        text3: '5+ years',
        text4: '50+ projects',
        info3: 'HTML, CSS, JavaScript, React, Vue.js',
        info4: 'Node.js, Python, PHP, SQL and NoSQL databases',
        info5: 'Development of web applications of varying complexity',
        info6: 'Successfully implemented bots for Discord and Telegram',
        second_subheader: 'WORK EXPERIENCE',
        services_title: 'MY SERVICES',
        service1_title: 'Website Development',
        service1_desc: 'Creating unique websites tailored to your needs',
        service2_title: 'Discord Bots',
        service2_desc: 'Creating Discord bots with any functionality',
        service3_title: 'Telegram Bots',
        service3_desc: 'Developing Telegram bots for business and entertainment',
        order_btn: 'Order',
        goal: 'Goal',
        order_title: 'Order Service',
        client_name: 'Your name:',
        client_email: 'Email:',
        client_telegram: 'Telegram (@username):',
        project_desc: 'Project description:',
        submit_order: 'Submit Request',
        success_order: 'Your request has been successfully sent! We will contact you soon.',
        error_order: 'An error occurred while sending the request. Please try again.',
        success_order_local: 'Your request has been saved locally. We will contact you soon.',
        bot_test_title: 'TELEGRAM BOT TEST',
        bot_test_desc: 'Test Telegram bot notifications',
        test_bot_btn: 'Send Test Notification',
        bot_test_success: '✅ Test notification successfully sent to Telegram!',
        bot_test_error: '❌ Send error. Check bot settings in .env file',
        bot_test_loading: '🔄 Sending test notification...'
    }
};

let currentLanguage = 'ru';

// Function to switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'ru';
    switchLanguage(savedLang);
}

// Основные функции для работы сайта
document.addEventListener('DOMContentLoaded', function() {
    // Load language preference
    loadLanguagePreference();
    
    // Инициализация форм
    initForms();
    
    // Анимация счетчика
    animateCounter();
});

// Функции модальных окон
function openOrderModal(serviceType) {
    const modal = document.getElementById('orderModal');
    const serviceInput = document.getElementById('serviceType');
    serviceInput.value = serviceType;
    modal.style.display = 'block';
    
    // Обновляем заголовок в зависимости от типа услуги
    const modalTitle = modal.querySelector('h2');
    switch(serviceType) {
        case 'website':
            modalTitle.textContent = translations[currentLanguage].order_website;
            break;
        case 'discord':
            modalTitle.textContent = translations[currentLanguage].order_discord;
            break;
        case 'telegram':
            modalTitle.textContent = translations[currentLanguage].order_telegram;
            break;
    }
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
}

// Инициализация форм
function initForms() {
    // Форма заказа
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitOrder();
        });
    }

    // Закрытие модальных окон при клике вне их
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// Отправка заказа
async function submitOrder() {
    const formData = new FormData(document.getElementById('orderForm'));
    const orderData = {
        serviceType: formData.get('serviceType'),
        clientName: formData.get('clientName'),
        clientEmail: formData.get('clientEmail'),
        clientTelegram: formData.get('clientTelegram'),
        projectDescription: formData.get('projectDescription'),
        timestamp: new Date().toISOString()
    };
    
    try {
        // Отправка на сервер
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            closeOrderModal();
        } else {
            alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
        }
    } catch (error) {
        console.error('Error:', error);
        // Временно сохраняем в localStorage для демонстрации
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        alert('Ваша заявка сохранена локально. Мы свяжемся с вами в ближайшее время.');
        closeOrderModal();
    }
}

// Анимация счетчика
function animateCounter() {
    const digits = document.querySelectorAll('.counter-digit');
    let currentValue = 0;
    
    setInterval(() => {
        currentValue = (currentValue + 1) % 10000;
        const valueString = currentValue.toString().padStart(4, '0');
        
        digits.forEach((digit, index) => {
            digit.textContent = valueString[index];
        });
    }, 1000);
}

// Функция теста Telegram бота
async function testTelegramBot() {
    const statusDiv = document.getElementById('botStatus');
    const testBtn = document.querySelector('.test-bot-btn');
    
    // Показываем статус загрузки
    statusDiv.className = 'bot-status loading';
    statusDiv.textContent = translations[currentLanguage].bot_test_loading;
    testBtn.disabled = true;
    
    try {
        // Отправляем тестовое уведомление
        const testData = {
            serviceType: 'test',
            clientName: 'Test User',
            clientEmail: 'test@example.com',
            clientTelegram: '@test',
            projectDescription: 'Это тестовое уведомление для проверки работы Telegram бота',
            timestamp: new Date().toISOString(),
            isTest: true
        };
        
        console.log('🧪 Sending test request...');
        
        // Отправляем через Telegram Bot API
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        const result = await response.json();
        console.log('📡 Test response:', result);
        
        if (response.ok && result.success) {
            statusDiv.className = 'bot-status success';
            statusDiv.textContent = translations[currentLanguage].bot_test_success;
        } else {
            // Показываем детальную информацию об ошибке
            const errorMsg = result.details || result.error || 'Unknown error';
            const debugInfo = result.debug ? `

Debug info:
Token: ${result.debug.tokenSet ? '✅' : '❌'}
Chat ID: ${result.debug.chatIdSet ? '✅' : '❌'}` : '';
            
            statusDiv.className = 'bot-status error';
            statusDiv.innerHTML = `${translations[currentLanguage].bot_test_error}<br><small>${errorMsg}${debugInfo}</small>`;
        }
        
    } catch (error) {
        console.error('🚨 Telegram bot test error:', error);
        statusDiv.className = 'bot-status error';
        statusDiv.innerHTML = `${translations[currentLanguage].bot_test_error}<br><small>Network error: ${error.message}</small>`;
    } finally {
        testBtn.disabled = false;
        // Очищаем статус через 10 секунд
        setTimeout(() => {
            statusDiv.className = 'bot-status';
            statusDiv.textContent = '';
        }, 10000);
    }
}

// Telegram Bot API функции
class TelegramBotManager {
    constructor() {
        this.botToken = 'YOUR_BOT_TOKEN'; // Нужно будет заменить на реальный токен
        this.chatId = 'YOUR_CHAT_ID'; // Нужно будет заменить на реальный chat_id
    }
    
    // Функция теста Telegram бота
    async testTelegramBot() {
        const statusDiv = document.getElementById('botStatus');
        const testBtn = document.querySelector('.test-bot-btn');
        
        // Показываем статус загрузки
        statusDiv.className = 'bot-status loading';
        statusDiv.textContent = translations[currentLanguage].bot_test_loading;
        testBtn.disabled = true;
        
        try {
            // Отправляем тестовое уведомление
            const testData = {
                serviceType: 'test',
                clientName: 'Test User',
                clientEmail: 'test@example.com',
                clientTelegram: '@test',
                projectDescription: 'Это тестовое уведомление для проверки работы Telegram бота',
                timestamp: new Date().toISOString(),
                isTest: true
            };
            
            // Отправляем через Telegram Bot API
            const response = await fetch(WORKER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData)
            });
            
            if (response.ok) {
                statusDiv.className = 'bot-status success';
                statusDiv.textContent = translations[currentLanguage].bot_test_success;
            } else {
                throw new Error('Bot API error');
            }
            
        } catch (error) {
            console.error('Telegram bot test error:', error);
            statusDiv.className = 'bot-status error';
            statusDiv.textContent = translations[currentLanguage].bot_test_error;
        } finally {
            testBtn.disabled = false;
            // Очищаем статус через 5 секунд
            setTimeout(() => {
                statusDiv.className = 'bot-status';
                statusDiv.textContent = '';
            }, 5000);
        }
    }

    // Отправка уведомления о новом заказе
    async sendOrderNotification(orderData) {
        const message = `
🆕 НОВЫЙ ЗАКАЗ!

📋 Услуга: ${getServiceName(orderData.serviceType)}
👤 Клиент: ${orderData.clientName}
📧 Email: ${orderData.clientEmail}
📱 Telegram: ${orderData.clientTelegram}

📝 Описание:
${orderData.projectDescription}

⏰ Время: ${new Date(orderData.timestamp).toLocaleString()}
        `;
        
        try {
            const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            return await response.json();
        } catch (error) {
            console.error('Telegram API Error:', error);
            return null;
        }
    }
    
    // Отправка уведомления о статусе заказа
    async sendStatusUpdate(orderData, status) {
        const message = `
📊 ОБНОВЛЕНИЕ СТАТУСА ЗАКАЗА

👤 Клиент: ${orderData.clientName}
📋 Услуга: ${getServiceName(orderData.serviceType)}
🔄 Новый статус: ${status}

⏰ Время: ${new Date().toLocaleString()}
        `;
        
        try {
            const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            return await response.json();
        } catch (error) {
            console.error('Telegram API Error:', error);
            return null;
        }
    }
}

// URL Cloudflare Worker (замени на свой после деплоя)
const WORKER_URL = 'https://majestic-telegram-bot.nkabanskij.workers.dev/order';

// Обновляем функцию отправки заказа через Cloudflare Worker
async function submitOrder() {
    const formData = new FormData(document.getElementById('orderForm'));
    const orderData = {
        serviceType: formData.get('serviceType'),
        clientName: formData.get('clientName'),
        clientEmail: formData.get('clientEmail'),
        clientTelegram: formData.get('clientTelegram'),
        projectDescription: formData.get('projectDescription'),
        timestamp: new Date().toISOString()
    };

    try {
        // Отправка на Cloudflare Worker
        const response = await fetch(WORKER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert(translations[currentLanguage].success_order);
            closeOrderModal();
        } else {
            throw new Error('Failed to send order');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(translations[currentLanguage].error_order);
    }
}
