// Инициализация симуляторов при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initTerminalSimulator();
    initDosSimulator();
    initWindowsSimulator();
});

// Симулятор терминала МЭСМ
function initTerminalSimulator() {
    const terminalSimulator = document.getElementById('terminal-simulator');
    if (!terminalSimulator) return;

    const terminalInput = terminalSimulator.querySelector('.terminal-input');
    const terminalOutput = terminalSimulator.querySelector('.terminal-output');

    // Добавляем приветственное сообщение
    addTerminalOutput('Добро пожаловать в симулятор терминала МЭСМ (1951 г.)');
    addTerminalOutput('Введите "help" для получения списка команд');

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = terminalInput.textContent.trim();
            
            // Добавляем введенную команду в вывод
            addTerminalOutput(`> ${command}`);
            
            // Обработка команд
            processTerminalCommand(command);
            
            // Очищаем поле ввода
            terminalInput.textContent = '';
        }
    });
}

// Обработка команд терминала
function processTerminalCommand(command) {
    const terminalOutput = document.querySelector('.terminal-output');
    
    switch(command.toLowerCase()) {
        case 'help':
            addTerminalOutput('Доступные команды:');
            addTerminalOutput('  help  - показать список команд');
            addTerminalOutput('  date  - показать текущую дату');
            addTerminalOutput('  info  - информация о МЭСМ');
            addTerminalOutput('  list  - список файлов');
            addTerminalOutput('  clear - очистить экран');
            break;
            
        case 'date':
            const now = new Date();
            addTerminalOutput(`Текущая дата: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
            break;
            
        case 'info':
            addTerminalOutput('МЭСМ (Малая Электронная Счетная Машина)');
            addTerminalOutput('Первая советская ЭВМ, разработана под руководством С.А. Лебедева');
            addTerminalOutput('Год создания: 1951');
            addTerminalOutput('Быстродействие: 50 операций в секунду');
            addTerminalOutput('Объем памяти: 31 число');
            break;
            
        case 'list':
            addTerminalOutput('Доступные файлы:');
            addTerminalOutput('  info.txt    - информация о машине');
            addTerminalOutput('  history.dat - история разработки');
            addTerminalOutput('  program.bas - пример программы');
            break;
            
        case 'clear':
            terminalOutput.innerHTML = '';
            break;
            
        default:
            addTerminalOutput(`Команда не распознана: "${command}"`);
            addTerminalOutput('Введите "help" для получения списка команд');
    }
}

// Добавление текста в вывод терминала
function addTerminalOutput(text) {
    const terminalOutput = document.querySelector('.terminal-output');
    const line = document.createElement('div');
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Симулятор MS-DOS
function initDosSimulator() {
    const dosSimulator = document.getElementById('dos-simulator');
    if (!dosSimulator) return;

    const dosCommand = dosSimulator.querySelector('.dos-command');
    const dosOutput = dosSimulator.querySelector('.dos-output');
    const dosControls = dosSimulator.querySelector('.dos-controls');

    // Добавляем приветственное сообщение
    addDosOutput('Microsoft(R) MS-DOS(R) Version 3.3');
    addDosOutput('(C)Copyright Microsoft Corp 1981-1987');
    addDosOutput('');

    // Обработка команд
    dosCommand.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = dosCommand.value.trim();
            addDosOutput(`C:\\> ${command}`);
            processDosCommand(command);
            dosCommand.value = '';
        }
    });

    // Обработка кнопок управления окном
    dosControls.querySelector('.dos-minimize').addEventListener('click', function() {
        dosSimulator.classList.add('minimized');
    });

    dosControls.querySelector('.dos-maximize').addEventListener('click', function() {
        dosSimulator.classList.toggle('maximized');
    });

    dosControls.querySelector('.dos-close').addEventListener('click', function() {
        dosSimulator.classList.add('closed');
    });
}

// Обработка команд DOS
function processDosCommand(command) {
    const dosOutput = document.querySelector('.dos-output');
    const [cmd, ...args] = command.toLowerCase().split(' ');
    
    switch(cmd) {
        case 'dir':
            addDosOutput('Directory of C:\\');
            addDosOutput('COMMAND.COM    25307 03-17-87  12:00p');
            addDosOutput('AUTOEXEC.BAT      68 03-17-87  12:00p');
            addDosOutput('CONFIG.SYS       128 03-17-87  12:00p');
            addDosOutput('        3 File(s)    25408 bytes');
            addDosOutput('        0 Dir(s)   1048576 bytes free');
            break;
            
        case 'cd':
            if (args[0]) {
                addDosOutput(`Current directory is now C:\\${args[0]}`);
            } else {
                addDosOutput('C:\\');
            }
            break;
            
        case 'type':
            if (args[0]) {
                addDosOutput(`Contents of ${args[0]}:`);
                addDosOutput('This is a sample file content.');
            } else {
                addDosOutput('Required parameter missing');
            }
            break;
            
        case 'copy':
            if (args.length === 2) {
                addDosOutput(`1 file(s) copied`);
            } else {
                addDosOutput('Invalid number of parameters');
            }
            break;
            
        case 'del':
            if (args[0]) {
                addDosOutput(`File ${args[0]} deleted`);
            } else {
                addDosOutput('Required parameter missing');
            }
            break;
            
        case 'cls':
            dosOutput.innerHTML = '';
            break;
            
        case 'help':
            addDosOutput('MS-DOS commands:');
            addDosOutput('  DIR    - Display directory');
            addDosOutput('  CD     - Change directory');
            addDosOutput('  TYPE   - Display file contents');
            addDosOutput('  COPY   - Copy files');
            addDosOutput('  DEL    - Delete files');
            addDosOutput('  CLS    - Clear screen');
            addDosOutput('  HELP   - Display this help');
            break;
            
        default:
            addDosOutput(`Bad command or file name: ${cmd}`);
    }
}

// Добавление текста в вывод DOS
function addDosOutput(text) {
    const dosOutput = document.querySelector('.dos-output');
    const line = document.createElement('div');
    line.textContent = text;
    dosOutput.appendChild(line);
    dosOutput.scrollTop = dosOutput.scrollHeight;
}

// Симулятор Windows 3.1
function initWindowsSimulator() {
    const desktop = document.querySelector('.windows-desktop');
    const startButton = document.querySelector('.start-button');
    const startMenu = document.querySelector('.start-menu');
    const taskbarPrograms = document.querySelector('.taskbar-programs');
    const taskbarTime = document.querySelector('.taskbar-time');
    let activeWindow = null;
    let windowCounter = 0;

    // Обновление времени
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        taskbarTime.textContent = `${hours}:${minutes}`;
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Обработка меню Start
    startButton.addEventListener('click', () => {
        startMenu.classList.toggle('active');
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!startButton.contains(e.target) && !startMenu.contains(e.target)) {
            startMenu.classList.remove('active');
        }
    });

    // Создание окна программы
    function createWindow(program) {
        const windowId = `window-${++windowCounter}`;
        const window = document.createElement('div');
        window.className = 'windows-window';
        window.id = windowId;
        window.style.position = 'absolute';
        window.style.left = '50px';
        window.style.top = '50px';
        window.style.width = '300px';
        window.style.height = '200px';

        let windowContent = '';
        switch (program) {
            case 'notepad':
                windowContent = `
                    <div class="window-header">
                        <span class="window-title">Блокнот</span>
                        <div class="window-controls">
                            <button class="minimize">_</button>
                            <button class="maximize">□</button>
                            <button class="close">×</button>
                        </div>
                    </div>
                    <div class="window-content">
                        <textarea class="notepad-content" rows="10" cols="40"></textarea>
                    </div>
                `;
                break;
            case 'calculator':
                windowContent = `
                    <div class="window-header">
                        <span class="window-title">Калькулятор</span>
                        <div class="window-controls">
                            <button class="minimize">_</button>
                            <button class="maximize">□</button>
                            <button class="close">×</button>
                        </div>
                    </div>
                    <div class="window-content">
                        <div class="calculator">
                            <div class="calculator-display">0</div>
                            <button>7</button>
                            <button>8</button>
                            <button>9</button>
                            <button>/</button>
                            <button>4</button>
                            <button>5</button>
                            <button>6</button>
                            <button>*</button>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                            <button>-</button>
                            <button>0</button>
                            <button>.</button>
                            <button>=</button>
                            <button>+</button>
                        </div>
                    </div>
                `;
                break;
            case 'paint':
                windowContent = `
                    <div class="window-header">
                        <span class="window-title">Paint</span>
                        <div class="window-controls">
                            <button class="minimize">_</button>
                            <button class="maximize">□</button>
                            <button class="close">×</button>
                        </div>
                    </div>
                    <div class="window-content">
                        <div class="paint-tools">
                            <div class="paint-tool active" data-tool="pencil">✏️</div>
                            <div class="paint-tool" data-tool="eraser">🧹</div>
                            <div class="paint-tool" data-tool="fill">🪣</div>
                        </div>
                        <canvas class="paint-canvas" width="400" height="300"></canvas>
                    </div>
                `;
                break;
        }

        window.innerHTML = windowContent;
        desktop.appendChild(window);

        // Добавление программы в панель задач
        const taskbarProgram = document.createElement('div');
        taskbarProgram.className = 'taskbar-program';
        taskbarProgram.textContent = program.charAt(0).toUpperCase() + program.slice(1);
        taskbarPrograms.appendChild(taskbarProgram);

        // Обработка кнопок управления окном
        const header = window.querySelector('.window-header');
        const minimizeBtn = window.querySelector('.minimize');
        const maximizeBtn = window.querySelector('.maximize');
        const closeBtn = window.querySelector('.close');

        // Перетаскивание окна
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let lastLeft = '50px';
        let lastTop = '50px';
        let lastWidth = '300px';
        let lastHeight = '200px';
        let maximized = false;

        header.addEventListener('mousedown', (e) => {
            if (maximized) return; // нельзя перетаскивать maximized окно
            isDragging = true;
            initialX = e.clientX - window.offsetLeft;
            initialY = e.clientY - window.offsetTop;
            window.style.zIndex = '1000';
            activeWindow = window;
            document.body.style.userSelect = 'none';
        });

        desktop.addEventListener('mousemove', (e) => {
            if (isDragging && !maximized) {
                e.preventDefault();
                const rect = desktop.getBoundingClientRect();
                let x = e.clientX - rect.left - initialX;
                let y = e.clientY - rect.top - initialY;
                x = Math.max(0, Math.min(x, rect.width - window.offsetWidth));
                y = Math.max(0, Math.min(y, rect.height - window.offsetHeight - 38));
                window.style.left = `${x}px`;
                window.style.top = `${y}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.userSelect = '';
        });

        // Кнопки управления окном
        minimizeBtn.addEventListener('click', () => {
            window.style.display = 'none';
            taskbarProgram.classList.remove('active');
        });

        maximizeBtn.addEventListener('click', () => {
            maximized = !maximized;
            if (maximized) {
                // Сохраняем текущие размеры и позицию
                lastLeft = window.style.left;
                lastTop = window.style.top;
                lastWidth = window.style.width;
                lastHeight = window.style.height;
                window.style.left = '0';
                window.style.top = '0';
                window.style.width = '100%';
                window.style.height = 'calc(100% - 38px)';
                window.classList.add('maximized');
            } else {
                window.style.left = lastLeft;
                window.style.top = lastTop;
                window.style.width = lastWidth;
                window.style.height = lastHeight;
                window.classList.remove('maximized');
            }
        });

        closeBtn.addEventListener('click', () => {
            window.remove();
            taskbarProgram.remove();
        });

        // Активация окна при клике
        window.addEventListener('click', () => {
            if (activeWindow) {
                activeWindow.style.zIndex = '1';
            }
            window.style.zIndex = '1000';
            activeWindow = window;
            taskbarProgram.classList.add('active');
        });

        // Инициализация функциональности программ
        switch (program) {
            case 'calculator':
                initCalculator(window);
                break;
            case 'paint':
                initPaint(window);
                break;
        }

        return window;
    }

    // Инициализация калькулятора
    function initCalculator(window) {
        const display = window.querySelector('.calculator-display');
        const buttons = window.querySelectorAll('.calculator button');
        let currentValue = '0';
        let previousValue = null;
        let operation = null;

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.textContent;

                if (value >= '0' && value <= '9' || value === '.') {
                    if (currentValue === '0' && value !== '.') {
                        currentValue = value;
                    } else {
                        currentValue += value;
                    }
                } else if (value === '=') {
                    if (previousValue !== null && operation !== null) {
                        currentValue = String(eval(`${previousValue} ${operation} ${currentValue}`));
                        previousValue = null;
                        operation = null;
                    }
                } else {
                    previousValue = currentValue;
                    operation = value;
                    currentValue = '0';
                }

                display.textContent = currentValue;
            });
        });
    }

    // Инициализация Paint
    function initPaint(window) {
        const canvas = window.querySelector('.paint-canvas');
        const ctx = canvas.getContext('2d');
        const tools = window.querySelectorAll('.paint-tool');
        let isDrawing = false;
        let currentTool = 'pencil';
        let lastX = 0;
        let lastY = 0;

        // Настройка холста
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000';

        // Выбор инструмента
        tools.forEach(tool => {
            tool.addEventListener('click', () => {
                tools.forEach(t => t.classList.remove('active'));
                tool.classList.add('active');
                currentTool = tool.dataset.tool;
            });
        });

        // Обработка рисования
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            lastX = e.clientX - rect.left;
            lastY = e.clientY - rect.top;
        });

        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            switch (currentTool) {
                case 'pencil':
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    break;
                case 'eraser':
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-out';
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    ctx.restore();
                    break;
                case 'fill':
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    break;
            }

            lastX = x;
            lastY = y;
        });

        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        canvas.addEventListener('mouseleave', () => {
            isDrawing = false;
        });
    }

    // Обработка кликов по иконкам и пунктам меню
    const programLaunchers = document.querySelectorAll('.desktop-icon, .start-menu-item');
    programLaunchers.forEach(launcher => {
        launcher.addEventListener('click', () => {
            const program = launcher.dataset.program;
            createWindow(program);
            startMenu.classList.remove('active');
        });
    });
} 