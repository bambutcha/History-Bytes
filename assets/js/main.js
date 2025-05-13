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
            // НЕ скрываем элементы, чтобы избежать мигания/исчезновения
            // element.style.opacity = '0';
            // Начинаем наблюдать за элементами
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
        
        // Скрываем индикатор прокрутки временной шкалы после начала прокрутки
        const scrollIndicator = document.querySelector('.timeline-scroll-indicator');
        if (scrollIndicator && window.scrollY > 300) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease';
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

// Функция для инициализации демо-симуляторов
function initSimulators() {
    const terminalSimulator = document.getElementById('terminal-simulator');
    const dosSimulator = document.getElementById('dos-simulator');
    const windowsSimulator = document.getElementById('windows-simulator');
    
    // Инициализация симулятора терминала
    if (terminalSimulator) {
        const terminalInput = terminalSimulator.querySelector('.terminal-input');
        const terminalOutput = terminalSimulator.querySelector('.terminal-output');
        
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = terminalInput.textContent.trim();
                
                // Добавляем введенную команду в вывод
                const commandLine = document.createElement('div');
                commandLine.classList.add('command-line');
                commandLine.innerHTML = `<span class="prompt">></span> ${command}`;
                terminalOutput.appendChild(commandLine);
                
                // Обработка команд
                processTerminalCommand(command, terminalOutput);
                
                // Очищаем поле ввода
                terminalInput.textContent = '';
            }
        });
    }
    
    // Инициализация других симуляторов по аналогии...
}

// Обработка команд терминального симулятора
function processTerminalCommand(command, outputElement) {
    let responseText = '';
    
    switch(command.toLowerCase()) {
        case 'help':
            responseText = 'Доступные команды: help, date, info, list, clear';
            break;
        case 'date':
            const now = new Date();
            responseText = `Текущая дата: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            break;
        case 'info':
            responseText = 'МЭСМ (Малая Электронная Счетная Машина) - первая ЭВМ в СССР, разработана под руководством С.А. Лебедева в 1951 году.';
            break;
        case 'list':
            responseText = 'Доступные файлы:\n- info.txt\n- history.dat\n- program.bas';
            break;
        case 'clear':
            outputElement.innerHTML = '';
            return;
        default:
            responseText = `Команда не распознана: "${command}". Введите "help" для получения списка команд.`;
    }
    
    // Добавляем ответ в вывод
    const responseLine = document.createElement('div');
    responseLine.classList.add('response-line');
    responseLine.textContent = responseText;
    outputElement.appendChild(responseLine);
    
    // Прокручиваем вывод вниз
    outputElement.scrollTop = outputElement.scrollHeight;
}

// Функция для квиза "Угадай эпоху"
function initQuiz() {
    const quizContainer = document.getElementById('era-quiz');
    
    if (quizContainer) {
        const startButton = quizContainer.querySelector('.start-quiz');
        const questionContainer = quizContainer.querySelector('.quiz-question');
        const optionsContainer = quizContainer.querySelector('.quiz-options');
        const resultContainer = quizContainer.querySelector('.quiz-result');
        const nextButton = quizContainer.querySelector('.next-question');
        
        let currentQuestion = 0;
        let score = 0;
        
        // Вопросы для квиза
        const questions = [
            {
                image: 'assets/images/quiz/quiz-1.jpg',
                question: 'К какому десятилетию относится эта ЭВМ?',
                options: ['1950-е', '1960-е', '1970-е', '1980-е'],
                correct: 0
            },
            {
                image: 'assets/images/quiz/quiz-2.jpg',
                question: 'В каком десятилетии была популярна эта технология?',
                options: ['1970-е', '1980-е', '1990-е', '2000-е'],
                correct: 2
            },
            // Добавьте больше вопросов по мере необходимости
        ];
        
        // Функция начала квиза
        startButton.addEventListener('click', function() {
            startButton.style.display = 'none';
            loadQuestion(0);
            questionContainer.style.display = 'block';
        });
        
        // Загрузка вопроса
        function loadQuestion(index) {
            const question = questions[index];
            
            questionContainer.querySelector('img').src = question.image;
            questionContainer.querySelector('h3').textContent = question.question;
            
            // Очищаем и заполняем варианты ответов
            optionsContainer.innerHTML = '';
            question.options.forEach((option, i) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('quiz-option');
                button.dataset.index = i;
                optionsContainer.appendChild(button);
                
                // Обработчик выбора ответа
                button.addEventListener('click', function() {
                    const selectedIndex = parseInt(this.dataset.index);
                    checkAnswer(selectedIndex, question.correct);
                });
            });
            
            // Скрываем результат и кнопку "Далее"
            resultContainer.style.display = 'none';
            nextButton.style.display = 'none';
        }
        
        // Проверка ответа
        function checkAnswer(selected, correct) {
            const options = optionsContainer.querySelectorAll('.quiz-option');
            
            // Блокируем все кнопки
            options.forEach(option => {
                option.disabled = true;
                const index = parseInt(option.dataset.index);
                
                if (index === correct) {
                    option.classList.add('correct');
                } else if (index === selected) {
                    option.classList.add('incorrect');
                }
            });
            
            // Показываем результат
            if (selected === correct) {
                resultContainer.textContent = 'Правильно!';
                resultContainer.classList.add('correct');
                score++;
            } else {
                resultContainer.textContent = 'Неверно. Правильный ответ: ' + questions[currentQuestion].options[correct];
                resultContainer.classList.add('incorrect');
            }
            
            resultContainer.style.display = 'block';
            
            // Показываем кнопку "Далее" или "Завершить"
            if (currentQuestion < questions.length - 1) {
                nextButton.textContent = 'Следующий вопрос';
                nextButton.style.display = 'block';
            } else {
                nextButton.textContent = 'Завершить квиз';
                nextButton.style.display = 'block';
            }
        }
        
        // Переход к следующему вопросу
        nextButton.addEventListener('click', function() {
            currentQuestion++;
            
            if (currentQuestion < questions.length) {
                loadQuestion(currentQuestion);
            } else {
                // Завершение квиза и показ общего результата
                questionContainer.style.display = 'none';
                optionsContainer.style.display = 'none';
                nextButton.style.display = 'none';
                
                resultContainer.classList.remove('correct', 'incorrect');
                resultContainer.innerHTML = `
                    <h3>Квиз завершен!</h3>
                    <p>Ваш результат: ${score} из ${questions.length}</p>
                    <button class="restart-quiz">Пройти еще раз</button>
                `;
                
                // Обработчик для кнопки рестарта
                resultContainer.querySelector('.restart-quiz').addEventListener('click', function() {
                    currentQuestion = 0;
                    score = 0;
                    loadQuestion(0);
                    questionContainer.style.display = 'block';
                    optionsContainer.style.display = 'block';
                });
            }
        });
    }
}