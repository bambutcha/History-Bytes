// Функции для работы с временной шкалой и переходами между эпохами

document.addEventListener('DOMContentLoaded', function() {
    initTimelineScroll();
    initEraTransformations();
    setupTimelineNavigation();
});

// Инициализация горизонтального скролла временной шкалы
function initTimelineScroll() {
    const timeline = document.querySelector('.timeline-decades');
    
    if (!timeline) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // Обработчики событий для перетаскивания на десктопе
    timeline.addEventListener('mousedown', (e) => {
        isDown = true;
        timeline.classList.add('active');
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
    });
    
    timeline.addEventListener('mouseleave', () => {
        isDown = false;
        timeline.classList.remove('active');
    });
    
    timeline.addEventListener('mouseup', () => {
        isDown = false;
        timeline.classList.remove('active');
    });
    
    timeline.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2; // Скорость прокрутки
        timeline.scrollLeft = scrollLeft - walk;
    });
    
    // Обработка скролла колесиком мыши для горизонтальной прокрутки
    timeline.addEventListener('wheel', (e) => {
        e.preventDefault();
        timeline.scrollLeft += e.deltaY;
    });
    
    // Показываем/скрываем индикатор прокрутки
    const scrollIndicator = document.querySelector('.timeline-scroll-indicator');
    
    if (scrollIndicator) {
        // Скрываем индикатор после первого скролла
        timeline.addEventListener('scroll', () => {
            if (timeline.scrollLeft > 20) {
                scrollIndicator.style.opacity = '0';
                setTimeout(() => {
                    scrollIndicator.style.display = 'none';
                }, 500);
            }
        });
        
        // И после первого тача/клика
        timeline.addEventListener('touchstart', () => {
            scrollIndicator.style.opacity = '0';
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 500);
        });
        
        timeline.addEventListener('mousedown', () => {
            scrollIndicator.style.opacity = '0';
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 500);
        });
    }
}

// Функция для трансформации интерфейса при переходе между эпохами
function initEraTransformations() {
    const decadeItems = document.querySelectorAll('.decade-item');
    
    decadeItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Получаем класс эры из класса элемента
            const classes = this.classList;
            let eraClass = '';
            
            for (let i = 0; i < classes.length; i++) {
                if (classes[i].startsWith('era-')) {
                    eraClass = classes[i];
                    break;
                }
            }
            
            if (eraClass) {
                // Применяем эффект трансформации перед переходом
                document.body.classList.add('transitioning');
                document.body.classList.add(eraClass);
                
                // Сохраняем эпоху в localStorage для применения стилей на целевой странице
                localStorage.setItem('currentEra', eraClass);
                
                // Добавляем анимацию исчезновения
                document.querySelector('.app-container').classList.add('fade-out');
                
                // Переходим на страницу после анимации
                setTimeout(() => {
                    window.location.href = this.getAttribute('href');
                }, 500);
            } else {
                // Если класс эры не найден, просто переходим по ссылке
                window.location.href = this.getAttribute('href');
            }
        });
    });
    
    // Применяем сохраненный стиль эпохи при загрузке страницы
    const currentEra = localStorage.getItem('currentEra');
    
    if (currentEra && document.querySelector('.decade-page')) {
        document.body.classList.add(currentEra);
        
        // Применяем стили для трансформируемых элементов
        applyEraStyles(currentEra);
    }
}

// Применение стилей эпохи к элементам интерфейса
function applyEraStyles(eraClass) {
    // Установка основных переменных CSS в зависимости от эпохи
    const root = document.documentElement;
    
    // Объект с настройками для каждой эпохи
    const eraStyles = {
        'era-1950': {
            '--primary-color': '#26733F',
            '--secondary-color': '#A8E9C0',
            '--background-color': '#011402',
            '--text-color': '#A8E9C0',
            '--heading-font': '"VT323", monospace',
            '--body-font': '"VT323", monospace',
            '--border-radius': '0px',
        },
        'era-1960': {
            '--primary-color': '#3A9188',
            '--secondary-color': '#B66D18',
            '--background-color': '#081D1A',
            '--text-color': '#C4F0EC',
            '--heading-font': '"VT323", monospace',
            '--body-font': '"VT323", monospace',
            '--border-radius': '0px',
        },
        'era-1970': {
            '--primary-color': '#2574B8',
            '--secondary-color': '#FFA030',
            '--background-color': '#081A2D',
            '--text-color': '#CCDDF3',
            '--heading-font': '"Press Start 2P", cursive',
            '--body-font': '"VT323", monospace',
            '--border-radius': '2px',
        },
        'era-1980': {
            '--primary-color': '#4848FF',
            '--secondary-color': '#FFC000',
            '--background-color': '#000084',
            '--text-color': '#FFFFFF',
            '--heading-font': '"Press Start 2P", cursive',
            '--body-font': '"IBM Plex Mono", monospace',
            '--border-radius': '0px',
        },
        'era-1990': {
            '--primary-color': '#0000AA',
            '--secondary-color': '#AA0000',
            '--background-color': '#008080',
            '--text-color': '#000000',
            '--heading-font': '"MS Sans Serif", "Segoe UI", sans-serif',
            '--body-font': '"MS Sans Serif", "Segoe UI", sans-serif',
            '--border-radius': '2px',
        },
        'era-2000': {
            '--primary-color': '#3B5998',
            '--secondary-color': '#FF4500',
            '--background-color': '#ECECEC',
            '--text-color': '#333333',
            '--heading-font': '"Segoe UI", Arial, sans-serif',
            '--body-font': 'Arial, sans-serif',
            '--border-radius': '4px',
        },
        'era-2010': {
            '--primary-color': '#1DA1F2',
            '--secondary-color': '#FF5700',
            '--background-color': '#FFFFFF',
            '--text-color': '#14171A',
            '--heading-font': '"Roboto", sans-serif',
            '--body-font': '"Open Sans", sans-serif',
            '--border-radius': '8px',
        },
        'era-2020': {
            '--primary-color': '#2465e9',
            '--secondary-color': '#e94e1b',
            '--background-color': '#FFFFFF',
            '--text-color': '#232527',
            '--heading-font': '"Montserrat", sans-serif',
            '--body-font': '"Open Sans", sans-serif',
            '--border-radius': '12px',
        }
    };
    
    // Применяем стили выбранной эпохи
    if (eraStyles[eraClass]) {
        const style = eraStyles[eraClass];
        
        for (const property in style) {
            root.style.setProperty(property, style[property]);
        }
    }
    
    // Добавляем специфичные для эпохи элементы
    const headerElement = document.querySelector('.site-header');
    
    if (headerElement) {
        // Очищаем предыдущие декоративные элементы
        const oldDecorElements = headerElement.querySelectorAll('.era-decor');
        oldDecorElements.forEach(el => el.remove());
        
        // Добавляем элементы в зависимости от эпохи
        if (eraClass === 'era-1950' || eraClass === 'era-1960') {
            // Добавляем терминальный курсор для ретро-эпох
            const cursor = document.createElement('div');
            cursor.classList.add('era-decor', 'terminal-cursor');
            headerElement.appendChild(cursor);
        } else if (eraClass === 'era-1980' || eraClass === 'era-1990') {
            // Добавляем пиксельные декоративные элементы
            const pixelDecor = document.createElement('div');
            pixelDecor.classList.add('era-decor', 'pixel-decor');
            headerElement.appendChild(pixelDecor);
        }
    }
    
    // Трансформируем кнопки и интерактивные элементы
    transformButtons(eraClass);
}

// Трансформация кнопок и интерактивных элементов в соответствии с эпохой
function transformButtons(eraClass) {
    const buttons = document.querySelectorAll('button, .button, .cta-button');
    
    buttons.forEach(button => {
        // Удаляем предыдущие классы эпох
        button.classList.remove('btn-1950', 'btn-1960', 'btn-1970', 'btn-1980', 'btn-1990', 'btn-2000', 'btn-2010', 'btn-2020');
        
        // Добавляем класс текущей эпохи
        const decade = eraClass.replace('era-', 'btn-');
        button.classList.add(decade);
    });
}

// Настройка навигации между страницами десятилетий
function setupTimelineNavigation() {
    const prevButton = document.querySelector('.era-nav-button.prev');
    const nextButton = document.querySelector('.era-nav-button.next');
    
    // Карта переходов между десятилетиями
    const decadeMap = {
        '1950s': { prev: null, next: '1960s' },
        '1960s': { prev: '1950s', next: '1970s' },
        '1970s': { prev: '1960s', next: '1980s' },
        '1980s': { prev: '1970s', next: '1990s' },
        '1990s': { prev: '1980s', next: '2000s' },
        '2000s': { prev: '1990s', next: '2010s' },
        '2010s': { prev: '2000s', next: '2020s' },
        '2020s': { prev: '2010s', next: null }
    };
    
    // Получаем текущее десятилетие из URL
    const path = window.location.pathname;
    const decadeMatch = path.match(/(\d{4})s\.html/);
    
    if (decadeMatch) {
        const currentDecade = decadeMatch[1] + 's';
        
        // Настраиваем кнопки навигации
        if (prevButton && decadeMap[currentDecade] && decadeMap[currentDecade].prev) {
            prevButton.href = `${decadeMap[currentDecade].prev}.html`;
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                transitionToDecade(decadeMap[currentDecade].prev);
            });
        } else if (prevButton) {
            prevButton.style.visibility = 'hidden';
        }
        
        if (nextButton && decadeMap[currentDecade] && decadeMap[currentDecade].next) {
            nextButton.href = `${decadeMap[currentDecade].next}.html`;
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                transitionToDecade(decadeMap[currentDecade].next);
            });
        } else if (nextButton) {
            nextButton.style.visibility = 'hidden';
        }
    }
}

// Функция для перехода между страницами десятилетий с анимацией
function transitionToDecade(decade) {
    // Определяем класс эры на основе десятилетия
    const eraClass = 'era-' + decade.substring(0, 4);
    
    // Сохраняем эпоху перед переходом
    localStorage.setItem('currentEra', eraClass);
    
    // Применяем анимацию перехода
    document.body.classList.add('transitioning');
    
    // Создаем эффект ухода текущего контента
    const mainContent = document.querySelector('.main-content');
    mainContent.classList.add('slide-out');
    
    // Переходим на новую страницу после анимации
    setTimeout(() => {
        window.location.href = decade + '.html';
    }, 500);
}

// Функция для запуска демонстрации "Машины времени" - сравнения технологий
function initTimeMachine() {
    const timeMachine = document.querySelector('.time-machine');
    
    if (!timeMachine) return;
    
    const eraSelector = timeMachine.querySelector('.era-selector');
    const comparisonContainer = timeMachine.querySelector('.comparison-container');
    
    // Данные для сравнения по эпохам
    const comparisonData = {
        'cpu': {
            '1950': { name: 'Электронные лампы', performance: '10-20 тыс. оп/с', power: '150 кВт', size: 'Комната' },
            '1960': { name: 'Транзисторы', performance: '100-200 тыс. оп/с', power: '30 кВт', size: 'Шкаф' },
            '1970': { name: 'Интегральные схемы', performance: '1 млн. оп/с', power: '5 кВт', size: 'Тумба' },
            '1980': { name: 'БИС', performance: '10 млн. оп/с', power: '1 кВт', size: 'Настольный' },
            '1990': { name: 'Процессоры Intel 486/Pentium', performance: '100 млн. оп/с', power: '100 Вт', size: 'Настольный/Портативный' },
            '2000': { name: 'Многоядерные процессоры', performance: '10 млрд. оп/с', power: '80 Вт', size: 'Портативный/Мобильный' },
            '2010': { name: 'ARM/x86 SoC', performance: '100 млрд. оп/с', power: '5-50 Вт', size: 'Мобильный/Встраиваемый' },
            '2020': { name: 'Нейроморфные чипы', performance: '10 трлн. оп/с', power: '1-20 Вт', size: 'Миниатюрный' }
        },
        'memory': {
            '1950': { name: 'Ферритовые сердечники', capacity: '2-4 КБ', speed: 'Низкая', type: 'Магнитная' },
            '1960': { name: 'Магнитная лента/барабан', capacity: '10-100 КБ', speed: 'Низкая', type: 'Магнитная' },
            '1970': { name: 'Полупроводниковая память', capacity: '256 КБ - 1 МБ', speed: 'Средняя', type: 'Электронная' },
            '1980': { name: 'Микросхемы RAM', capacity: '640 КБ - 4 МБ', speed: 'Средняя', type: 'Динамическая' },
            '1990': { name: 'SDRAM', capacity: '4-128 МБ', speed: 'Высокая', type: 'Динамическая' },
            '2000': { name: 'DDR SDRAM', capacity: '256 МБ - 4 ГБ', speed: 'Очень высокая', type: 'Динамическая' },
            '2010': { name: 'DDR3/DDR4', capacity: '4-32 ГБ', speed: 'Сверхвысокая', type: 'Динамическая' },
            '2020': { name: 'HBM/GDDR6', capacity: '16-512 ГБ', speed: 'Экстремальная', type: 'Гибридная' }
        },
        'storage': {
            '1950': { name: 'Перфокарты/перфоленты', capacity: '< 1 КБ', speed: 'Очень низкая', reliability: 'Низкая' },
            '1960': { name: 'Магнитные ленты', capacity: '2-10 МБ', speed: 'Низкая', reliability: 'Средняя' },
            '1970': { name: 'Магнитные диски', capacity: '10-100 МБ', speed: 'Средняя', reliability: 'Средняя' },
            '1980': { name: 'Жесткие диски', capacity: '10-500 МБ', speed: 'Средняя', reliability: 'Высокая' },
            '1990': { name: 'CD-ROM/HDD', capacity: '650 МБ - 10 ГБ', speed: 'Высокая', reliability: 'Высокая' },
            '2000': { name: 'DVD/HDD', capacity: '4.7 ГБ - 1 ТБ', speed: 'Высокая', reliability: 'Очень высокая' },
            '2010': { name: 'SSD/HDD', capacity: '120 ГБ - 10 ТБ', speed: 'Очень высокая', reliability: 'Очень высокая' },
            '2020': { name: 'NVMe SSD/Облачные хранилища', capacity: '1 ТБ - ∞', speed: 'Экстремальная', reliability: 'Сверхвысокая' }
        },
        'display': {
            '1950': { name: 'Телетайп', resolution: 'Текст', size: 'Большой', type: 'Механический' },
            '1960': { name: 'ЭЛТ-дисплеи символьные', resolution: '40x25 символов', size: 'Большой', type: 'Монохромный' },
            '1970': { name: 'ЭЛТ-дисплеи графические', resolution: '320x240 пикс.', size: 'Средний', type: '4-8 цветов' },
            '1980': { name: 'ЭЛТ-мониторы', resolution: '640x480 пикс.', size: 'Средний', type: '16-256 цветов' },
            '1990': { name: 'ЭЛТ/ЖК-мониторы', resolution: '800x600 - 1024x768 пикс.', size: 'Компактный', type: '16 бит - 24 бита' },
            '2000': { name: 'ЖК-мониторы', resolution: '1280x1024 - 1920x1080 пикс.', size: 'Компактный', type: '32 бита' },
            '2010': { name: 'LED/OLED-дисплеи', resolution: 'FullHD - 4K', size: 'Портативный', type: 'Сверхвысокая четкость' },
            '2020': { name: 'Микро-LED/Голографические', resolution: '4K - 8K+', size: 'Гибкий/Складной', type: 'Сверхреалистичный' }
        }
    };
    
    // Обработчик изменения выбранной эпохи
    eraSelector.addEventListener('change', function() {
        updateComparison(this.value);
    });
    
    // Функция обновления сравнения
    function updateComparison(era) {
        comparisonContainer.innerHTML = '';
        
        Object.keys(comparisonData).forEach(category => {
            const categoryData = comparisonData[category];
            const categorySection = document.createElement('div');
            categorySection.classList.add('comparison-category');
            
            // Заголовок категории
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = getCategoryTitle(category);
            categorySection.appendChild(categoryTitle);
            
            // Таблица сравнения
            const table = document.createElement('table');
            table.classList.add('comparison-table');
            
            // Заголовок таблицы
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            const headers = ['Характеристика', '1950-е', era + '-е', 'Разница'];
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            
            thead.appendChild(headerRow);
            table.appendChild(thead);
            
            // Тело таблицы
            const tbody = document.createElement('tbody');
            
            // Добавляем строки для каждого параметра
            const params = Object.keys(categoryData['1950']);
            params.forEach(param => {
                const row = document.createElement('tr');
                
                // Название параметра
                const paramCell = document.createElement('td');
                paramCell.textContent = getParamTitle(param);
                row.appendChild(paramCell);
                
                // Значение в 1950-х
                const value1950Cell = document.createElement('td');
                value1950Cell.textContent = categoryData['1950'][param];
                value1950Cell.classList.add('old-value');
                row.appendChild(value1950Cell);
                
                // Значение в выбранной эре
                const valueEraCell = document.createElement('td');
                valueEraCell.textContent = categoryData[era][param];
                valueEraCell.classList.add('current-value');
                row.appendChild(valueEraCell);
                
                // Индикатор разницы
                const diffCell = document.createElement('td');
                const diffIndicator = document.createElement('div');
                diffIndicator.classList.add('diff-indicator');
                
                // Рассчитываем условную разницу для визуализации
                const progressBar = calculateProgressIndicator(param, categoryData['1950'][param], categoryData[era][param]);
                diffIndicator.style.width = progressBar + '%';
                
                diffCell.appendChild(diffIndicator);
                row.appendChild(diffCell);
                
                tbody.appendChild(row);
            });
            
            table.appendChild(tbody);
            categorySection.appendChild(table);
            
            comparisonContainer.appendChild(categorySection);
        });
    }
    
    // Получение заголовка категории
    function getCategoryTitle(category) {
        const titles = {
            'cpu': 'Процессоры',
            'memory': 'Оперативная память',
            'storage': 'Хранение данных',
            'display': 'Дисплеи'
        };
        
        return titles[category] || category;
    }
    
    // Получение названия параметра
    function getParamTitle(param) {
        const titles = {
            'name': 'Технология',
            'performance': 'Производительность',
            'power': 'Энергопотребление',
            'size': 'Размер',
            'capacity': 'Ёмкость',
            'speed': 'Скорость',
            'type': 'Тип',
            'reliability': 'Надёжность',
            'resolution': 'Разрешение'
        };
        
        return titles[param] || param;
    }
    
    // Расчет индикатора прогресса для визуализации
    function calculateProgressIndicator(param, oldValue, newValue) {
        // Для упрощения используем фиксированные значения прогресса
        // В реальном приложении здесь был бы более сложный алгоритм
        const progressMap = {
            'performance': 90,
            'power': 60,
            'capacity': 95,
            'speed': 85,
            'resolution': 80
        };
        
        return progressMap[param] || 70; // По умолчанию 70%
    }
    
    // Инициализация с эпохой по умолчанию
    if (eraSelector) {
        updateComparison(eraSelector.value);
    }
}

// Запуск функции машины времени при наличии элемента на странице
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.time-machine')) {
        initTimeMachine();
    }
});