// Данные о технологиях по десятилетиям
const technologyData = {
    '1960s': {
        'Процессоры': {
            'Intel 4004': 'Первый микропроцессор, 2300 транзисторов, 740 кГц',
            'IBM System/360': 'Мейнфрейм с 8 МБ памяти, 1 МГц'
        },
        'Память': {
            'Магнитные сердечники': '1 КБ на модуль, время доступа 1 мкс',
            'Дисковые накопители': 'IBM 1311 - 2 МБ на диске'
        },
        'Интерфейсы': {
            'Перфокарты': '80 колонок, 960 бит на карту',
            'Телетайп': '10 символов в секунду'
        }
    },
    '1970s': {
        'Процессоры': {
            'Intel 8080': '4500 транзисторов, 2 МГц',
            'Motorola 6800': '4000 транзисторов, 1 МГц'
        },
        'Память': {
            'DRAM': '1 КБ на чип, время доступа 200 нс',
            'Гибкие диски': '8-дюймовые, 80 КБ'
        },
        'Интерфейсы': {
            'RS-232': 'Последовательный порт, до 9600 бод',
            'Мониторы': 'Монохромные, 80x24 символа'
        }
    },
    '1980s': {
        'Процессоры': {
            'Intel 80286': '134000 транзисторов, 12 МГц',
            'Motorola 68000': '68000 транзисторов, 8 МГц'
        },
        'Память': {
            'SIMM': '1 МБ модули, время доступа 100 нс',
            'Жесткие диски': '20 МБ, время доступа 85 мс'
        },
        'Интерфейсы': {
            'VGA': '640x480, 16 цветов',
            'SCSI': '5 МБ/с, до 7 устройств'
        }
    },
    '1990s': {
        'Процессоры': {
            'Intel Pentium': '3.1 млн транзисторов, 60 МГц',
            'AMD K5': '4.3 млн транзисторов, 100 МГц'
        },
        'Память': {
            'SDRAM': '64 МБ модули, 100 МГц',
            'CD-ROM': '650 МБ, 1x скорость'
        },
        'Интерфейсы': {
            'USB 1.0': '12 Мбит/с',
            'AGP': '266 МБ/с, 1x режим'
        }
    },
    '2000s': {
        'Процессоры': {
            'Intel Core 2': '291 млн транзисторов, 2.4 ГГц',
            'AMD Athlon 64': '105.9 млн транзисторов, 2.4 ГГц'
        },
        'Память': {
            'DDR2': '2 ГБ модули, 800 МГц',
            'SSD': '64 ГБ, 250 МБ/с'
        },
        'Интерфейсы': {
            'PCI Express': '250 МБ/с на линию',
            'SATA': '1.5 Гбит/с'
        }
    },
    '2010s': {
        'Процессоры': {
            'Intel Core i7': '731 млн транзисторов, 3.6 ГГц',
            'AMD Ryzen': '4.8 млрд транзисторов, 4.2 ГГц'
        },
        'Память': {
            'DDR4': '16 ГБ модули, 3200 МГц',
            'NVMe SSD': '2 ТБ, 3500 МБ/с'
        },
        'Интерфейсы': {
            'USB 3.1': '10 Гбит/с',
            'Thunderbolt 3': '40 Гбит/с'
        }
    },
    '2020s': {
        'Процессоры': {
            'Apple M1': '16 млрд транзисторов, 3.2 ГГц',
            'AMD Ryzen 9': '19.2 млрд транзисторов, 4.9 ГГц'
        },
        'Память': {
            'DDR5': '32 ГБ модули, 6400 МГц',
            'PCIe 4.0 SSD': '4 ТБ, 7000 МБ/с'
        },
        'Интерфейсы': {
            'USB 4': '40 Гбит/с',
            'PCIe 5.0': '64 ГБ/с'
        }
    }
};

// Инициализация машины времени
document.addEventListener('DOMContentLoaded', () => {
    const eraSelectors = document.querySelectorAll('.era-selector');
    const comparisonContainer = document.querySelector('.comparison-container');
    
    // Обработчик выбора эпохи
    eraSelectors.forEach(selector => {
        selector.addEventListener('change', (e) => {
            const selectedEras = Array.from(eraSelectors)
                .map(s => s.value)
                .filter(v => v !== '');
            
            if (selectedEras.length === 2) {
                updateComparison(selectedEras[0], selectedEras[1]);
            }
        });
    });
    
    // Заполнение селекторов
    eraSelectors.forEach(selector => {
        Object.keys(technologyData).forEach(era => {
            const option = document.createElement('option');
            option.value = era;
            option.textContent = era;
            selector.appendChild(option);
        });
    });
});

// Функция для извлечения числовых значений из строки
function extractNumericValue(str) {
    // Ищем первое число в строке
    const matches = str.match(/(\d+(?:\.\d+)?)/);
    if (!matches) return null; // Возвращаем null вместо 0, чтобы отличать отсутствие значения
    
    let value = parseFloat(matches[1]);
    
    // Определяем множитель на основе единиц измерения
    if (str.includes('млрд')) value *= 1000000000;
    else if (str.includes('млн')) value *= 1000000;
    else if (str.includes('ГГц')) value *= 1000000000;
    else if (str.includes('МГц')) value *= 1000000;
    else if (str.includes('кГц')) value *= 1000;
    else if (str.includes('ГБ')) value *= 1024 * 1024 * 1024;
    else if (str.includes('МБ')) value *= 1024 * 1024;
    else if (str.includes('КБ')) value *= 1024;
    else if (str.includes('Гбит/с')) value *= 1000000000;
    else if (str.includes('Мбит/с')) value *= 1000000;
    else if (str.includes('кбит/с')) value *= 1000;
    else if (str.includes('мкс')) value *= 0.001;
    else if (str.includes('нс')) value *= 0.000001;
    
    return value;
}

// Функция для расчета прогресса
function calculateProgress(oldValue, newValue) {
    const oldNum = extractNumericValue(oldValue);
    const newNum = extractNumericValue(newValue);
    
    // Если не удалось извлечь значения, возвращаем 0
    if (oldNum === null || newNum === null) {
        return 0;
    }
    
    // Если значения равны, возвращаем 0
    if (oldNum === newNum) {
        return 0;
    }
    
    // Определяем, является ли улучшением увеличение или уменьшение значения
    const isIncreasingBetter = !oldValue.includes('нс') && !oldValue.includes('мкс') && !oldValue.includes('мс');
    
    if (isIncreasingBetter) {
        // Для случаев, когда большее значение лучше
        if (newNum > oldNum) {
            const ratio = newNum / oldNum;
            // Ограничиваем максимальный прогресс 100%
            return Math.min(ratio, 1);
        }
        return 0;
    } else {
        // Для случаев, когда меньшее значение лучше (например, время доступа)
        if (newNum < oldNum) {
            const ratio = oldNum / newNum;
            // Ограничиваем максимальный прогресс 100%
            return Math.min(ratio, 1);
        }
        return 0;
    }
}

// Обновление сравнения
function updateComparison(era1, era2) {
    const container = document.querySelector('.comparison-container');
    container.innerHTML = '';
    
    // Создание категорий сравнения
    Object.keys(technologyData[era1]).forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'comparison-category';
        
        const title = document.createElement('h3');
        title.textContent = category;
        categoryDiv.appendChild(title);
        
        const table = document.createElement('table');
        table.className = 'comparison-table';
        
        // Заголовок таблицы
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['Технология', era1, era2, 'Прогресс'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Тело таблицы
        const tbody = document.createElement('tbody');
        Object.keys(technologyData[era1][category]).forEach(tech => {
            const row = document.createElement('tr');
            
            // Название технологии
            const techCell = document.createElement('td');
            techCell.textContent = tech;
            row.appendChild(techCell);
            
            // Значение первой эпохи
            const era1Cell = document.createElement('td');
            era1Cell.className = 'era-value old';
            era1Cell.textContent = technologyData[era1][category][tech];
            row.appendChild(era1Cell);
            
            // Значение второй эпохи
            const era2Cell = document.createElement('td');
            era2Cell.className = 'era-value new';
            era2Cell.textContent = technologyData[era2][category][tech];
            row.appendChild(era2Cell);
            
            // Индикатор прогресса
            const progressCell = document.createElement('td');
            const progressBar = document.createElement('div');
            progressBar.className = 'diff-indicator';
            progressBar.style.width = '0%';
            
            // Расчет и установка ширины прогресс-бара
            const progress = calculateProgress(
                technologyData[era1][category][tech],
                technologyData[era2][category][tech]
            );
            
            // Устанавливаем финальную ширину с небольшой задержкой для анимации
            setTimeout(() => {
                progressBar.style.width = `${progress * 100}%`;
            }, 50);
            
            progressCell.appendChild(progressBar);
            row.appendChild(progressCell);
            
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        categoryDiv.appendChild(table);
        container.appendChild(categoryDiv);
    });
    
    // Анимация появления
    container.style.opacity = '0';
    setTimeout(() => {
        container.style.opacity = '1';
    }, 50);
} 