Порядок инициализации шардирования:
1. Указание в compose-файле десяти инстансов mongo с разными настройками:
    Конфигуратор1
    Конфигуратор2
    Конфигуратор3
    Роутер
    Шард1a
    Шард2a
    Шард1b
    Шард2b
    Шард1c
    Шард2c
2. Инициализация серверов конфигурации
3. Инициализация шардов для каждой реплики.
4. Инициализация роутера