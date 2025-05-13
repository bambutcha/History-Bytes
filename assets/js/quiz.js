// Вопросы для квиза
const questions = [
    {
        question: "В каком году была создана первая советская ЭВМ МЭСМ?",
        answers: [
            { text: "1949", correct: false },
            { text: "1951", correct: true },
            { text: "1953", correct: false },
            { text: "1955", correct: false }
        ]
    },
    {
        question: "Кто был руководителем разработки БЭСМ-6?",
        answers: [
            { text: "С.А. Лебедев", correct: true },
            { text: "И.С. Брук", correct: false },
            { text: "В.М. Глушков", correct: false },
            { text: "М.А. Карцев", correct: false }
        ]
    },
    {
        question: "Какая ЭВМ стала первой в мире с производительностью более 1 миллиона операций в секунду?",
        answers: [
            { text: "Эльбрус-1", correct: false },
            { text: "БЭСМ-6", correct: true },
            { text: "М-20", correct: false },
            { text: "Минск-32", correct: false }
        ]
    },
    {
        question: "В каком году был создан первый советский персональный компьютер 'Агат'?",
        answers: [
            { text: "1981", correct: false },
            { text: "1983", correct: false },
            { text: "1984", correct: true },
            { text: "1986", correct: false }
        ]
    },
    {
        question: "Какой процессор использовался в компьютере 'Корвет'?",
        answers: [
            { text: "Intel 8080", correct: false },
            { text: "Z80", correct: true },
            { text: "Motorola 68000", correct: false },
            { text: "Intel 8086", correct: false }
        ]
    },
    {
        question: "В каком году был создан первый российский процессор 'Эльбрус'?",
        answers: [
            { text: "2005", correct: false },
            { text: "2007", correct: false },
            { text: "2010", correct: false },
            { text: "2014", correct: true }
        ]
    },
    {
        question: "Какая операционная система была разработана для ЭВМ БЭСМ-6?",
        answers: [
            { text: "ДИСПАК", correct: true },
            { text: "ДЕМОС", correct: false },
            { text: "МОС", correct: false },
            { text: "ИНМОС", correct: false }
        ]
    },
    {
        question: "Какой язык программирования был создан в СССР в 1960-х годах?",
        answers: [
            { text: "Алгол-60", correct: false },
            { text: "Аналитик", correct: true },
            { text: "Бейсик", correct: false },
            { text: "Фортран", correct: false }
        ]
    },
    {
        question: "В каком году был создан первый советский суперкомпьютер 'Электроника СС БИС'?",
        answers: [
            { text: "1975", correct: false },
            { text: "1978", correct: true },
            { text: "1980", correct: false },
            { text: "1982", correct: false }
        ]
    },
    {
        question: "Какой компьютер стал первым массовым персональным компьютером в СССР?",
        answers: [
            { text: "БК-0010", correct: false },
            { text: "Микроша", correct: false },
            { text: "Агат", correct: false },
            { text: "Электроника БК-0010", correct: true }
        ]
    }
];

// Состояние квиза
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

// DOM элементы
const questionContainer = document.getElementById('question-container');
const progressFill = document.querySelector('.progress-fill');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const resultsDiv = document.getElementById('results');
const scoreSpan = document.getElementById('score');
const scoreMessage = document.getElementById('score-message');
const restartBtn = document.getElementById('restart-btn');

// Инициализация
function initQuiz() {
    totalQuestionsSpan.textContent = questions.length;
    showQuestion();
    updateProgress();
}

// Показать текущий вопрос
function showQuestion() {
    const question = questions[currentQuestion];
    
    // Создаем HTML для вопроса
    const questionHTML = `
        <div class="question">
            <div class="question-text">${question.question}</div>
            <div class="answers">
                ${question.answers.map((answer, index) => `
                    <div class="answer-option ${userAnswers[currentQuestion] === index ? 'selected' : ''}" 
                         data-index="${index}">
                        ${answer.text}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    questionContainer.innerHTML = questionHTML;
    
    // Добавляем обработчики событий для ответов
    document.querySelectorAll('.answer-option').forEach(option => {
        option.addEventListener('click', () => {
            const index = parseInt(option.dataset.index);
            selectAnswer(index);
        });
    });
    
    updateButtons();
}

// Выбор ответа
function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    
    // Обновляем классы для всех вариантов ответа
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach((option, i) => {
        if (i === index) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Обновляем состояние кнопок после выбора ответа
    updateButtons();
}

// Обновить прогресс
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    currentQuestionSpan.textContent = currentQuestion + 1;
}

// Обновить состояние кнопок
function updateButtons() {
    prevBtn.disabled = currentQuestion === 0;
    
    // Проверяем, есть ли ответ на текущий вопрос
    const hasAnswer = userAnswers[currentQuestion] !== null;
    
    // Если это последний вопрос и есть ответ, показываем "Завершить"
    if (currentQuestion === questions.length - 1 && hasAnswer) {
        nextBtn.textContent = 'Завершить';
        nextBtn.disabled = false;
    } else {
        nextBtn.textContent = 'Далее →';
        nextBtn.disabled = !hasAnswer;
    }
}

// Перейти к следующему вопросу
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgress();
    } else {
        showResults();
    }
}

// Вернуться к предыдущему вопросу
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateProgress();
    }
}

// Показать результаты
function showResults() {
    score = userAnswers.reduce((acc, answer, index) => {
        return acc + (questions[index].answers[answer].correct ? 1 : 0);
    }, 0);

    scoreSpan.textContent = score;
    
    let message = '';
    if (score === questions.length) {
        message = 'Отлично! Вы настоящий эксперт в истории вычислительной техники!';
    } else if (score >= questions.length * 0.7) {
        message = 'Хороший результат! Вы хорошо знаете историю вычислительной техники.';
    } else if (score >= questions.length * 0.4) {
        message = 'Неплохо! Есть куда расти в изучении истории вычислительной техники.';
    } else {
        message = 'Попробуйте еще раз! История вычислительной техники полна интересных фактов.';
    }
    
    scoreMessage.textContent = message;
    
    // Скрываем контейнер с вопросами
    const quizContent = document.querySelector('.quiz-content');
    if (quizContent) {
        quizContent.style.display = 'none';
    }
    
    // Показываем результаты
    resultsDiv.classList.remove('hidden');
    resultsDiv.style.display = 'block';
}

// Начать квиз заново
function restartQuiz() {
    // Сбрасываем состояние
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(questions.length).fill(null);
    
    // Скрываем результаты
    resultsDiv.classList.add('hidden');
    resultsDiv.style.display = 'none';
    
    // Показываем контейнер с вопросами
    const quizContent = document.querySelector('.quiz-content');
    if (quizContent) {
        quizContent.style.display = 'block';
    }
    
    // Сбрасываем прогресс
    progressFill.style.width = '0%';
    currentQuestionSpan.textContent = '1';
    
    // Показываем первый вопрос
    showQuestion();
    updateButtons();
}

// Обработчики событий
prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Инициализация квиза при загрузке страницы
document.addEventListener('DOMContentLoaded', initQuiz); 