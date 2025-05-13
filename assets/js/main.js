// Основные функции JavaScript для сайта "Байты истории"

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация основных функций
    initHamburgerMenu();
    initAnimations();
    detectScroll();
    
    // Инициализация дополнительных функций, если они доступны на странице
    if (document.querySelector('.timeline-decades')) {
        initTimelineNavigation();
    }
});

// Обработка гамбургер-меню
function initHamburgerMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-navigation');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Блокировка/разблокировка прокрутки страницы при открытом меню
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Закрытие меню при клике вне области меню
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !menuToggle.contains(event.target) && mainNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Инициализация анимаций при прокрутке
function initAnimations() {
    // Выбираем все элементы, которые нужно анимировать
    const animatedElements = document.querySelectorAll('.section-title, .card, .interactive-card');
    
    // Опции для Intersection Observer
    const options = {
        root: null, // используем viewport
        rootMargin: '0px',
        threshold: 0.1 // элемент считается видимым, когда 10% его площади видно
    };
    
    // Функция-обработчик для видимых элементов
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Перестаем наблюдать за элементом после того, как он появился
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Создаем и запускаем observer
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(handleIntersection, options);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Обнаружение прокрутки для эффектов и анимаций
function detectScroll() {
    const header = document.querySelector('.site-header');
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        // Добавляем класс для хедера при прокрутке
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Обработка навигации по временной шкале
function initTimelineNavigation() {
    const timelineContainer = document.querySelector('.timeline-decades');
    
    // Обработка горизонтального скролла с помощью колесика мыши
    if (timelineContainer) {
        timelineContainer.addEventListener('wheel', function(e) {
            e.preventDefault();
            timelineContainer.scrollLeft += e.deltaY;
        });
        
        // Автоматическое центрирование текущего выбранного десятилетия
        const currentDecade = timelineContainer.querySelector('.decade-item.current');
        if (currentDecade) {
            const containerWidth = timelineContainer.offsetWidth;
            const itemLeft = currentDecade.offsetLeft;
            const itemWidth = currentDecade.offsetWidth;
            
            // Прокручиваем контейнер до центрированного положения текущего элемента
            timelineContainer.scrollLeft = itemLeft - (containerWidth / 2) + (itemWidth / 2);
        }
    }
}

// Функция для плавного перехода между страницами
function pageTransition(targetUrl) {
    // Запоминаем текущую страницу для анимации
    const currentPage = document.querySelector('.app-container');
    
    // Применяем анимацию исчезновения
    currentPage.classList.add('page-exit');
    
    // Переход на новую страницу после завершения анимации
    setTimeout(function() {
        window.location.href = targetUrl;
    }, 300);
    
    // Предотвращаем стандартный переход для чистой анимации
    return false;
}

// Эффект трансформации интерфейса при переходе между эпохами
function transformInterface(eraClass) {
    const body = document.body;
    
    // Удаляем все классы эпох
    body.classList.remove('era-1950', 'era-1960', 'era-1970', 'era-1980', 'era-1990', 'era-2000', 'era-2010', 'era-2020');
    
    // Добавляем класс текущей эпохи
    body.classList.add(eraClass);
    
    // Применяем анимацию перехода
    const transformElements = document.querySelectorAll('.transform-element');
    transformElements.forEach(element => {
        element.classList.add('era-transition');
        
        // Удаляем класс анимации после её завершения
        setTimeout(function() {
            element.classList.remove('era-transition');
        }, 500);
    });
}